"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const images = [
  {
    src: "/images/restaurant/interior-main.webp",
    alt: "Salon elegant cu mese pregătite pentru seară",
    label: "Restaurant",
  },
  {
    src: "/images/gallery/pizza-oven.webp",
    alt: "Pizza artizanală în cuptorul pe lemne",
    label: "Pizza",
  },
  {
    src: "/images/gallery/terrace.webp",
    alt: "Terasă italiană iluminată seara",
    label: "Terasă",
  },
  {
    src: "/images/gallery/wine.webp",
    alt: "Pahar de vin roșu la lumina lumânării",
    label: "Vin",
  },
  {
    src: "/images/atmosphere/romantic-table.webp",
    alt: "Masă romantică cu lumânări",
    label: "Atmosferă",
  },
] as const;

export function GalleryPreview() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(360, node.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bn-section bg-bn-bg-elevated" aria-labelledby="galerie-preview-heading">
      <Container>
        <RevealStagger stagger={0.07}>
          <RevealItem>
            <SectionHeading id="galerie-preview-heading" title="Galerie" />
          </RevealItem>
        </RevealStagger>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-bn-gold/60 text-bn-gold transition-colors hover:bg-bn-gold/10 lg:flex"
            aria-label="Imaginea anterioară"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-bn-gold/60 text-bn-gold transition-colors hover:bg-bn-gold/10 lg:flex"
            aria-label="Imaginea următoare"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <RevealStagger
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none lg:grid lg:grid-cols-[1.3fr_1fr_1.2fr_0.9fr_1.1fr] lg:gap-4 lg:overflow-visible"
            stagger={0.07}
          >
            {images.map((image) => (
              <RevealItem
                key={image.src}
                className="min-w-[78%] snap-center sm:min-w-[48%] lg:min-w-0"
                variant="scale"
              >
                <Link
                  href="/galerie"
                  className="group relative block aspect-[4/5] overflow-hidden border border-bn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bn-gold lg:aspect-[3/4]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bn-bg/80 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 translate-y-2 font-display text-xl text-bn-heading opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {image.label}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <RevealStagger className="mt-12 flex justify-center" stagger={0.06}>
          <RevealItem>
            <Button href="/galerie" variant="secondary" showArrow>
              Vezi galeria
            </Button>
          </RevealItem>
        </RevealStagger>
      </Container>
    </section>
  );
}