"use client";

import Image from "next/image";
import { Flame, Images } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function AtmosphereSection() {
  return (
    <section
      className="relative min-h-[min(62vh,560px)] overflow-hidden sm:min-h-[min(68vh,640px)] lg:min-h-[min(72vh,720px)]"
      aria-labelledby="atmosphere-heading"
    >
      <Image
        src="/images/atmosphere/romantic-table.jpg"
        alt="Masă romantică la lumina lumânărilor în restaurantul Bella Notte"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-bn-bg/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-bn-bg/80 via-bn-bg/45 to-bn-bg/30" />

      <Container className="relative z-10 flex min-h-[min(62vh,560px)] items-center py-16 sm:min-h-[min(68vh,640px)] sm:py-20 lg:min-h-[min(72vh,720px)]">
        <RevealStagger className="max-w-xl" stagger={0.1} delayChildren={0.05}>
          <RevealItem variant="fadeLeft">
            <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
              <Flame className="size-3.5" aria-hidden />
              Atmosferă
            </p>
          </RevealItem>
          <RevealItem variant="clip">
            <h2
              id="atmosphere-heading"
              className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.05] text-bn-text"
            >
              Mai mult decât o cină.
            </h2>
          </RevealItem>
          <RevealItem variant="maskUp">
            <p className="mt-6 text-lg text-bn-text-muted sm:text-xl">
              O experiență care rămâne cu tine.
            </p>
          </RevealItem>
          <RevealItem variant="scale">
            <div className="mt-10">
              <Button href="/galerie" variant="secondary" showArrow>
                <span className="inline-flex items-center gap-2">
                  <Images className="size-4" aria-hidden />
                  Descoperă atmosfera
                </span>
              </Button>
            </div>
          </RevealItem>
        </RevealStagger>
      </Container>
    </section>
  );
}