import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal, RevealLine } from "@/components/motion/Reveal";

export function BookingCtaHome() {
  return (
    <Section
      tone="bg"
      id="programare"
      className="border-t border-line bg-bg text-text"
    >
      <Container className="py-16 md:py-20">
        <div className="overflow-hidden border border-line bg-surface">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="flex flex-col justify-center gap-6 p-8 md:p-12 lg:p-14">
              <Reveal mode="fadeLeft">
                <MonoIndex index="08" label="PROGRAMARE" />
              </Reveal>
              <h2 className="display-section max-w-2xl font-display uppercase text-text">
                <RevealLine>
                  <span className="block">Ideile bune</span>
                </RevealLine>
                <RevealLine delay={0.12}>
                  <span className="block">merită să rămână.</span>
                </RevealLine>
              </h2>
              <Reveal mode="maskUp" delay={0.2}>
                <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
                  Trimite ideea ta și alege o fereastră de consultație. Îți
                  răspundem cu pașii următori și cu o propunere de calendar
                  potrivită proiectului.
                </p>
              </Reveal>
              <Reveal mode="fade" delay={0.3}>
                <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                  Solicitare demonstrativă, fără rezervare reală
                </p>
              </Reveal>
              <Reveal mode="scale" delay={0.4}>
                <Button href="/programare" size="lg">
                  Deschide programarea
                </Button>
              </Reveal>
            </div>

            <Reveal
              mode="mask"
              delay={0.16}
              className="relative min-h-[240px] border-t border-line lg:min-h-0 lg:border-l lg:border-t-0"
            >
              <div className="relative aspect-[5/4] h-full w-full lg:aspect-auto lg:absolute lg:inset-0">
                <SmartImage
                  src="/images/booking/consultation.webp"
                  alt="Consultație în atelier: schiță botanică pe masă, fără semne sau texte pe imagine."
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="absolute inset-0 h-full w-full object-cover"
                  objectPosition="center 35%"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent lg:bg-gradient-to-l" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
