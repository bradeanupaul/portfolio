"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  text: string;
  startDelay?: number;
  charMs?: number;
  reduceMotion?: boolean | null;
  className?: string;
  /** When false, typing is paused (e.g. waiting for intro). */
  active?: boolean;
};

/**
 * Layout-stable typewriter (invisible full string + absolute overlay).
 * No caret. Respects reduced motion.
 */
export function TypewriterText({
  text,
  startDelay = 200,
  charMs = 42,
  reduceMotion,
  className,
  active = true,
}: TypewriterTextProps) {
  const [shown, setShown] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) {
      setShown(text);
      return;
    }
    if (!active) {
      setShown("");
      return;
    }

    setShown("");
    let i = 0;
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) window.clearInterval(intervalId);
      }, charMs);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, startDelay, charMs, reduceMotion, active]);

  return (
    <span className={cn("relative block", className)}>
      <span className="invisible whitespace-pre-wrap" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0 whitespace-pre-wrap" aria-hidden>
        {shown}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
