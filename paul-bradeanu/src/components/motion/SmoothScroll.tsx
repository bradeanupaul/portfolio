"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisRef: Lenis | null = null;

/** Instant jump to top (route changes) — bypasses smooth easing. */
export function scrollWindowToTop() {
  if (lenisRef) {
    lenisRef.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

/**
 * Site-wide inertia smooth scrolling via Lenis.
 * Disabled when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      // Shorter inertia = less continuous rAF work while scrolling
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
    });
    lenisRef = lenis;
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onReduceChange = () => {
      if (reduce.matches) {
        lenis.destroy();
        lenisRef = null;
        cancelAnimationFrame(raf);
      }
    };
    reduce.addEventListener("change", onReduceChange);

    return () => {
      reduce.removeEventListener("change", onReduceChange);
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (lenisRef === lenis) lenisRef = null;
      const w = window as Window & { __lenis?: Lenis };
      if (w.__lenis === lenis) delete w.__lenis;
    };
  }, []);

  return null;
}
