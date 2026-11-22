"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ProjectAudit } from "@/data/audits";

const labels: { key: keyof ProjectAudit["scores"]; label: string }[] = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

const VIEW_W = 100;
const VIEW_H = 58;
const CX = 50;
const CY = 50;
const R = 40;
const STROKE = 2.5;
const ARC_LEN = Math.PI * R;
const NEEDLE_LEN = R - 8;

function SemiGauge({
  value,
  label,
  reduceMotion,
}: {
  value: number;
  label: string;
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
      <p className="mt-1.5 max-w-[7rem] font-nav text-[8px] leading-tight text-[var(--text-muted)] sm:text-[9px]">
        {label}
      </p>
    </div>
  );
}

export function DemoAuditRings({ audit }: { audit: ProjectAudit }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-[var(--line-on-dark)] pt-5">
      <p className="font-semibold text-[10px] tracking-[0.16em] text-[var(--accent-hover)]">
        {audit.label}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-1 sm:gap-3">
        {labels.map((item) => (
          <SemiGauge
            key={item.key}
            value={audit.scores[item.key]}
            label={item.label}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-[var(--text-muted)]">
        {audit.attribution}. Nu sunt rezultate măsurate Google.
      </p>
    </div>
  );
}
