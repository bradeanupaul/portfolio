import type { Metadata, Viewport } from "next";
import { Anton, IBM_Plex_Mono, Manrope } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { RscStaticFetchFix } from "@/components/RscStaticFetchFix";
import { site } from "@/data/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s · ${site.brandName}`,
    default: `${site.brandName} · ${site.tagline}`,
  },
  description: site.demoDisclaimer,
  openGraph: {
    title: site.brandName,
    description: site.tagline,
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/brand/opengraph.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.brandName,
    description: site.tagline,
    images: ["/brand/opengraph.webp"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/vanta-symbol.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/brand/favicon.svg"],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${anton.variable} ${manrope.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <RscStaticFetchFix />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}