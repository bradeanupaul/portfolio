import { NextResponse } from "next/server";
import { deliverContact } from "@/lib/contact";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          mode: "error",
          message: "Datele trimise nu sunt valide.",
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({
        ok: true,
        mode: "resend",
        message: "Mesajul a fost înregistrat.",
      });
    }

    const result = await deliverContact(parsed.data);
    return NextResponse.json(result, {
      status: result.ok ? 200 : result.mode === "unconfigured" ? 503 : 500,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        mode: "error",
        message: "Cererea nu a putut fi procesată.",
      },
      { status: 500 },
    );
  }
}
