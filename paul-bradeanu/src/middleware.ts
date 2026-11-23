import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMOS = new Set([
  "bella-notte",
  "veltra",
  "vanta-ink",
  "aurelia-estates",
  "elan-skin",
]);

const RSC_HEADERS = [
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-url",
] as const;

/**
 * Nested static demo exports send RSC prefetch headers. The parent Next app
 * then treats those requests as Flight and 404s the public/ files. Clear the
 * headers (and tell the edge to override them) so Vercel serves the static
 * payloads as plain assets.
 */
function stripRsc(request: NextRequest) {
  const headers = new Headers(request.headers);
  for (const name of RSC_HEADERS) {
    headers.delete(name);
  }
  return headers;
}

function withRscOverride(response: NextResponse) {
  // Instruct the Next edge to replace inbound RSC headers with empty values.
  response.headers.set(
    "x-middleware-override-headers",
    RSC_HEADERS.join(","),
  );
  for (const name of RSC_HEADERS) {
    response.headers.set(`x-middleware-request-${name}`, "");
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0 || !DEMOS.has(parts[0]!)) {
    return NextResponse.next();
  }

  const headers = stripRsc(request);
  const leaf = parts[parts.length - 1] ?? "";

  // Assets with an extension (.js/.css/.webp/.txt/__next.*.txt) stay as-is,
  // but still need RSC headers cleared so they aren't Flight-routed to /404.
  // Rewrite (not next) so the edge re-resolves the static file without Flight.
  if (leaf.includes(".")) {
    const assetUrl = request.nextUrl.clone();
    return withRscOverride(
      NextResponse.rewrite(assetUrl, { request: { headers } }),
    );
  }

  const url = request.nextUrl.clone();
  if (parts.length === 1) {
    url.pathname = `/${parts[0]}/index.html`;
  } else {
    url.pathname = `${pathname.replace(/\/$/, "")}.html`;
  }
  return withRscOverride(NextResponse.rewrite(url, { request: { headers } }));
}

export const config = {
  matcher: [
    "/bella-notte",
    "/bella-notte/:path*",
    "/veltra",
    "/veltra/:path*",
    "/vanta-ink",
    "/vanta-ink/:path*",
    "/aurelia-estates",
    "/aurelia-estates/:path*",
    "/elan-skin",
    "/elan-skin/:path*",
  ],
};
