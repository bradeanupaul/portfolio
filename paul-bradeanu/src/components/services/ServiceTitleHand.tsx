"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useMotionReady } from "@/components/motion/Reveal";

export function ServiceTitleHand({
  before,
  handWord,
  delay = 120,
}: {
  before: string;
  handWord: string;
  after?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ready = useMotionReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -12% 0px",
  });
  const active = ready && inView;
  const [shown, setShown] = useState(reduceMotion ? handWord : "");

  useEffect(() => {
    if (reduceMotion) {
      setShown(handWord);
      return;
    }

    if (!active) return;

    setShown("");
    let i = 0;
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setShown(handWord.slice(0, i));
        if (i >= handWord.length) window.clearInterval(intervalId);
      }, 42);
    }, delay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [handWord, delay, reduceMotion, active]);

  return (
    <span ref={ref} className="inline">
      <span aria-hidden="true" className="inline">
        {before}{" "}
        <span className="font-hand hand-inline relative inline-block text-[var(--accent-hover)]">
          <span className="invisible">{handWord}</span>
          <span className="absolute inset-0">{shown}</span>
        </span>
      </span>
      <span className="sr-only">
        {before} {handWord}
      </span>
    </span>
  );
}
