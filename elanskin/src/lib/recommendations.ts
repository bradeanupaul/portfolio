import { getProduct, products, type Product, type RoutineStep } from "@/lib/catalog";

export type CrossSell = {
  product: Product;
  reason: string;
};

const complements: Record<RoutineStep, RoutineStep[]> = {
  curatare: ["tratament", "hidratare", "protectie"],
  tratament: ["hidratare", "protectie", "finisare"],
  hidratare: ["protectie", "tratament", "finisare"],
  protectie: ["hidratare", "finisare", "tratament"],
  finisare: ["hidratare", "protectie"],
};

const stepReason: Record<RoutineStep, string> = {
  curatare: "Deschide ritualul, înainte de ser.",
  tratament: "Pasul concentrat, după curățare.",
  hidratare: "Sigilează apa și lasă tenul suplu.",
  protectie: "Închide dimineața, în fiecare zi.",
  finisare: "Un strat fin, când urmează machiaj.",
};

function clampLimit(limit: number) {
  if (!Number.isFinite(limit)) return 4;
  return Math.min(6, Math.max(3, Math.round(limit)));
}

function score(candidate: Product, anchors: Product[]) {
  let value = 0;
  for (const anchor of anchors) {
    if (complements[anchor.step].includes(candidate.step)) value += 5;
    if (candidate.focuses.some((focus) => anchor.focuses.includes(focus))) value += 2;
    if (candidate.feels.some((feel) => anchor.feels.includes(feel))) value += 1;
    if (candidate.category !== anchor.category) value += 1;
  }
  if (candidate.bestseller) value += 1;
  return value;
}

function reasonFor(candidate: Product, anchors: Product[]) {
  const complementAnchors = anchors.filter((anchor) => complements[anchor.step].includes(candidate.step));
  if (complementAnchors.length > 0) {
    if (candidate.step === "protectie") return "Închide dimineața, lângă produsele alese.";
    if (candidate.step === "tratament" && complementAnchors.some((anchor) => anchor.step === "curatare")) {
      return "Urmează firesc după curățare.";
    }
    if (candidate.step === "hidratare" && complementAnchors.some((anchor) => anchor.step === "tratament")) {
      return "Se așază după ser, înainte de zi.";
    }
    return stepReason[candidate.step];
  }
  if (anchors.some((anchor) => candidate.focuses.some((focus) => anchor.focuses.includes(focus)))) {
    return "Ține același registru de senzație.";
  }
  return "Un pas în plus, ales lângă coș.";
}

function rank(pool: Product[], anchors: Product[], limit: number): CrossSell[] {
  const size = clampLimit(limit);
  const ranked = [...pool].sort((a, b) => {
    const delta = score(b, anchors) - score(a, anchors);
    if (delta !== 0) return delta;
    return a.slug.localeCompare(b.slug, "ro");
  });
  return ranked.slice(0, size).map((product) => ({
    product,
    reason: anchors.length ? reasonFor(product, anchors) : "Un început liniștit pentru raft.",
  }));
}

export function cartCrossSells(cartSlugs: string[], limit = 4): CrossSell[] {
  const unique = [...new Set(cartSlugs.filter(Boolean))];
  const inCart = new Set(unique);
  const anchors = unique
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
  const pool = products.filter((product) => !inCart.has(product.slug));
  return rank(pool, anchors, limit);
}

export function productPairs(slug: string, limit = 3): CrossSell[] {
  return cartCrossSells([slug], limit);
}

export function curatedPicks(limit = 4): CrossSell[] {
  const size = clampLimit(limit);
  const ranked = [...products].sort((a, b) => {
    if (Boolean(a.bestseller) !== Boolean(b.bestseller)) return a.bestseller ? -1 : 1;
    return a.slug.localeCompare(b.slug, "ro");
  });
  return ranked.slice(0, size).map((product) => ({
    product,
    reason: product.bestseller ? "Ales des în acest atelier." : "Un gest simplu de pus pe raft.",
  }));
}
