"use client";

import Image from "next/image";
import { ChefHat } from "lucide-react";
import {
  AnimatedReveal,
  RevealItem,
  RevealStagger,
} from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { chefAssets } from "@/data/ai-assets";

function OliveFlourish({ className }: { className?: string }) {
  return (
    <svg className={className} width="56" height="28" viewBox="0 0 56 28" fill="none" aria-hidden>
      <path
        d="M28 2c-1.2 4.5-4.2 8-9 10.2 4 .8 7.2 3 9 6.2 1.8-3.2 5-5.4 9-6.2C36.2 10 33.2 6.5 28 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M28 18v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ChefStory() {
  return (
    <section className="relative overflow-hidden bg-bn-bg" aria-labelledby="chef-heading">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <AnimatedReveal
          variant="mask"
          className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[420px] xl:min-h-[480px]"
        >
          <Image
            src={chefAssets.marcoBelliniWide}
            alt="Bucătarul Marco Bellini în bucătăria Bella Notte"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bn-bg/80 max-lg:bg-gradient-to-t max-lg:from-bn-bg/70 max-lg:via-transparent max-lg:to-transparent" />
        </AnimatedReveal>

        <div className="relative flex items-center bg-bn-bg px-6 py-12 sm:px-10 lg:px-14 xl:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(216,175,91,0.08),transparent_55%)]" />
          <RevealStagger className="relative max-w-xl" stagger={0.08} delayChildren={0.04}>
            <RevealItem variant="slideRight">
              <OliveFlourish className="text-bn-gold" />
            </RevealItem>
            <RevealItem variant="fadeLeft">
              <p className="bn-eyebrow mt-5 inline-flex items-center gap-2 text-bn-gold">
                <ChefHat className="size-3.5" aria-hidden />
                Bucătarul nostru
              </p>
            </RevealItem>
            <RevealItem variant="clip">
              <h2
                id="chef-heading"
                className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-medium leading-[1.05] text-bn-heading"
              >
                Pasiune pentru Italia
              </h2>
            </RevealItem>
            <RevealItem>
              <DecorativeDivider className="mt-6 justify-start" />
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-8 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                Marco Bellini a crescut între tăvițe de tortellini și aroma de Parmigiano.
                La Bella Notte aduce tehnica pastelor fresh și respectul pentru
                ingredientul sezonier.
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-4 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                Fiecare farfurie este gândită ca o seară întreagă: calmă, precisă și
                profund italiană.
              </p>
            </RevealItem>
            <RevealItem variant="scale">
              <div className="mt-10">
                <Button href="/despre-noi" variant="secondary" showArrow>
                  Descoperă povestea noastră
                </Button>
              </div>
            </RevealItem>
            <RevealItem variant="slideRight">
              <p className="mt-14 font-script text-4xl text-bn-gold/85 sm:text-5xl">
                Marco Bellini
              </p>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}