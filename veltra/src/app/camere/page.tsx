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
import { prisma } from "@/lib/db/client";
import { formatRon } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Camere și suite | VELTRA Alpine Hideaway",
  description:
    "Camere și suite alpine la VELTRA. Concept demonstrativ cu texturi calde, priveliște spre pădure și munte.",
};

export default async function CamerePage() {
  const rooms = await prisma.roomType.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
    },
  });

  const featured = rooms.filter((r) => r.featured);
  const rest = rooms.filter((r) => !r.featured);

  return (
    <>
      <Section tone="pine" className="pb-20 pt-28 md:pb-28">
        <Container>
          <RevealHero className="max-w-3xl">
            <p className="eyebrow mb-4 text-stone">Cazare</p>
            <h1 className="text-balance font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-ivory">
              Camere care respiră muntele
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ivory/80">
              Patru tipuri de cazare, din Forest Room până la Signature Residence. Prețurile și
              disponibilitatea sunt demonstrative.
            </p>
          </RevealHero>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container className="space-y-16">
          <Reveal kind="editorial">
            <SectionHeading
              eyebrow="Selecție"
              title="Camere reprezentative"
              description="Texturi crem, lemn deschis și ferestre generoase. Fiecare cameră are propriul ritm."
            />
          </Reveal>

          <ol className="space-y-20">
            {featured.map((room, i) => {
              const img = room.images[0];
              const reverse = i % 2 === 1;
              return (
                <li
                  key={room.id}
                  className={`flex flex-col gap-10 lg:items-center ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  <RevealImage
                    from={reverse ? "right" : "left"}
                    className="media-frame relative aspect-[4/3] w-full lg:w-[55%]"
                  >
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    ) : null}
                  </RevealImage>
                  <Reveal className="flex flex-1 flex-col justify-center" delay={0.08}>
                    <article>
                      <p className="eyebrow">{room.viewType}</p>
                      <h2 className="mt-3 font-serif text-4xl text-pine">{room.name}</h2>
                      <p className="mt-4 text-ink/80">{room.description}</p>
                      <ul className="mt-6 flex flex-wrap gap-3 text-sm text-ink/70">
                        <li>{room.areaSqm} mp</li>
                        <li>
                          {room.capacityMin === room.capacityMax
                            ? `${room.capacityMax} oaspeți`
                            : `${room.capacityMin} până la ${room.capacityMax} oaspeți`}
                        </li>
                        <li className="font-semibold text-clay">
                          de la {formatRon(room.basePriceBan)} / noapte
                        </li>
                      </ul>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Button href={`/camere/${room.slug}`} variant="primary" arrow>
                          Descoperă camera
                        </Button>
                        <Button href="/rezervari" variant="ghost-dark">
                          Verifică disponibilitatea
                        </Button>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {rest.length > 0 ? (
        <Section tone="mist">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Mai mult spațiu" title="Reședința signature" />
            </Reveal>
            <RevealStagger className="mt-12 grid gap-8 lg:grid-cols-12">
              {rest.map((room) => {
                const img = room.images[0];
                return (
                  <RevealItem key={room.id} className="lg:col-span-12">
                    <article className="grid gap-8 rounded-[1.25rem] bg-ivory p-6 md:p-10 lg:grid-cols-2">
                      <div className="media-frame relative aspect-[3/2] min-h-[240px]">
                        {img ? (
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
                        ) : null}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-3xl">{room.name}</h3>
                        <p className="mt-4 text-ink/80">{room.longDescription}</p>
                        <Button href={`/camere/${room.slug}`} variant="pine" className="mt-8 w-fit" arrow>
                          Vezi detalii
                        </Button>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
