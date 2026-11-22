import { tokensMatch } from "@/lib/cancel-token";
import { demoJson, getClientIp } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { reservationCancelSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`cancel:${ip}`, { windowMs: 60_000, max: 10 });

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

  const parsed = reservationCancelSchema.safeParse(body);
  if (!parsed.success) {
    return demoJson(
      {
        success: false,
        error: "Referința sau token-ul nu sunt valide.",
      },
      { status: 400 },
    );
  }

  const { reference, token } = parsed.data;
  const reservation = await prisma.reservation.findUnique({
    where: { reference },
  });

  const genericError = "Rezervarea nu a putut fi anulată. Verificați referința și token-ul.";

  if (!reservation || !tokensMatch(token, reservation.cancelToken)) {
    return demoJson({ success: false, error: genericError }, { status: 404 });
  }

  if (reservation.status === "cancelled") {
    return demoJson({
      success: true,
      message: "Rezervarea era deja marcată ca anulată (demonstrativ).",
      reference,
    });
  }

  await prisma.reservation.update({
    where: { id: reservation.id },
    data: { status: "cancelled" },
  });

  return demoJson({
    success: true,
    message: "Rezervare demonstrativă anulată.",
    reference,
  });
}