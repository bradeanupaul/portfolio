import type { Metadata } from "next";
import { FavoritesList } from "@/components/home/FavoritesList";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Favorite",
  description: "Proprietățile păstrate în acest browser, la Aurelia Estates.",
};

export default function FavoritesPage() {
  return (
    <PageShell
      eyebrow="Salvate"
      title="Favorite"
      lede="Adresele pe care le păstrați cu inima rămân în acest browser, până când le scoateți din listă."
    >
      <Reveal variant="fade">
        <FavoritesList />
      </Reveal>
    </PageShell>
  );
}
