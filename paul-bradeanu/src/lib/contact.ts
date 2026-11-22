import type { ContactPayload } from "./validation";
import { siteConfig } from "./site";

export type ContactDeliveryResult =
  | { ok: true; mode: "resend" | "mailto-fallback"; message: string }
  | { ok: false; mode: "unconfigured" | "error"; message: string };

function formatBody(payload: ContactPayload) {
  if (payload.intent === "project") {
    return [
      `Intent: Proiect / Colaborare`,
      `Nume: ${payload.name}`,
      `Email: ${payload.email}`,
      `Tip proiect: ${payload.workType}`,
      `Budget: ${payload.budget || "nespecificat"}`,
      `Timeline: ${payload.timeline || "nespecificat"}`,
      "",
      "Brief:",
      payload.brief,
    ].join("\n");
  }

  return [
    `Intent: Oportunitate profesională`,
    `Nume: ${payload.name}`,
    `Email: ${payload.email}`,
    `Companie: ${payload.company}`,
    `Rol: ${payload.role}`,
    `Link: ${payload.link || "nespecificat"}`,
    "",
    "Mesaj:",
    payload.message,
  ].join("\n");
}

export function buildMailto(payload: ContactPayload) {
  const subject =
    payload.intent === "project"
      ? `Proiect nou de la ${payload.name}`
      : `Oportunitate de la ${payload.name} (${payload.company})`;

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatBody(payload))}`;
}

export async function deliverContact(
  payload: ContactPayload,
): Promise<ContactDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      ok: false,
      mode: "unconfigured",
      message:
        "Trimiterea automată nu este configurată încă. Poți folosi emailul direct sau butonul mailto.",
    };
  }

  try {
    const subject =
      payload.intent === "project"
        ? `[Portofoliu] Proiect: ${payload.name}`
        : `[Portofoliu] Oportunitate: ${payload.name}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text: formatBody(payload),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", detail);
      return {
        ok: false,
        mode: "error",
        message:
          "Mesajul nu a putut fi trimis acum. Te rugăm să reîncerci sau să folosești emailul direct.",
      };
    }

    return {
      ok: true,
      mode: "resend",
      message: "Mesajul a fost trimis. Îți răspund în curând.",
    };
  } catch (error) {
    console.error("Contact delivery failed:", error);
    return {
      ok: false,
      mode: "error",
      message:
        "A apărut o eroare la trimitere. Folosește emailul direct dacă problema persistă.",
    };
  }
}
