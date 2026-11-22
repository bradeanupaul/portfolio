"use client";

import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem, RevealLine, Stagger } from "@/components/motion/Reveal";

const principles = [
  {
    index: "01",
    title: "Dialog înainte de ac",
    body: "Începem cu intenția ta, zona corpului și limitele clare ale proiectului.",
  },
  {
    index: "02",
    title: "Linie citibilă",
    body: "Preferăm forme care se citesc pe piele, nu densitate care se pierde în timp.",
  },
  {
    index: "03",
    title: "Ritm de atelier",
    body: "Schițe, feedback și sesiune fără grabă, cu respect pentru corp și vindecare.",
  },
] as const;

export function ManifestHome() {
  return (
    <Section
      tone="surface"
      id="manifest"
      className="border-t border-line bg-surface text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="space-y-6">
            <Reveal mode="fadeLeft">
              <MonoIndex index="02" label="MANIFEST" />
            </Reveal>
            <h2 className="display-section max-w-xl font-display uppercase leading-[1.08] text-text">
              <RevealLine>
                <span className="block">Pielea devine pagină</span>
              </RevealLine>
              <RevealLine delay={0.12}>
                <span className="block">când decizia îți aparține.</span>
              </RevealLine>
            </h2>
            <Reveal mode="maskUp" delay={0.18}>
              <p className="text-measure text-base leading-relaxed text-text-muted md:text-lg">
                La VANTA INK construim împreună. Tu aduci intenția, noi aducem
                structura, ritmul atelierului și respectul pentru corp. Fiecare
                proiect pornește din dialog, nu din șabloane.
              </p>
            </Reveal>
            <Reveal mode="fade" delay={0.28}>
              <p className="max-w-md text-sm leading-relaxed text-text-muted md:text-base">
                Colaborarea înseamnă schițe clare, feedback onest și un rezultat
                care rămâne al tău după ce ușa se închide.
              </p>
            </Reveal>
            <Reveal mode="scale" delay={0.36}>
              <div className="h-px w-24 origin-left bg-accent" aria-hidden />
            </Reveal>
          </div>

          <Stagger stagger={0.12} delayChildren={0.08}>
            <ul className="grid gap-4 sm:grid-cols-1">
              {principles.map((item) => (
                <RevealItem
                  key={item.index}
                  as="li"
                  variant="maskUp"
                  className="border border-line bg-surface-raised p-5 md:p-6"
                >
                  <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                    {item.index}
                  </p>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-text md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                    {item.body}
                  </p>
                </RevealItem>
              ))}
            </ul>
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
