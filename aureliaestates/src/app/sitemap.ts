import type { MetadataRoute } from "next";
import { agents } from "@/data/agents";
import { collections } from "@/data/collections";
import { properties } from "@/data/properties";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/proprietati",
    "/colectii",
    "/despre-noi",
    "/echipa",
    "/servicii",
    "/vinde-cu-noi",
    "/programeaza-vizionare",
    "/contact",
    "/favorite",
    "/intrebari-frecvente",
    "/confidentialitate",
    "/termeni",
    "/cookie-uri",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyRoutes = properties.map((property) => ({
    url: `${base}/proprietati/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: `${base}/colectii/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const agentRoutes = agents.map((agent) => ({
    url: `${base}/echipa/${agent.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...propertyRoutes, ...collectionRoutes, ...agentRoutes];
}
