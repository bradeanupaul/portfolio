import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { works } from "@/data/works";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const staticPaths = [
  "",
  "/portofoliu",
  "/artisti",
  "/servicii",
  "/proces",
  "/programare",
  "/despre",
  "/intrebari-frecvente",
  "/contact",
  "/confidentialitate",
  "/termeni",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const workEntries = works.map((work) => ({
    url: `${baseUrl}/portofoliu/${work.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const artistEntries = artists.map((artist) => ({
    url: `${baseUrl}/artisti/${artist.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...workEntries, ...artistEntries];
}
