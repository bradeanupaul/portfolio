"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { RevealImage, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";

export function SpaPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="surface-dark overflow-hidden bg-forest-ink py-20 md:py-28 text-[#F3EBE1]" aria-labelledby="spa-home-heading">
      <div className="hero-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <RevealStagger>
          <RevealItem>
            <svg
              className="mb-6 h-14 w-14 text-[#E7BF92]/70"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden
            >
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="1.2" />
              <path d="M28 14v8M28 34v8M14 28h8M34 28h8" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="28" cy="28" r="5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </RevealItem>

          <RevealItem>
            <h2
              id="spa-home-heading"
              className="max-w-[14ch] font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.05] text-balance"
              style={{ color: "#F3EBE1" }}
            >
              Lasă ziua să <HandwrittenAccent className="!text-[#E7BF92]">încetinească</HandwrittenAccent>.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-[#F3EBE1]/80">
              Apă caldă, abur fin și aer de pădure. Un moment scurt pentru respirație, fără listă lungă de amenități și fără grabă.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-9">
              <Button href="/spa" variant="sand" arrow>
                Explorează zona SPA
              </Button>
            </div>
          </RevealItem>
        </RevealStagger>

        <RevealImage
          from="right"
          className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:mx-0 lg:justify-self-end"
        >
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/home/hot-tub-evening.jpg"
              alt="Ciubăr pe terasa VELTRA, la amurg"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 38vw"
            />
          </motion.div>
        </RevealImage>
      </div>
    </section>
  );
}
