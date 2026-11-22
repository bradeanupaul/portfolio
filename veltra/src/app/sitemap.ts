import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/camere",
    "/facilitati",
    "/spa",
    "/restaurant",
    "/experiente",
    "/imprejurimi",
    "/galerie",
    "/despre-noi",
    "/rezervari",
    "/contact",
    "/intrebari-frecvente",
    "/politica-de-confidentialitate",
    "/politica-cookies",
    "/termeni-si-conditii",
  ];

  const [rooms, experiences] = await Promise.all([
    prisma.roomType.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.experience.findMany({ select: { slug: true } }),
  ]);

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...rooms.map((room) => ({
      url: `${base}/camere/${room.slug}`,
      lastModified: room.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...experiences.map((exp) => ({
      url: `${base}/experiente/${exp.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
