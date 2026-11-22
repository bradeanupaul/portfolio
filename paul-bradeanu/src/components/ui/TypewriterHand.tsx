"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterHandProps = {
  text: string;
  startDelay?: number;
  reduceMotion?: boolean | null;
  className?: string;
  /** When true, sizes relative to parent (hero / contact headings). */
  relative?: boolean;
};

/**
 * Handwritten typewriter that reserves full text space (no layout jump)
 * and never shows a caret/cursor.
 */
export function TypewriterHand({
  text,
  startDelay = 500,
  reduceMotion,
  className,
  relative = false,
}: TypewriterHandProps) {
  const [shown, setShown] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) {
      setShown(text);
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
      }, 36);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, startDelay, reduceMotion]);

  return (
    <span
      className={cn(
        "font-hand relative block text-[var(--accent-hover)]",
        relative ? "hand-hero" : "hand-accent",
        className,
      )}
    >
      {/* Invisible full string locks width + height while typing */}
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
