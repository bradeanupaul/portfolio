import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChefHat,
  Gift,
  Heart,
  UsersRound,
  Wine,
} from "lucide-react";
import { EventInquiryWithQuery } from "@/components/events/EventInquiryWithQuery";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  eventCategories,
  type EventCategorySlug,
} from "@/data/event-categories";
import { events } from "@/data/events";
import { createPageMetadata } from "@/lib/metadata";
import { formatCurrencyRon } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Evenimente",
  description:
    "Cine romantice, aniversări, corporate, degustări și seri gastronomice la Bella Notte. Experiențe demonstrative.",
  path: "/evenimente",
});

const categoryIcons: Record<EventCategorySlug, LucideIcon> = {
  "cine-romantice": Heart,
  aniversari: Gift,
  "evenimente-corporate": BriefcaseBusiness,
  "degustari-de-vin": Wine,
  "petreceri-private": UsersRound,
  "seri-gastronomice": ChefHat,
};

const featuredWineEvent = events.find((event) => event.slug === "degustare-vinuri-piemonte");

export default function EvenimentePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-bn-border/40">
        <Container size="wide" className="px-0 py-0 lg:px-[var(--bn-gutter)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative order-1 aspect-[16/11] w-full sm:aspect-[21/9] lg:order-2 lg:aspect-auto lg:min-h-[min(48vh,440px)]">
              <Image
                src="/images/events/private-celebration.jpg"
                alt="Masă elegantă pregătită pentru un eveniment privat"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-bn-bg/20" />
            </div>

            <div className="relative order-2 flex items-end bg-bn-bg px-[var(--bn-gutter)] py-9 sm:py-11 lg:order-1 lg:min-h-[min(48vh,440px)] lg:px-12 lg:py-14">
              <AnimatedReveal variant="clip" className="relative w-full max-w-xl">
                <p className="bn-eyebrow text-bn-gold">Evenimente Bella Notte</p>
                <h1 className="mt-3 font-display text-[clamp(2.1rem,5.5vw,3.75rem)] font-medium leading-[1.04] text-bn-heading">
                  Fiecare ocazie merită o seară specială.
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-bn-text-muted sm:text-base">
                  De la cine intime la evenimente memorabile, Bella Notte transformă fiecare moment
                  într-o experiență.
                </p>
                <div className="mt-6">
                  <Button href="#categorii-evenimente" showArrow className="w-full sm:w-auto">
                    Descoperă evenimentele
                  </Button>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </Container>
      </section>

      <section id="categorii-evenimente" className="scroll-mt-28 bn-section">
        <Container size="wide">
          <AnimatedReveal>
            <p className="bn-eyebrow text-bn-gold">Tipuri de evenimente</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-bn-heading sm:text-4xl lg:text-5xl">
              Momente care merită celebrate.
            </h2>
          </AnimatedReveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3">
            {eventCategories.map((category, index) => {
              const Icon = categoryIcons[category.slug];
              return (
                <AnimatedReveal key={category.slug} delay={index * 0.04} variant="fadeUp">
                  <Link
                    href={`/evenimente/${category.slug}`}
                    className="group block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bn-gold"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border border-bn-border">
                      <Image
                        src={category.heroImage}
                        alt={category.heroAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 text-bn-gold" aria-hidden strokeWidth={1.5} />
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bn-gold">
                          {category.shortTitle}
                        </p>
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-bn-heading transition-colors group-hover:text-bn-gold">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-bn-text-muted">
                        {category.subtitle}
                      </p>
                      <p className="mt-2 text-xs text-bn-text-dim">{category.groupSize}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-bn-gold opacity-80 transition-opacity group-hover:opacity-100">
                        Vezi detalii
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {featuredWineEvent ? (
        <section className="relative overflow-hidden bn-section bg-bn-bg-elevated">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden
          >
            <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="none">
              <path d="M0 520 C180 460 320 580 520 500 C720 420 860 560 1200 470" stroke="#D8AF5B" strokeWidth="1" />
              <path d="M0 560 C200 500 360 610 560 530 C780 440 920 590 1200 510" stroke="#D8AF5B" strokeWidth="0.8" />
              <path d="M80 40 H280" stroke="#D8AF5B" strokeWidth="1" />
              <path d="M80 40 V160" stroke="#D8AF5B" strokeWidth="1" />
              <circle cx="1040" cy="120" r="70" stroke="#D8AF5B" strokeWidth="0.8" />
              <circle cx="1040" cy="120" r="110" stroke="#D8AF5B" strokeWidth="0.6" />
            </svg>
          </div>
          <Container size="wide" className="relative">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <AnimatedReveal variant="mask" className="relative">
                <div className="pointer-events-none absolute -inset-3 border border-bn-gold/25" aria-hidden />
                <div className="pointer-events-none absolute -inset-6 border border-bn-border/50" aria-hidden />
                <div className="absolute -left-2 -top-2 size-8 border-l border-t border-bn-gold/60" aria-hidden />
                <div className="absolute -bottom-2 -right-2 size-8 border-b border-r border-bn-gold/60" aria-hidden />
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[5/4] lg:max-h-[440px]">
                  <Image
                    src={featuredWineEvent.image}
                    alt={featuredWineEvent.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/35 via-transparent to-transparent" />
                </div>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-bn-gold/80">
                  Seară ghidată · Piemonte
                </p>
              </AnimatedReveal>
              <AnimatedReveal>
                <div className="flex items-center gap-2.5">
                  <Wine className="size-4 text-bn-gold" aria-hidden strokeWidth={1.5} />
                  <p className="bn-eyebrow text-bn-gold">Eveniment signature</p>
                </div>
                <h2 className="mt-3 font-display text-3xl text-bn-heading sm:text-4xl">
                  {featuredWineEvent.title}
                </h2>
                <p className="mt-2 font-display text-lg text-bn-gold">{featuredWineEvent.subtitle}</p>
                <span className="mt-5 block h-px w-16 bg-bn-gold/50" aria-hidden />
                <p className="mt-5 text-bn-text-muted leading-relaxed">
                  {featuredWineEvent.description}
                </p>
                <ul className="mt-6 grid gap-2 text-sm text-bn-text-muted sm:grid-cols-2">
                  <li className="border-l border-bn-gold/40 pl-3">Patru etichete pe seară</li>
                  <li className="border-l border-bn-gold/40 pl-3">Pairing cu antipasti</li>
                  <li className="border-l border-bn-gold/40 pl-3">Atmosferă de cramă</li>
                  <li className="border-l border-bn-gold/40 pl-3">Locuri limitate</li>
                </ul>
                {typeof featuredWineEvent.priceRon === "number" ? (
                  <p className="mt-6 font-display text-xl text-bn-gold">
                    {formatCurrencyRon(featuredWineEvent.priceRon)}
                  </p>
                ) : null}
                <div className="mt-8">
                  <Button href="/evenimente/degustari-de-vin" showArrow>
                    Vezi categoria
                  </Button>
                </div>
              </AnimatedReveal>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bn-section">
        <Container>
          <AnimatedReveal>
            <p className="bn-eyebrow text-bn-gold">Solicitare</p>
            <h2 className="mt-3 font-display text-3xl text-bn-heading sm:text-4xl">
              Planificați o seară specială
            </h2>
            <p className="mt-4 max-w-2xl text-bn-text-muted">
              Completați formularul demonstrativ. Nu se trimit emailuri reale.
            </p>
          </AnimatedReveal>
          <div className="mt-10 max-w-2xl">
            <EventInquiryWithQuery />
          </div>
        </Container>
      </section>
    </>
  );
}
