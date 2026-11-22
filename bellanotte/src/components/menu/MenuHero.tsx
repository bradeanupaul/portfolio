"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/ui/Container";

const showcase = [
  {
    src: "/images/menu/food-tagliatelle.webp",
    alt: "Tagliatelle cu trufe",
    className: "aspect-[4/5]",
  },
  {
    src: "/images/menu/food-margherita.webp",
    alt: "Pizza Margherita",
    className: "aspect-square",
  },
  {
    src: "/images/menu/food-tiramisu.webp",
    alt: "Tiramisu",
    className: "aspect-[3/4]",
  },
] as const;

export function MenuHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-bn-border">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/pasta-wide.webp"
          fetchPriority="high"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/92 to-bn-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/45" />
      </div>

      <Container size="wide" className="relative grid items-center gap-8 py-14 sm:gap-10 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-22">
        <div>
          <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
            <UtensilsCrossed className="size-3.5" aria-hidden />
            Meniul nostru
          </p>
          <motion.h1
            id="menu-hero-heading"
            className="mt-4 font-display text-[clamp(2.35rem,5.5vw,4.75rem)] font-medium leading-[0.98] text-bn-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Arta gustului italian
          </motion.h1>
          <p className="mt-4 max-w-md font-display text-lg text-bn-gold sm:text-xl lg:text-2xl">
            Ingrediente alese cu grijă. Rețete create cu pasiune.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-bn-text-muted sm:text-base">
            Paste frământate dimineața, risotto la moment și pizza din cuptor pe lemne, compuse
            cu respect pentru sezon și pentru masa de seară.
          </p>
        </div>

        <div className="mx-auto hidden max-w-lg grid-cols-3 gap-3 sm:grid sm:max-w-none lg:mx-0">
          {showcase.map((item, index) => (
            <motion.div
              key={item.src}
              className={`relative overflow-hidden border border-bn-border/60 ${item.className} ${
                index === 1 ? "sm:-mt-3" : index === 2 ? "sm:mt-6" : "sm:mt-3"
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 28vw, 15vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
