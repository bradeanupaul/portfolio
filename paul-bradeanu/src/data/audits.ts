export type DemoAuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type ProjectAudit = {
  slug: string;
  demo: true;
  label: "DEMO / DATE ILUSTRATIVE";
  attribution: "PageSpeed Insights · valori demonstrative";
  scores: DemoAuditScores;
  reportUrl: string | null;
  measuredAt: string | null;
  source: "illustrative";
};

/** Illustrative only. Never present as measured Google results. */
export const demoAudits: Record<string, ProjectAudit> = {
  "bella-notte": {
    slug: "bella-notte",
    demo: true,
    label: "DEMO / DATE ILUSTRATIVE",
    attribution: "PageSpeed Insights · valori demonstrative",
    scores: { performance: 94, accessibility: 98, bestPractices: 96, seo: 97 },
    reportUrl: null,
    measuredAt: null,
    source: "illustrative",
  },
  veltra: {
    slug: "veltra",
    demo: true,
    label: "DEMO / DATE ILUSTRATIVE",
    attribution: "PageSpeed Insights · valori demonstrative",
    scores: { performance: 92, accessibility: 97, bestPractices: 95, seo: 96 },
    reportUrl: null,
    measuredAt: null,
    source: "illustrative",
  },
  "vanta-ink": {
    slug: "vanta-ink",
    demo: true,
    label: "DEMO / DATE ILUSTRATIVE",
    attribution: "PageSpeed Insights · valori demonstrative",
    scores: { performance: 90, accessibility: 96, bestPractices: 94, seo: 95 },
    reportUrl: null,
    measuredAt: null,
    source: "illustrative",
  },
  "aurelia-estates": {
    slug: "aurelia-estates",
    demo: true,
    label: "DEMO / DATE ILUSTRATIVE",
    attribution: "PageSpeed Insights · valori demonstrative",
    scores: { performance: 95, accessibility: 98, bestPractices: 97, seo: 98 },
    reportUrl: null,
    measuredAt: null,
    source: "illustrative",
  },
  "elan-skin": {
    slug: "elan-skin",
    demo: true,
    label: "DEMO / DATE ILUSTRATIVE",
    attribution: "PageSpeed Insights · valori demonstrative",
    scores: { performance: 91, accessibility: 97, bestPractices: 95, seo: 96 },
    reportUrl: null,
    measuredAt: null,
    source: "illustrative",
  },
};

export function getDemoAudit(slug: string) {
  return demoAudits[slug] ?? null;
}
