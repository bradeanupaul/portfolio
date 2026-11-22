import type { Metadata } from "next";
import { faq } from "@/data/faq";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri despre vizionări, preț, onorariu și zonele în care lucrează Aurelia Estates.",
};

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Clarificări"
      title="Întrebări frecvente"
      lede="Câteva răspunsuri pe care le dăm des, înainte de o vizionare sau de o reprezentare. Textele descriu felul în care ar lucra o casă ca aceasta. Site-ul rămâne o demonstrație."
    >
      <Reveal variant="fade">
        <FaqAccordion items={faq} />
      </Reveal>
    </PageShell>
  );
}
