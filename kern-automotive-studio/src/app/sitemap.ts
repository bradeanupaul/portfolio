import type { MetadataRoute } from "next";
import { journalArticles } from "@/data/journal";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = [
    "",
    "/servicii",
    "/pachete",
    "/configurator",
    "/proiecte",
    "/despre",
    "/proces",
    "/programare",
    "/intrebari-frecvente",
    "/jurnal",
    "/contact",
    "/confidentialitate",
    "/termeni",
    "/cookie-uri",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/servicii/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${base}/proiecte/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...journalArticles.map((article) => ({
      url: `${base}/jurnal/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
