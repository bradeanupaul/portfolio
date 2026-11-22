"use client";

import { useEffect } from "react";

/**
 * Native smooth scrolling for same-page anchors + hash changes.
 * Respects prefers-reduced-motion. No third-party scroll lock.
 */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    const applyBehavior = () => {
      root.style.scrollBehavior = media.matches ? "auto" : "smooth";
    };
    applyBehavior();

    const onClick = (event: MouseEvent) => {
      if (media.matches) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    };

    media.addEventListener("change", applyBehavior);
    document.addEventListener("click", onClick);
    return () => {
      media.removeEventListener("change", applyBehavior);
      document.removeEventListener("click", onClick);
      root.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
