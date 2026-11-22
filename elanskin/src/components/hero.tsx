"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { buttonClass, Container } from "@/components/chrome";
import { Media } from "@/components/media";
import { Reveal, RevealLine } from "@/components/motion";
import { TypewriterText } from "@/components/TypewriterText";

const trust = ["16 formule", "3 pași simpli", "Texturi atent formulate"];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(243,220,230,0.55),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(221,224,247,0.45),transparent_50%),linear-gradient(180deg,#fcfaff_0%,#f6f1fa_55%,#ece4f4_100%)]"
      />

      <Container className="relative py-10 md:hidden">
        <Reveal mode="fadeLeft" eager delay={0.02} className="w-fit">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-orchid">
            ÉLAN SKIN
          </p>
        </Reveal>
        <h1 className="mt-3 max-w-[18ch] text-[clamp(2.35rem,10vw,3.1rem)] leading-[1.08] text-aubergine">
          <RevealLine eager delay={0.12}>
            <span className="block">Ritualuri pentru</span>
          </RevealLine>
          <RevealLine eager delay={0.28} className="mt-1">
            <span className="block text-orchid">
              <TypewriterText
                text="fiecare zi."
                reduceMotion={reduceMotion}
                startDelay={380}
                charMs={48}
                className="text-orchid"
              />
            </span>
          </RevealLine>
        </h1>
        <Reveal mode="maskUp" eager delay={0.95}>
          <p className="mt-4 max-w-[34ch] text-base leading-7 text-ink">
            Seruri și creme cu texturi clare, pentru un raft scurt pe care îl folosești cu adevărat.
          </p>
        </Reveal>
        <Reveal mode="scale" eager delay={1.15} className="mt-6 flex flex-wrap gap-3">
          <Link href="/magazin" className={buttonClass("solid")}>
            Descoperă produsele
          </Link>
          <Link href="/rutina-mea" className={buttonClass("line")}>
            Construiește rutina
          </Link>
        </Reveal>
        <Reveal mode="mask" eager delay={0.35} className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.5rem]">
          <Media
            src="/assets/hero-mobile.webp"
            alt="Trio de produse ÉLAN SKIN pe lumină moale."
            className="absolute inset-0"
            priority
            sizes="(max-width: 767px) 100vw, 0px"
            fit="cover"
            tone="cool"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-aubergine backdrop-blur">
            Niacinamidă
          </span>
        </Reveal>
        <Reveal mode="fadeLeft" eager delay={1.3}>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">
            {trust.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <Container className="relative hidden min-h-[calc(100svh-6.5rem)] items-center gap-10 py-14 md:grid md:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="max-w-[33.75rem]">
          <Reveal mode="fadeLeft" eager delay={0.02} className="w-fit">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orchid">
              Atelier de îngrijire
            </p>
          </Reveal>
          <h1 className="mt-4 text-[clamp(3.25rem,5.4vw,5.8rem)] leading-[1.04] text-aubergine">
            <RevealLine eager delay={0.14}>
              <span className="block">Îngrijire care</span>
            </RevealLine>
            <RevealLine eager delay={0.32} className="mt-1">
              <span className="block text-orchid">
                <TypewriterText
                  text="se simte."
                  reduceMotion={reduceMotion}
                  startDelay={420}
                  charMs={52}
                  className="text-orchid"
                />
              </span>
            </RevealLine>
          </h1>
          <Reveal mode="maskUp" eager delay={1.05}>
            <p className="mt-6 text-lg leading-8 text-ink">
              Formule scurte, texturi alese cu atenție și o rutină pe care o poți ține, dimineața și
              seara, fără pași în plus.
            </p>
          </Reveal>
          <Reveal mode="scale" eager delay={1.22} className="mt-8 flex flex-wrap gap-3">
            <Link href="/magazin" className={buttonClass("solid")}>
              Descoperă produsele
            </Link>
            <Link href="/rutina-mea" className={buttonClass("line")}>
              Construiește rutina
            </Link>
          </Reveal>
          <Reveal mode="fadeLeft" eager delay={1.4}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-line/80 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
              {trust.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[42rem]">
          <Reveal mode="mask" eager delay={0.28} className="relative aspect-[5/4] max-h-[40rem] overflow-hidden rounded-[1.75rem]">
            <Media
              src="/assets/hero-desktop.webp"
              alt="Produse ÉLAN SKIN pe suprafață de sticlă."
              className="absolute inset-0"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              fit="cover"
              tone="cool"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(252,250,255,0.35),transparent_40%),linear-gradient(180deg,transparent_55%,rgba(33,20,43,0.18))]"
            />
          </Reveal>
          <Reveal
            mode="scale"
            eager
            delay={0.7}
            className="absolute -left-2 bottom-8 hidden max-w-[12rem] rounded-2xl border border-line bg-white/95 p-4 shadow-soft lg:block"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-orchid">Colecție</p>
            <p className="mt-1 font-display text-xl text-aubergine">Ritualul dimineții</p>
            <Link href="/colectii/ritualul-diminetii" className="mt-2 inline-block text-sm text-orchid">
              Vezi ritualul
            </Link>
          </Reveal>
          <Reveal mode="fade" eager delay={0.55}>
            <span className="absolute right-4 top-4 hidden rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-aubergine backdrop-blur md:inline-flex">
              Acid hialuronic
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
