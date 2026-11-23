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
 * Demo static exports live under public/<demo>/ and ship their own App Router
 * client. Prefetch sends RSC headers; the parent Next app then intercepts and
 * 404s the static .txt/.html payloads (Best Practices / console errors).
 * Strip those headers so Vercel serves the files from public/ as plain assets.
 */
function withoutRscHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);
  for (const name of RSC_HEADERS) {
    headers.delete(name);
  }
  return headers;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0 || !DEMOS.has(parts[0]!)) {
    return NextResponse.next();
  }

  const headers = withoutRscHeaders(request);
  const leaf = parts[parts.length - 1] ?? "";

  // Real assets keep their extension (.js, .css, .webp, .txt, __next.*.txt, …)
  if (leaf.includes(".")) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  if (parts.length === 1) {
    url.pathname = `/${parts[0]}/index.html`;
  } else {
    url.pathname = `${pathname.replace(/\/$/, "")}.html`;
  }
  return NextResponse.rewrite(url, { request: { headers } });
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
