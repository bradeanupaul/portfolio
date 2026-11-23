"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { DemoAuditScores, ProjectAudit } from "@/data/audits";

const METRICS: {
  key: keyof DemoAuditScores;
  label: string;
  blurb: string;
}[] = [
  {
    key: "performance",
    label: "Performance",
    blurb: "Cât de repede se încarcă și răspunde pagina.",
  },
  {
    key: "accessibility",
    label: "Accessibility",
    blurb: "Cât de ușor poate fi folosită de toți utilizatorii.",
  },
  {
    key: "bestPractices",
    label: "Best Practices",
    blurb: "Securitate, erori de consolă și practici moderne.",
  },
  {
    key: "seo",
    label: "SEO",
    blurb: "Cât de bine e pregătită pagina pentru căutare.",
  },
];

const VIEW_W = 100;
const VIEW_H = 58;
const CX = 50;
const CY = 50;
const R = 40;
const STROKE = 2.5;
const ARC_LEN = Math.PI * R;
const NEEDLE_LEN = R - 8;

function useIsCompactViewport() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return compact;
}

function SemiGauge({
  value,
  label,
  blurb,
  reduceMotion,
}: {
  value: number;
  label: string;
  blurb: string;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 52,
    damping: 17,
    mass: 0.6,
  });
  const [display, setDisplay] = useState(0);
  const [arcProgress, setArcProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      motionValue.set(value);
      setDisplay(value);
      setArcProgress(value / 100);
      return;
    }
    motionValue.set(0);
    const t1 = window.setTimeout(
      () => motionValue.set(Math.min(100, value + 6)),
      40,
    );
    const t2 = window.setTimeout(() => motionValue.set(value), 520);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [inView, value, reduceMotion, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(100, latest));
      setDisplay(Math.round(clamped));
      setArcProgress(clamped / 100);
    });
    return unsub;
  }, [spring]);

  const dashOffset = ARC_LEN * (1 - arcProgress);
  const angle = Math.PI * (1 - arcProgress);
  const tipX = CX + Math.cos(angle) * NEEDLE_LEN;
  const tipY = CY - Math.sin(angle) * NEEDLE_LEN;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <svg
        width={VIEW_W}
        height={VIEW_H}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="overflow-visible"
        aria-hidden
      >
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="rgba(180,210,240,0.16)"
          strokeWidth={STROKE}
          strokeLinecap="butt"
        />
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none"
          stroke="#258CFF"
          strokeWidth={STROKE}
          strokeLinecap="butt"
          strokeDasharray={ARC_LEN}
          strokeDashoffset={dashOffset}
        />
        <line
          x1={CX}
          y1={CY}
          x2={tipX}
          y2={tipY}
          stroke="#F8FAFD"
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <circle cx={CX} cy={CY} r={2} fill="#F8FAFD" />
      </svg>

      <p className="font-display mt-1 text-[1.7rem] font-semibold leading-none tracking-[-0.04em] text-[var(--text-primary)] md:text-[1.9rem]">
        {display}
      </p>
      <p className="mt-1.5 max-w-[7.5rem] font-nav text-[8px] font-semibold uppercase leading-tight tracking-[0.08em] text-[var(--text-primary)] sm:text-[9px]">
        {label}
      </p>
      <p className="mt-1 max-w-[9rem] text-[10px] leading-snug text-[var(--text-muted)] sm:text-[11px]">
        {blurb}
      </p>
    </div>
  );
}

export function DemoAuditRings({ audit }: { audit: ProjectAudit }) {
  const reduceMotion = useReducedMotion();
  const compact = useIsCompactViewport();
  const scores = compact ? audit.mobile : audit.desktop;
  const formLabel = compact ? "Mobil" : "Desktop";

  return (
    <div className="border-t border-[var(--line-on-dark)] pt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-[10px] tracking-[0.16em] text-[var(--accent-hover)]">
          {audit.label}
          <span className="ml-2 font-normal tracking-[0.08em] text-[var(--text-muted)]">
            · {formLabel}
          </span>
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
        {METRICS.map((item) => (
          <SemiGauge
            key={`${formLabel}-${item.key}`}
            value={scores[item.key]}
            label={item.label}
            blurb={item.blurb}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <div className="mt-4 flex items-start gap-3">
        <Image
          src="/branding/pagespeed-insights-white.svg"
          alt=""
          width={28}
          height={28}
          className="mt-0.5 shrink-0 opacity-90"
          aria-hidden
        />
        <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
          {audit.attribution}
        </p>
      </div>
    </div>
  );
}
