import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { CookieNotice } from "@/components/cookie-notice";
import { MiniCart } from "@/components/mini-cart";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreHydrator } from "@/components/store-hydrator";
import "./globals.css";

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elanskin.demo"),
  title: {
    default: "ÉLAN SKIN",
    template: "%s | ÉLAN SKIN",
  },
  description:
    "Îngrijire a pielii cu texturi line, ingrediente alese și un ritual pe care îl ții în ritmul tău. Demonstrație fictivă de portofoliu.",
  applicationName: "ÉLAN SKIN",
  icons: { icon: "/assets/brand/mark.png" },
  openGraph: {
    siteName: "ÉLAN SKIN",
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/assets/og.jpg", width: 1024, height: 1024, alt: "ÉLAN SKIN" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-aubergine">
        <StoreHydrator />
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Sari la conținut
        </a>
        <SiteHeader />
        <main id="continut" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <MiniCart />
        <CookieNotice />
      </body>
    </html>
  );
}
