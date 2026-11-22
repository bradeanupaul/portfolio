import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMOS = new Set([
  "bella-notte",
  "veltra",
  "vanta-ink",
  "aurelia-estates",
  "elan-skin",
]);

/**
 * Static demo exports live as public/<demo>/.../*.html, but the App Router
 * inside each demo navigates/prefetches extensionless paths. Without this
 * rewrite those requests 404 and PageSpeed flags console errors (Best Practices 88).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0 || !DEMOS.has(parts[0]!)) {
    return NextResponse.next();
  }

  const leaf = parts[parts.length - 1] ?? "";
  // Real assets keep their extension (.js, .css, .webp, .txt, __next.*.txt, …)
  if (leaf.includes(".")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  if (parts.length === 1) {
    url.pathname = `/${parts[0]}/index.html`;
  } else {
    url.pathname = `${pathname.replace(/\/$/, "")}.html`;
  }
  return NextResponse.rewrite(url);
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
