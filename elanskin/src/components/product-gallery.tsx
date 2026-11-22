"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Media } from "@/components/media";
import type { ProductGalleryImage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductGallery({
  productId,
  frames,
}: {
  productId: string;
  frames: ProductGalleryImage[];
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);
  const frame = frames[active] ?? frames[0];

  useEffect(() => {
    setActive(0);
  }, [productId]);

  useEffect(() => {
    if (!frame) return;
    const next = frames[(active + 1) % frames.length];
    const prev = frames[(active - 1 + frames.length) % frames.length];
    for (const item of [next, prev]) {
      if (!item) continue;
      const img = new window.Image();
      img.src = item.src;
    }
  }, [active, frame, frames]);

  useEffect(() => {
    if (!zoom) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setZoom(false);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, frames.length]);

  function go(delta: number) {
    setActive((current) => (current + delta + frames.length) % frames.length);
  }

  if (!frame) return null;

  const tone = frame.backgroundTone === "white" ? "white" : "lavender";

  return (
    <div>
      <div
        className="relative aspect-[4/5] max-h-[min(72vh,40rem)] overflow-hidden rounded-[1.35rem] bg-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchid"
        tabIndex={0}
        role="group"
        aria-label="Galeria produsului"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
          }
        }}
        onTouchStart={(event) => {
          touchX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchX.current;
          const end = event.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          go(delta < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={1}>
          <motion.div
            key={frame.id}
            className="absolute inset-0 bg-white"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Media
              src={frame.src}
              alt={frame.alt}
              className="h-full w-full bg-white"
              priority={active === 0}
              fit={frame.fit}
              tone={tone}
              pad="none"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Imaginea anterioară"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-aubergine shadow-soft transition active:scale-95"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Imaginea următoare"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-aubergine shadow-soft transition active:scale-95"
              onClick={() => go(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="rounded-full bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-plum shadow-soft">
            {frame.caption}
          </p>
          <button
            type="button"
            className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-aubergine shadow-soft transition active:scale-95"
            onClick={() => setZoom(true)}
          >
            Mărește
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {frames.map((image, index) => (
          <button
            key={image.id}
            type="button"
            aria-label={image.caption}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className={cn(
              "w-[4.75rem] shrink-0 overflow-hidden rounded-xl border-2 transition sm:w-[5.25rem]",
              index === active ? "border-aubergine" : "border-transparent opacity-80 hover:opacity-100",
            )}
          >
            <Media
              src={image.src}
              alt=""
              className="aspect-square"
              sizes="96px"
              fit={image.fit}
              tone={image.backgroundTone === "white" ? "white" : "lavender"}
              pad="none"
            />
          </button>
        ))}
      </div>

      {zoom ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-midnight/85 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Imagine mărită"
        >
          <button
            type="button"
            className="absolute right-5 top-5 inline-flex items-center gap-2 text-sm text-white"
            onClick={() => setZoom(false)}
          >
            <X size={16} />
            Închide
          </button>
          <div className="relative h-[min(82vh,760px)] w-full max-w-3xl overflow-hidden rounded-[1.4rem] bg-white">
            <Media
              src={frame.src}
              alt={frame.alt}
              className="h-full w-full"
              fit={frame.fit}
              tone={tone}
              pad={frame.fit === "contain" ? "sm" : "none"}
            />
          </div>
          <p className="mt-4 text-sm text-white/85">{frame.caption}</p>
        </div>
      ) : null}
    </div>
  );
}
