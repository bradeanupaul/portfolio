"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  allergenLegend,
  dayMoments,
  menuCategories,
  restaurantFaq,
  signatureDishes,
  type AllergenCode,
} from "@/data/restaurant";
import { cn } from "@/lib/utils";

function AllergenChips({ codes }: { codes: readonly AllergenCode[] }) {
  if (!codes.length) {
    return <span className="text-sm text-ink/55">Fără alergeni principali declarați</span>;
  }
  return (
    <span className="flex flex-wrap gap-1.5" aria-label="Coduri alergeni">
      {codes.map((code) => (
        <span
          key={code}
          className="inline-flex min-h-7 min-w-7 items-center justify-center border border-ink/15 px-1.5 text-[0.72rem] font-semibold tracking-wide text-ink/75"
        >
          {code}
        </span>
      ))}
    </span>
  );
}

function MetaIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    "aria-hidden": true as const,
  };
  if (name === "breakfast") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (name === "dinner") {
    return (
      <svg {...common}>
        <path d="M6 3v10M6 13c0 2 1.5 4 3 5v3M18 3v7c0 2-1.5 3-3 3h-2" />
      </svg>
    );
  }
  if (name === "terrace") {
    return (
      <svg {...common}>
        <path d="M4 14h16M6 14V9l6-4 6 4v5M8 20h8" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 4c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8Z" />
      <path d="M8 18h8" />
    </svg>
  );
}

