import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Reveal } from "@/components/motion/Reveal";
import { PortfolioGallery } from "@/components/gallery/PortfolioGallery";
import { works } from "@/data/works";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Galerie editorială VANTA INK: filtre pe stil, artist, amplasare și scară, cu detalii despre fiecare piesă demonstrativă.",
  openGraph: {
    title: `Portofoliu · ${site.brandName}`,
    description:
      "Lucrări selectate, note de proces și compoziții care respectă proporția imaginilor.",
  },
};

const totalWorks = works.length;

export default function PortofoliuPage() {
  return (
    <div className="bg-bg py-12 text-text md:py-16">
      <Container className="space-y-8 md:space-y-10">
        <header className="space-y-4 border-b border-line pb-8 md:pb-10">
          <MonoIndex index="02" label="PORTOFOLIU" />
          <Reveal>
            <h1 className="display-hero max-w-[14ch] font-display uppercase leading-[1.08] text-text">
              FIECARE LINIE SPUNE CEVA
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-measure text-lg text-text-muted">
              {totalWorks} piese în catalogul demonstrativ. Proporții păstrate, filtre compacte
              și acces rapid la concept și execuție.
            </p>
          </Reveal>
        </header>

        <Suspense
          fallback={
            <p className="font-mono-ui text-sm text-text-subtle" role="status">
              Se încarcă galeria...
            </p>
          }
        >
          <PortfolioGallery />
        </Suspense>
      </Container>
    </div>
  );
}