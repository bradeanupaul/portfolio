import Link from "next/link";
import { artists } from "@/data/artists";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal, RevealItem, RevealLine, Stagger } from "@/components/motion/Reveal";

export function ArtistsHome() {
  return (
    <Section
      tone="surface"
      id="artisti"
      className="border-t border-line bg-surface text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-3">
            <Reveal mode="fadeLeft">
              <MonoIndex index="04" label="ARTIȘTI" />
            </Reveal>
            <h2 className="display-section font-display uppercase leading-[1.08] text-text">
              <RevealLine>
                <span className="block">Patru voci</span>
              </RevealLine>
              <RevealLine delay={0.1}>
                <span className="block">în atelier</span>
              </RevealLine>
            </h2>
          </div>
          <Reveal mode="maskUp" delay={0.16}>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Fiecare artist aduce o disciplină vizuală clară. Profilele sunt
              gândite să fie citite direct, cu nume, rol și direcție vizibilă.
            </p>
          </Reveal>
        </div>

        <Stagger stagger={0.11} delayChildren={0.08}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {artists.map((artist, index) => (
              <RevealItem key={artist.id} as="li" variant="maskUp">
                <article className="flex h-full flex-col overflow-hidden border border-line bg-surface-raised">
                  <Link
                    href={`/artisti/${artist.slug}`}
                    className="group flex h-full flex-col no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-muted">
                      <SmartImage
                        src={artist.portrait}
                        alt={`Portret ${artist.name}, artist VANTA INK.`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                      <div className="scrim-bottom absolute inset-x-0 bottom-0 h-1/3" />
                      <p className="absolute bottom-3 left-3 font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                      <h3 className="font-display text-xl uppercase leading-tight text-text md:text-2xl">
                        {artist.name}
                      </h3>
                      <p className="font-mono-ui text-[0.62rem] uppercase tracking-[0.14em] text-text-subtle">
                        {artist.practices.join(" · ")}
                      </p>
                      <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
                        {artist.manifesto}
                      </p>
                      <span className="mt-auto pt-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-white">
                        Vezi profilul
                        <span className="ml-2 text-accent" aria-hidden>
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              </RevealItem>
            ))}
          </ul>
        </Stagger>

        <Stagger className="mt-10 border-t border-line pt-8" stagger={0.06}>
          <RevealItem>
            <Button
              href="/artisti"
              variant="secondary"
              className="border-line text-text hover:bg-surface-muted"
            >
              Toți artiștii
            </Button>
          </RevealItem>
        </Stagger>
      </Container>
    </Section>
  );
}
