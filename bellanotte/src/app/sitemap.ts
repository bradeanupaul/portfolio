import type { MetadataRoute } from "next";
import { getAllEventCategorySlugs } from "@/data/event-categories";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "",
  "/meniu",
  "/despre-noi",
  "/galerie",
  "/evenimente",
  "/rezervari",
  "/rezervari/anulare",
  "/recenzii",
  "/contact",
  "/politica-de-confidentialitate",
  "/termeni-si-conditii",
  "/politica-cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const eventPages = getAllEventCategorySlugs().map((slug) => ({
    url: absoluteUrl(`/evenimente/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...base, ...eventPages];
}
