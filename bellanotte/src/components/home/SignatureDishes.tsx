"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, UtensilsCrossed } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrencyRon } from "@/lib/site";

const dishes = [
  {
    slug: "tagliatelle-al-tartufo",
    name: "Tagliatelle al Tartufo",
    description: "Paste fresh, unt montato, Parmigiano 24 luni și trufe negre.",
    price: 92,
    image: "/images/menu/food-tagliatelle.jpg",
    featured: true,
  },
  {
    slug: "risotto-ai-funghi-porcini",
    name: "Risotto ai Funghi Porcini",
    description: "Carnaroli, porcini sauté și o notă de ulei de trufe.",
    price: 78,
    image: "/images/menu/food-risotto-porcini.jpg",
    featured: false,
  },
  {
    slug: "filetto-di-manzo",
    name: "Filetto di Manzo",
    description: "Mușchi de vită, reducție de Barolo și piure de țelină.",
    price: 128,
    image: "/images/menu/food-filetto.jpg",
    featured: false,
  },
] as const;

export function SignatureDishes() {
  const featured = dishes.find((dish) => dish.featured)!;
  const secondary = dishes.filter((dish) => !dish.featured);

  return (
    <section className="bn-section bg-bn-bg" aria-labelledby="signature-heading">
      <Container>
        <RevealStagger stagger={0.09} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 text-bn-gold">
                <UtensilsCrossed className="size-4" aria-hidden />
                <Star className="size-3.5" aria-hidden />
              </span>
            </div>
          </RevealItem>
          <RevealItem variant="maskUp">
            <SectionHeading
              id="signature-heading"
              title="Preparatele noastre semnătură"
              subtitle="Rețete create cu respect pentru tradiție și pasiune pentru fiecare detaliu."
            />
          </RevealItem>
        </RevealStagger>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
          <RevealItem variant="mask">
            <Link
              href={`/meniu/${featured.slug}`}
              className="group relative block overflow-hidden border border-bn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bn-gold"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[560px]">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/35 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="bn-eyebrow text-bn-gold">Semnătură</p>
                <h3 className="mt-3 font-display text-3xl text-bn-text sm:text-4xl">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bn-text-muted sm:text-base">
                  {featured.description}
                </p>
                <p className="mt-4 font-display text-2xl text-bn-gold">
                  {formatCurrencyRon(featured.price)}
                </p>
              </div>
            </Link>
          </RevealItem>

          <RevealStagger
            className="flex flex-col gap-6 lg:gap-7"
            stagger={0.09}
            delayChildren={0.06}
          >
            {secondary.map((dish) => (
              <RevealItem key={dish.slug} variant="slideRight">
                <Link
                  href={`/meniu/${dish.slug}`}
                  className="group grid overflow-hidden border border-bn-border bg-bn-bg-elevated transition-colors duration-300 hover:border-bn-gold/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bn-gold sm:grid-cols-[1.05fr_1fr]"
                >
                  <div className="relative aspect-[16/11] sm:aspect-auto sm:min-h-[220px]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 sm:p-6">
                    <h3 className="font-display text-2xl text-bn-text">{dish.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-bn-text-muted">
                      {dish.description}
                    </p>
                    <p className="mt-4 font-display text-xl text-bn-gold">
                      {formatCurrencyRon(dish.price)}
                    </p>
                    <span className="mt-4 text-xs uppercase tracking-[0.2em] text-bn-gold">
                      Vezi detalii
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}