import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BrandLoader } from "@/components/motion/BrandLoader";
import { IntroProvider } from "@/components/motion/IntroContext";
import { PageEnter } from "@/components/motion/PageEnter";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aurelia Estates · Proprietăți selectate",
    template: "%s · Aurelia Estates",
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/branding/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/branding/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Aurelia Estates",
    description: site.description,
    locale: "ro_RO",
    type: "website",
    siteName: site.name,
    images: [{ url: "/branding/og-share.jpg", width: 1200, height: 675, alt: "Aurelia Estates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelia Estates",
    description: site.description,
    images: ["/branding/og-share.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${plusJakarta.variable} ${manrope.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <IntroProvider>
          <a href="#continut" className="skip-link">
            Sari la conținut
          </a>
          <BrandLoader />
          <Header />
          <main id="continut" className="flex-1">
            <PageEnter>{children}</PageEnter>
          </main>
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
