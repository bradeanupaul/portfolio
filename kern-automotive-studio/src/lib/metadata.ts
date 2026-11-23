import type { Metadata } from "next";
import { site } from "@/data/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata({
  title,
  description = site.description,
  path = "/",
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} · ${site.brandName}`
    : `${site.brandName} · ${site.tagline}`;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${site.url}${normalizedPath === "/" ? "" : normalizedPath}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.brandName,
      title: pageTitle,
      description,
      images: [
        {
          url: "/images/og/og-kern.jpg",
          width: 1200,
          height: 630,
          alt: "KERN Automotive Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/images/og/og-kern.jpg"],
    },
    robots: site.isDemo
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
