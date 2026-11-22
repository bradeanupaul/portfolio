import type { NextConfig } from "next";

/**
 * Proxies /bella-notte etc. to the separately deployed demo apps (with matching basePath).
 * Set DEMO_ORIGIN_* in Vercel to each demo's *.vercel.app origin (no custom domain needed).
 */
function demoRewrites() {
  const demos: Array<[slug: string, origin: string | undefined]> = [
    ["bella-notte", process.env.DEMO_ORIGIN_BELLA_NOTTE],
    ["veltra", process.env.DEMO_ORIGIN_VELTRA],
    ["vanta-ink", process.env.DEMO_ORIGIN_VANTA_INK],
    ["aurelia-estates", process.env.DEMO_ORIGIN_AURELIA_ESTATES],
    ["elan-skin", process.env.DEMO_ORIGIN_ELAN_SKIN],
  ];

  const rules: Array<{ source: string; destination: string }> = [];
  for (const [slug, origin] of demos) {
    if (!origin) continue;
    const base = origin.replace(/\/$/, "");
    rules.push(
      { source: `/${slug}`, destination: `${base}/${slug}` },
      { source: `/${slug}/:path*`, destination: `${base}/${slug}/:path*` },
    );
  }
  return rules;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return demoRewrites();
  },
};

export default nextConfig;
