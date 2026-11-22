"use client";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { CompactBookingWidget } from "@/components/booking/CompactBookingWidget";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";

export function BookingCta() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 md:py-28" aria-labelledby="booking-home-heading">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(27,42,37,0.06))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(183,119,88,0.35),transparent)]"
        aria-hidden
      />

      <div className="hero-shell relative">
        <RevealStagger className="max-w-3xl" stagger={0.1} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Rezervări</p>
          </RevealItem>
          <RevealItem variant="maskUp">
            <h2
              id="booking-home-heading"
              className="mt-3 font-serif text-[clamp(2.4rem,4.8vw,3.9rem)] leading-[1.05] text-ink text-balance"
            >
              Următorul weekend începe <HandwrittenAccent>aici</HandwrittenAccent>
            </h2>
          </RevealItem>
          <RevealItem variant="maskUp">
            <p className="mt-4 max-w-[46ch] text-[1.08rem] leading-relaxed text-ink/72">
              Alege datele și numărul de oaspeți, apoi verifică disponibilitatea. Fluxul este demonstrativ, fără plată reală.
            </p>
          </RevealItem>
        </RevealStagger>

        <Reveal kind="scale" delay={0.12}>
          <div
            className="mt-10 border border-ink/12 bg-[color-mix(in_srgb,var(--ivory)_92%,white)] p-4 shadow-[0_1px_0_rgba(36,61,54,0.04)] md:p-5"
            data-no-reveal
          >
            <CompactBookingWidget tone="light" />
          </div>
        </Reveal>
        <Reveal className="mt-4">
          <p className="text-sm text-ink/55">Rezervare demonstrativă. Nu se efectuează plăți reale.</p>
        </Reveal>
      </div>
    </section>
  );
}
