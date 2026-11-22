/**
 * Central link config for demos.
 * Development: local ports from `npm run dev:all`.
 * Production: only real public URLs when set via env / override.
 */
export const localDemoPorts: Record<string, number> = {
  "bella-notte": 3001,
  veltra: 3002,
  "vanta-ink": 3003,
  "aurelia-estates": 3004,
  "elan-skin": 3005,
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

  return {
    href: null,
    label: "Demo disponibil local",
    external: false,
  };
}
