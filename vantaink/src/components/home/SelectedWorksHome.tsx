import Link from "next/link";
import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { works } from "@/data/works";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal, RevealItem, RevealLine, Stagger } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const styleBySlug = new Map(styles.map((s) => [s.slug, s.name]));
const artistBySlug = new Map(artists.map((a) => [a.slug, a.name]));

const featuredWorks = works.filter(
  (w): w is (typeof works)[number] & { featured: true } =>
    "featured" in w && w.featured === true,
);

type EditorialSlot = {
  gridClass: string;
  aspectClass: string;
  sizes: string;
};

const editorialSlots: readonly EditorialSlot[] = [
  {
    gridClass: "sm:col-span-2 md:col-span-5",
    aspectClass: "aspect-[4/5] max-h-[min(72vw,420px)] md:max-h-[480px]",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    gridClass: "md:col-span-4",
    aspectClass: "aspect-[3/2] max-h-[280px]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    gridClass: "md:col-span-3",
    aspectClass: "aspect-square max-h-[260px]",
    sizes: "(max-width: 768px) 100vw, 25vw",
  },
  {
    gridClass: "md:col-span-4",
    aspectClass: "aspect-[4/5] max-h-[320px]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    gridClass: "md:col-span-4",
    aspectClass: "aspect-[3/2] max-h-[280px]",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    gridClass: "md:col-span-4",
    aspectClass: "aspect-[4/5] max-h-[320px]",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
] as const;

export function SelectedWorksHome() {
  return (
    <Section
      tone="carbon"
      id="lucrari-selectate"
      className="border-t border-line bg-bg text-text"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Reveal mode="fadeLeft">
              <MonoIndex index="03" label="LUCRĂRI SELECTATE" />
            </Reveal>
            <h2 className="display-section font-display uppercase text-text">
              <RevealLine>
                <span className="block">Piese alese</span>
              </RevealLine>
            </h2>
          </div>
          <Reveal mode="maskUp" delay={0.14}>
            <p className="max-w-sm text-sm text-text-muted md:text-base">
              Șase lucrări reprezentative, cu ritm editorial și proporții controlate.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4"
          stagger={0.1}
          delayChildren={0.1}
        >
          {featuredWorks.map((work, index) => {
            const slot = editorialSlots[index] ?? editorialSlots[editorialSlots.length - 1];
            return (
              <WorkGalleryTile
                key={work.id}
                work={work}
                slot={slot}
                staggered
              />
            );
          })}
        </Stagger>

        <Reveal mode="scale" delay={0.12} className="mt-10 flex justify-start md:mt-12">
          <Button
            href="/portofoliu"
            variant="secondary"
            className="border-line text-text hover:bg-surface hover:text-text"
          >
            Vezi tot portofoliul
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

type WorkGalleryTileProps = {
  work: (typeof featuredWorks)[number];
  slot: EditorialSlot;
  staggered?: boolean;
};

function WorkGalleryTile({ work, slot, staggered }: WorkGalleryTileProps) {
  const artistName = artistBySlug.get(work.artistSlug) ?? work.artistSlug;
  const styleLabel =
    work.styles.map((slug) => styleBySlug.get(slug) ?? slug).join(", ");

  const tile = (
      <Link
        href={`/portofoliu/${work.slug}`}
        className={cn(
          "group block overflow-hidden border border-line bg-surface",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        )}
      >
        <div className="relative overflow-hidden bg-surface-muted">
          <div className={cn("relative mx-auto w-full", slot.aspectClass)}>
            <SmartImage
              src={work.images.main}
              alt={work.alt}
              fill
              sizes={slot.sizes}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transform-none"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-bg/0 transition-colors duration-300 group-hover:bg-bg/25 group-focus-visible:bg-bg/25"
            aria-hidden
          />
        </div>

        <WorkCaption
          styleLabel={styleLabel}
          title={work.title}
          artistName={artistName}
        />
      </Link>
  );

  if (staggered) {
    return (
      <RevealItem className={cn("min-w-0", slot.gridClass)} variant="maskUp">
        {tile}
      </RevealItem>
    );
  }

  return <div className={cn("min-w-0", slot.gridClass)}>{tile}</div>;
}

type WorkCaptionProps = {
  styleLabel: string;
  title: string;
  artistName: string;
};

function WorkCaption({ styleLabel, title, artistName }: WorkCaptionProps) {
  return (
    <div
      className={cn(
        "border-t border-line bg-surface-raised px-4 py-3 transition-colors",
        "group-hover:bg-surface-muted group-focus-visible:bg-surface-muted",
      )}
    >
      <p className="font-mono-ui text-[0.62rem] uppercase tracking-[0.14em] text-accent">
        {styleLabel}
      </p>
      <p className="font-display text-xl uppercase leading-[1.08] text-text md:text-2xl">
        {title}
      </p>
      <p className="mt-1 text-sm text-text-muted">{artistName}</p>
    </div>
  );
}