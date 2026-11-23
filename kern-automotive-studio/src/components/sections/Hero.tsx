import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { still } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden band-carbon">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 45%, rgba(228,109,67,0.12), transparent 55%), linear-gradient(180deg, #0B0D10 0%, #15191E 55%, #0B0D10 100%)",
        }}
      />

      <Container className="relative grid min-h-[100svh] items-center gap-10 pb-24 pt-32 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-16 lg:pt-28">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-copper">
            KERN / Automotive Studio
          </p>
          <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-off-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            Protecție precisă.
            <br />
            Finisaj impecabil.
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-7 text-silver md:text-lg">
            Folie PPF, protecție ceramică, corecția vopselei și detailing realizate cu atenție la
            fiecare suprafață.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/servicii" size="lg">
              Explorează serviciile
            </Button>
            <Button
              href="/programare"
              size="lg"
              variant="outline"
              className="border-white/30 text-off-white hover:border-white hover:bg-white hover:text-carbon"
            >
              Solicită o evaluare
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate">
            <li>PPF</li>
            <li>Ceramic Coating</li>
            <li>Interior &amp; Wheels</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[18px] border border-white/10 bg-charcoal/60 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={still.heroFront}
              alt="Porsche 911 graphite — material demonstrativ KERN"
              className="h-full w-full object-contain object-center"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
            Material demonstrativ · Porsche 911 Carrera S
          </p>
        </div>
      </Container>

      <a
        href="#promisiune"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-silver transition hover:text-white"
        aria-label="Derulează pentru a explora"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
          Derulează pentru a explora
        </span>
        <span className="relative h-8 w-px overflow-hidden bg-white/20">
          <span className="scroll-indicator-dot absolute inset-x-0 top-0 h-3 bg-copper" />
        </span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </a>
    </section>
  );
}
