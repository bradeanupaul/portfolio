"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useMarkIntroReady } from "@/components/motion/IntroContext";
import { cn } from "@/lib/utils";

const SESSION_KEY = "vantaink-intro-seen";
const TOTAL_MS = 1800;
/** Longer sequence when ?replayIntro=1 so QA can capture mid-frames. */
const REPLAY_TOTAL_MS = 5200;
const EXIT_MS = 420;
const SAFETY_MS = 2400;
const REPLAY_SAFETY_MS = 7000;

function readReplayFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("replayIntro") === "1";
  } catch {
    return false;
  }
}

function readSeen(): boolean {
  if (typeof window === "undefined") return true;
  if (readReplayFlag()) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return true;
  }
}

type Phase = "pending" | "boot" | "monogram" | "wordmark" | "sweep" | "split" | "exit" | "done";

/**
 * Branded intro shown once per browser session.
 * QA: append ?replayIntro=1 to force replay. Respects prefers-reduced-motion.
 */
export function IntroOverlay() {
  const reduceMotion = useReducedMotion();
  const markIntroReady = useMarkIntroReady();
  const [phase, setPhase] = useState<Phase>("pending");

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const finish = useCallback(() => {
    setPhase((current) =>
      current === "done" || current === "exit" ? current : "exit",
    );
  }, []);

  useEffect(() => {
    if (phase === "done") markIntroReady();
  }, [phase, markIntroReady]);

  useEffect(() => {
    const timers: number[] = [];
    const replay = readReplayFlag();
    // Treat null/unknown as "motion allowed". Only explicit `true` skips
    // (unless ?replayIntro=1 forces the sequence for QA).
    if (!replay && (reduceMotion === true || readSeen())) {
      markSeen();
      timers.push(window.setTimeout(() => setPhase("done"), 0));
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    const total = replay ? REPLAY_TOTAL_MS : TOTAL_MS;
    const safety = replay ? REPLAY_SAFETY_MS : SAFETY_MS;
    const scale = total / TOTAL_MS;

    const schedule = (next: Phase, at: number) => {
      timers.push(window.setTimeout(() => setPhase(next), Math.round(at * scale)));
    };

    schedule("boot", 0);
    schedule("monogram", 80);
    schedule("wordmark", 420);
    schedule("sweep", 820);
    schedule("split", 1180);
    schedule("exit", TOTAL_MS);
    timers.push(window.setTimeout(finish, safety));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduceMotion, finish, markSeen]);

  useEffect(() => {
    if (phase !== "exit") return;
    markSeen();
    const timer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, markSeen]);

  useEffect(() => {
    if (phase === "done" || phase === "pending" || phase === "exit") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done" || phase === "pending") return null;

  const exiting = phase === "exit" || phase === "split";
  const showMonogram =
    phase === "monogram" ||
    phase === "wordmark" ||
    phase === "sweep" ||
    phase === "split" ||
    phase === "exit";
  const showWordmark =
    phase === "wordmark" ||
    phase === "sweep" ||
    phase === "split" ||
    phase === "exit";
  const showSweep =
    phase === "sweep" || phase === "split" || phase === "exit";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg",
        exiting && "pointer-events-none",
      )}
      role="presentation"
      aria-hidden="true"
      data-intro-phase={phase}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-bg transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          exiting ? "-translate-y-full" : "translate-y-0",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 bg-bg transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          exiting ? "translate-y-full" : "translate-y-0",
        )}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-7 transition-opacity duration-300",
          exiting ? "opacity-0" : "opacity-100",
        )}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 48 48"
          fill="none"
          className="text-text"
          aria-hidden
        >
          <path
            d="M22 4h14L24.5 44H12.5L22 4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              strokeDasharray: 110,
              strokeDashoffset: showMonogram ? 0 : 110,
              transition: "stroke-dashoffset 0.55s ease-out, opacity 0.4s",
              opacity: showMonogram ? 1 : 0,
            }}
          />
          <path
            d="M6 4h10.5L12.2 20H4.5L6 4ZM10 26h11L17.8 44H8L10 26Z"
            fill="currentColor"
            style={{
              transition: "opacity 0.4s",
              opacity: showMonogram ? 1 : 0,
            }}
          />
          <rect
            x="6.5"
            y="21"
            width="18"
            height="3.2"
            fill="#FF5538"
            transform="rotate(-17 15.5 22.6)"
            style={{
              transition: "opacity 0.35s",
              opacity: showSweep ? 1 : 0,
            }}
          />
        </svg>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            showWordmark ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0",
          )}
        >
          <Image
            src="/brand/vanta-wordmark-white.png"
            alt=""
            width={200}
            height={36}
            className="h-7 w-auto max-w-none"
            priority
          />
        </div>

        <div className="h-px w-40 overflow-hidden bg-line">
          <div
            className={cn(
              "h-full bg-accent transition-[width] duration-500 ease-out",
              showSweep ? "w-full" : "w-0",
            )}
          />
        </div>
      </div>
    </div>
  );
}
