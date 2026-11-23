import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";

export function StudioBand() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden band-carbon">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/studio/studio-wide-dark.jpg"
          alt=""
          className="h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/88 to-carbon/40" />
      </div>

      <Container className="relative section-pad">
        <div className="max-w-xl">
          <Reveal>
            <SectionEyebrow tone="light">Atelierul</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-off-white md:text-5xl">
              Spațiu controlat, lumină de predare
            </h2>
            <p className="mt-4 text-base leading-7 text-silver">
              Imaginea de mai sus este generată pentru acest demo. Fluxul ilustrat: bay-uri pe tip
              de intervenție, LED rece/cald pentru control optic și un traseu separat pentru
              interior — prezentate ca atelier premium din {site.contact.city}.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-off-white/85">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-copper" />
                Inspecție pe lumină controlată înainte de orice film sau ceramică
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-copper" />
                Protocol de curățare dedicat pe jante, geamuri și habitaclu
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-copper" />
                Predare cu verificare optică pe zonele tratate
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/despre">Despre studio</Button>
              <Button
                href="/proces"
                variant="outline"
                className="border-white/30 text-off-white hover:bg-white hover:text-carbon"
              >
                Vezi procesul
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
