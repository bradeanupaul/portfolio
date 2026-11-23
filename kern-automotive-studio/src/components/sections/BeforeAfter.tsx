import { Reveal } from "@/components/motion/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { posters, still } from "@/lib/images";

export function BeforeAfter() {
  return (
    <section className="band-white section-pad">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionEyebrow>Corecție vizibilă</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
              Înainte și după, pe același unghi
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate">
              Compară swirl-urile pe lumină rece cu reflexia după polish și ceramică. Glisorul e
              accesibil din tastatură — folosește săgețile pe controlul range.
            </p>
            <Button href="/proiecte" variant="dark" className="mt-8">
              Vezi proiectele demo
            </Button>
          </Reveal>
          <Reveal variant="clip" delay={0.1}>
            <BeforeAfterSlider
              beforeSrc={posters.scratches}
              afterSrc={still.detailGloss}
              beforeAlt="Vopsea cu swirl-uri înainte de corecție"
              afterAlt="Vopsea după polish și protecție"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
