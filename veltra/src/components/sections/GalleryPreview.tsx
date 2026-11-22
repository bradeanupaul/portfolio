"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Lightbox } from "@/components/gallery/Lightbox";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const RAIN = [
  { src: "/images/gallery/deck-coffee.jpg", alt: "Cafea pe terasă", title: "Dimineață pe terasă", ratio: "aspect-[3/4]" },
  { src: "/images/facilities/v7/facility-hot-tub-editorial.webp", alt: "Ciubăr seara", title: "Ciubăr cu abur", ratio: "aspect-[3/4]" },
  { src: "/images/facilities/v7/facility-pool-editorial.webp", alt: "Piscină la amurg", title: "Piscină încălzită", ratio: "aspect-[4/3]" },
  { src: "/images/rooms/forest-primary.jpg", alt: "Forest Room", title: "Forest Room", ratio: "aspect-[3/4]" },
  { src: "/images/restaurant/v7/arbor-breakfast-table.webp", alt: "Mic dejun ARBOR", title: "Mic dejun", ratio: "aspect-[3/4]" },
  { src: "/images/gallery/fireplace.jpg", alt: "Șemineu", title: "Lounge cu șemineu", ratio: "aspect-[4/3]" },
  { src: "/images/experiences/v7/experience-campfire.webp", alt: "Foc de seară", title: "Seară la foc", ratio: "aspect-[3/4]" },
  { src: "/images/experiences/v7/experience-hiking.webp", alt: "Drumeție", title: "Traseu de dimineață", ratio: "aspect-[3/4]" },
  { src: "/images/gallery/night-lodge.jpg", alt: "Lodje seara", title: "Sosire seara", ratio: "aspect-[4/3]" },
  { src: "/images/restaurant/v7/arbor-house-dessert.webp", alt: "Desert ARBOR", title: "Mărul pădurii", ratio: "aspect-square" },
  { src: "/images/facilities/v7/facility-outdoor-grill.webp", alt: "Grătar", title: "Pavilion de grătar", ratio: "aspect-[4/3]" },
  { src: "/images/rooms/mountain-suite-primary.jpg", alt: "Mountain View Suite", title: "Mountain View Suite", ratio: "aspect-[3/4]" },
] as const;

function chunkColumns(count: number) {
  const cols: (typeof RAIN)[number][][] = Array.from({ length: count }, () => []);
  RAIN.forEach((img, i) => cols[i % count]!.push(img));
  return cols;
}

export function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 768 ? 2 : w < 1100 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = useMemo(() => chunkColumns(cols), [cols]);

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        const direction = i % 2 === 0 ? -1 : 1;
        // Gentler parallax — large y + scrub looked like camera shake in recordings
        const distance = 36 + i * 10;
        gsap.fromTo(
          track,
          { y: direction * distance },
          {
            y: direction * -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced, cols, columns]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-ivory py-20 md:py-28">
      <div className="hero-shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <RevealStagger className="max-w-2xl" stagger={0.1} delayChildren={0.04}>
            <RevealItem variant="fadeLeft">
              <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Galerie</p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.08] text-ink text-balance">
                Fragmente dintr-un weekend <HandwrittenAccent>perfect</HandwrittenAccent>
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink/70">
                Camere, apă, masă și pădure: momente din ritmul unui sejur la VELTRA.
              </p>
            </RevealItem>
          </RevealStagger>
          <Reveal kind="scale" delay={0.15}>
            <Button href="/galerie" variant="copper" arrow>
              Vezi galeria
            </Button>
          </Reveal>
        </div>

        <div
          className="relative h-[min(68vh,40rem)] overflow-hidden md:h-[min(72vh,44rem)]"
          data-no-reveal
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-ivory to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-ivory to-transparent"
            aria-hidden
          />
          <div
            className={`grid h-full gap-2.5 md:gap-3 ${
              cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4"
            }`}
          >
            {columns.map((col, ci) => (
              <div
                key={ci}
                ref={(el) => {
                  trackRefs.current[ci] = el;
                }}
                className="flex flex-col gap-2.5 md:gap-3"
                style={{ marginTop: reduced || cols === 2 ? 0 : `${(ci % 3) * 1.5}rem` }}
              >
                {(cols === 2 ? col : [...col, ...col]).map((img, ii) => {
                  const globalIndex = RAIN.findIndex((r) => r.src === img.src);
                  const hovered = hoverIndex === globalIndex;
                  return (
                    <button
                      key={`${img.src}-${ii}`}
                      type="button"
                      className={`group relative w-full overflow-hidden bg-forest-ink/8 ${img.ratio}`}
                      onClick={() => setOpenIndex(globalIndex < 0 ? 0 : globalIndex)}
                      onMouseEnter={() => setHoverIndex(globalIndex)}
                      onMouseLeave={() => setHoverIndex(null)}
                      aria-label={`Deschide fotografia: ${img.title}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={cols === 2 ? "50vw" : "25vw"}
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <span
                        className={`pointer-events-none absolute inset-0 flex items-end bg-forest-ink/0 p-3 transition md:p-4 ${
                          hovered ? "bg-forest-ink/50" : "md:bg-transparent"
                        }`}
                      >
                        <span
                          className={`text-left text-sm text-ivory transition ${
                            hovered || cols === 2 ? "opacity-100" : "opacity-0"
                          } ${cols === 2 ? "bg-forest-ink/45 px-2 py-1" : ""}`}
                        >
                          <span className="block font-semibold">{String(globalIndex + 1).padStart(2, "0")}</span>
                          <span className="opacity-85">{img.title}</span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center">
          <Link href="/galerie" className="text-[1.02rem] font-semibold text-clay underline-offset-4 hover:underline">
            Vezi galeria completă
          </Link>
        </Reveal>
      </div>

      {openIndex != null ? (
        <Lightbox
          images={RAIN.map((i) => ({ src: i.src, alt: i.alt }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      ) : null}
    </section>
  );
}
