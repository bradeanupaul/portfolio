"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bot,
  Database,
  LayoutTemplate,
  Server,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/experience";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { cn } from "@/lib/utils";

const groupIcons: Record<(typeof skillGroups)[number]["id"], LucideIcon> = {
  frontend: LayoutTemplate,
  backend: Server,
  data: Database,
  ai: Bot,
};

const toolkitKeywords = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "Spring Boot",
  "Python",
  "Prisma",
  "PostgreSQL",
  "Docker",
  "PM2",
  "Vercel",
  "Gemini",
  "OpenAI",
  "Stripe",
  "LLM",
  "REST",
  "API",
  "motion",
  "accesibilitatea",
  "interfețe",
  "Backendul",
  "tenant",
];

export function Toolkit() {
  const [active, setActive] = useState<(typeof skillGroups)[number]["id"]>(
    skillGroups[0].id,
  );
  const reduceMotion = useReducedMotion();
  const current = skillGroups.find((group) => group.id === active) ?? skillGroups[0];
  const ActiveIcon = groupIcons[current.id];

  return (
    <section id="toolkit" className="section-y-lg scroll-mt-24 border-y border-[var(--line-on-dark)] bg-[var(--bg-deep)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Toolkit"
          title="Tehnologii pe care le folosesc în practică"
          description="Grupate pe rol, cu context din proiecte reale. Nu o listă goală de branduri."
        />

        {/* Mobile: horizontal card carousel */}
        <div className="mt-8 lg:hidden">
          <SnapCarousel
            ariaLabel="Toolkit"
            trackClassName="-mx-3 px-3 sm:-mx-4 sm:px-4"
            slideClassName="w-[min(calc(100vw-2.5rem),340px)]"
            dotsHideFrom="lg"
          >
            {skillGroups.map((group) => {
              const Icon = groupIcons[group.id];
              return (
                <article
                  key={group.id}
                  className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/15 glass-card"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={group.image}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 90vw, 360px"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(0,0,0,0.88)_100%)]" />
                    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[var(--accent-hover)]" aria-hidden />
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {group.label}
                      </h3>
                    </div>
                  </div>
                  <Stagger className="flex flex-1 flex-col p-5" stagger={0.05} delay={0.04} wrap={false}>
                    <RevealItem
                      as="p"
                      className="text-sm leading-relaxed text-[var(--text-secondary)]"
                    >
                      <BoldKeywords text={group.context} keywords={toolkitKeywords} />
                    </RevealItem>
                    <RevealItem className="mt-4">
                      <Stagger
                        className="flex flex-wrap gap-1.5"
                        stagger={0.035}
                        delay={0}
                        itemVariant="pop"
                      >
                        {group.items.slice(0, 6).map((item) => (
                          <TechBadge key={item} name={item} />
                        ))}
                      </Stagger>
                    </RevealItem>
                  </Stagger>
                </article>
              );
            })}
          </SnapCarousel>
        </div>

        {/* Desktop: tabs + panel */}
        <div className="mt-10 hidden lg:block">
          <div role="tablist" aria-label="Categorii tehnice">
          <Stagger
            className="flex flex-wrap gap-2.5"
            stagger={0.045}
            itemVariant="pop"
          >
            {skillGroups.map((group) => {
              const selected = group.id === active;
              const Icon = groupIcons[group.id];
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition",
                    selected
                      ? "border-transparent bg-[var(--accent)] text-white shadow-[0_10px_28px_rgba(37,140,255,0.28)]"
                      : "border-white/15 bg-white/[0.04] text-[var(--text-secondary)] backdrop-blur-md hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]",
                  )}
                  onClick={() => setActive(group.id)}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {group.label}
                </button>
              );
            })}
          </Stagger>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/15 glass-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                role="tabpanel"
                className="grid md:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <ActiveIcon
                      className="h-5 w-5 text-[var(--accent-hover)]"
                      aria-hidden
                    />
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {current.label}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
                    <BoldKeywords text={current.context} keywords={toolkitKeywords} />
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                    <BoldKeywords text={current.detail} keywords={toolkitKeywords} />
                  </p>
                  <Stagger
                    className="mt-6 flex flex-wrap gap-2"
                    stagger={0.03}
                    delay={0.05}
                    itemVariant="pop"
                  >
                    {current.items.map((item) => (
                      <TechBadge key={item} name={item} />
                    ))}
                  </Stagger>
                </div>

                <div className="relative min-h-[220px] md:min-h-[320px]">
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="40vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.08)_40%,transparent_100%)]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
