"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/types";
import { cn } from "@/lib/utils";

export interface MenuCategoryTabsProps {
  categories: Pick<MenuCategory, "slug" | "name">[];
  className?: string;
}

export function MenuCategoryTabs({ categories, className }: MenuCategoryTabsProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const ignoreSpyRef = useRef(false);

  const syncTabsHeight = useCallback(() => {
    const height = navRef.current?.offsetHeight ?? 56;
    document.documentElement.style.setProperty("--menu-tabs-height", `${height}px`);
  }, []);

  useEffect(() => {
    syncTabsHeight();
    window.addEventListener("resize", syncTabsHeight);
    return () => window.removeEventListener("resize", syncTabsHeight);
  }, [syncTabsHeight]);

  const scrollToCategory = useCallback((slug: string) => {
    const target = document.getElementById(`meniu-${slug}`);
    if (!target) return;

    setActiveSlug(slug);
    ignoreSpyRef.current = true;

    const header = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 72;
    const tabs = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--menu-tabs-height"),
    ) || 56;
    const offset = header + tabs + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    window.setTimeout(() => {
      ignoreSpyRef.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const elements = categories
      .map((category) => document.getElementById(`meniu-${category.slug}`))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreSpyRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) {
          setActiveSlug(top.target.id.replace(/^meniu-/, ""));
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.45],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const activeButton = tabsRef.current?.querySelector<HTMLButtonElement>(
      `[data-slug="${activeSlug}"]`,
    );
    activeButton?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeSlug]);

  return (
    <nav
      ref={navRef}
      aria-label="Categorii meniu"
      className={cn(
        "sticky z-40 border-b border-bn-border bg-bn-bg/94 backdrop-blur-xl",
        className,
      )}
      style={{ top: "var(--header-height)" }}
    >
      <div
        ref={tabsRef}
        className="bn-container flex gap-2 overflow-x-auto py-3 scrollbar-none"
      >
        {categories.map((category) => {
          const active = category.slug === activeSlug;
          return (
            <button
              key={category.slug}
              type="button"
              data-slug={category.slug}
              onClick={() => scrollToCategory(category.slug)}
              className={cn(
                "shrink-0 rounded-sm border px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-xs",
                active
                  ? "border-bn-gold bg-bn-gold/15 text-bn-gold-light"
                  : "border-bn-border bg-bn-bg-elevated text-bn-text-muted hover:border-bn-gold/45 hover:text-bn-text",
              )}
              aria-current={active ? "true" : undefined}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