export function RestaurantView() {
  const reduce = useReducedMotion();
  const [moment, setMoment] = useState(0);
  const [menuTab, setMenuTab] = useState(menuCategories[0]!.id);
  const [legendOpen, setLegendOpen] = useState(false);
  const legendId = useId();
  const activeMoment = dayMoments[moment]!;
  const activeMenu = menuCategories.find((c) => c.id === menuTab) ?? menuCategories[0]!;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-ivory pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24">
        <div className="hero-shell grid items-end gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">
              ARBOR · Gastronomie
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,5.2vw,4.4rem)] leading-[1.02] text-pine text-balance">
              Gustul unui weekend <HandwrittenAccent>memorabil</HandwrittenAccent>
            </h1>
            <p className="mt-6 max-w-[38ch] text-[1.08rem] leading-relaxed text-ink/75">
              Feluri inspirate de sezon, mic dejun cu lumină de dimineață, cine liniștite și mese pe terasă când
              vremea deschide aerul. Conținut demonstrativ, fără rezervare reală.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#meniu" variant="copper" arrow>
                Vezi meniul ilustrativ
              </Button>
              <Button href="/contact?subiect=Intrebare%20despre%20restaurant%20ARBOR" variant="ghost-dark">
                Scrie-ne
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              className="relative aspect-[16/10] overflow-hidden bg-forest-ink/10"
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/restaurant/v7/arbor-hero-interior.webp"
                  alt="Sala de dining ARBOR, cu lumină caldă și mese așezate"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute -bottom-6 right-4 hidden w-[28%] max-w-[9.5rem] overflow-hidden border border-ink/10 bg-ivory shadow-none md:block lg:right-8"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/restaurant/v7/arbor-house-dessert.webp"
                  alt="Detaliu desert al casei"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <ul className="hero-shell mt-14 grid gap-6 border-t border-ink/12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "breakfast", label: "Mic dejun", hint: "program ilustrativ" },
            { id: "dinner", label: "Cină", hint: "mese lungi, fără grabă" },
            { id: "terrace", label: "Terasa", hint: "când vremea permite" },
            { id: "veg", label: "Opțiuni vegetariene", hint: "în meniul demo" },
          ].map((item, i) => (
            <motion.li
              key={item.id}
              className="flex gap-3"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span className="mt-0.5 text-clay">
                <MetaIcon name={item.id} />
              </span>
              <span>
                <span className="block font-semibold text-ink">{item.label}</span>
                <span className="mt-1 block text-sm text-ink/60">{item.hint}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Day moments */}
      <section className="surface-dark bg-forest-ink py-20 text-[#F3EBE1] md:py-28" aria-labelledby="moments-heading">
        <div className="hero-shell">
          <h2
            id="moments-heading"
            className="max-w-[16ch] font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] text-balance"
            style={{ color: "#F3EBE1" }}
          >
            Fiecare moment are <HandwrittenAccent className="!text-[#E7BF92]">gustul</HandwrittenAccent> lui
          </h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="relative min-h-[22rem] overflow-hidden bg-black/20 md:min-h-[28rem]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activeMoment.id}
                  className="absolute inset-0"
                  initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={activeMoment.image}
                    alt={activeMoment.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div role="tablist" aria-label="Momentele zilei" className="divide-y divide-ivory/15 border-y border-ivory/15">
              {dayMoments.map((item, i) => {
                const selected = i === moment;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setMoment(i)}
                    onFocus={() => setMoment(i)}
                    className={cn(
                      "block w-full py-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand",
                      selected ? "text-[#F3EBE1]" : "text-[#F3EBE1]/50 hover:text-[#F3EBE1]/80",
                    )}
                  >
                    <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-sand uppercase">
                      {String(i + 1).padStart(2, "0")} · {item.kicker}
                    </span>
                    <span className="mt-2 block font-serif text-[1.55rem] leading-tight md:text-[1.75rem]">
                      {item.title}
                    </span>
                    {selected ? (
                      <>
                        <p className="mt-3 max-w-[40ch] text-[1.02rem] leading-relaxed text-[#F3EBE1]/78">
                          {item.body}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#F3EBE1]/55">
                          {item.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="overflow-hidden bg-[#EFE6DA] py-20 md:py-28" aria-labelledby="dishes-heading">
        <div className="hero-shell">
          <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Din bucătăria ARBOR</p>
          <h2
            id="dishes-heading"
            className="mt-3 max-w-[18ch] font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] text-pine text-balance"
          >
            Patru farfurii care spun sezonul
          </h2>
          <p className="mt-4 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink/70">
            Mostre de meniu ilustrativ. Prețurile și alergenii sunt demonstrative, pentru a arăta structura unei
            experiențe gastronomice.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-6">
            {signatureDishes.map((dish, i) => {
              const wide = i === 0 || i === 3;
              return (
                <article
                  key={dish.id}
                  className={cn(
                    "group",
                    i === 0 && "md:col-span-7 md:row-span-2",
                    i === 1 && "md:col-span-5 md:mt-10",
                    i === 2 && "md:col-span-5",
                    i === 3 && "md:col-span-7 md:-mt-6",
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-forest-ink/8",
                      wide ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[4/5]",
                    )}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="mt-4 max-w-[36ch]">
                    <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-clay uppercase">
                      {dish.notice}
                    </p>
                    <h3 className="mt-2 font-serif text-[1.55rem] leading-tight text-pine">{dish.name}</h3>
                    <p className="mt-2 text-[1rem] leading-relaxed text-ink/70">{dish.description}</p>
                    <div className="mt-3">
                      <AllergenChips codes={dish.allergens} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="meniu" className="scroll-mt-[calc(var(--header-h)+1rem)] bg-ivory py-20 md:py-28">
        <div className="hero-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Meniu ilustrativ</p>
              <h2 className="mt-3 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] text-pine">
                Structură de ospitalitate, nu listă comercială
              </h2>
              <p className="mt-3 max-w-[46ch] text-ink/70">
                Prețurile sunt fictive, în RON. Informațiile despre alergeni sunt orientative într-un proiect
                demonstrativ.
              </p>
            </div>
            <button
              type="button"
              className="min-h-11 self-start border border-ink/20 px-4 py-2 text-sm font-semibold text-pine transition hover:border-clay hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              aria-expanded={legendOpen}
              aria-controls={legendId}
              onClick={() => setLegendOpen((v) => !v)}
            >
              Vezi legenda alergenilor
            </button>
          </div>

          {legendOpen ? (
            <div
              id={legendId}
              className="mt-6 border border-ink/12 bg-[#F7F1E8] p-5 md:p-6"
              role="region"
              aria-label="Legendă alergeni"
            >
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {allergenLegend.map((a) => (
                  <li key={a.code} className="flex items-center gap-3 text-sm text-ink/80">
                    <span className="inline-flex h-7 w-8 items-center justify-center border border-ink/15 text-[0.72rem] font-semibold">
                      {a.code}
                    </span>
                    {a.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div
            role="tablist"
            aria-label="Categorii meniu"
            className="mt-10 flex gap-2 overflow-x-auto pb-2"
          >
            {menuCategories.map((cat) => {
              const selected = cat.id === menuTab;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setMenuTab(cat.id)}
                  className={cn(
                    "min-h-11 shrink-0 border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
                    selected
                      ? "border-pine bg-pine text-ivory"
                      : "border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-8 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {activeMenu.items.map((item) => (
              <li key={item.id} className="border-t border-ink/12 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[1.35rem] text-pine">{item.name}</h3>
                  <p className="shrink-0 font-semibold tabular-nums text-ink/80">{item.priceRon} RON</p>
                </div>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/65">{item.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <AllergenChips codes={item.allergens} />
                  {item.tags?.includes("vegetarian") ? (
                    <span className="text-[0.72rem] font-semibold tracking-wide text-moss uppercase">
                      Vegetarian
                    </span>
                  ) : null}
                  {item.tags?.includes("vegan") ? (
                    <span className="text-[0.72rem] font-semibold tracking-wide text-moss uppercase">Vegan</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dessert spotlight */}
      <section className="overflow-hidden bg-ivory py-16 md:py-24" aria-labelledby="dessert-heading">
        <div className="hero-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[26rem] overflow-hidden bg-forest-ink/8 lg:mx-0">
            <Image
              src="/images/restaurant/v7/arbor-house-dessert.webp"
              alt="Mărul pădurii, desertul semnătură ARBOR"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          </div>
          <div>
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Desertul casei</p>
            <h2
              id="dessert-heading"
              className="mt-3 max-w-[14ch] font-serif text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.06] text-pine text-balance"
            >
              Desertul care încheie <HandwrittenAccent>povestea</HandwrittenAccent>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink/75">
              Măr copt, cremă de vanilie și crumble de nucă. Un final cald, fără zahăr ostentativ. Concept
              ilustrativ pentru meniul ARBOR.
            </p>
            <p className="mt-4 text-sm text-ink/55">Alergeni orientativi: lapte, fructe cu coajă, gluten.</p>
            <div className="mt-8">
              <Button href="#meniu" variant="copper" arrow>
                Vezi meniul
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Terrace + CTA */}
      <section className="bg-[#EFE6DA] py-20 md:py-24">
        <div className="hero-shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[16/9] overflow-hidden bg-forest-ink/8 lg:col-span-7">
            <Image
              src="/images/restaurant/v7/arbor-terrace-dining.webp"
              alt="Dining pe terasa adăpostită a lodge-ului VELTRA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-pine text-balance">
              Terasă, familie și întrebări alimentare
            </h2>
            <ul className="mt-6 space-y-3 text-[1.02rem] leading-relaxed text-ink/75">
              <li>Mic dejun ilustrativ pentru oaspeții lodge-ului</li>
              <li>Cină la cerere, pe concept demonstrativ</li>
              <li>Mese potrivite și pentru familii</li>
              <li>Întrebări despre dietă, prin formularul de contact</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="surface-dark bg-forest-ink py-16 text-[#F3EBE1] md:py-20">
        <div className="hero-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.9rem)]" style={{ color: "#F3EBE1" }}>
              O masă bună începe cu un <HandwrittenAccent className="!text-[#E7BF92]">mesaj</HandwrittenAccent>
            </h2>
            <p className="mt-3 max-w-[40ch] text-[#F3EBE1]/75">
              Trimite o întrebare demonstrativă despre restaurantul ARBOR. Nu există rezervare sau plată reală.
            </p>
          </div>
          <Button href="/contact?subiect=Intrebare%20despre%20restaurant%20ARBOR" variant="sand" arrow>
            Contactează ARBOR
          </Button>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-24">
        <div className="hero-shell max-w-3xl">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] text-pine">Întrebări frecvente</h2>
          <p className="mt-3 text-ink/65">Răspunsuri orientative pentru acest proiect demonstrativ.</p>
          <div className="mt-8">
            <FaqAccordion items={restaurantFaq} />
          </div>
          <p className="mt-10 text-sm text-ink/50">
            VELTRA și restaurantul ARBOR sunt proprietăți fictive. Meniul, prețurile și programul sunt ilustrative.{" "}
            <Link href="/politica-de-confidentialitate" className="underline-offset-2 hover:underline">
              Confidențialitate
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
