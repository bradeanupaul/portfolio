"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { cn } from "@/lib/utils";

const seasons = [
  {
    name: "Primăvară",
    mark: "01",
    text: "Trasee moi, aer umed, pădure care se trezește. Ideal pentru drumeții scurte și cafea pe terasă.",
    src: "/images/home/experience-hiking.jpg",
  },
  {
    name: "Vară",
    mark: "02",
    text: "Zile lungi, piscină încălzită seara, grătar pe terasă și plimbări până la apus.",
    src: "/images/facilities/pool-dusk.jpg",
  },
  {
    name: "Toamnă",
    mark: "03",
    text: "Culori calde, foc de seară, mese lungi și aer uscat de pădure.",
    src: "/images/experiences/campfire.jpg",
  },
  {
    name: "Iarnă",
    mark: "04",
    text: "Abur din ciubăr, lumină joasă în lounge și peisaj alb printre conifere.",
    src: "/images/home/hot-tub-evening.jpg",
  },
] as const;

export function SurroundingsPreview() {
  const [active, setActive] = useState(1);
  const reduce = useReducedMotion();
  const current = seasons[active]!;

  return (
    <section className="overflow-hidden bg-forest-ink py-20 md:py-28" aria-labelledby="seasons-heading">
      <div className="hero-shell">
        <RevealStagger>
          <RevealItem>
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-sand uppercase">Dincolo de VELTRA</p>
          </RevealItem>
          <RevealItem>
            <h2
              id="seasons-heading"
              className="mt-3 max-w-3xl font-serif text-[clamp(2.3rem,4.5vw,3.7rem)] leading-[1.08] text-ivory text-balance"
            >
              Fiecare anotimp are <HandwrittenAccent className="text-sand">farmecul lui</HandwrittenAccent>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 max-w-[44ch] text-[1.08rem] leading-relaxed text-ivory/78">
              Valea din jurul lodjei își schimbă ritmul: trasee, apă, foc și liniște, în funcție de sezon.
            </p>
          </RevealItem>
        </RevealStagger>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12">
          <RevealStagger className="order-2 border-t border-ivory/15 lg:order-1">
            {seasons.map((season, i) => {
              const open = i === active;
              return (
                <RevealItem key={season.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "grid w-full grid-cols-[3rem_1fr] gap-4 border-b border-ivory/15 py-5 text-left transition md:grid-cols-[3.5rem_1fr]",
                    open ? "text-ivory" : "text-ivory/42 hover:text-ivory/75",
                  )}
                  aria-pressed={open}
                >
                  <span className={cn("pt-1 font-serif text-sm tracking-wide", open ? "text-sand" : "text-ivory/35")}>
                    {season.mark}
                  </span>
                  <span>
                    <span className="block font-serif text-[1.65rem] leading-tight md:text-[1.9rem]">{season.name}</span>
                    <span className="mt-2 block max-w-xl text-[1.02rem] leading-relaxed opacity-90">{season.text}</span>
                    <span
                      className={cn(
                        "mt-4 block h-px origin-left bg-sand transition",
                        open ? "w-16 scale-x-100" : "w-16 scale-x-0",
                      )}
                      aria-hidden
                    />
                  </span>
                </button>
                </RevealItem>
              );
            })}
          </RevealStagger>

          <div
            className="order-1 relative min-h-[16rem] overflow-hidden bg-ivory/5 md:min-h-[22rem] lg:order-2 lg:min-h-full"
            data-no-reveal
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                className="absolute inset-0"
                initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.src}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <RevealStagger className="mt-10 flex flex-wrap gap-3">
          <RevealItem>
            <Button href="/imprejurimi" variant="sand" arrow>
              Explorează împrejurimile
            </Button>
          </RevealItem>
          <RevealItem>
            <Button href="/experiente" variant="ghost-dark">
              Vezi experiențele
            </Button>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
