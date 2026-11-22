import { Suspense } from "react";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Reveal, RevealHero } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Rezervări",
  description:
    "Rezervă un sejur demonstrativ la VELTRA Alpine Hideaway. Verifică disponibilitatea și prețurile fictive.",
};

export default function RezervariPage() {
  return (
    <Section tone="ivory" className="pt-32">
      <Container>
        <RevealHero>
          <p className="eyebrow">Rezervări</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4rem)]">
            Planifică sejurul tău la VELTRA
          </h1>
          <p className="mt-5 max-w-2xl text-ink/75">
            Sistem demonstrativ de rezervări. Disponibilitatea și prețurile sunt simulate. Nu se procesează plăți
            reale.
          </p>
        </RevealHero>
        <Reveal className="mt-10" delay={0.12}>
          <Suspense fallback={<p>Se încarcă formularul de rezervare…</p>}>
            <BookingWizard />
          </Suspense>
        </Reveal>
      </Container>
    </Section>
  );
}
