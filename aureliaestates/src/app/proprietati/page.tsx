import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PropertyCatalog } from "@/components/property/PropertyCatalog";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Proprietăți",
  description:
    "Portofoliul Aurelia Estates: vile, penthouse și apartamente în București, în nordul orașului și în Brașov.",
};

export default function PropertiesPage() {
  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-ice">
        <Container className="py-7 md:py-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Portofoliu</p>
          </Reveal>
          <div className="mt-3 grid items-end gap-4 lg:grid-cols-12">
            <RevealHeading
              as="h1"
              priority
              className="font-display text-[clamp(1.9rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink lg:col-span-7"
            >
              Catalogul demonstrativ Aurelia.
            </RevealHeading>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="max-w-xl text-base leading-relaxed text-slate">
                Adrese în București, în nordul orașului și în Brașov. Filtrați după zonă, tip, buget,
                dormitoare și suprafață. Lista rămâne scurtă, ca fiecare casă să poată fi arătată pe
                îndelete.
              </p>
            </Reveal>
          </div>
        </Container>
      </header>
      <Container className="bg-white py-6 md:py-8">
        <Suspense fallback={<CatalogFallback />}>
          <PropertyCatalog />
        </Suspense>
      </Container>
    </article>
  );
}

function CatalogFallback() {
  return (
    <div aria-busy="true" className="rounded-[18px] bg-cloud px-6 py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure">Portofoliu</p>
      <p className="mt-4 font-display text-3xl text-ink">Se deschide portofoliul.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="aspect-[3/2] animate-pulse rounded-[16px] bg-white motion-reduce:animate-none"
          />
        ))}
      </div>
    </div>
  );
}
