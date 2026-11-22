import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <article className="bg-cloud pt-[var(--header-height)]">
      <Container className="py-24 md:py-36">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-azure">404</p>
        </Reveal>
        <RevealHeading as="h1" className="mt-5 max-w-3xl text-5xl leading-[1.02] text-ink md:text-7xl">
          Pagina nu se află în această casă.
        </RevealHeading>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            Adresa poate fi veche sau scrisă greșit. Portofoliul și pagina de început rămân deschise.
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Pagina de început</Button>
          <Button href="/proprietati" variant="secondary">
            Vezi proprietățile
          </Button>
        </Reveal>
      </Container>
    </article>
  );
}
