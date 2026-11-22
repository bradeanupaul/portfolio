import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal, RevealHero } from "@/components/motion/Reveal";
import { faqCategories, faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente | VELTRA Alpine Hideaway",
  description: "Răspunsuri despre cazare, rezervări și servicii în proiectul demonstrativ VELTRA.",
};

export default function IntrebariFrecventePage() {
  return (
    <>
      <Section tone="ivory" className="pt-24">
        <Container>
          <RevealHero>
            <SectionHeading
              eyebrow="Ajutor"
              title="Întrebări frecvente"
              description="Informații pentru vizitatorii site ului demo. Folosiți butoanele pentru a deschide fiecare răspuns."
            />
          </RevealHero>
        </Container>
      </Section>

      <Section tone="mist" className="pt-0">
        <Container className="space-y-14">
          {faqCategories.map((cat, i) => {
            const items = faqItems.filter((item) => item.category === cat.key);
            return (
              <Reveal key={cat.key} delay={Math.min(i * 0.05, 0.2)}>
                <section aria-labelledby={`faq-${cat.key}`}>
                  <h2 id={`faq-${cat.key}`} className="mb-6 font-serif text-2xl text-pine">
                    {cat.label}
                  </h2>
                  <FaqAccordion items={items} />
                </section>
              </Reveal>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
