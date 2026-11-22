"use client";

import { Quote } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Tagliatellele cu trufe erau exact cum le știam din Emilia. Atmosfera e calmă, serviciul atent, fără grabă.",
    author: "Andreea M.",
    city: "Cluj Napoca",
  },
  {
    quote:
      "Am sărbătorit aniversarea aici. Masa de lângă fereastră, vinul recomandat și tiramisul au făcut seara memorabilă.",
    author: "Radu P.",
    city: "Cluj Napoca",
  },
  {
    quote:
      "Pizza din cuptorul pe lemne are marginea aerată și gust autentic. Revii pentru că totul e făcut cu grijă.",
    author: "Cristina D.",
    city: "Florești",
  },
] as const;

function Stars() {
  return (
    <div className="mt-4 flex gap-1 text-bn-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsPreview() {
  return (
    <section className="bn-section bg-bn-bg" aria-labelledby="recenzii-preview-heading">
      <Container>
        <RevealStagger stagger={0.09}>
          <RevealItem variant="fadeLeft">
            <SectionHeading id="recenzii-preview-heading" title="Ce spun oaspeții noștri" />
          </RevealItem>
        </RevealStagger>

        <RevealStagger
          className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-0"
          stagger={0.12}
          delayChildren={0.06}
        >
          {testimonials.map((item) => (
            <RevealItem
              key={item.author}
              variant="maskUp"
              className="lg:border-bn-border lg:px-10 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r"
            >
              <Quote className="size-8 text-bn-gold/70" strokeWidth={1} aria-hidden />
              <Stars />
              <blockquote className="mt-5 font-display text-xl leading-relaxed text-bn-text sm:text-2xl">
                „{item.quote}”
              </blockquote>
              <footer className="mt-6">
                <p className="text-sm font-medium text-bn-text">{item.author}</p>
                <p className="mt-1 text-xs text-bn-text-dim">{item.city}</p>
              </footer>
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-bn-text-dim">
          Recenziile de mai sus sunt texte demonstrative, create pentru prezentarea acestui
          site. Nu reprezintă opinii reale ale unor clienți.
        </p>
      </Container>
    </section>
  );
}