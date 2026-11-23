export type DemoAuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type ProjectAudit = {
  slug: string;
  label: string;
  attribution: string;
  scores: DemoAuditScores;
  mobile: DemoAuditScores;
  desktop: DemoAuditScores;
  reportUrl: { mobile: string | null; desktop: string | null };
  measuredAt: string;
  source: "pagespeed" | "lighthouse";
};

const attribution =
  "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.";

/**
 * Measured Lighthouse lab scores against production URLs (2026-11-23).
 * Mobile Performance remeasured after LCP / defer-load fixes.
 */
export const demoAudits: Record<string, ProjectAudit> = {
  "bella-notte": {
    slug: "bella-notte",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 95,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    desktop: {
      performance: 99,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    scores: {
      performance: 95,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  veltra: {
    slug: "veltra",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 97,
      accessibility: 93,
      bestPractices: 100,
      seo: 100,
    },
    desktop: {
      performance: 99,
      accessibility: 93,
      bestPractices: 100,
      seo: 100,
    },
    scores: {
      performance: 97,
      accessibility: 93,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "vanta-ink": {
    slug: "vanta-ink",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 96,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    desktop: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    scores: {
      performance: 96,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "aurelia-estates": {
    slug: "aurelia-estates",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 96,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    desktop: {
      performance: 99,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    scores: {
      performance: 96,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "elan-skin": {
    slug: "elan-skin",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 97,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    desktop: {
      performance: 100,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 97,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
};

export function getDemoAudit(slug: string) {
  return demoAudits[slug] ?? null;
}
