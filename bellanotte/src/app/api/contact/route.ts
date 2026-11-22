import { contactFormSchema } from "@/lib/validations";
import { demoJson, getClientIp } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, { windowMs: 60_000, max: 6 });

  if (!limit.success) {
    return demoJson(
      {
        success: false,
        error: "Prea multe mesaje trimise. Încercați din nou în curând.",
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

  const parsed = contactFormSchema.safeParse(body);
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

  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
  } catch {
    return demoJson(
      {
        success: false,
        error: "Nu am putut salva mesajul demonstrativ. Încercați din nou.",
      },
      { status: 500 },
    );
  }

  return demoJson(
    {
      success: true,
      message: "Mesaj demonstrativ înregistrat. Nu s-a trimis niciun email.",
    },
    { status: 201 },
  );
}