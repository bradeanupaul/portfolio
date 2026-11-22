"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useIntroReady } from "@/components/motion/IntroContext";
import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { HeroSearch } from "@/components/home/HeroSearch";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TypewriterText } from "@/components/ui/TypewriterText";

export function HeroHome() {
  const ready = useIntroReady();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pt-[var(--header-height)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-[var(--header-height)] z-0 h-[min(78vh,640px)] lg:hidden"
        aria-hidden
      >
        <Image
          src="/images/hero/hero-radical-building-mobile.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-[center_12%]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 92%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 92%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            opacity: 0.42,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/25 to-white" />
      </div>

      <Container className="relative z-10 grid items-center gap-8 py-8 lg:grid-cols-12 lg:gap-6 lg:py-10 xl:py-12">
        <div className="relative z-10 min-h-[min(58vh,420px)] lg:col-span-5 lg:min-h-0">
          <Reveal variant="fadeLeft" eager active={ready} delay={0.02} className="w-fit">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
              Aurelia Estates
            </p>
          </Reveal>

          <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.35rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            <RevealLine eager active={ready} delay={0.14}>
              <span className="block">Locuințe cu</span>
            </RevealLine>
            <RevealLine eager active={ready} delay={0.32} className="mt-1">
              <span className="block text-cobalt">
                <TypewriterText
                  text="perspectivă."
                  active={ready}
                  reduceMotion={reduceMotion}
                  startDelay={420}
                  charMs={48}
                  className="text-cobalt"
                />
              </span>
            </RevealLine>
          </h1>

          <Reveal variant="maskUp" eager active={ready} delay={1.0}>
            <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-slate md:text-[18px]">
              Apartamente, penthouse-uri și vile din București, nordul orașului și Brașov.
              Compară catalogul demo, filtrează după zonă și buget, apoi programează o vizionare.
            </p>
          </Reveal>

          <Reveal
            variant="scaleFade"
            eager
            active={ready}
            delay={1.2}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Button href="/proprietati">Explorează proprietățile</Button>
            <Link
              href="/programeaza-vizionare"
              className="text-[15px] font-semibold text-ink underline-offset-4 transition-colors hover:text-cobalt hover:underline"
            >
              Programează o vizionare
            </Link>
          </Reveal>

          <Reveal variant="fadeLeft" eager active={ready} delay={1.35} className="mt-6 flex items-center gap-2 text-sm text-slate">
            <MapPin className="h-4 w-4 text-cobalt" aria-hidden />
            <span>București · Corbeanca · Brașov</span>
          </Reveal>
        </div>

        <div className="relative hidden lg:col-span-7 lg:block">
          <Reveal
            variant="mask"
            eager
            active={ready}
            delay={0.28}
            className="relative mx-auto aspect-[16/10] w-full max-w-3xl"
          >
            <Image
              src="/images/hero/hero-radical-building.jpg"
              alt="Clădire rezidențială contemporană pe fundal alb, imagine de brand Aurelia Estates"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain object-right-bottom"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 18%, black 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 18%, black 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </Reveal>
        </div>
      </Container>

      <Container className="relative z-20 pb-12 md:pb-16">
        <Reveal variant="scaleFade" eager active={ready} delay={1.45}>
          <HeroSearch />
        </Reveal>
      </Container>
    </section>
  );
}
