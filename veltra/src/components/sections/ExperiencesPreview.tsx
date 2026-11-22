"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { cn } from "@/lib/utils";

const items = [
  {
    slug: "drumetii-montane",
    name: "Drumeții montane",
    meta: "Trasee pe creste și prin păduri de conifere",
    src: "/images/home/experience-hiking.webp",
  },
  {
    slug: "tururi-cu-bicicleta",
    name: "Trasee cu bicicleta",
    meta: "Drumuri forestiere, ritm liber, aer curat",
    src: "/images/experiences/cycling.webp",
  },
  {
    slug: "tururi-cu-atv",
    name: "Aventuri cu ATV",
    meta: "Excursii ghidate pe drumuri permisibile",
    src: "/images/experiences/atv.webp",
  },
  {
    slug: "seri-la-foc",
    name: "Seri în jurul focului",
    meta: "Conversații lungi, foc de piatră, pături calde",
    src: "/images/experiences/campfire.webp",
  },
] as const;

function ExperienceIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };
  if (index === 0) {
    return (
      <svg {...common}>
        <path d="M4 18 10 8l4 6 3-4 3 8" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <circle cx="7" cy="16" r="2.5" />
        <circle cx="17" cy="16" r="2.5" />
        <path d="M9.5 16h5M7 16 10 8h5l2 4" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...common}>
        <path d="M5 16h11l2-5H9l-4 5Z" />
        <circle cx="8" cy="17.5" r="1.5" />
        <circle cx="15" cy="17.5" r="1.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 4c1.2 2 2.4 3.2 2.4 5.2a2.4 2.4 0 1 1-4.8 0C9.6 7.2 10.8 6 12 4Z" />
      <path d="M8 16c1.4-1.2 2.8-1.8 4-1.8s2.6.6 4 1.8" />
    </svg>
  );
}

export function ExperiencesPreview() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const reduce = useReducedMotion();
  const labelId = useId();
  const current = items[active]!;
  const underneath = items[prev]!;

  const select = (index: number) => {
    if (index === active) return;
    setPrev(active);
    setActive(index);
  };

  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28" aria-labelledby={labelId}>
      <div className="hero-shell">
        <RevealStagger stagger={0.1} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Dincolo de cabană</p>
          </RevealItem>
          <RevealItem variant="maskUp">
            <h2 id={labelId} className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] text-ink text-balance">
              <HandwrittenAccent>Aventura</HandwrittenAccent> începe la câțiva pași
            </h2>
          </RevealItem>
        </RevealStagger>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div
            className="relative min-h-[22rem] overflow-hidden bg-forest-ink/5 md:min-h-[28rem]"
            data-no-reveal
          >
            <div className="absolute inset-0" aria-hidden={active === prev}>
              <Image
                src={underneath.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={
                  reduce
                    ? false
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.src}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
            {/* Prefetch neighbors for instant swaps */}
            <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
              {items.map((item) => (
                <Image key={`pre-${item.slug}`} src={item.src} alt="" width={8} height={8} />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <RevealStagger className="divide-y divide-ink/12 border-y border-ink/12">
              {items.map((item, i) => {
                const selected = i === active;
                return (
                  <RevealItem key={item.slug} className="block">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onMouseEnter={() => select(i)}
                      onFocus={() => select(i)}
                      className={cn(
                        "group flex w-full items-start gap-4 py-5 text-left transition",
                        selected ? "text-ink" : "text-ink/55 hover:text-ink/80",
                      )}
                      aria-current={selected ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "mt-1 font-serif text-sm tracking-wide",
                          selected ? "text-clay" : "text-ink/35",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("mt-0.5 text-clay", selected ? "opacity-100" : "opacity-40")}>
                        <ExperienceIcon index={i} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[1.55rem] leading-tight md:text-[1.75rem]">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-[0.98rem] leading-snug text-ink/65">{item.meta}</span>
                        <Link
                          href={`/experiente/${item.slug}`}
                          className="mt-3 inline-flex text-sm font-semibold text-clay underline-offset-4 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Descoperă experiența
                        </Link>
                      </span>
                    </button>
                  </RevealItem>
                );
              })}
            </RevealStagger>

            <div className="mt-6 flex items-center gap-3" aria-hidden data-no-reveal>
              {items.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-px flex-1 transition-colors",
                    i <= active ? "bg-clay" : "bg-ink/15",
                  )}
                />
              ))}
            </div>

            <Reveal>
            <div className="mt-8">
              <Button href="/experiente" variant="copper" arrow>
                Vezi experiențele
              </Button>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
