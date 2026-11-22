import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { collections } from "@/lib/collections";
import { ingredients } from "@/lib/ingredients";
import { articles } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://elanskin.demo";
  const staticPaths = [
    "",
    "/magazin",
    "/colectii",
    "/despre-noi",
    "/ingrediente",
    "/rutina-mea",
    "/jurnal",
    "/favorite",
    "/cos",
    "/checkout",
    "/cont",
    "/contact",
    "/intrebari-frecvente",
    "/livrare-si-retur",
    "/politica-de-confidentialitate",
    "/termeni-si-conditii",
    "/politica-cookies",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...products.map((product) => ({ url: `${base}/produs/${product.slug}` })),
    ...collections.map((collection) => ({ url: `${base}/colectii/${collection.slug}` })),
    ...ingredients.map((ingredient) => ({ url: `${base}/ingrediente/${ingredient.slug}` })),
    ...articles.map((article) => ({ url: `${base}/jurnal/${article.slug}` })),
  ];
}
