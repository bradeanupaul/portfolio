import { NextResponse } from "next/server";

import { generateReferenceId } from "@/lib/booking/reference";
import { checkSlotConflict } from "@/lib/booking/slots";
import { prisma } from "@/lib/db/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { consultationSubmissionSchema } from "@/lib/validation/consultation";

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

const CONFLICT_MESSAGES: Record<string, string> = {
  NOT_FOUND: "Intervalul selectat nu există.",
  ARTIST_MISMATCH: "Intervalul nu corespunde artistului selectat.",
  ALREADY_BOOKED: "Intervalul a fost deja rezervat în demo.",
  PAST: "Intervalul selectat nu mai este disponibil.",
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`consultations:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Prea multe solicitări. Încercați din nou curând." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpul cererii nu este valid." },
      { status: 400 },
    );
  }

  const parsed = consultationSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Date invalide.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.slotId) {
    const conflict = await checkSlotConflict(data.artistSlug, data.slotId);
    if (!conflict.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: CONFLICT_MESSAGES[conflict.code] ?? "Interval indisponibil.",
        },
        { status: 409 },
      );
    }
  }

  const referenceId = generateReferenceId();

  try {
    await prisma.$transaction(async (tx) => {
      if (data.slotId) {
        const updated = await tx.demoSlot.updateMany({
          where: {
            id: data.slotId,
            artistSlug: data.artistSlug,
            isBooked: false,
            startsAt: { gt: new Date() },
          },
          data: { isBooked: true },
        });

        if (updated.count !== 1) {
          throw new Error("SLOT_CONFLICT");
        }
      }

      await tx.consultationRequest.create({
        data: {
          referenceId,
          artistSlug: data.artistSlug,
          styleSlugs: JSON.stringify(data.styleSlugs),
          placement: data.placement,
          approximateSize: data.approximateSize,
          ideaDescription: data.ideaDescription,
          preferredPeriod: data.preferredPeriod,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          demoAcknowledged: data.demoAcknowledged,
          slotId: data.slotId,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_CONFLICT") {
      return NextResponse.json(
        {
          ok: false,
          error: CONFLICT_MESSAGES.ALREADY_BOOKED,
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "Nu am putut înregistra solicitarea." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    referenceId,
    message: "Solicitarea demonstrativă a fost înregistrată.",
  });
}