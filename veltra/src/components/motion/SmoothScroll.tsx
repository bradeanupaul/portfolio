"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RouteScrollReset } from "@/components/motion/RouteScrollReset";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function LenisScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const w = window as Window & {
      __lenis?: typeof lenis;
      ScrollTrigger?: typeof ScrollTrigger;
    };
    w.ScrollTrigger = ScrollTrigger;

    if (!lenis) {
      const onWinScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onWinScroll, { passive: true });
      ScrollTrigger.refresh();
      return () => window.removeEventListener("scroll", onWinScroll);
    }

    // Expose for video capture / tooling
    w.__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      if (w.__lenis === lenis) delete w.__lenis;
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.05,
        anchors: false,
        // Never swallow clicks on links / form controls
        prevent: (node) => {
          if (!(node instanceof HTMLElement)) return false;
          return Boolean(node.closest("[data-lenis-prevent]"));
        },
      }}
    >
      <LenisScrollTriggerBridge />
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
