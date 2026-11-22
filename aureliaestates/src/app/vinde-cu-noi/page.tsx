import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { SellerForm } from "@/components/forms/SellerForm";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { RevealMediaMask } from "@/components/motion/RevealMediaMask";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Vinde cu noi",
  description: site.sellerCta.text,
};

const steps = [
  {
    title: "Conversația",
    text: "Ne scrieți despre adresă, despre lumină și despre ce ați vrea să se întâmple. Răspunsul, într-o casă reală, ar veni de la un om, nu de la un automat.",
  },
  {
    title: "Vizita",
    text: "Vedem casa înainte să vorbim despre promovare. Dacă nu ne potrivim, o spunem. Nu publicăm orice adresă ca să creștem lista.",
  },
  {
    title: "Prezentarea",
    text: "Stabilim prețul, onorariul și felul în care se povestește locuința. Condițiile se scriu înainte de prima vizionare.",
  },
  {
    title: "Vizionările",
    text: "Puține, cu programare, însoțite de același consultant. Casa nu este deschisă unui șir de curioși.",
  },
];

export default function SellPage() {
  return (
    <PageShell
      eyebrow="Pentru proprietari"
      title={site.sellerCta.title}
      lede={site.sellerCta.text}
      tone="dark"
      bleed
    >
      <section className="bg-white py-16 md:py-24">
        <Container>
          <RevealMediaMask className="relative mb-14 aspect-[3/2] max-h-[420px] overflow-hidden rounded-[18px] bg-ice md:aspect-[16/7]">
            <Image
              src={site.sellerCta.image}
              alt="Reședință văzută la ora albastră, cu ferestre luminate"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </RevealMediaMask>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <RevealHeading as="h2" className="max-w-3xl text-4xl text-ink md:text-6xl">
              Patru pași, fără grabă.
            </RevealHeading>
            <Button href="#formular">Completează formularul</Button>
          </div>
          <ol className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06}>
                  <p className="section-index">0{index + 1}</p>
                  <h3 className="mt-3 text-3xl text-ink">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-slate">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="formular" className="scroll-mt-28 bg-ice py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="section-index">Formular</p>
            <h2 className="mt-4 text-4xl text-ink md:text-5xl">Spuneți-ne despre adresă.</h2>
            <p className="mt-5 leading-relaxed text-slate">
              Câteva fraze sunt de ajuns: zona, tipul, suprafața dacă o știți și ce ați vrea să se
              întâmple. Cererea rămâne în fișierul demonstrației.
            </p>
          </Reveal>
          <div className="glass-panel bg-white p-6 sm:p-8 lg:col-span-7 lg:col-start-6">
            <SellerForm />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
