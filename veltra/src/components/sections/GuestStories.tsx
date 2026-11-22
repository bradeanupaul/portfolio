"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { cn } from "@/lib/utils";

const stories = [
  {
    quote: "Dimineți liniștite, apă caldă și seri care se prelungesc firesc.",
    note: "Un weekend scurt, fără agendă: mic dejun, pădure, ciubăr.",
    lens: "Cuplu",
  },
  {
    quote: "Am venit pentru camere și am rămas pentru ritmul locului.",
    note: "Drumeție dimineața, masă lungă seara, fără ecrane pe masă.",
    lens: "Weekend",
  },
  {
    quote: "Copiii pe traseu, noi la foc. Exact ce căutam.",
    note: "O zi pe afară, apoi lounge și conversații până târziu.",
    lens: "Familie",
  },
  {
    quote: "Piscina la amurg a schimbat tot weekendul.",
    note: "După saună, apa rece și crestele în oglindă. Puține cuvinte, multă liniște.",
    lens: "Piscină",
  },
  {
    quote: "Cina la ARBOR a ținut pasul cu peisajul.",
    note: "Mese fără grabă, lemn cald, preparate de sezon. Am prelungit desertul intenționat.",
    lens: "Restaurant",
  },
  {
    quote: "Focul de pe terasă a ținut grupul împreună.",
    note: "Am venit șase prieteni. Seara s-a întins natural, fără program forțat.",
    lens: "Grup",
  },
  {
    quote: "Iarna aici are un alt sunet.",
    note: "Zăpadă pe branamente, ciubăr aburind, camere care țin căldura. Un weekend scurt, memorabil.",
    lens: "Iarnă",
  },
  {
    quote: "Traseul de dimineață a deschis ziua cum trebuie.",
    note: "Aer curat, ritm liber, apoi cafea pe terasă. Locul îți lasă spațiu să respiri.",
    lens: "Drumeție",
  },
] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-clay" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("h-[18px] w-[18px]", i < rating ? "opacity-100" : "opacity-25")}
          fill="currentColor"
        >
          <path d="M10 1.8 12.4 7l5.6.5-4.3 3.7 1.3 5.5L10 13.8 4.9 16.7l1.3-5.5L2 7.5 7.6 7 10 1.8Z" />
        </svg>
      ))}
    </div>
  );
}

export function GuestStories() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const story = stories[active]!;
  const listId = useId();
  const total = stories.length;
  const indexLabel = `${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28" aria-labelledby="stories-heading">
      <div className="hero-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:items-start">
          <div>
            <RevealStagger>
              <RevealItem>
                <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Atmosfera VELTRA</p>
              </RevealItem>
              <RevealItem>
                <h2
                  id="stories-heading"
                  className="mt-3 max-w-[16ch] font-serif text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.08] text-ink text-balance"
                >
                  Momente care rămân <HandwrittenAccent>cu tine</HandwrittenAccent>
                </h2>
              </RevealItem>

              <RevealItem>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Stars rating={5} />
                  <p className="text-sm text-ink/65">Rating ilustrativ</p>
                  <span className="font-serif text-sm tracking-wide text-ink/45" aria-live="polite">
                    {indexLabel}
                  </span>
                </div>
              </RevealItem>
              <RevealItem>
                <p className="mt-2 max-w-[42ch] text-sm text-ink/55">
                  Impresii fictive, create pentru acest proiect demonstrativ. Nu reprezintă recenzii reale.
                </p>
              </RevealItem>
            </RevealStagger>

            <div className="relative mt-8 min-h-[13.5rem]" data-no-reveal>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-clay uppercase">
                    {story.lens}
                  </p>
                  <p className="mt-3 max-w-[22ch] font-serif text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.15] text-ink">
                    {story.quote}
                  </p>
                  <p className="mt-4 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink/70">{story.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Reveal className="mt-8 flex items-center gap-4" data-no-reveal>
              <button
                type="button"
                className="rounded-full border border-ink/15 px-3.5 py-2 text-sm text-ink/70 transition hover:border-ink/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                onClick={() => setActive((v) => (v - 1 + total) % total)}
                aria-label="Impresia anterioară"
              >
                Anterior
              </button>
              <button
                type="button"
                className="rounded-full border border-ink/15 px-3.5 py-2 text-sm text-ink/70 transition hover:border-ink/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                onClick={() => setActive((v) => (v + 1) % total)}
                aria-label="Impresia următoare"
              >
                Următor
              </button>
            </Reveal>

            <Reveal className="mt-8">
              <Button href="/rezervari" variant="copper" arrow>
                Planifică un weekend
              </Button>
            </Reveal>
          </div>

          <div
            id={listId}
            className="border-t border-ink/12 lg:border-t-0 lg:border-l lg:pl-8"
            role="tablist"
            aria-label="Impresii ilustrative"
          >
          <RevealStagger>
            {stories.map((item, i) => {
              const selected = i === active;
              return (
                <RevealItem key={item.quote}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full gap-3 border-b border-ink/12 py-4 text-left transition first:pt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
                    selected ? "text-ink" : "text-ink/45 hover:text-ink/70",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1 shrink-0 font-serif text-sm tracking-wide",
                      selected ? "text-clay" : "text-ink/30",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.15rem] leading-snug md:text-[1.28rem]">
                      {item.quote}
                    </span>
                    <span
                      className={cn(
                        "mt-2.5 block h-px w-12 origin-left bg-clay transition",
                        selected ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden
                    />
                  </span>
                </button>
                </RevealItem>
              );
            })}
          </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
