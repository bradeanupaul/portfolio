"use server";

import { contactSchema, newsletterSchema } from "@/lib/validators";

export type FormResult = { ok: true; message: string } | { ok: false; message: string };

export async function sendContact(input: unknown): Promise<FormResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Verifică formularul." };
  }
  return {
    ok: true,
    message: "Mesajul a fost primit în această demonstrație. Nu pleacă nicăieri și nu primești un răspuns real.",
  };
}

export async function subscribeNewsletter(input: unknown): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Verifică adresa de email." };
  }
  return {
    ok: true,
    message: "Adresa rămâne doar în acest gest. Nu există o listă reală de corespondență.",
  };
}
