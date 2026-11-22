import { generateCancelToken, generateReservationReference } from "@/lib/reservation-tokens";
import { assertSlotCapacity, reservationApiSchema } from "@/lib/reservation-api";
import { demoJson, getClientIp } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`reservation:${ip}`, { windowMs: 60_000, max: 8 });

  if (!limit.success) {
    return demoJson(
      {
        success: false,
        error: "Prea multe încercări. Încercați din nou într-un minut.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return demoJson({ success: false, error: "Datele trimise sunt invalide." }, { status: 400 });
  }

  const parsed = reservationApiSchema.safeParse(body);
  if (!parsed.success) {
    return demoJson(
      {
        success: false,
        error: "Verificați câmpurile formularului.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const capacity = await assertSlotCapacity(data.date, data.time, data.partySize);
  if (!capacity.ok) {
    return demoJson({ success: false, error: capacity.message }, { status: 409 });
  }

  const reference = generateReservationReference(data.date);
  const cancelToken = generateCancelToken();

  try {
    await prisma.reservation.create({
      data: {
        reference,
        cancelToken,
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        partySize: data.partySize,
        notes: data.notes?.trim() ? data.notes.trim() : null,
        status: "pending",
      },
    });
  } catch {
    return demoJson(
      {
        success: false,
        error: "Nu am putut înregistra rezervarea demonstrativă. Încercați din nou.",
      },
      { status: 500 },
    );
  }

  return demoJson(
    {
      success: true,
      reference,
      cancelToken,
      message: "Rezervare demonstrativă înregistrată.",
    },
    { status: 201 },
  );
}