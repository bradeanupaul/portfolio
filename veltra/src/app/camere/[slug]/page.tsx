import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
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

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rooms = await prisma.roomType.findMany({ select: { slug: true } });
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await prisma.roomType.findUnique({ where: { slug } });
  if (!room) return { title: "Cameră negăsită | VELTRA" };
  return {
    title: `${room.name} | VELTRA Alpine Hideaway`,
    description: room.description,
  };
}

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = await prisma.roomType.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      amenities: true,
    },
  });

  if (!room) notFound();

  const primary = room.images.find((i) => i.isPrimary) ?? room.images[0];

  return (
    <>
      <Section tone="ivory" className="pb-0 pt-24">
        <Container>
          <RevealHero>
            <nav className="mb-8 text-sm text-ink/60">
              <Button href="/camere" variant="ghost-dark" className="min-h-0 border-0 px-0 py-0">
                Înapoi la camere
              </Button>
            </nav>
          </RevealHero>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <RevealImage from="left" immediate className="lg:col-span-7">
              <div className="media-frame relative aspect-[4/5] w-full md:aspect-[5/6]">
                {primary ? (
                  <Image
                    src={primary.src}
                    alt={primary.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : null}
              </div>
            </RevealImage>
            <RevealHero className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">{room.viewType}</p>
              <h1 className="mt-3 font-serif text-[clamp(2.25rem,4vw,3.5rem)] text-pine">{room.name}</h1>
              <p className="mt-5 text-lg text-ink/80">{room.longDescription}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-pine/10 pt-8 text-sm">
                <div>
                  <dt className="text-ink/55">Suprafață</dt>
                  <dd className="mt-1 font-semibold text-pine">{room.areaSqm} mp</dd>
                </div>
                <div>
                  <dt className="text-ink/55">Capacitate</dt>
                  <dd className="mt-1 font-semibold text-pine">
                    {room.capacityMin} până la {room.capacityMax} oaspeți
                  </dd>
                </div>
                <div>
                  <dt className="text-ink/55">Tarif orientativ</dt>
                  <dd className="mt-1 font-semibold text-clay">{formatRon(room.basePriceBan)} / noapte</dd>
                </div>
                <div>
                  <dt className="text-ink/55">Demo</dt>
                  <dd className="mt-1 text-ink/70">Preț fictiv, fără plată reală</dd>
                </div>
              </dl>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/rezervari" variant="primary" arrow>
                  Rezervă această cameră
                </Button>
              </div>
            </RevealHero>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl text-pine">Dotări</h2>
            </Reveal>
            <RevealStagger className="mt-6 space-y-3">
              {room.amenities.map((a) => (
                <RevealItem key={a.id}>
                  <div className="flex gap-3 text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden />
                    {a.label}
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
          {room.images.length > 1 ? (
            <RevealStagger className="grid grid-cols-2 gap-3">
              {room.images.slice(0, 4).map((img) => (
                <RevealItem key={img.id}>
                  <div className="media-frame relative aspect-square">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
