import { NextResponse } from "next/server";
import type { z } from "zod";
import { persistInquiry, type InquiryKind } from "@/lib/inquiries";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { fieldErrors } from "@/lib/schemas";

const confirmation =
  "Cererea a fost înregistrată în această demonstrație. Nu a fost trimis niciun email.";

export async function handleInquiry<T>(
  request: Request,
  kind: InquiryKind,
  schema: z.ZodType<T>,
  refine?: (value: T) => string | null | Promise<string | null>,
) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > 20_000) {
    return NextResponse.json(
      { ok: false, message: "Mesajul este prea mare." },
      { status: 413 },
    );
  }

  if (!rateLimit(`${clientIp(request)}:${kind}`)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Prea multe cereri într-un interval scurt. Încercați din nou peste câteva minute.",
      },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const problem = refine ? await refine(parsed.data) : null;
  if (problem) {
    return NextResponse.json({ ok: false, message: problem }, { status: 400 });
  }

  try {
    const reference = await persistInquiry(kind, parsed.data);
    return NextResponse.json({ ok: true, reference, message: confirmation });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Cererea nu a putut fi salvată. Încercați din nou peste câteva minute.",
      },
      { status: 500 },
    );
  }
}
