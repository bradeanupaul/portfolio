"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useIntroReady } from "@/components/motion/IntroContext";
import { Reveal, RevealItem, RevealLine, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";

const ease = [0.22, 1, 0.36, 1] as const;

const amenities = [
  {
    href: "/camere",
    label: "Camere elegante",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 18V11.5A2.5 2.5 0 0 1 5.5 9h13A2.5 2.5 0 0 1 21 11.5V18" />
        <path d="M2 18h20" />
        <path d="M5 18v2M19 18v2" />
        <path d="M7 9V7.5A1.5 1.5 0 0 1 8.5 6H12" />
      </svg>
    ),
  },
  {
    href: "/facilitati",
    label: "Piscină încălzită",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 14c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
        <path d="M3 18c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
        <path d="M7 7v5M12 5v7M17 7v5" />
      </svg>
    ),
  },
  {
    href: "/spa",
    label: "Ciubăr în aer liber",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <ellipse cx="12" cy="10" rx="7" ry="3" />
        <path d="M5 10v5c0 2.2 3.1 4 7 4s7-1.8 7-4v-5" />
        <path d="M9 7c.4-1.2 1.4-1.6 2-1M13 6.5c.6-1.1 1.8-1.2 2.3-.2" />
      </svg>
    ),
  },
  {
    href: "/restaurant",
    label: "Restaurant local",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 3v8M6.5 3c0 2.5 1.5 3.2 1.5 5.5M9.5 3c0 2.5-1.5 3.2-1.5 5.5" />
        <path d="M8 11v10" />
        <path d="M16 3v8c0 1.5 1.5 2 1.5 4v6" />
        <path d="M14.5 3h3" />
      </svg>
    ),
  },
] as const;

function DiscoverIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.2 7.1 13.4 10 8.2 12.9V7.1Z" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle parallax only — large y/scale fights Lenis and looks like video tremble
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.015]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-hero-beige text-pine md:min-h-[max(100svh,900px)]"
    >
      <motion.div
        className="pointer-events-none absolute -top-10 bottom-0 left-[10%] right-[-4%] z-[1] hidden md:block lg:left-[8%] lg:right-[-6%] xl:left-[6%]"
        style={{ y: photoY, scale: photoScale }}
        aria-hidden
      >
        <Reveal kind="mask" immediate active={ready} delay={0.22} className="relative h-full w-full">
          <Image
            src="/images/exterior/hero-beige-lodge.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 88vw"
            className="object-cover object-[28%_42%]"
          />
        </Reveal>
      </motion.div>

      <div className="absolute inset-0 z-0 md:hidden" aria-hidden>
        <Image
          src="/images/exterior/hero-beige-lodge.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-ink/75 via-forest-ink/55 to-forest-ink/80" />
      </div>

      <div className="hero-shell relative z-[2] flex min-h-[100svh] flex-col pb-28 pt-[calc(var(--header-h)+0.5rem)] md:min-h-[max(100svh,900px)] md:pb-32 md:pt-[calc(var(--header-h)+0.85rem)]">
        <div className="relative flex max-w-[20rem] flex-1 flex-col justify-center pb-8 text-white sm:max-w-md md:max-w-[30rem] md:justify-start md:pb-0 md:pt-[clamp(2.5rem,8vh,5.5rem)] md:text-pine lg:max-w-[34rem]">
          <Reveal kind="fadeLeft" immediate active={ready} delay={0.02} className="w-fit">
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.22em] text-sand uppercase md:text-copper">
              Refugiul montan VELTRA
              <span className="hidden h-px w-10 bg-current/70 sm:block" aria-hidden />
            </p>
          </Reveal>

          <h1
            className="hero-title mt-3 font-serif text-[clamp(2.45rem,7vw,4.85rem)] text-white md:mt-4 md:text-pine"
            style={{ lineHeight: 0.95 }}
          >
            <RevealLine immediate active={ready} delay={0.12}>
              <span className="block">O experiență</span>
            </RevealLine>
            <RevealLine immediate active={ready} delay={0.26} className="mt-0.5">
              <span className="block">completă în</span>
            </RevealLine>
            <RevealLine immediate active={ready} delay={0.4} className="mt-0.5">
              <span className="block">
                inima{" "}
                <em className="font-script inline-block pb-[0.12em] text-[1.12em] leading-none text-sand md:text-clay">
                  <TypewriterText
                    text="naturii"
                    active={ready}
                    reduceMotion={reduce}
                    startDelay={480}
                    charMs={55}
                    className="font-script text-sand md:text-clay"
                  />
                </em>
              </span>
            </RevealLine>
          </h1>

          <Reveal kind="maskUp" immediate active={ready} delay={0.95}>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-white/85 md:mt-5 md:text-[1.1rem] md:text-pine/70">
              Cazare premium, relaxare autentică și experiențe memorabile în mijlocul munților.
            </p>
          </Reveal>

          <Reveal
            kind="scale"
            immediate
            active={ready}
            delay={1.15}
            className="mt-7 flex flex-wrap items-center gap-3 md:mt-8"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
              animate={
                ready
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.96 }
              }
              transition={{ duration: 0.55, delay: ready ? 1.2 : 0, ease }}
            >
              <Button href="/rezervari" variant="copper" arrow className="min-h-12 px-6">
                Rezervă acum
              </Button>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
              animate={
                ready
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.96 }
              }
              transition={{ duration: 0.55, delay: ready ? 1.32 : 0, ease }}
            >
              <Button
                href="/despre-noi"
                variant="copper-outline"
                className="min-h-12 !border-white/70 !text-white hover:!bg-white/10 md:!border-[color-mix(in_srgb,var(--copper)_70%,transparent)] md:!text-copper-deep md:hover:!bg-[color-mix(in_srgb,var(--copper)_12%,transparent)]"
              >
                <DiscoverIcon className="mr-2 h-[1.15rem] w-[1.15rem] shrink-0" />
                Descoperă VELTRA
              </Button>
            </motion.div>
          </Reveal>

          <RevealStagger
            immediate
            active={ready}
            delayChildren={1.35}
            stagger={0.08}
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/20 pt-6 text-white/85 sm:grid-cols-4 md:mt-9 md:gap-x-5 md:border-pine/12 md:pt-7 md:text-pine/75"
          >
            {amenities.map((item) => (
              <RevealItem key={item.href} variant="fadeLeft" className="min-w-0">
                <Link
                  href={item.href}
                  className="group flex items-start gap-2.5 text-sm transition hover:text-sand md:hover:text-copper"
                >
                  <span className="mt-0.5 shrink-0 text-sand transition group-hover:scale-105 md:text-copper">
                    {item.icon}
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-7 z-[2] flex flex-col items-center gap-2 md:bottom-8 md:gap-3"
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: ready ? 1.55 : 0, ease }}
        >
          <motion.div
            animate={reduce || !ready ? undefined : { y: [0, 10, 0] }}
            transition={reduce ? undefined : { repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 md:gap-3"
          >
            <span className="text-[0.72rem] font-semibold tracking-[0.24em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] md:text-[0.65rem] md:tracking-[0.2em] md:text-[#8F7A68] md:drop-shadow-none">
              Derulează
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:hidden"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <svg
              viewBox="0 0 32 52"
              className="hidden h-16 w-9 text-[#8F7A68] md:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <rect x="9" y="2" width="14" height="24" rx="7" />
              <circle cx="16" cy="10" r="1.8" fill="currentColor" stroke="none" />
              <path d="M16 32v14M12 41l4 5 4-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
