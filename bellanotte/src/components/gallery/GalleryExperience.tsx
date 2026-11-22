"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import type { GalleryItem } from "@/types";
import { cn } from "@/lib/utils";
import { galleryCategories, galleryCategoryLabels } from "./gallery-labels";

type GalleryExperienceProps = {
  items: GalleryItem[];
};

const GROUP_SIZE = 6;

const DESKTOP_SLOTS: readonly string[] = [
  "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[440px]",
  "md:col-span-5 min-h-[240px] md:min-h-[320px]",
  "md:col-span-4 min-h-[220px] md:min-h-[300px]",
  "md:col-span-4 min-h-[220px] md:min-h-[300px]",
  "md:col-span-8 min-h-[220px] md:min-h-[300px]",
  "md:col-span-4 min-h-[220px] md:min-h-[280px]",
];

const MOBILE_SLOTS: readonly string[] = [
  "col-span-1 sm:col-span-2 min-h-[280px] sm:min-h-[340px]",
  "col-span-1 sm:col-span-1 min-h-[240px] sm:min-h-[300px]",
  "col-span-1 sm:col-span-1 min-h-[240px] sm:min-h-[300px]",
  "col-span-1 sm:col-span-2 min-h-[260px] sm:min-h-[320px]",
  "col-span-1 sm:col-span-1 min-h-[220px] sm:min-h-[280px]",
  "col-span-1 sm:col-span-1 min-h-[220px] sm:min-h-[280px]",
];

function spanOverrideClass(item: GalleryItem): string | null {
  if (item.span === "hero") return "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[460px]";
  if (item.span === "wide") return "md:col-span-8 min-h-[240px] md:min-h-[320px]";
  if (item.span === "tall") return "md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-[440px]";
  if (item.aspectRatio === "portrait") return "md:col-span-5 min-h-[260px] md:min-h-[360px]";
  return null;
}

function editorialClass(item: GalleryItem, slotIndex: number): string {
  const override = spanOverrideClass(item);
  const desktop = override ?? DESKTOP_SLOTS[slotIndex % DESKTOP_SLOTS.length];
  const mobile = MOBILE_SLOTS[slotIndex % MOBILE_SLOTS.length];
  if (override && (item.span === "hero" || item.span === "wide")) {
    return cn("col-span-1 sm:col-span-2 min-h-[280px] sm:min-h-[360px]", override);
  }
  return cn(mobile, desktop);
}

function chunkGroups(list: GalleryItem[]): GalleryItem[][] {
  const groups: GalleryItem[][] = [];
  for (let i = 0; i < list.length; i += GROUP_SIZE) {
    groups.push(list.slice(i, i + GROUP_SIZE));
  }
  return groups;
}

function cardMotion(slotIndex: number) {
  const pattern = slotIndex % 4;
  if (pattern === 0) {
    return {
      hidden: { opacity: 0, y: 72, scale: 0.92, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    };
  }
  if (pattern === 1) {
    return {
      hidden: { opacity: 0, y: 48, x: -28, rotate: -1.5, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, x: 0, rotate: 0, filter: "blur(0px)" },
    };
  }
  if (pattern === 2) {
    return {
      hidden: { opacity: 0, y: 48, x: 28, rotate: 1.5, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, x: 0, rotate: 0, filter: "blur(0px)" },
    };
  }
  return {
    hidden: {
      opacity: 0,
      scale: 1.08,
      clipPath: "inset(12% 10% 12% 10%)",
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      filter: "blur(0px)",
    },
  };
}

export function GalleryExperience({ items }: GalleryExperienceProps) {
  const dialogTitleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<GalleryItem["category"] | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const groups = useMemo(() => chunkGroups(filtered), [filtered]);

  const openLightbox = useCallback(
    (id: string) => {
      const index = filtered.findIndex((item) => item.id === id);
      if (index >= 0) setLightboxIndex(index);
    },
    [filtered],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, lightboxIndex, step]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-bn-text-muted">
          <Images className="size-4 text-bn-gold" aria-hidden />
          <p className="text-sm">
            <span className="font-medium text-bn-text">{filtered.length}</span> cadre
          </p>
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible"
          role="tablist"
          aria-label="Filtre galerie"
        >
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="Toate" />
          {galleryCategories.map((category) => (
            <FilterChip
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
              label={galleryCategoryLabels[category]}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 space-y-14 sm:space-y-20"
        >
          {groups.map((group, groupIndex) => (
            <section
              key={`gallery-group-${filter}-${groupIndex}-${group[0]?.id ?? "empty"}`}
              aria-label={`Grup editorial ${groupIndex + 1}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <Camera className="size-3.5 text-bn-gold" aria-hidden />
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-bn-text-dim">
                  Capitol {groupIndex + 1}
                </p>
                <span className="h-px flex-1 bg-bn-border/60" aria-hidden />
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-12 md:gap-5">
                {group.map((item, slotIndex) => (
                  <motion.li
                    key={item.id}
                    className={cn("group relative overflow-hidden will-change-transform", editorialClass(item, slotIndex))}
                    variants={cardMotion(slotIndex)}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{
                      once: false,
                      amount: 0.28,
                      margin: "0px 0px -12% 0px",
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.75,
                      delay: reduceMotion ? 0 : slotIndex * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(item.id)}
                      className="relative block h-full min-h-[inherit] w-full overflow-hidden border border-bn-border/70 text-left transition-[border-color,transform] duration-500 hover:border-bn-gold"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bn-image-scrim opacity-95 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden
                      />
                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-bn-gold">
                          {galleryCategoryLabels[item.category]}
                        </p>
                        <p className="mt-1.5 font-display text-xl text-[#F8F5EE] sm:text-2xl">
                          {item.title}
                        </p>
                        {item.caption ? (
                          <p className="mt-1 line-clamp-2 text-sm text-[#E2D8C9]">{item.caption}</p>
                        ) : null}
                        <span className="mt-3 inline-flex translate-y-1 items-center gap-1 text-xs uppercase tracking-[0.16em] text-bn-gold opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                          Deschide
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </span>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 outline-none"
          onClick={closeLightbox}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current == null) return;
            const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (Math.abs(delta) > 50) step(delta > 0 ? -1 : 1);
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm border border-bn-border p-2 text-bn-text hover:border-bn-gold"
            onClick={closeLightbox}
            aria-label="Închide galeria"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-sm border border-bn-border p-2 text-bn-text hover:border-bn-gold sm:left-6"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Imaginea anterioară"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm border border-bn-border p-2 text-bn-text hover:border-bn-gold sm:right-6"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Imaginea următoare"
          >
            <ChevronRight className="size-6" />
          </button>
          <div
            className="relative flex max-h-[85vh] w-full max-w-5xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bn-bg">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain object-center"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bn-gold">
                {galleryCategoryLabels[active.category]}
              </p>
              <h2 id={dialogTitleId} className="mt-1 font-display text-2xl text-bn-heading sm:text-3xl">
                {active.title}
              </h2>
              {active.caption ? (
                <p className="mt-2 text-sm text-bn-text-muted">{active.caption}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-sm border px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors",
        active
          ? "border-bn-gold bg-bn-gold/10 text-bn-gold"
          : "border-bn-border text-bn-text-muted hover:border-bn-gold/60 hover:text-bn-text",
      )}
    >
      {label}
    </button>
  );
}
