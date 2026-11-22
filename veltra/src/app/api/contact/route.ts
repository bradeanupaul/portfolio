import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { contactSchema } from "@/lib/validation/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Verifică câmpurile formularului.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      message:
        "Mesajul demonstrativ a fost înregistrat. Nu a fost trimis un email real.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Nu am putut salva mesajul. Încearcă din nou." },
      { status: 500 },
    );
  }
}
