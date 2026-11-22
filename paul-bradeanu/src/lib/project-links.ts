/**
 * Central link config for demos.
 * Development: local ports from `npm run dev:all`.
 * Production: same-domain paths (paulbradeanu.com/bella-notte), proxied by portfolio rewrites.
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

/** Public path on paulbradeanu.com (no subdomains). */
export const productionDemoPaths: Record<string, string> = {
  "bella-notte": "/bella-notte",
  veltra: "/veltra",
  "vanta-ink": "/vanta-ink",
  "aurelia-estates": "/aurelia-estates",
  "elan-skin": "/elan-skin",
};

/** Env origin for portfolio rewrites, e.g. https://bellanotte-xxx.vercel.app */
export const demoOriginEnvKeys: Record<string, string> = {
  "bella-notte": "DEMO_ORIGIN_BELLA_NOTTE",
  veltra: "DEMO_ORIGIN_VELTRA",
  "vanta-ink": "DEMO_ORIGIN_VANTA_INK",
  "aurelia-estates": "DEMO_ORIGIN_AURELIA_ESTATES",
  "elan-skin": "DEMO_ORIGIN_ELAN_SKIN",
};

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

  const path = productionDemoPaths[slug];
  if (path) {
    return { href: path, label: "Vezi site-ul", external: true };
  }

  return {
    href: null,
    label: "Demo disponibil local",
    external: false,
  };
}
