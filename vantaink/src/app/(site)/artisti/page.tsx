import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Artiști",
  description:
    `Echipa fictivă ${site.brandName}: portrete editoriale, manifeste și specialități pentru fiecare practician din studioul demo.`,
};

export default function ArtistiPage() {
  return (
    <>
      <Section className="border-b border-line py-14 md:py-20">
        <MonoIndex index="01" label="ARTIȘTI" />
        <Reveal eager className="mt-5">
          <h1 className="display-section font-display uppercase text-text">
            Oamenii din spatele artei
          </h1>
        </Reveal>
        <Reveal delay={0.08} eager className="mt-5 max-w-xl text-lg text-text-muted">
          Patru practicieni fictivi, fiecare cu manifest, ritm de lucru și lucrări în galeria
          demo. Prezență egală pe pagină, fără ierarhie care golește restul grilei.
        </Reveal>
      </Section>

      <Section tone="surface" className="py-14 md:py-20">
        <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
          {artists.map((artist, index) => (
            <li key={artist.id}>
              <Reveal delay={index * 0.04}>
                <ArtistCard artist={artist} index={String(index + 1).padStart(2, "0")} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-line py-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <MonoIndex index="05" label="PROGRAMARE" />
            <p className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
              Alege artistul înainte de consultație
            </p>
            <p className="max-w-md text-text-muted">
              Fluxul demo acceptă parametrul artist în URL. Toate orele afișate sunt ilustrative.
            </p>
          </div>
          <Button href="/programare" variant="secondary" size="lg">
            Deschide programarea
          </Button>
        </div>
      </Section>
    </>
  );
}

function ArtistCard({
  artist,
  index,
}: {
  artist: (typeof artists)[number];
  index: string;
}) {
  const practiceLabels = artist.practices.map((practice) =>
    practice
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  );

  const linkedStyles = styles
    .filter((style) => (style.artistSlugs as readonly string[]).includes(artist.slug))
    .map((style) => style.name);

  const tags = [...new Set([...practiceLabels, ...linkedStyles])].slice(0, 5);

  return (
    <article className="h-full overflow-hidden border border-line bg-surface-raised transition-colors hover:border-accent/50">
      <Link
        href={`/artisti/${artist.slug}`}
        className="group grid h-full grid-cols-1 no-underline sm:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted sm:aspect-auto sm:min-h-[260px]">
          <SmartImage
            src={artist.portrait}
            alt={`Portret editorial ${artist.name}, artist demo VANTA INK.`}
            fill
            sizes="(max-width: 640px) 100vw, 22vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-col justify-between gap-4 p-5 md:p-6">
          <div>
            <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-accent">
              {index}
            </p>
            <h2 className="mt-1 font-display text-2xl uppercase leading-[1.08] text-text md:text-3xl">
              {artist.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{artist.manifesto}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stiluri și practici">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono-ui border border-line bg-surface px-2 py-1 text-[0.65rem] uppercase tracking-widest text-text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <span
            className={cn(
              "font-mono-ui text-xs uppercase tracking-[0.16em] text-accent",
              "underline decoration-accent underline-offset-4",
            )}
          >
            Vezi profilul
          </span>
        </div>
      </Link>
    </article>
  );
}