"use client";

import { useEffect } from "react";

const RSC_HEADERS = [
  "rsc",
  "RSC",
  "next-router-state-tree",
  "Next-Router-State-Tree",
  "next-router-prefetch",
  "Next-Router-Prefetch",
  "next-router-segment-prefetch",
  "Next-Router-Segment-Prefetch",
  "next-url",
  "Next-Url",
] as const;

function shouldStrip(url: string) {
  try {
    const u = new URL(url, window.location.origin);
    return (
      u.origin === window.location.origin &&
      (u.pathname.includes("__next") ||
        u.searchParams.has("_rsc") ||
        /\.(txt|html)$/.test(u.pathname))
    );
  } catch {
    return false;
  }
}

/** Strip RSC headers so nested static demos don't 404 under the parent Next app. */
export function RscStaticFetchFix() {
  useEffect(() => {
    const original = window.fetch.bind(window);
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;
      if (!shouldStrip(url)) return original(input, init);
      if (input instanceof Request) {
        const headers = new Headers(input.headers);
        for (const name of RSC_HEADERS) headers.delete(name);
        return original(new Request(input, { headers }), init);
      }
      const headers = new Headers(init?.headers);
      for (const name of RSC_HEADERS) headers.delete(name);
      return original(input, { ...init, headers });
    };
    return () => {
      window.fetch = original;
    };
  }, []);
  return null;
}
