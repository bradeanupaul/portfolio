"use client";

import Image from "next/image";
import { Heart, Sparkles, Wheat } from "lucide-react";
import {
  AnimatedReveal,
  RevealItem,
  RevealStagger,
} from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";

export function IntroductionSection() {
  return (
    <section id="introducere" className="bn-section bg-bn-bg" aria-labelledby="intro-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16 xl:gap-20">
          <AnimatedReveal variant="mask" className="relative">
            <div className="relative aspect-[4/5] max-h-[480px] overflow-hidden bn-frame sm:aspect-[5/6] sm:max-h-[520px] lg:aspect-[4/5] lg:max-h-[560px]">
              <Image
                src="/images/restaurant/interior-main.webp"
                alt="Salonul Bella Notte, cu mese elegante, lumânări și lumină caldă"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/45 via-transparent to-transparent" />
            </div>
            <AnimatedReveal
              variant="scale"
              delay={0.2}
              className="absolute -bottom-5 left-5 border border-bn-gold/40 bg-bn-bg-elevated/95 px-5 py-4 backdrop-blur-sm sm:left-8"
            >
              <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
                <Heart className="size-3.5" aria-hidden />
                Passione Italiana
              </p>
              <p className="mt-2 font-display text-xl text-bn-text">Fatto con amore</p>
            </AnimatedReveal>
          </AnimatedReveal>

          <RevealStagger className="lg:py-6" stagger={0.09} delayChildren={0.04}>
            <RevealItem variant="fadeLeft">
              <p className="bn-eyebrow inline-flex items-center gap-2 text-bn-gold">
                <Sparkles className="size-3.5" aria-hidden />
                Benvenuti
              </p>
            </RevealItem>
            <RevealItem variant="clip">
              <h2
                id="intro-heading"
                className="mt-5 font-display text-[clamp(2.2rem,4vw,3.75rem)] font-medium leading-[1.08] text-bn-text"
              >
                O poveste italiană, spusă prin gust.
              </h2>
            </RevealItem>
            <RevealItem>
              <DecorativeDivider className="mt-6 justify-start" />
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-8 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                La Bella Notte, masa începe cu răbdare. Paste făcute dimineața, ulei
                extravirgin ales cu grijă și o lumină caldă care invită la conversație.
              </p>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mt-5 text-base leading-relaxed text-bn-text-muted sm:text-lg">
                Nu căutăm spectacolul. Căutăm echilibrul: un risotto cremos, o pizza cu
                margini aerate, un filetto servit la momentul potrivit.
              </p>
            </RevealItem>
            <RevealItem variant="fadeLeft">
              <ul className="mt-8 grid gap-3 text-sm text-bn-text-muted sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Wheat className="size-4 text-bn-gold" aria-hidden />
                  Paste făcute zilnic
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="size-4 text-bn-gold" aria-hidden />
                  Serviciu atent, ritm lent
                </li>
              </ul>
            </RevealItem>
            <RevealItem variant="scale">
              <div className="mt-10">
                <Button href="/despre-noi" variant="secondary" showArrow>
                  Descoperă povestea noastră
                </Button>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}
