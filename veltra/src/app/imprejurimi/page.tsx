import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Reveal,
  RevealHero,
  RevealImage,
  RevealItem,
  RevealStagger,
} from "@/components/motion/Reveal";
import { seasonsNote, surroundingPlaces, surroundingsIntro } from "@/data/surroundings";

export const metadata: Metadata = {
  title: "Împrejurimi | VELTRA Alpine Hideaway",
  description: "Poteci, creste și sate apropiate. Hartă narativă demonstrativă.",
};

export default function ImprejurimiPage() {
  return (
    <>
      <Section tone="ivory" className="pt-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <RevealHero>
            <SectionHeading
              eyebrow={surroundingsIntro.eyebrow}
              title={surroundingsIntro.title}
              description={surroundingsIntro.description}
            />
          </RevealHero>
          <RevealImage from="right" immediate className="media-frame relative aspect-[16/10]">
            <Image
              src="/images/surroundings/panorama.jpg"
              alt="Panoramă montană văzută de la VELTRA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealImage>
        </Container>
      </Section>

      <Section tone="pine">
        <Container>
          <RevealStagger>
            <ol className="space-y-0">
              {surroundingPlaces.map((place, index) => (
                <RevealItem key={place.id}>
                  <li className="grid gap-4 border-b border-ivory/15 py-8 md:grid-cols-12 md:items-baseline">
                    <span className="font-serif text-2xl text-clay md:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl text-ivory md:col-span-4">{place.name}</h2>
                    <p className="text-sm font-semibold uppercase tracking-wide text-ivory/60 md:col-span-2">
                      {place.distance}
                    </p>
                    <p className="text-ivory/85 md:col-span-5">{place.description}</p>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </RevealStagger>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <p className="text-lg text-ink/80">{seasonsNote}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3">
            <Button href="/experiente" variant="primary" arrow>
              Vezi experiențele
            </Button>
            <Button href="/galerie" variant="ghost-dark">
              Deschide galeria
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
