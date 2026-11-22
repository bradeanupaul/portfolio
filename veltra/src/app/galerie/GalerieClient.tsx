"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { Button } from "@/components/ui/Button";
import {
  galleryFilters,
  galleryImages,
  type GalleryFilterId,
  type GalleryImage,
} from "@/data/gallery";
import { editorialClip, editorialClipStagger, imageCurtainLeft, listCascade, listCascadeItem } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

const ratioClass: Record<GalleryImage["ratio"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

function chunkColumns(items: GalleryImage[], count: number) {
  const cols: GalleryImage[][] = Array.from({ length: count }, () => []);
  items.forEach((img, i) => cols[i % count]!.push(img));
  return cols;
}

const FEATURES = [
  {
    id: "feat-dip-a",
    src: "/images/facilities/veltra-sauna.jpg",
    alt: "Saună VELTRA",
    caption: "Căldură uscată",
  },
  {
    id: "feat-dip-b",
    src: "/images/restaurant/food-closeup.jpg",
    alt: "Farfurie ARBOR, detaliu",
    caption: "Farfurie de seară",
  },
] as const;

export function GalerieClient() {
  const reduce = useReducedMotion();
  const rainRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [filter, setFilter] = useState<GalleryFilterId>("toate");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cols, setCols] = useState(4);

  const filtered = useMemo(
    () => (filter === "toate" ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter],
  );

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = useMemo(() => chunkColumns(filtered, cols), [filtered, cols]);

  useEffect(() => {
    if (reduce || cols < 3) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = rainRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        const direction = i % 2 === 0 ? -1 : 1;
        const distance = Math.min(48 + i * 18, 96);
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
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [reduce, cols, columns, filter]);

  return (
    <>
      {/* A. Intro */}
      <section className="overflow-hidden bg-[#EFE6DA] pt-[calc(var(--header-h)+1.75rem)] pb-10 md:pb-14">
        <div className="hero-shell relative">
          <span
            className="pointer-events-none absolute top-0 right-0 hidden font-serif text-[clamp(3rem,8vw,5.5rem)] leading-none text-pine/[0.07] select-none md:block"
            aria-hidden
          >
            01 / GALERIE
          </span>

          <motion.div
            variants={editorialClipStagger}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="max-w-3xl"
          >
            <motion.p
              variants={editorialClip}
              className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase"
            >
              Galerie VELTRA
            </motion.p>
            <motion.h1
              variants={editorialClip}
              className="mt-3 font-serif text-[clamp(2.4rem,5vw,3.9rem)] leading-[1.06] text-pine text-balance"
            >
              Locuri în care ai vrea să <HandwrittenAccent>rămâi</HandwrittenAccent>
            </motion.h1>
            <motion.p
              variants={editorialClip}
              className="mt-5 max-w-[42ch] text-[1.08rem] leading-relaxed text-ink/75"
            >
              Camere, apă, masă și pădure. O selecție curată din atmosfera lodge-ului, fără
              thumbnail-uri mici și fără repetări.
            </motion.p>
          </motion.div>

          <div
            className="mt-10 flex flex-wrap gap-x-1 gap-y-2 border-y border-pine/15 py-3"
            role="tablist"
            aria-label="Categorii galerie"
          >
            {galleryFilters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "min-h-11 px-3.5 py-2 text-[0.95rem] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
                    active ? "text-pine" : "text-pine/55 hover:text-pine",
                  )}
                  onClick={() => setFilter(item.id)}
                >
                  <span className={cn("border-b-2 pb-0.5", active ? "border-clay" : "border-transparent")}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* B. Photo rain */}
      <section className="overflow-hidden bg-[#EFE6DA] pb-16 md:pb-24" aria-label="Galerie foto">
        <div className="hero-shell">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink/70">Nu există fotografii în această categorie.</p>
          ) : (
            <div
              ref={rainRef}
              className={cn(
                "relative overflow-hidden",
                cols >= 3 ? "h-[min(78vh,48rem)]" : "min-h-0",
              )}
            >
              {cols >= 3 ? (
                <>
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#EFE6DA] to-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#EFE6DA] to-transparent"
                    aria-hidden
                  />
                </>
              ) : null}

              <div
                className={cn(
                  "grid gap-3",
                  cols === 1 && "grid-cols-1",
                  cols === 2 && "grid-cols-2",
                  cols === 3 && "grid-cols-3",
                  cols === 4 && "grid-cols-4",
                )}
              >
                {columns.map((col, ci) => (
                  <div
                    key={`${filter}-${ci}`}
                    ref={(el) => {
                      trackRefs.current[ci] = el;
                    }}
                    className="flex flex-col gap-3"
                    style={{
                      marginTop: reduce || cols < 3 ? 0 : `${(ci % 3) * 1.75}rem`,
                    }}
                  >
                    {col.map((img) => {
                      const globalIndex = filtered.findIndex((f) => f.id === img.id);
                      return (
                        <button
                          key={img.id}
                          type="button"
                          className={cn(
                            "group relative w-full overflow-hidden bg-forest-ink/8 text-left",
                            ratioClass[img.ratio],
                          )}
                          onClick={() => setOpenIndex(globalIndex)}
                          aria-label={`Deschide fotografia: ${img.caption}`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes={cols <= 2 ? "50vw" : "25vw"}
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            style={img.focus ? { objectPosition: img.focus } : undefined}
                          />
                          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-ink/70 to-transparent p-3 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 md:p-4">
                            <span className="block text-sm font-semibold text-ivory">
                              {String(globalIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-ivory/90">{img.caption}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* C. Editorial break */}
      <section className="surface-dark bg-forest-ink py-16 text-[#F3EBE1] md:py-20">
        <div className="hero-shell grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-balance">
              Fiecare colț are <HandwrittenAccent className="text-sand">povestea</HandwrittenAccent> lui.
            </p>
            <motion.div
              className="mt-6 h-px origin-left bg-[#F3EBE1]/35"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            />
            <p className="mt-5 max-w-[40ch] text-[1.02rem] leading-relaxed text-[#F3EBE1]/75">
              De la aburul din ciubăr până la farfuria de seară, galeria rămâne un portofoliu demonstrativ,
              nu o proprietate reală.
            </p>
          </motion.div>
          <motion.div
            className="relative aspect-[4/3] overflow-hidden bg-ivory/10 lg:col-span-5"
            variants={imageCurtainLeft}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <Image
              src="/images/facilities/veltra-ciubar.jpg"
              alt="Ciubăr pe terasa lodge-ului"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </section>

      {/* D. Editorial features */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="hero-shell space-y-16 md:space-y-24">
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={listCascade}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {FEATURES.map((feat) => (
              <motion.figure key={feat.id} variants={listCascadeItem} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-ink/8">
                  <Image src={feat.src} alt={feat.alt} fill className="object-cover" sizes="50vw" />
                </div>
                <figcaption className="mt-3 font-serif text-xl text-pine">{feat.caption}</figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <div className="border-t border-pine/12 pt-12 text-center">
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] text-pine">
              Vrei să vezi și camerele?
            </h2>
            <p className="mx-auto mt-3 max-w-[36ch] text-ink/70">
              Continuă spre tipurile de cazare sau rezervă un sejur demonstrativ.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/camere" variant="copper" arrow>
                Explorează camerele
              </Button>
              <Button href="/rezervari" variant="copper-outline">
                Rezervă acum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {openIndex != null ? (
        <Lightbox
          images={filtered.map((i) => ({ src: i.src, alt: i.alt, caption: i.caption }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      ) : null}
    </>
  );
}
