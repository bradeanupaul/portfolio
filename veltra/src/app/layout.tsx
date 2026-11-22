import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "lenis/dist/lenis.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "VELTRA Alpine Hideaway & Spa",
    template: "%s · VELTRA",
  },
  description:
    "Refugiu montan premium în Valea Cerbului Alb. Camere elegante, SPA, restaurant ARBOR și experiențe în natură. Proiect demonstrativ.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "VELTRA Alpine Hideaway & Spa",
    description:
      "O experiență completă în inima naturii. Cazare premium, relaxare autentică și experiențe memorabile.",
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/images/exterior/hero-golden-hour.webp" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-hero-beige text-ink">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
