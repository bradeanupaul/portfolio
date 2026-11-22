"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type FeaturedRoom = {
  slug: string;
  name: string;
  description: string;
  capacityMax: number;
  areaSqm: number;
  viewType: string;
  basePriceBan: number;
  image: string;
};

type RoomSlide = {
  slug: string;
  name: string;
  hero: string;
  secondary: [string, string];
  heroAlt: string;
};

const FEATURES = [
  {
    label: "Paturi premium",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 18V11.5A2.5 2.5 0 0 1 5.5 9h13A2.5 2.5 0 0 1 21 11.5V18" />
        <path d="M2 18h20M5 18v2M19 18v2" />
        <path d="M7 9V7.5A1.5 1.5 0 0 1 8.5 6H12" />
      </svg>
    ),
  },
  {
    label: "Priveliște către munte",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m3 18 6.5-8 4 5 2.5-3L21 18" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
  {
    label: "Design natural",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 21c-4-2-7-6-7-10a7 7 0 0 1 14 0c0 4-3 8-7 10Z" />
        <path d="M12 21V11" />
      </svg>
    ),
  },
  {
    label: "Confort total",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M3 8h14v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z" />
        <path d="M6 2v2M10 2v2M14 2v2" />
      </svg>
    ),
  },
] as const;

const SLIDE_ASSETS: Record<string, Omit<RoomSlide, "slug" | "name">> = {
  "forest-room": {
    hero: "/images/rooms/forest-bedroom-hero.jpg",
    secondary: ["/images/rooms/forest-bathroom.jpg", "/images/rooms/forest-lounge.jpg"],
    heroAlt: "Dormitor Forest Room cu ferestre panoramice spre munți",
  },
  "mountain-view-suite": {
    hero: "/images/rooms/mountain-bedroom-hero.jpg",
    secondary: ["/images/rooms/mountain-bathroom.jpg", "/images/rooms/mountain-lounge.jpg"],
    heroAlt: "Mountain View Suite cu priveliște panoramică",
  },
  "panorama-loft": {
    hero: "/images/rooms/panorama-bedroom-hero.jpg",
    secondary: ["/images/rooms/panorama-bathroom.jpg", "/images/rooms/panorama-lounge.jpg"],
    heroAlt: "Panorama Loft cu tavan înclinat și vedere spre pădure",
  },
};

function buildSlides(rooms: FeaturedRoom[]): RoomSlide[] {
  const preferred = ["forest-room", "mountain-view-suite", "panorama-loft"];
  const bySlug = new Map(rooms.map((r) => [r.slug, r]));
  const ordered = [
    ...preferred.map((s) => bySlug.get(s)).filter(Boolean),
    ...rooms.filter((r) => !preferred.includes(r.slug)),
  ] as FeaturedRoom[];

  return ordered.slice(0, 3).map((room) => {
    const assets = SLIDE_ASSETS[room.slug];
    return {
      slug: room.slug,
      name: room.name,
      hero: assets?.hero ?? room.image,
      secondary: assets?.secondary ?? [room.image, room.image],
      heroAlt: assets?.heroAlt ?? room.name,
    };
  });
}

