"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { restaurantAssets } from "@/data/ai-assets";

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-bn-border/40">
      <Container size="wide" className="px-0 py-0 sm:px-0 lg:px-[var(--bn-gutter)]">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Image first on mobile, second column on desktop */}
          <div className="relative order-1 aspect-[5/4] w-full sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[min(78vh,760px)]">
            <Image
              src={restaurantAssets.interiorMain}
              alt="Interior elegant Bella Notte"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-bn-bg/20" />
          </div>

          <div className="relative order-2 flex items-end bg-bn-bg px-[var(--bn-gutter)] py-10 sm:py-12 lg:order-1 lg:min-h-[min(78vh,760px)] lg:px-12 lg:py-24 xl:px-16">
            <div className="pointer-events-none absolute inset-6 hidden border border-bn-border/35 lg:block" />
            <motion.div
              className="relative w-full max-w-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
                <BookOpen className="size-3.5" aria-hidden />
                Povestea Bella Notte
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-medium leading-[1.04] text-bn-heading sm:mt-5">
                O seară italiană, lucrată în detaliu
              </h1>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-bn-text-muted sm:mt-5 sm:text-lg">
                De la aluatul dimineții până la ultima lumânare stinsă, totul este gândit ca o
                experiență calmă, precisă și profund italiană.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
