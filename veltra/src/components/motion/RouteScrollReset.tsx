"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

function revertPinnedTriggers() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.getAll().forEach((trigger) => {
    try {
      trigger.kill(true);
    } catch {
      /* ignore */
    }
  });
  try {
    ScrollTrigger.clearScrollMemory?.();
  } catch {
    /* ignore */
  }
}

/**
 * GSAP pin mutates the DOM (pin-spacer). Soft-nav must revert that
 * before React unmounts, or Next throws removeChild NotFoundError.
 */
export function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const first = useRef(true);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const onPointerDown = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      // External absolute URLs
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) return;
      revertPinnedTriggers();
      try {
        lenisRef.current?.start();
      } catch {
        /* ignore */
      }
    };

    // Capture phase: run before Next.js Link / React handlers
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onPointerDown, true);
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    revertPinnedTriggers();
    ScrollTrigger.refresh();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    const l = lenisRef.current;
    try {
      l?.start();
      l?.scrollTo(0, { immediate: true, force: true });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