export function RoomsIntro({ rooms }: { rooms: FeaturedRoom[] }) {
  const slides = useMemo(() => buildSlides(rooms), [rooms]);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const slide = slides[index];

  const go = (next: number, direction = 1) => {
    if (busy || slides.length === 0) return;
    setBusy(true);
    setDir(direction);
    setIndex((next + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!busy) return;
    const t = window.setTimeout(() => setBusy(false), reduce ? 50 : 700);
    return () => window.clearTimeout(t);
  }, [busy, index, reduce]);

  if (!slide) return null;

  const total = slides.length;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      aria-labelledby="rooms-intro-heading"
      className="relative overflow-hidden bg-hero-beige text-pine"
    >
      {/* Soft mountain silhouette */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-pine/[0.07] md:h-36"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 160 V95 L180 55 L320 88 L480 35 L650 78 L820 28 L980 70 L1140 40 L1280 75 L1440 50 V160 Z"
        />
        <path
          fill="currentColor"
          opacity="0.55"
          d="M0 160 V118 L220 78 L400 108 L580 62 L760 98 L960 55 L1160 92 L1440 68 V160 Z"
        />
      </svg>

      <div className="hero-shell relative grid items-center gap-10 py-20 md:gap-12 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-28">
        {/* Photo stack — left */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none" data-no-reveal>
          <div className="relative aspect-[5/4] w-full sm:aspect-[4/3] lg:aspect-[5/4]">
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                key={`${slide.slug}-back-a`}
                className="absolute left-0 top-[8%] z-[1] h-[72%] w-[42%] overflow-hidden rounded-[1.25rem] shadow-[0_18px_40px_rgba(36,61,54,0.12)] sm:left-[2%] sm:w-[38%]"
                initial={reduce ? false : { opacity: 0, x: -24, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: -3.5 }}
                exit={reduce ? undefined : { opacity: 0, x: -30 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.secondary[0]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-cover"
                  aria-hidden
                />
              </motion.div>

              <motion.div
                key={`${slide.slug}-back-b`}
                className="absolute left-[10%] top-[2%] z-[2] h-[78%] w-[46%] overflow-hidden rounded-[1.25rem] shadow-[0_20px_44px_rgba(36,61,54,0.14)] sm:left-[12%] sm:w-[42%]"
                initial={reduce ? false : { opacity: 0, x: -16, rotate: -2 }}
                animate={{ opacity: 1, x: 0, rotate: -1.5 }}
                exit={reduce ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: 0.65, delay: reduce ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.secondary[1]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 45vw, 24vw"
                  className="object-cover"
                  aria-hidden
                />
              </motion.div>

              <motion.div
                key={`${slide.slug}-hero`}
                custom={dir}
                className="absolute bottom-0 right-0 z-[3] h-[92%] w-[78%] overflow-hidden rounded-[1.35rem] shadow-[0_24px_50px_rgba(36,61,54,0.18)] sm:w-[74%] lg:w-[72%]"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: dir > 0 ? 48 : -48, scale: 0.97, rotate: dir > 0 ? 2 : -2 }
                }
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, x: dir > 0 ? -56 : 56, scale: 0.98, rotate: dir > 0 ? -2.5 : 2.5 }
                }
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { scale: 1.015 }}
              >
                <Image
                  src={slide.hero}
                  alt={slide.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 42vw"
                  className="object-cover object-[55%_center]"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-ink/55 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-forest-ink/45 px-3.5 py-2 text-sm text-ivory backdrop-blur-sm">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 15V9.5A2 2 0 0 1 5 7.5h10a2 2 0 0 1 2 2V15" />
                    <path d="M2 15h16M5 15v1.5M15 15v1.5" />
                  </svg>
                  <span className="font-medium tracking-wide">{slide.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Copy — right */}
        <RevealStagger className="relative z-[1] max-w-xl lg:max-w-none lg:pl-2" stagger={0.09} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.2em] text-copper uppercase">
              Confort &amp; relaxare
              <span className="h-px w-10 bg-copper/70" aria-hidden />
            </p>
          </RevealItem>

          <RevealItem variant="maskUp">
            <h2
              id="rooms-intro-heading"
              className="mt-4 font-serif text-[clamp(2.2rem,4.2vw,3.6rem)] text-pine"
              style={{ lineHeight: 1.02 }}
            >
              <span className="block">Camere și suite</span>
              <span className="block">cu priveliști</span>
              <span className="block">
                <em className="font-serif italic text-copper">spectaculoase</em>
              </span>
            </h2>
          </RevealItem>

          <RevealItem variant="maskUp">
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-pine/70 md:text-[1.125rem]">
              Spații elegante, inspirate de natură, create pentru odihnă și relaxare deplină.
            </p>
          </RevealItem>

          <RevealStagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-0" stagger={0.07}>
              {FEATURES.map((item, i) => (
                <RevealItem
                  key={item.label}
                  variant="fadeLeft"
                  className="relative flex flex-col gap-2 sm:px-3 lg:px-2 xl:px-3"
                >
                  {i > 0 ? (
                    <span
                      className="absolute top-1 left-0 hidden h-10 w-px bg-pine/10 sm:block"
                      aria-hidden
                    />
                  ) : null}
                  <span className="text-copper">{item.icon}</span>
                  <span className="text-sm leading-snug text-pine/75">{item.label}</span>
                </RevealItem>
              ))}
          </RevealStagger>

          <RevealItem variant="scale">
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/camere" variant="copper" arrow className="min-h-12 px-6">
              Vezi camerele
            </Button>

            <div className="flex items-center gap-2.5" data-no-reveal>
              <button
                type="button"
                aria-label="Camera anterioară"
                disabled={busy}
                onClick={() => go(index - 1, -1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pine/25 text-pine transition hover:border-copper hover:text-copper disabled:opacity-40"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M10 3.5 5.5 8 10 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Camera următoare"
                disabled={busy}
                onClick={() => go(index + 1, 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pine/25 text-pine transition hover:border-copper hover:text-copper disabled:opacity-40"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="min-w-[3.5rem] text-sm tracking-wide text-pine/55" aria-live="polite">
                {counter}
              </span>
            </div>
          </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
