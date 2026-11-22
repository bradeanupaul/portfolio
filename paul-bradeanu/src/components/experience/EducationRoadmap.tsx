"use client";

import { CalendarDays, GraduationCap, School } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { educationEntries } from "@/data/experience";
import { useMotionReady } from "@/components/motion/Reveal";

const stepIcons = [GraduationCap, GraduationCap, School] as const;

export function EducationRoadmap() {
  const reduceMotion = useReducedMotion();
  const ready = useMotionReady();

  return (
    <div className="relative mt-10">
      <div
        className="absolute bottom-8 left-[23px] top-8 w-px bg-[linear-gradient(180deg,rgba(37,140,255,0.75)_0%,rgba(37,140,255,0.2)_55%,transparent_100%)] md:left-[27px]"
        aria-hidden
      />

      {!reduceMotion ? (
        <motion.div
          className="absolute left-[23px] top-8 w-px origin-top bg-[linear-gradient(180deg,#55b6ff_0%,#258cff_70%,transparent_100%)] md:left-[27px]"
          style={{ height: "calc(100% - 4rem)" }}
          initial={{ scaleY: 0 }}
          animate={ready ? undefined : { scaleY: 0 }}
          whileInView={ready ? { scaleY: 1 } : undefined}
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      ) : null}

      <ol className="space-y-6 md:space-y-8">
        {educationEntries.map((entry, index) => {
          const StepIcon = stepIcons[index] ?? GraduationCap;
          const isCurrent = entry.period.includes("prezent");

          return (
            <motion.li
              key={entry.id}
              className="relative pl-16 md:pl-20"
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              animate={
                reduceMotion || !ready ? (reduceMotion ? undefined : { opacity: 0, x: -18 }) : undefined
              }
              whileInView={
                ready && !reduceMotion ? { opacity: 1, x: 0 } : undefined
              }
              viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : 0.12 + index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="absolute left-0 top-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent)]/35 bg-[linear-gradient(145deg,#1476ef_0%,#258cff_55%,#3ea0ff_100%)] text-white shadow-[0_12px_28px_rgba(37,140,255,0.32)] md:h-14 md:w-14"
                initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                animate={
                  reduceMotion || !ready
                    ? reduceMotion
                      ? undefined
                      : { scale: 0.7, opacity: 0 }
                    : undefined
                }
                whileInView={
                  ready && !reduceMotion ? { scale: 1, opacity: 1 } : undefined
                }
                viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: reduceMotion ? 0 : 0.18 + index * 0.14,
                }}
              >
                <StepIcon className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
              </motion.span>

              <article className="relative overflow-hidden rounded-[24px] glass-card border border-white/15 p-5 shadow-[0_18px_44px_rgba(4,10,18,0.28)] md:p-6">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.04),transparent_70%)] blur-2xl"
                  aria-hidden
                />
                <div className="relative flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[11px] tracking-[0.14em] text-[var(--accent-hover)]">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {entry.period}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/35 bg-[rgba(37,140,255,0.03)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent-hover)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-hover)]" />
                      În curs
                    </span>
                  ) : null}
                </div>
                <h3 className="relative mt-3 text-xl font-semibold tracking-tight text-white">
                  {entry.degree}
                </h3>
                <p className="relative mt-1.5 text-sm text-[var(--text-secondary)] md:text-base">
                  {entry.school}
                  {entry.faculty ? ` · ${entry.faculty}` : ""}
                </p>
                {entry.detail ? (
                  <p className="relative mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {entry.detail}
                  </p>
                ) : null}
              </article>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
