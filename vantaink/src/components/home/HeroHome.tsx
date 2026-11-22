"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useIntroReady } from "@/components/motion/IntroContext";
import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { heroExclusive } from "@/data/hero";

const [heroMain, heroDetail, heroAccent] = heroExclusive;

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroHome() {
  const ready = useIntroReady();
  const reduceMotion = useReducedMotion();

  return (
    <Section
      tone="carbon"
      bleed
      id="acasa"
      className="relative border-b border-line bg-bg text-text"
    >
      <Container className="relative flex min-h-[min(680px,82svh)] flex-col justify-center py-16 md:min-h-[min(720px,78svh)] md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:gap-14 xl:gap-16">
          <div className="flex max-w-xl flex-col gap-8">
            <Reveal eager active={ready} delay={0.02} mode="fadeLeft" className="w-fit">
              <MonoIndex index="01" label="VANTA INK" />
            </Reveal>

            <div className="space-y-5">
              <Reveal eager active={ready} delay={0.1} mode="fade">
                <p className="font-mono-ui text-[0.7rem] uppercase tracking-[0.2em] text-text-subtle">
                  Studio editorial · Cluj Napoca
                </p>
              </Reveal>

              <h1 className="display-hero font-display uppercase leading-[1.08] text-text">
                <RevealLine eager active={ready} delay={0.18}>
                  <span className="block">Nu e doar cerneală.</span>
                </RevealLine>
                <RevealLine eager active={ready} delay={0.36} className="mt-1">
                  <span className="block text-accent">
                    <TypewriterText
                      text="E identitate."
                      active={ready}
                      reduceMotion={reduceMotion}
                      startDelay={420}
                      charMs={48}
                      className="text-accent"
                    />
                  </span>
                </RevealLine>
              </h1>

              <Reveal eager active={ready} delay={1.05} mode="maskUp">
                <p className="text-measure text-base text-text-muted md:text-lg">
                  Proiecte construite în dialog, cu ritm de atelier și respect pentru
                  corp. Aici pornești cu o idee și pleci cu o piesă care îți aparține.
                </p>
              </Reveal>
            </div>

            <Reveal
              eager
              active={ready}
              delay={1.22}
              mode="scale"
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
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
                <Button href="/portofoliu" size="lg">
                  Explorează lucrările
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
                <Button
                  href="/programare"
                  variant="secondary"
                  size="lg"
                  className="border-line text-text hover:bg-surface-raised hover:text-text"
                >
                  Programează o consultație
                </Button>
              </motion.div>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-h-[500px] lg:max-w-none">
            <Reveal
              mode="mask"
              delay={0.28}
              eager
              active={ready}
              className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden border border-line bg-surface lg:ml-auto lg:max-h-[440px]"
            >
              <SmartImage
                src={heroMain.path}
                alt={heroMain.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 70vw, 300px"
                className="h-full w-full object-cover"
                objectPosition="center 25%"
              />
            </Reveal>
            <Reveal
              mode="scale"
              delay={0.55}
              eager
              active={ready}
              className="absolute -bottom-4 left-0 z-10 w-[42%] max-w-[148px] overflow-hidden border border-line bg-surface-raised shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:max-w-[160px]"
            >
              <SmartImage
                src={heroDetail.path}
                alt={heroDetail.alt}
                width={160}
                height={160}
                sizes="160px"
                className="aspect-square h-auto w-full object-cover"
              />
            </Reveal>
            <Reveal
              mode="scale"
              delay={0.7}
              eager
              active={ready}
              className="absolute -top-3 right-0 z-10 hidden w-[44%] max-w-[180px] overflow-hidden border border-line bg-surface sm:block lg:max-w-[190px]"
            >
              <SmartImage
                src={heroAccent.path}
                alt={heroAccent.alt}
                width={190}
                height={240}
                sizes="190px"
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <motion.span
              className="pointer-events-none absolute -left-3 top-1/2 hidden h-px w-14 origin-left bg-accent lg:block"
              aria-hidden
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: ready ? 0.9 : 0, ease }}
            />
          </div>
        </div>
      </Container>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center lg:bottom-8"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: ready ? 1.55 : 0, ease }}
      >
        <Link
          href="#manifest"
          className="pointer-events-auto group flex flex-col items-center gap-2 text-text-subtle no-underline transition-colors hover:text-accent focus-visible:text-accent"
        >
          <span className="font-mono-ui text-[0.65rem] uppercase tracking-[0.22em]">
            Continuă
          </span>
          <span
            className="relative block h-11 w-px overflow-hidden bg-line"
            aria-hidden
          >
            <span className="absolute inset-x-0 top-0 h-1/2 w-full origin-top bg-accent motion-safe:animate-pulse motion-reduce:animate-none" />
          </span>
        </Link>
      </motion.div>
    </Section>
  );
}
