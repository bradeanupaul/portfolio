"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { AnimatedReveal, RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { BellaNotteMap } from "@/components/maps/BellaNotteMap";
import { brandingAssets, restaurantAssets } from "@/data/ai-assets";
import { restaurant } from "@/data/restaurant";

export function ReservationCTA() {
  return (
    <section className="overflow-hidden bg-bn-bg" aria-labelledby="location-cta-heading">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <AnimatedReveal variant="mask" className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
          <Image
            src={restaurantAssets.exteriorNight}
            alt="Intrarea Bella Notte seara, cu lanternă și vegetație"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bn-bg/50 max-lg:bg-gradient-to-t max-lg:from-bn-bg/70 max-lg:to-transparent" />
          <div className="absolute bottom-8 left-8 hidden items-center lg:flex">
            <div className="border border-bn-gold/45 bg-bn-bg/80 px-4 py-3 backdrop-blur-sm">
              <Image
                src={brandingAssets.logoDesktop}
                alt="Bella Notte Ristorante Italiano"
                width={220}
                height={102}
                className="h-auto w-[min(13rem,42vw)] max-w-[220px] object-contain"
                unoptimized
              />
            </div>
          </div>
        </AnimatedReveal>

        <div className="relative flex items-center bg-bn-bg-elevated px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
          <RevealStagger className="relative w-full max-w-lg" stagger={0.08}>
            <RevealItem variant="fadeLeft">
              <MapPin className="size-8 text-bn-gold" strokeWidth={1.25} aria-hidden />
            </RevealItem>
            <RevealItem variant="clip">
              <h2
                id="location-cta-heading"
                className="mt-5 font-display text-4xl text-bn-heading sm:text-5xl"
              >
                Unde ne găsiți
              </h2>
            </RevealItem>
            <RevealItem variant="fadeLeft">
              <p className="bn-eyebrow mt-3 text-bn-gold">Cluj Napoca, centru</p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-6 text-base leading-relaxed text-bn-text-muted">
                {restaurant.address.street}
                <br />
                {restaurant.address.city}, {restaurant.address.country}
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-3 text-sm text-bn-text-dim">
                Adresă fictivă, creată pentru acest proiect demonstrativ.
              </p>
            </RevealItem>
            <RevealItem variant="mask">
              <div className="mt-8">
                <BellaNotteMap heightClassName="h-[240px] sm:h-[280px]" zoom={14} />
              </div>
            </RevealItem>
            <RevealItem variant="scale">
              <div className="mt-8">
                <Button href="/rezervari" size="lg" showCalendar showArrow className="w-full sm:w-auto">
                  Rezervă o masă
                </Button>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}