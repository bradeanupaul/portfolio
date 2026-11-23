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
 */
export const demoAudits: Record<string, ProjectAudit> = {
  "bella-notte": {
    slug: "bella-notte",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 79,
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
      performance: 79,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: {
      mobile:
        "https://pagespeed.web.dev/analysis/https-www-paulbradeanu-com-bella-notte/eg9xp2yz8t?form_factor=mobile",
      desktop: null,
    },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  veltra: {
    slug: "veltra",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 52,
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
      performance: 52,
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
      performance: 89,
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
      performance: 89,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: {
      mobile:
        "https://pagespeed.web.dev/analysis/https-www-paulbradeanu-com-vanta-ink/ok2a7vknya?form_factor=mobile",
      desktop: null,
    },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "aurelia-estates": {
    slug: "aurelia-estates",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 63,
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
      performance: 99,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    reportUrl: {
      mobile: null,
      desktop:
        "https://pagespeed.web.dev/analysis/https-www-paulbradeanu-com-aurelia-estates/pjh6tsg9gq?form_factor=desktop",
    },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "elan-skin": {
    slug: "elan-skin",
    label: "PageSpeed Insights",
    attribution,
    mobile: {
      performance: 73,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 100,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 73,
      accessibility: 96,
      bestPractices: 96,
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
