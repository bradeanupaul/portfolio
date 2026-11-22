export const DEMO_API_NOTICE =
  "Cerere demonstrativă înregistrată local. Nu s-a trimis niciun email și nu există confirmare operațională reală.";

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function demoJson<T extends Record<string, unknown>>(
  body: T,
  init?: ResponseInit,
): Response {
  return Response.json(
    {
      ...body,
      demo: true,
      notice: DEMO_API_NOTICE,
    },
    init,
  );
}