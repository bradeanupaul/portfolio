/**
 * Central link config for demos.
 * Development: local ports from `npm run dev:all`.
 * Production: public demo hosts (subdomains on paulbradeanu.com).
 */
export const localDemoPorts: Record<string, number> = {
  "bella-notte": 3001,
  veltra: 3002,
  "vanta-ink": 3003,
  "aurelia-estates": 3004,
  "elan-skin": 3005,
};

/** Folder name in the monorepo → used for docs / deploy. */
export const demoRootDirs: Record<string, string> = {
  "bella-notte": "bellanotte",
  veltra: "veltra",
  "vanta-ink": "vantaink",
  "aurelia-estates": "aureliaestates",
  "elan-skin": "elanskin",
};

/**
 * Public demo URLs. Override any entry with
 * NEXT_PUBLIC_DEMO_URL_<SLUG> (slug uppercased, `-` → `_`),
 * e.g. NEXT_PUBLIC_DEMO_URL_BELLA_NOTTE=https://…
 */
export const productionDemoUrls: Record<string, string> = {
  "bella-notte": "https://bella-notte.paulbradeanu.com",
  veltra: "https://veltra.paulbradeanu.com",
  "vanta-ink": "https://vanta-ink.paulbradeanu.com",
  "aurelia-estates": "https://aurelia-estates.paulbradeanu.com",
  "elan-skin": "https://elan-skin.paulbradeanu.com",
};

function envDemoUrl(slug: string): string | undefined {
  const key = `NEXT_PUBLIC_DEMO_URL_${slug.replace(/-/g, "_").toUpperCase()}`;
  const value = process.env[key]?.trim();
  return value || undefined;
}

export function resolveProjectLiveUrl(
  slug: string,
  configuredUrl: string | null,
): { href: string | null; label: string; external: boolean } {
  if (configuredUrl) {
    return { href: configuredUrl, label: "Vezi site-ul", external: true };
  }

  const isDev = process.env.NODE_ENV === "development";
  const port = localDemoPorts[slug];

  if (isDev && port) {
    return {
      href: `http://localhost:${port}`,
      label: "Vezi site-ul",
      external: true,
    };
  }

  const production = envDemoUrl(slug) ?? productionDemoUrls[slug];
  if (production) {
    return { href: production, label: "Vezi site-ul", external: true };
  }

  return {
    href: null,
    label: "Demo disponibil local",
    external: false,
  };
}
