import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description:
    "Răspunsuri organizate pe categorii pentru proiectul demonstrativ VANTA INK, inclusiv limitările demo.",
};

export default function IntrebariFrecventePage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl space-y-8">
        <MonoIndex index="09" label="ÎNTREBĂRI" />
        <Reveal>
          <h1 className="display-section font-display uppercase text-text">
            ÎNTREBĂRI FRECVENTE
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-measure text-text-muted">{site.demoDisclaimer}</p>
        </Reveal>
        <FaqAccordion />
      </Container>
    </div>
  );
}