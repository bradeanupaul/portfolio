"use client";

import Image from "next/image";
import { CheckCircle2, Code2, Compass, PenTool } from "lucide-react";
import { RevealItem, Stagger } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

const phases = [
  {
    step: "01",
    title: "Descoperire",
    text: "Clarific obiectivul, audiența și constrângerile. Separ ce trebuie livrat acum de ce poate aștepta.",
    icon: Compass,
    image: "/images/process/discovery-soft.jpg",
    accent: "#258cff",
  },
  {
    step: "02",
    title: "Design și arhitectură",
    text: "Stabilesc ritmul vizual, fluxurile și stările. Interfața trebuie să fie clară înainte să crească complexitatea.",
    icon: PenTool,
    image: "/images/process/design-soft.jpg",
    accent: "#55b6ff",
  },
  {
    step: "03",
    title: "Implementare",
    text: "Construiesc frontend și servicii API cu tipuri, validare și structură menținabilă. Integrez AI doar unde reduce muncă reală.",
    icon: Code2,
    image: "/images/process/engineering-soft.jpg",
    accent: "#3ea0ff",
  },
  {
    step: "04",
    title: "Testare și lansare",
    text: "Verific responsive, accesibilitate, formulare și deploy. Documentez ce rămâne de urmat.",
    icon: CheckCircle2,
    image: "/images/process/qa-soft.jpg",
    accent: "#7eb8ff",
  },
];

export function EngineeringApproach() {
  return (
    <section id="approach" className="scroll-mt-24 border-y border-[var(--line-on-dark)] bg-[var(--bg-ink)] py-12 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Cum lucrez"
          title="De la brief la lansare"
          description="Patru etape concrete, cu rezultate vizibile la fiecare pas."
        />

        <SnapCarousel
          className="mt-8 md:mt-10"
          ariaLabel="Etape de lucru"
          trackClassName="max-lg:-mx-4 max-lg:px-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:snap-none lg:pb-0 xl:grid-cols-4"
          slideClassName="h-full max-lg:w-[min(82vw,300px)] lg:w-auto lg:min-w-0 lg:shrink lg:snap-none"
        >
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <article
                key={phase.step}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/15 glass-card shadow-[0_18px_44px_rgba(4,10,18,0.3)] transition hover:-translate-y-1 hover:border-[var(--accent)]/35 md:rounded-[24px]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${phase.accent}, transparent)`,
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full blur-3xl transition group-hover:opacity-100"
                  style={{ background: `${phase.accent}40` }}
                  aria-hidden
                />

                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={phase.image}
                    alt=""
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 82vw, (max-width: 1280px) 50vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 backdrop-blur-sm">
                    <Icon
                      className="h-3.5 w-3.5"
                      style={{ color: phase.accent }}
                      aria-hidden
                    />
                    <span
                      className="font-semibold text-[11px] tracking-[0.16em]"
                      style={{ color: phase.accent }}
                    >
                      {phase.step}
                    </span>
                  </div>
                </div>
                <Stagger
                  className="relative flex flex-1 flex-col p-4 sm:p-5"
                  stagger={0.055}
                  delay={0.05}
                  wrap={false}
                >
                  <RevealItem
                    as="h3"
                    className="text-base font-semibold text-[var(--text-primary)] sm:text-lg"
                  >
                    {phase.title}
                  </RevealItem>
                  <RevealItem
                    as="p"
                    className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    {phase.text}
                  </RevealItem>
                </Stagger>
              </article>
            );
          })}
        </SnapCarousel>
      </div>
    </section>
  );
}
