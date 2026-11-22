"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIntroReady } from "@/components/motion/IntroContext";
import {
  AnimatedReveal,
  RevealLine,
} from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function GoldOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-bn-gold", className)}
      width="88"
      height="18"
      viewBox="0 0 88 18"
      fill="none"
      aria-hidden
    >
      <path d="M4 9h22" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="34" cy="9" r="2" fill="currentColor" />
      <circle cx="44" cy="9" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="54" cy="9" r="2" fill="currentColor" />
      <path d="M62 9h22" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-bn-bg lg:min-h-[100dvh]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/pasta-wide.webp"
          alt="Tagliatelle cu trufe negre și Parmigiano pe farfurie ceramică întunecată"
          fill
          loading="eager"
          fetchPriority="high"
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/78 to-bn-bg/25 max-lg:via-bn-bg/55 max-lg:to-bn-bg/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/50" />
        <div className="absolute inset-y-0 left-0 hidden w-[min(48%,42rem)] bg-gradient-to-r from-bn-bg via-bn-bg/70 to-transparent xl:block" />
      </div>

      <Container
        size="wide"
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-[calc(var(--header-height)+2.5rem)] lg:min-h-[100dvh] lg:justify-center lg:pb-24 lg:pt-28"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-xl xl:max-w-2xl">
            <AnimatedReveal
              eager
              active={ready}
              delay={0.02}
              variant="fadeLeft"
              className="w-fit"
            >
              <p className="bn-eyebrow">Ristorante Italiano</p>
            </AnimatedReveal>

            <AnimatedReveal eager active={ready} delay={0.12} variant="fade">
              <div className="mt-5 sm:mt-6">
                <GoldOrnament />
              </div>
            </AnimatedReveal>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-[clamp(3.25rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-tight text-bn-heading sm:mt-5"
            >
              <RevealLine eager active={ready} delay={0.2}>
                <span className="block">Bella Notte</span>
              </RevealLine>
            </h1>

            <RevealLine eager active={ready} delay={0.38} className="mt-4 sm:mt-5">
              <p className="font-display text-[clamp(1.45rem,2.8vw,2.25rem)] leading-snug text-bn-gold">
                <TypewriterText
                  text="Gustul autentic al Italiei"
                  active={ready}
                  reduceMotion={reduceMotion}
                  startDelay={380}
                  charMs={42}
                  className="text-bn-gold"
                />
              </p>
            </RevealLine>

            <AnimatedReveal eager active={ready} delay={1.05} variant="maskUp">
              <p className="mt-5 max-w-md text-base leading-relaxed text-bn-text-muted sm:mt-6 sm:text-lg">
                Descoperă rafinamentul bucătăriei italiene, într-un loc în care fiecare
                ingredient spune o poveste, iar fiecare seară rămâne o amintire.
              </p>
            </AnimatedReveal>

            <AnimatedReveal
              eager
              active={ready}
              delay={1.22}
              variant="scale"
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                animate={
                  ready
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.96 }
                }
                transition={{ duration: 0.55, delay: ready ? 1.28 : 0, ease }}
              >
                <Button href="/rezervari" size="lg" showCalendar showArrow>
                  Rezervă o masă
                </Button>
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                animate={
                  ready
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.96 }
                }
                transition={{ duration: 0.55, delay: ready ? 1.4 : 0, ease }}
              >
                <Button href="/meniu" variant="secondary" size="lg" showArrow>
                  Descoperă meniul
                </Button>
              </motion.div>
            </AnimatedReveal>
          </div>

          <AnimatedReveal
            eager
            active={ready}
            delay={0.28}
            variant="mask"
            className="relative mx-auto hidden aspect-[4/5] w-full max-w-md overflow-hidden border border-bn-border/50 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:max-w-lg lg:mx-0 lg:block lg:aspect-[5/6] lg:max-h-[min(72vh,640px)] xl:max-h-[min(74vh,700px)]"
          >
            <div className="absolute inset-0" aria-hidden>
              <Image
                src="/images/hero/pasta-truffle.webp"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 40vw, 520px"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/50 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-3 border border-bn-gold/20" />
            </div>
          </AnimatedReveal>
        </div>
      </Container>

      <motion.a
        href="#introducere"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-bn-gold sm:bottom-8"
        aria-label="Derulează spre conținut"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: ready ? 1.55 : 0, ease }}
      >
        <span className="bn-eyebrow text-[0.58rem]">Explorează</span>
        <motion.span
          animate={reduceMotion || !ready ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
