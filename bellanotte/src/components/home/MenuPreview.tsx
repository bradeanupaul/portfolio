"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  {
    name: "Antipasti",
    href: "/meniu#antipasti",
    image: "/images/menu/food-bruschetta.webp",
    alt: "Bruschetta cu roșii proaspete și busuioc",
  },
  {
    name: "Paste",
    href: "/meniu#paste",
    image: "/images/menu/food-tagliatelle.webp",
    alt: "Tagliatelle handmade cu trufe",
  },
  {
    name: "Feluri principale",
    href: "/meniu#feluri-principale",
    image: "/images/menu/food-tagliata.webp",
    alt: "Tagliata de vită cu ierburi",
  },
  {
    name: "Deserturi",
    href: "/meniu#deserturi",
    image: "/images/menu/food-tiramisu.webp",
    alt: "Tiramisu elegant pe farfurie întunecată",
  },
] as const;

export function MenuPreview() {
  return (
    <section className="bn-section bg-bn-bg-elevated" aria-labelledby="meniu-preview-heading">
      <Container>
        <RevealStagger stagger={0.09} delayChildren={0.04}>
          <RevealItem variant="fadeLeft">
            <SectionHeading
              id="meniu-preview-heading"
              title="Meniul nostru"
              subtitle="Patru expresii ale pasiunii italiene."
            />
          </RevealItem>
        </RevealStagger>

        <RevealStagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          stagger={0.1}
          delayChildren={0.06}
        >
          {categories.map((category) => (
            <RevealItem key={category.name} variant="maskUp">
              <Link
                href={category.href}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bn-gold"
              >
                <article className="overflow-hidden border border-bn-border bg-bn-bg transition-colors duration-300 group-hover:border-bn-gold/55">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-5">
                    <h3 className="font-display text-2xl text-bn-text">{category.name}</h3>
                    <ArrowUpRight
                      className="size-5 text-bn-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                </article>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>

        <RevealStagger className="mt-12 flex justify-center" stagger={0.06} delayChildren={0.12}>
          <RevealItem variant="scale">
            <Button href="/meniu" variant="secondary" showArrow>
              Explorează meniul complet
            </Button>
          </RevealItem>
        </RevealStagger>
      </Container>
    </section>
  );
}