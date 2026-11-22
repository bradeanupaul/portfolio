export type InquiryResult = {
  ok: boolean;
  reference?: string;
  message?: string;
  errors?: Record<string, string>;
};

export async function postInquiry(path: string, payload: unknown): Promise<InquiryResult> {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => null)) as {
      ok?: boolean;
      reference?: string;
      message?: string;
      errors?: Record<string, string | string[]>;
    } | null;

    const errors: Record<string, string> = {};
    if (data?.errors) {
      for (const [key, value] of Object.entries(data.errors)) {
        errors[key] = Array.isArray(value) ? (value[0] ?? "") : value;
      }
    }

    return {
      ok: Boolean(data?.ok && response.ok),
      reference: data?.reference,
      message: data?.message,
      errors,
    };
  } catch {
    return {
      ok: false,
      message: "Conexiunea a eșuat. Cererea nu a fost salvată și nu a plecat niciun email.",
    };
  }
}
