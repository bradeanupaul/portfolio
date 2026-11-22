"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { facilityFaq, facilityStories } from "@/data/facilities-page";

export function FacilitiesView() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Contained hero: fits laptop viewport */}
      <header className="surface-dark overflow-hidden bg-forest-ink pt-[calc(var(--header-h)+1.5rem)] text-[#F3EBE1] md:pt-[calc(var(--header-h)+2rem)]">
        <div className="hero-shell grid items-center gap-8 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-sand uppercase">Facilități</p>
            <h1
              className="mt-3 max-w-[13ch] font-serif text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.04] text-balance"
              style={{ color: "#F3EBE1" }}
            >
              Loc pentru fiecare fel de <HandwrittenAccent className="!text-[#E7BF92]">răgaz</HandwrittenAccent>
            </h1>
            <p className="mt-4 max-w-[38ch] text-[1.02rem] leading-relaxed text-[#F3EBE1]/75">
              Piscină, saună, ciubăr și pavilion pe domeniul lodge-ului. Detalii demonstrative, fără certificări
              reale.
            </p>
            <nav className="mt-7 flex flex-wrap gap-2" aria-label="Ancore facilități">
              {facilityStories.map((f, i) => (
                <a
                  key={f.id}
                  href={`#${f.id}`}
                  className="min-h-11 border border-ivory/25 px-3 py-2 text-sm text-[#F3EBE1]/80 transition hover:border-sand hover:text-[#F3EBE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                >
                  <span className="mr-1.5 text-sand/80">{String(i + 1).padStart(2, "0")}</span>
                  {f.title}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="relative lg:col-span-7"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full overflow-hidden bg-black/20"
              style={{ height: "min(45vw, 28rem)" }}
            >
              <Image
                src="/images/facilities/v7/facility-pool-editorial.webp"
                alt="Piscină încălzită la VELTRA, cu lodge-ul în fundal"
                fill
                priority
                className="object-cover object-[50%_45%]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#F3EBE1]/70">
              <span className="border border-ivory/25 px-3 py-1.5 font-semibold tracking-wide text-[#F3EBE1]">
                01 · Piscină încălzită
              </span>
              <span>Ceață fină, terasă de piatră, pădure aproape</span>
            </p>
          </motion.div>
        </div>
      </header>

      {/* Pool */}
      <section id="pool" className="scroll-mt-[calc(var(--header-h)+1rem)] bg-ivory py-16 md:py-24">
        <div className="hero-shell">
          <motion.div
            className="relative aspect-[16/9] max-h-[min(52vw,32rem)] overflow-hidden bg-forest-ink/8"
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={facilityStories[0]!.image}
              alt={facilityStories[0]!.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute bottom-0 left-0 max-w-md border-t border-ivory/30 bg-forest-ink/90 px-5 py-4 text-[#F3EBE1] backdrop-blur-sm">
              <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-sand uppercase">
                {facilityStories[0]!.eyebrow}
              </p>
              <h2 className="mt-1 font-serif text-2xl" style={{ color: "#F3EBE1" }}>
                {facilityStories[0]!.title}
              </h2>
            </div>
          </motion.div>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-ink/75 lg:col-span-7">
              {facilityStories[0]!.body}
            </p>
            <ul className="space-y-2 text-sm text-ink/65 lg:col-span-4 lg:col-start-9">
              {facilityStories[0]!.facts.map((f) => (
                <li key={f} className="border-t border-ink/12 pt-2">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sauna */}
      <section
        id="sauna"
        className="surface-dark scroll-mt-[calc(var(--header-h)+1rem)] bg-forest-ink py-16 text-[#F3EBE1] md:py-24"
      >
        <div className="hero-shell grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-serif text-5xl text-sand/35" aria-hidden>
              02
            </p>
            <p className="mt-2 text-[0.72rem] font-semibold tracking-[0.18em] text-sand uppercase">
              {facilityStories[1]!.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)]" style={{ color: "#F3EBE1" }}>
              {facilityStories[1]!.title}
            </h2>
            <p className="mt-4 max-w-[36ch] text-[1.05rem] leading-relaxed text-[#F3EBE1]/78">
              {facilityStories[1]!.body}
            </p>
            <ul className="mt-6 space-y-2 border-l border-sand/35 pl-4 text-sm text-[#F3EBE1]/65">
              {facilityStories[1]!.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <motion.div
            className="relative mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden lg:mx-0 lg:max-w-[26rem] lg:justify-self-end"
            initial={reduce ? false : { clipPath: "inset(14% 0 14% 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={facilityStories[1]!.image}
              alt={facilityStories[1]!.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 360px"
            />
          </motion.div>
        </div>
      </section>

      {/* Hot tub */}
      <section id="tub" className="scroll-mt-[calc(var(--header-h)+1rem)] bg-ivory py-16 md:py-24">
        <div className="hero-shell grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:pt-4">
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-clay uppercase">
              {facilityStories[2]!.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.9rem)] text-pine">
              {facilityStories[2]!.title}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/75">{facilityStories[2]!.body}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink/65">
              {facilityStories[2]!.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div
            className="relative aspect-[16/9] overflow-hidden bg-forest-ink/8 lg:col-span-8"
            style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 92%)" }}
          >
            <Image
              src={facilityStories[2]!.image}
              alt={facilityStories[2]!.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
        </div>
      </section>

      {/* Grill */}
      <section id="grill" className="scroll-mt-[calc(var(--header-h)+1rem)] bg-[#EFE6DA] py-16 md:py-24">
        <div className="hero-shell">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-clay uppercase">
                {facilityStories[3]!.eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-[clamp(2.1rem,3.8vw,3.1rem)] text-pine">
                {facilityStories[3]!.title}
              </h2>
            </div>
            <p className="max-w-[36ch] text-[1rem] leading-relaxed text-ink/70">{facilityStories[3]!.body}</p>
          </div>
          <div className="relative mt-8 aspect-[21/9] min-h-[12rem] overflow-hidden bg-forest-ink/8">
            <Image
              src={facilityStories[3]!.image}
              alt={facilityStories[3]!.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink/65">
            {facilityStories[3]!.facts.map((f) => (
              <li key={f} className="font-medium">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ: balanced two-column */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="hero-shell grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-[clamp(2rem,3.4vw,2.7rem)] text-pine text-balance">
              Întrebări înainte de <HandwrittenAccent>răgaz</HandwrittenAccent>
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink/70">
              Răspunsuri ilustrative pentru un lodge demonstrativ. Dacă vrei detalii, scrie-ne sau începe o
              rezervare demo.
            </p>
            <div className="relative mt-8 aspect-[4/5] max-w-[16rem] overflow-hidden bg-forest-ink/8">
              <Image
                src="/images/facilities/v7/facility-sauna-interior.webp"
                alt="Detaliu saună din lemn"
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
            <div className="mt-8">
              <Button href="/rezervari" variant="copper" arrow>
                Rezervă demo
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={facilityFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
