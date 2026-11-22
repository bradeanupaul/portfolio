import type { Metadata } from "next";
import { menu, menuCategories } from "@/data/menu";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuPageClient } from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Meniu",
  description:
    "Descoperiți meniul Bella Notte: antipasti, paste artizanale, risotto, pizza napoletană, secondi și dulciuri italiene în Cluj.",
  alternates: {
    canonical: absoluteUrl("/meniu"),
  },
  openGraph: {
    title: `Meniu | ${siteConfig.name}`,
    description:
      "O călătorie prin aromele Italiei. Preparate pregătite zilnic cu ingrediente alese.",
    url: absoluteUrl("/meniu"),
    images: [
      {
        url: absoluteUrl("/images/hero/pasta-truffle.jpg"),
        width: 1200,
        height: 630,
        alt: "Paste cu truf la Bella Notte",
      },
    ],
  },
};

export default function MeniuPage() {
  return (
    <>
      <MenuHero />
      <MenuPageClient
        categories={menuCategories}
        updatedAt={menu.updatedAt}
        allergenLegend={menu.allergenLegend}
      />
    </>
  );
}