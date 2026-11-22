import type { Metadata } from "next";

export function pageMeta(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "ro_RO",
      type: "website",
      images: [{ url: "/assets/og.webp", width: 1024, height: 1024, alt: "ÉLAN SKIN" }],
    },
  };
}
