import { describe, expect, it } from "vitest";
import { categories, getProductGallery, products } from "@/lib/catalog";
import { collections } from "@/lib/collections";
import { faqs } from "@/lib/faqs";
import { ingredients } from "@/lib/ingredients";
import { articles } from "@/lib/journal";
import { formatPrice, shippingFor } from "@/lib/money";
import { cartCrossSells, curatedPicks, productPairs } from "@/lib/recommendations";
import { buildRoutine } from "@/lib/routine";
import { checkoutDetailsSchema } from "@/lib/validators";

const dash = /[-–—]/;

function walk(value: unknown, path: string, hits: string[]) {
  if (typeof value === "string") {
    if (dash.test(value)) hits.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, hits));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (["slug", "image", "images", "productSlugs", "latin"].includes(key)) continue;
      walk(item, `${path}.${key}`, hits);
    }
  }
}

describe("catalog", () => {
  it("includes at least 16 unique products", () => {
    expect(products.length).toBeGreaterThanOrEqual(16);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
  });

  it("keeps every product inside a known category", () => {
    const slugs = new Set(categories.map((category) => category.slug));
    for (const product of products) {
      expect(slugs.has(product.category)).toBe(true);
    }
  });

  it("resolves collection products", () => {
    const known = new Set(products.map((product) => product.slug));
    for (const collection of collections) {
      expect(collection.productSlugs.length).toBeGreaterThan(0);
      for (const slug of collection.productSlugs) expect(known.has(slug)).toBe(true);
    }
  });

  it("keeps gallery frames on the same product id", () => {
    for (const product of products) {
      const gallery = getProductGallery(product);
      expect(gallery.length).toBeGreaterThanOrEqual(4);
      for (const frame of gallery) {
        expect(frame.productId).toBe(product.slug);
        expect(frame.src).toContain(`/assets/products/${product.slug}/`);
      }
      const ids = gallery.map((frame) => frame.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("copy", () => {
  it("avoids hyphen and dash punctuation in visible content", () => {
    const hits: string[] = [];
    walk(products, "products", hits);
    walk(categories, "categories", hits);
    walk(collections, "collections", hits);
    walk(ingredients, "ingredients", hits);
    walk(articles, "articles", hits);
    walk(faqs, "faqs", hits);
    expect(hits).toEqual([]);
  });
});

describe("money", () => {
  it("formats lei without a dash", () => {
    expect(formatPrice(189)).not.toMatch(dash);
    expect(formatPrice(189)).toContain("189");
  });

  it("ships free from 250 lei", () => {
    expect(shippingFor(0)).toBe(0);
    expect(shippingFor(249)).toBe(19);
    expect(shippingFor(250)).toBe(0);
  });
});

describe("routine", () => {
  it("always ends the morning with sunscreen", () => {
    const plan = buildRoutine({ feel: "uscata", focus: "lumina", pace: "complet" });
    expect(plan.morning.at(-1)?.product.slug).toBe("daily-veil-spf-50");
    expect(plan.evening.length).toBeGreaterThan(0);
    expect(plan.summary.length).toBeGreaterThan(10);
  });

  it("keeps the short morning to three steps", () => {
    const plan = buildRoutine({ feel: "grasa", focus: "echilibru", pace: "scurt" });
    expect(plan.morning).toHaveLength(3);
    expect(plan.morning.at(-1)?.product.slug).toBe("daily-veil-spf-50");
    expect(plan.evening.some((slot) => slot.product.slug === "quiet-pore")).toBe(true);
  });
});

describe("recommendations", () => {
  it("ranks cleanser complements in a stable order", () => {
    const picks = cartCrossSells(["cloud-cleanse"], 4);
    expect(picks.map((item) => item.product.slug)).toEqual([
      "daily-veil-spf-50",
      "dew-theory",
      "glow-drops",
      "night-reset",
    ]);
    expect(picks.every((item) => item.product.slug !== "cloud-cleanse")).toBe(true);
    expect(picks.every((item) => item.product.step !== "curatare")).toBe(true);
    expect(picks.map((item) => item.reason)).toEqual([
      "Închide dimineața, lângă produsele alese.",
      "Sigilează apa și lasă tenul suplu.",
      "Urmează firesc după curățare.",
      "Urmează firesc după curățare.",
    ]);
  });

  it("repeats the same cart twice", () => {
    const first = cartCrossSells(["glow-drops", "cloud-cleanse"], 6);
    const second = cartCrossSells(["cloud-cleanse", "glow-drops"], 6);
    expect(second).toEqual(first);
    expect(first).toHaveLength(6);
  });

  it("keeps pairs inside three to six and outside the source product", () => {
    const pairs = productPairs("glow-drops", 3);
    expect(pairs).toHaveLength(3);
    expect(pairs.map((item) => item.product.slug)).toEqual([
      "daily-veil-spf-50",
      "dew-theory",
      "afterglow-oil",
    ]);
    expect(pairs.some((item) => item.product.slug === "glow-drops")).toBe(false);
    expect(cartCrossSells(["cloud-cleanse"], 1)).toHaveLength(3);
    expect(cartCrossSells(["cloud-cleanse"], 40)).toHaveLength(6);
    expect(cartCrossSells(products.map((product) => product.slug))).toEqual([]);
  });

  it("starts an empty shelf with bestsellers", () => {
    expect(curatedPicks(4).map((item) => item.product.slug)).toEqual([
      "cloud-cleanse",
      "daily-veil-spf-50",
      "dew-theory",
      "glow-drops",
    ]);
    expect(cartCrossSells([], 4).every((item) => item.reason.length > 8)).toBe(true);
  });

  it("keeps recommendation copy free of dashes", () => {
    const hits: string[] = [];
    for (const product of products) {
      for (const item of productPairs(product.slug, 4)) {
        if (dash.test(item.reason)) hits.push(item.reason);
      }
    }
    for (const item of cartCrossSells([], 6)) {
      if (dash.test(item.reason)) hits.push(item.reason);
    }
    for (const item of curatedPicks(6)) {
      if (dash.test(item.reason)) hits.push(item.reason);
    }
    expect(hits).toEqual([]);
  });
});

describe("checkout schema", () => {
  it("does not ask for card data", () => {
    expect("cardNumber" in checkoutDetailsSchema.shape).toBe(false);
    expect("cvv" in checkoutDetailsSchema.shape).toBe(false);
    expect("pan" in checkoutDetailsSchema.shape).toBe(false);
  });

  it("accepts a complete ramburs order and strips a card field", () => {
    const parsed = checkoutDetailsSchema.safeParse({
      fullName: "Maria Ionescu",
      email: "maria@exemplu.ro",
      phone: "0722 000 000",
      county: "București",
      city: "București",
      address: "Strada Plantelor 12",
      postalCode: "010101",
      notes: "",
      payment: "ramburs",
      cardNumber: "4242424242424242",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect("cardNumber" in parsed.data).toBe(false);
    }
  });

  it("rejects a short name", () => {
    const parsed = checkoutDetailsSchema.safeParse({
      fullName: "A",
      email: "nu",
      phone: "12",
      county: "",
      city: "",
      address: "",
      postalCode: "12",
      notes: "",
      payment: "card",
    });
    expect(parsed.success).toBe(false);
  });
});
