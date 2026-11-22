import { handleInquiry } from "@/lib/inquiry-handler";
import { sellerSchema } from "@/lib/schemas";

function normalizeSeller(body: unknown) {
  if (!body || typeof body !== "object") return body;
  const record = { ...(body as Record<string, unknown>) };
  if (record.estimatedArea === "" || record.estimatedArea == null) {
    delete record.estimatedArea;
  } else if (typeof record.estimatedArea === "string") {
    const value = Number(record.estimatedArea);
    record.estimatedArea = Number.isFinite(value) ? value : record.estimatedArea;
  }
  return record;
}

export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);
  const normalized = normalizeSeller(raw);
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  const next = new Request(request.url, {
    method: "POST",
    headers,
    body: JSON.stringify(normalized ?? {}),
  });
  return handleInquiry(next, "seller", sellerSchema);
}
