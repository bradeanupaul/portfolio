"use client";

import Link from "next/link";
import { ArrowDown, BriefcaseBusiness, LayoutGrid, Mail } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { HeroArt } from "@/components/hero/HeroArt";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TypewriterHand } from "@/components/ui/TypewriterHand";
import { siteConfig } from "@/lib/site";

const HAND_TEXT = "de la idee la implementare.";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 7.1a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.45-2.15 2.96V20h-3.37V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
    </svg>
  );
}

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  const item = (delay: number, y = 22) => {
    const transition: Transition = {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    };
    if (reduceMotion) return { initial: false as const };
    return {
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition,
    };
  };

  return (
    <section className="relative flex flex-col overflow-hidden pt-2 md:min-h-[calc(100dvh-var(--header-h))] md:pt-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_78%_-8%,rgba(37,140,255,0.04),transparent_58%),radial-gradient(640px_380px_at_8%_30%,rgba(15,79,154,0.03),transparent_55%)]"
        aria-hidden
      />
      <HeroArt />

      <div className="container-shell relative z-10 flex min-h-0 flex-1 items-center py-4 pb-6 md:py-10">
        <div className="max-w-xl text-left lg:max-w-[34rem]">
          <motion.p className="eyebrow" {...item(0.08)}>
            FULL STACK DEVELOPER · FRONTEND & AI
          </motion.p>

          <h1 className="font-display mt-3 text-[clamp(2.05rem,7.2vw,4.35rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--text-primary)] md:mt-5">
            <motion.span className="block" {...item(0.18, 28)}>
              Construiesc
            </motion.span>
            <motion.span className="block" {...item(0.28, 28)}>
              produse digitale
            </motion.span>
            <motion.span className="mt-1.5 block" {...item(0.42, 12)}>
              <TypewriterHand
                text={HAND_TEXT}
                reduceMotion={reduceMotion}
                relative
                startDelay={700}
              />
            </motion.span>
          </h1>

          <motion.p
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-secondary)] md:mt-6 md:text-lg"
            {...item(0.72)}
          >
            Sunt Paul Brădeanu, dezvoltator software specializat în React, Next.js,
            TypeScript și integrarea sistemelor AI. Construiesc interfețe clare și
            aplicații complete, de la experiența utilizatorului până la backend.
          </motion.p>

          <motion.div
            className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:mt-8"
            {...item(0.88)}
          >
            <ButtonLink
              href="/#selected-work"
              icon={LayoutGrid}
              showArrow
              className="min-w-0 w-full justify-center sm:w-auto sm:flex-none"
            >
              Explorează proiectele
            </ButtonLink>
            <ButtonLink
              href="/experience"
              variant="secondary"
              icon={BriefcaseBusiness}
              className="min-w-0 w-full justify-center sm:w-auto sm:flex-none"
            >
              Experiența profesională
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-5 flex items-center gap-2 text-[var(--text-secondary)] md:mt-8 md:gap-3"
            {...item(1.02)}
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="rounded-full p-2 transition hover:text-[var(--text-primary)] md:p-2.5"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="rounded-full p-2 transition hover:text-[var(--text-primary)] md:p-2.5"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              title="Email"
              className="rounded-full p-2 transition hover:text-[var(--text-primary)] md:p-2.5"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 hidden shrink-0 justify-center pb-20 pt-10 md:flex md:pb-24 md:pt-12"
        {...item(1.15, 16)}
      >
        <Link
          href="#selected-work"
          className="group inline-flex flex-col items-center gap-2 text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
        >
          <span className="relative flex h-8 w-[16px] items-start justify-center rounded-full border border-[var(--accent)]/40 pt-1.5">
            <motion.span
              className="block h-1.5 w-px rounded-full bg-[var(--accent-hover)]"
              animate={
                reduceMotion ? undefined : { y: [0, 8, 0], opacity: [1, 0.35, 1] }
              }
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="font-nav inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] sm:text-xs">
            Descoperă proiectele
            <ArrowDown className="h-3 w-3 opacity-65" strokeWidth={1.4} />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
