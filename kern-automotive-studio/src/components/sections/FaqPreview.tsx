import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { faqs } from "@/data/faqs";

export function FaqPreview() {
  const preview = faqs.filter((f) => f.category === "general").slice(0, 4);

  return (
    <section className="band-white section-pad">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionEyebrow>Întrebări</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
              Clarificări înainte de programare
            </h2>
            <p className="mt-4 text-base leading-7 text-slate">
              Răspunsuri scurte pe PPF, ceramică, polish și fluxul demo. Lista completă e pe pagina
              de întrebări frecvente.
            </p>
            <Link
              href="/intrebari-frecvente"
              className="mt-8 inline-flex text-sm font-semibold text-copper hover:text-carbon"
            >
              Toate întrebările →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={preview} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
