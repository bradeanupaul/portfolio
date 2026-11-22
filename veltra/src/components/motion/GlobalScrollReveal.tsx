"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const UNIT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "figure",
  "article",
  "aside",
  "form",
  "label",
  "dl",
  "dt",
  "dd",
  "blockquote",
  "table",
  "tr",
  "nav",
  "ul",
  "ol",
  "button",
  ".btn",
  "a.btn",
  ".media-frame",
  "[class*='aspect-']",
  "iframe",
  "img",
  "input",
  "select",
  "textarea",
  "video",
].join(",");

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isSkippable(el: Element) {
  if (!(el instanceof HTMLElement)) return true;
  // Skip nodes already animated by Framer Motion Reveal
  if (el.hasAttribute("data-motion-reveal") || el.closest("[data-motion-reveal]")) return true;
  // Never opacity-hide a container that wraps Motion reveals (traps curtain images at 0)
  if (el.querySelector?.("[data-motion-reveal]")) return true;
  if (el.hasAttribute("data-no-reveal")) return true;
  if (el.closest("[data-no-reveal], header.fixed, #mobile-menu, .skip-link")) return true;
  if (el.getAttribute("aria-hidden") === "true") return true;
  if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "SVG" || el.tagName === "PATH") {
    return true;
  }
  if (el.hidden || el.classList.contains("sr-only")) return true;
  // Images / media frames are revealed by Motion (RevealImage curtains) — skip CSS opacity layer
  if (el.matches("img, video, iframe, canvas, picture, .media-frame, [class*='aspect-']")) return true;
  if (el.querySelector(":scope > img, :scope > video, :scope > picture")) return true;
  const text = el.textContent?.trim() ?? "";
  const hasMedia = Boolean(
    el.matches("img, video, iframe, canvas") ||
      el.querySelector(":scope > img, :scope > video, :scope > iframe, :scope > canvas"),
  );
  if (!text && !hasMedia && !el.matches("input, select, textarea, button, iframe, img, video, .btn, a.btn")) {
    return true;
  }
  return false;
}

function isParentOfOtherUnit(el: Element, units: Element[]) {
  return units.some((other) => other !== el && el.contains(other));
}

function collectUnits(root: ParentNode) {
  const found = [...root.querySelectorAll(UNIT_SELECTOR)];
  const filtered = found.filter((el) => !isSkippable(el));
  return filtered.filter((el) => !isParentOfOtherUnit(el, filtered));
}

function inViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > 0 && rect.top < vh * 0.98;
}

/**
 * Site-wide leaf-unit scroll reveal for main + footer.
 * Idempotent: keeps already-visible nodes, only observes new ones.
 */
export function GlobalScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let observer: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let timer: number | undefined;
    const observed = new WeakSet<Element>();

    const reveal = (el: Element) => {
      el.classList.add("scroll-reveal-visible");
      observer?.unobserve(el);
    };

    const ensureObserver = () => {
      if (observer) return observer;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal(entry.target);
          }
        },
        // Reveal a bit early so images aren't blank while scrolling on mobile
        { root: null, rootMargin: "12% 0px 18% 0px", threshold: [0, 0.02, 0.08] },
      );
      return observer;
    };

    const scan = () => {
      if (prefersReducedMotion()) {
        document.querySelectorAll(".scroll-reveal").forEach((el) => {
          el.classList.add("scroll-reveal-visible");
        });
        return;
      }

      const roots = [
        document.getElementById("continut-principal"),
        document.querySelector("footer"),
      ].filter((n): n is HTMLElement => n instanceof HTMLElement);

      const obs = ensureObserver();

      for (const root of roots) {
        const units = collectUnits(root);
        units.forEach((el, index) => {
          if (!(el instanceof HTMLElement)) return;
          if (!el.classList.contains("scroll-reveal")) {
            el.classList.add("scroll-reveal");
            el.style.setProperty("--reveal-delay", `${Math.min((index % 8) * 0.05, 0.35)}s`);
          }
          if (el.classList.contains("scroll-reveal-visible")) return;
          if (inViewport(el)) {
            reveal(el);
            return;
          }
          if (!observed.has(el)) {
            observed.add(el);
            obs.observe(el);
          }
        });
      }
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 60);
    };

    schedule();
    window.addEventListener("scroll", scan, { passive: true });
    window.addEventListener("resize", schedule);

    // Safety: never leave near-viewport media stuck at opacity 0
    const safety = window.setInterval(() => {
      document.querySelectorAll(".scroll-reveal:not(.scroll-reveal-visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        if (rect.top < vh * 1.35 && rect.bottom > -vh * 0.2) reveal(el);
      });
    }, 900);

    mo = new MutationObserver(schedule);
    const main = document.getElementById("continut-principal");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(safety);
      window.removeEventListener("scroll", scan);
      window.removeEventListener("resize", schedule);
      mo?.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
