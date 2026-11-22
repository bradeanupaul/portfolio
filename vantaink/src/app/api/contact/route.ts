import { NextResponse } from "next/server";

import { generateReferenceId } from "@/lib/booking/reference";
import { prisma } from "@/lib/db/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { contactSubmissionSchema } from "@/lib/validation/contact";

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
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

  const parsed = contactSubmissionSchema.safeParse(body);
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
  const referenceId = generateReferenceId();

  try {
    await prisma.contactRequest.create({
      data: {
        referenceId,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        demoAck: data.demoAck,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Nu am putut înregistra mesajul." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    referenceId,
    message: "Mesajul demonstrativ a fost înregistrat.",
  });
}