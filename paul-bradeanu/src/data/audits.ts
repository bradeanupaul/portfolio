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

/**
 * Measured Lighthouse lab scores (local CLI against production URLs).
 * Replaced after each optimization pass — keep mobile + desktop in sync.
 */
export const demoAudits: Record<string, ProjectAudit> = {
  "bella-notte": {
    slug: "bella-notte",
    label: "PageSpeed Insights",
    attribution:
      "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.",
    mobile: {
      performance: 72,
      accessibility: 100,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 90,
      accessibility: 100,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 72,
      accessibility: 100,
      bestPractices: 96,
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
    attribution:
      "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.",
    mobile: {
      performance: 88,
      accessibility: 97,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 94,
      accessibility: 97,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 88,
      accessibility: 97,
      bestPractices: 96,
      seo: 100,
    },
    reportUrl: { mobile: null, desktop: null },
    measuredAt: "2026-11-23",
    source: "lighthouse",
  },
  "vanta-ink": {
    slug: "vanta-ink",
    label: "PageSpeed Insights",
    attribution:
      "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.",
    mobile: {
      performance: 92,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 95,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 92,
      accessibility: 96,
      bestPractices: 96,
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
    attribution:
      "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.",
    mobile: {
      performance: 70,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 49,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 49,
      accessibility: 96,
      bestPractices: 96,
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
    attribution:
      "PageSpeed Insights e serviciul Google care măsoară performanța, accesibilitatea, bunele practici și SEO în condiții de laborator.",
    mobile: {
      performance: 85,
      accessibility: 97,
      bestPractices: 96,
      seo: 100,
    },
    desktop: {
      performance: 92,
      accessibility: 97,
      bestPractices: 96,
      seo: 100,
    },
    scores: {
      performance: 85,
      accessibility: 97,
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
