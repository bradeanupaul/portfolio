"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Media } from "@/components/media";
import { getBySlugs } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const featured = {
  quote:
    "Glow Drops se așază în câteva secunde. Tenul arată mai treaz, fără film greu pe obraz.",
  name: "Mara D.",
  productSlug: "glow-drops",
  detail: "Textură fluidă, dimineața",
  image: "/assets/editorial/routine.webp",
};

const shorts = [
  {
    quote: "Cloud Cleanse lasă pielea confortabilă. Îl țin ca pas scurt înainte de ser.",
    name: "Andrei P.",
    productSlug: "cloud-cleanse",
  },
  {
    quote: "Night Reset e fluidul pe care îl deschid seara, când tenul cere ceva mai așezat.",
    name: "Ioana V.",
    productSlug: "night-reset",
  },
  {
    quote: "Dew Theory dispare rapid. Nu simt greutate, doar o piele mai așezată.",
    name: "Raluca M.",
    productSlug: "dew-theory",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-coral" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1.2l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.4 3.8 11.1l.6-3.6L1.8 5l3.6-.5L7 1.2z" />
        </svg>
      ))}
    </span>
  );
}

export function HomeTestimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const featuredProduct = getBySlugs([featured.productSlug])[0];
  const current = shorts[index] ?? shorts[0];
  const currentProduct = getBySlugs([current.productSlug])[0];

  function shift(dir: number) {
    setIndex((value) => (value + dir + shorts.length) % shorts.length);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <blockquote className="relative overflow-hidden rounded-[1.6rem] border border-line bg-white">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <Media
            src={featured.image}
            alt=""
            className="aspect-[4/5] md:aspect-auto md:min-h-full"
            sizes="(min-width: 768px) 30vw, 100vw"
            fit="cover"
            tone="lavender"
            pad="none"
          />
          <div className="flex flex-col justify-between p-7 md:p-9">
            <div>
              <Stars />
              <p className="pointer-events-none mt-2 font-display text-6xl leading-none text-lavender">
                „
              </p>
              <p className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-snug text-aubergine">
                {featured.quote}
              </p>
            </div>
            <footer className="mt-8 flex items-center gap-4">
              {featuredProduct ? (
                <div className="w-[5.5rem] overflow-hidden rounded-xl border border-line bg-white p-1.5">
                  <Media
                    src={featuredProduct.images.packshot}
                    alt=""
                    className="aspect-square"
                    sizes="88px"
                    fit="contain"
                    tone="white"
                    pad="none"
                  />
                </div>
              ) : null}
              <div>
                <p className="font-semibold text-aubergine">{featured.name}</p>
                <p className="text-sm text-ink">{featured.detail}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-orchid">
                  Exemplu de recenzie
                </p>
              </div>
            </footer>
          </div>
        </div>
      </blockquote>

      <div className="flex flex-col justify-between rounded-[1.6rem] border border-line bg-blush/35 p-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
            Alte voci
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Recenzia anterioară"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white transition active:scale-95"
              onClick={() => shift(-1)}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Recenzia următoare"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white transition active:scale-95"
              onClick={() => shift(1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="relative min-h-[12rem] pt-6">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.name}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -10 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-x-0 top-6"
            >
              <p className="text-lg leading-8 text-aubergine">„{current.quote}”</p>
              <footer className="mt-5 flex items-center gap-3 text-sm">
                {currentProduct ? (
                  <div className="w-20 overflow-hidden rounded-xl border border-line bg-white p-1">
                    <Media
                      src={currentProduct.images.packshot}
                      alt=""
                      className="aspect-square"
                      sizes="80px"
                      fit="contain"
                      tone="white"
                      pad="none"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="font-semibold text-aubergine">{current.name}</p>
                  <p className="text-ink">{currentProduct?.name}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-1.5">
          {shorts.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Recenzie ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition",
                i === index ? "bg-aubergine" : "bg-line",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
