import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { experienceInquirySchema } from "@/lib/validation/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = experienceInquirySchema.safeParse(body);
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

    const inquiry = await prisma.experienceInquiry.create({
      data: {
        experienceId: parsed.data.experienceId || null,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        preferredDate: parsed.data.preferredDate || null,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      message:
        "Solicitarea demonstrativă a fost înregistrată. Nu va contacta un operator real.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Nu am putut salva solicitarea. Încearcă din nou." },
      { status: 500 },
    );
  }
}
