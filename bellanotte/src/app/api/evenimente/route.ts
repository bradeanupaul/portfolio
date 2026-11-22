import { eventInquiryFormSchema } from "@/lib/validations";
import { demoJson, getClientIp } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`events:${ip}`, { windowMs: 60_000, max: 6 });

  if (!limit.success) {
    return demoJson(
      {
        success: false,
        error: "Prea multe solicitări. Încercați din nou în curând.",
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

  const parsed = eventInquiryFormSchema.safeParse(body);
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
  const phone = data.phone?.trim() ? data.phone.trim() : null;
  const eventSlug = data.eventSlug?.trim() ? data.eventSlug.trim() : null;
  const eventTitle = data.eventTitle?.trim() ? data.eventTitle.trim() : null;

  try {
    await prisma.eventInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone,
        eventSlug,
        eventTitle,
        partySize: data.partySize ?? null,
        message: data.message,
      },
    });
  } catch {
    return demoJson(
      {
        success: false,
        error: "Nu am putut salva solicitarea demonstrativă. Încercați din nou.",
      },
      { status: 500 },
    );
  }

  return demoJson(
    {
      success: true,
      message: "Solicitare demonstrativă pentru eveniment înregistrată. Nu s-a trimis email.",
    },
    { status: 201 },
  );
}