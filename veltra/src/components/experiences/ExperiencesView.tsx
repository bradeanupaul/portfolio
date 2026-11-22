"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import {
  experienceChapters,
  planningBlocks,
  seasonNotes,
} from "@/data/experiences-page";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperiencesView() {
  const reduce = useReducedMotion();
  const [season, setSeason] = useState(0);
  const seasonNote = seasonNotes[season]!;

  return (
    <div data-no-reveal>
      <section className="overflow-hidden bg-ivory pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24">
        <div className="hero-shell grid items-end gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">În natură</p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.1rem)] leading-[1.04] text-pine text-balance">
              Dincolo de cabană începe <HandwrittenAccent>aventura</HandwrittenAccent>
            </h1>
            <p className="mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink/75">
              Drumeții, bicicletă, tururi cu ATV pe rute permisibile și seri la foc. Activități conceptuale pentru un
              weekend în ritmul muntelui.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.15, ease }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-forest-ink/8">
              <Image
                src="/images/experiences/v7/experience-page-hero.webp"
                alt="Lodge VELTRA în ceața de dimineață"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory pb-16 md:pb-24" aria-labelledby="chapters-heading">
        <div className="hero-shell">
          <h2 id="chapters-heading" className="sr-only">
            Experiențe
          </h2>

          <div className="space-y-20 md:space-y-28">
            {experienceChapters.map((ch, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={ch.slug}
                  className={cn(
                    "grid items-center gap-8 lg:grid-cols-12 lg:gap-12",
                    reverse && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden bg-forest-ink/8 lg:col-span-6"
                    initial={reduce ? false : { opacity: 0, y: 56 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 1.35, ease }}
                  >
                    <Image
                      src={ch.image}
                      alt={ch.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <p
                      className="absolute bottom-4 left-4 font-serif text-4xl text-ivory/85 md:text-5xl"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-6"
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 1.2, delay: reduce ? 0 : 0.18, ease }}
                  >
                    <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-clay uppercase">
                      {String(i + 1).padStart(2, "0")} · {ch.type}
                    </p>
                    <h3 className="mt-2 font-serif text-[clamp(1.85rem,3vw,2.45rem)] leading-tight text-pine">
                      {ch.name}
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink/75">{ch.body}</p>
                    <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-ink/50">Durată</dt>
                        <dd className="font-semibold text-pine">{ch.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-ink/50">Efort</dt>
                        <dd className="font-semibold text-pine">{ch.effort}</dd>
                      </div>
                      <div>
                        <dt className="text-ink/50">Sezon</dt>
                        <dd className="text-ink/80">{ch.season}</dd>
                      </div>
                      <div>
                        <dt className="text-ink/50">Ce să aduci</dt>
                        <dd className="text-ink/80">{ch.bring}</dd>
                      </div>
                    </dl>
                    <div className="mt-7">
                      <Button href={`/experiente/${ch.slug}`} variant="copper" arrow>
                        Detalii experiență
                      </Button>
                    </div>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="surface-dark bg-forest-ink py-16 text-[#F3EBE1] md:py-24">
        <div className="hero-shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="relative aspect-[16/10] overflow-hidden lg:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.3, ease }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={seasonNote.id}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.35 } }}
                transition={{ duration: 0.55, ease }}
              >
                <Image
                  src={seasonNote.image}
                  alt={seasonNote.alt}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-ink/80 via-transparent to-transparent" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`copy-${seasonNote.id}`}
                className="absolute bottom-5 left-5 z-[1] max-w-[28ch] font-serif text-2xl md:text-3xl"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease }}
              >
                {seasonNote.label}: {seasonNote.text}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)]" style={{ color: "#F3EBE1" }}>
              Anotimpul își alege <HandwrittenAccent className="!text-[#E7BF92]">ritmul</HandwrittenAccent>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-2" role="tablist" aria-label="Anotimpuri">
              {seasonNotes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === season}
                  onClick={() => setSeason(i)}
                  className={cn(
                    "min-h-11 border px-3 py-2 text-left text-sm font-semibold transition",
                    i === season
                      ? "border-sand bg-sand/15 text-[#F3EBE1]"
                      : "border-ivory/20 text-[#F3EBE1]/55 hover:text-[#F3EBE1]/85",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="hero-shell">
          <motion.h2
            className="font-serif text-[clamp(2.1rem,3.8vw,3.1rem)] text-pine text-balance"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease }}
          >
            Cum îți pregătești weekendul
          </motion.h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {planningBlocks.map((b, i) => (
              <motion.li
                key={b.n}
                className="border-t border-ink/12 pt-6"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: Math.min(i * 0.08, 0.32), ease }}
              >
                <p className="font-serif text-sm tracking-wide text-clay">{b.n}</p>
                <h3 className="mt-2 font-serif text-2xl text-pine">{b.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[1.02rem] leading-relaxed text-ink/70">{b.text}</p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-16 grid items-center gap-8 border-t border-ink/12 pt-12 lg:grid-cols-12">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden bg-forest-ink/8 lg:col-span-5"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.05, ease }}
            >
              <Image
                src="/images/experiences/v7/experience-campfire.webp"
                alt="Seară la foc pe domeniul VELTRA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
            <motion.div
              className="lg:col-span-7 lg:pl-8"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, delay: 0.1, ease }}
            >
              <h3 className="font-serif text-[clamp(1.9rem,3vw,2.6rem)] text-pine">
                Seri calde, cu grijă la foc
              </h3>
              <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink/75">
                Focul de pe terasă este gândit ca un moment colectiv. În demo, disponibilitatea depinde de vreme și
                de regulile de siguranță. Nu lăsa focul nesupravegheat.
              </p>
              <div className="mt-8">
                <Button href="/contact?subiect=Intrebare%20despre%20activitati" variant="copper" arrow>
                  Întreabă despre activități
                </Button>
              </div>
              <p className="mt-4 text-sm text-ink/50">
                Activitățile sunt conceptuale. Nu reprezintă oferte comerciale reale.{" "}
                <Link href="/experiente/drumetii-montane" className="underline-offset-2 hover:underline">
                  Vezi o experiență detaliată
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
