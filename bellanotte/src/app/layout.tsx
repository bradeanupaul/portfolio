import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { SkipLink } from "@/components/layout/SkipLink";
import { PageTransition } from "@/components/motion/PageTransition";
import { IntroProvider } from "@/components/motion/IntroContext";
import { RscStaticFetchFix } from "@/components/RscStaticFetchFix";
import { SiteLoader } from "@/components/motion/SiteLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const sansFont = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  // Body font can swap in — keep preloads for display only (LCP).
  preload: false,
});

const scriptFont = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/branding/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/branding/logo-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, atmosferă de seară la masă`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

const assetBase = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${displayFont.variable} ${sansFont.variable} ${scriptFont.variable} h-full`}
    >
      <head>
        {/* Only the LCP hero — logo preloads steal bandwidth on mobile PSI. */}
        <link
          rel="preload"
          as="image"
          href={`${assetBase}/images/hero/pasta-wide.webp`}
          fetchPriority="high"
        />
      </head>
      <body className="bn-grain flex min-h-full flex-col bg-bn-bg font-sans text-bn-text antialiased">
        <RscStaticFetchFix />
        <IntroProvider>
          <JsonLd />
          <SkipLink />
          <SiteLoader />
          <ScrollManager />
          <ScrollProgress />
          <Header />
          <main id="continut-principal" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
          <MobileStickyCta />
        </IntroProvider>
      </body>
    </html>
  );
}