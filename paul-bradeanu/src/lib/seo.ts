import type { Metadata } from "next";
import { siteConfig } from "./site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/branding/og-default.svg",
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} · ${siteConfig.role}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.formalName,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    url: siteConfig.url,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cluj-Napoca",
      addressCountry: "RO",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ro-RO",
  };
}

/** Single JSON-LD document — avoid top-level arrays (break some parsers). */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd()],
  };
}
