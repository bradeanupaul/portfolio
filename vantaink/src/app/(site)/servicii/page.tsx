import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/data/artists";
import { site } from "@/data/site";
import { getAllStyles, getWorksByStyle } from "@/lib/styles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicii și stiluri",
  description: `Taxonomie vizuală a stilurilor de tatuaj în ${site.brandName}: descrieri editoriale, artiști asociați și lucrări orientative, fără listă de prețuri.`,
};

const artistNames = new Map<string, string>(
  artists.map((artist) => [artist.slug, artist.name]),
);

export default function ServiciiPage() {
  const styleList = getAllStyles();

  return (
    <>
      <Section className="border-b border-line">
        <Container className="py-14 md:py-20">
          <MonoIndex index="01" label="SERVICII" />
          <Reveal className="mt-6">
            <h1 className="display-section font-display uppercase text-text">
              Limbajul stilurilor.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 max-w-2xl">
            <p className="text-lg text-text-muted">
              Această pagină organizează direcțiile artistice din studioul demo.
              Nu găsiți meniuri de preț fix: doar context, estetică și lucrări
              legate.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-14 pb-16 md:space-y-16 md:pb-20">
          {styleList.map((style, index) => (
            <StyleTaxonomySection
              key={style.id}
              style={style}
              index={String(index + 1).padStart(2, "0")}
              reversed={index % 2 === 1}
            />
          ))}
        </Container>
      </Section>

      <Section tone="surface" className="border-t border-line">
        <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-xl space-y-3">
            <MonoIndex index="07" label="ORIENTARE" />
            <p className="font-display text-3xl uppercase leading-[1.08] text-text">
              Bugetul rămâne subiect de consultație.
            </p>
            <p className="text-text-muted">
              În acest proiect fictiv, orice sumă menționată în alte pagini ar
              fi etichetată ca orientativă. Aici nu publicăm valori numerice.
            </p>
          </div>
          <Button href="/programare" variant="secondary" size="lg">
            Cere o consultație demo
          </Button>
        </Container>
      </Section>
    </>
  );
}

type StyleTaxonomySectionProps = {
  style: ReturnType<typeof getAllStyles>[number];
  index: string;
  reversed: boolean;
};

function StyleTaxonomySection({
  style,
  index,
  reversed,
}: StyleTaxonomySectionProps) {
  const relatedWorks = getWorksByStyle(style.slug, 3);
  const associatedArtists = (style.artistSlugs as readonly string[]).map(
    (slug) => artistNames.get(slug) ?? slug,
  );

  return (
    <article className="border border-line bg-surface-raised p-6 md:p-8">
      <div
        className={cn(
          "grid gap-8 lg:grid-cols-12 lg:items-start",
          reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
        )}
      >
        <StyleCopyColumn
          index={index}
          name={style.name}
          description={style.description}
          aesthetic={style.aesthetic}
          artists={associatedArtists}
          className="lg:col-span-5"
        />

        <StylePhotoColumn
          src={style.image}
          name={style.name}
          index={index}
          className="lg:col-span-7"
        />
      </div>

      {relatedWorks.length > 0 ? (
        <RelatedWorksList works={relatedWorks} styleName={style.name} />
      ) : null}
    </article>
  );
}

function StyleCopyColumn({
  index,
  name,
  description,
  aesthetic,
  artists,
  className,
}: {
  index: string;
  name: string;
  description: string;
  aesthetic: string;
  artists: string[];
  className?: string;
}) {
  return (
    <Reveal className={cn("space-y-5", className)}>
      <div className="flex items-end gap-4">
        <span
          className="font-display text-6xl leading-none text-text/15 md:text-7xl"
          aria-hidden
        >
          {index}
        </span>
        <div>
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
            {index} / STIL
          </p>
          <h2 className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
            {name}
          </h2>
        </div>
      </div>
      <p className="text-measure text-base text-text md:text-lg">{description}</p>
      <p className="text-measure text-sm text-text-muted md:text-base">
        {aesthetic}
      </p>
      <div>
        <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
          Artiști în demo
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {artists.map((artist) => (
            <li
              key={artist}
              className="font-mono-ui border border-line bg-surface-muted px-2 py-1 text-[0.65rem] uppercase tracking-widest text-text"
            >
              {artist}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function StylePhotoColumn({
  src,
  name,
  index,
  className,
}: {
  src: string;
  name: string;
  index: string;
  className?: string;
}) {
  return (
    <Reveal delay={0.06} className={cn("relative", className)}>
      <div className="crop-marks relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface md:aspect-[16/10]">
        <SmartImage
          src={src}
          alt={`Referință vizuală stil ${name}, index ${index} VANTA INK demo.`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </Reveal>
  );
}

type RelatedWorksListProps = {
  works: ReturnType<typeof getWorksByStyle>;
  styleName: string;
};

function RelatedWorksList({ works, styleName }: RelatedWorksListProps) {
  return (
    <Reveal delay={0.1} className="mt-8 border-t border-line pt-6">
      <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        Lucrări din {styleName}
      </p>
      <ul className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
        {works.map((work) => (
          <li key={work.id}>
            <Link
              href={`/portofoliu/${work.slug}`}
              className="font-mono-ui group inline-flex items-center gap-3 text-sm uppercase tracking-widest text-text no-underline"
            >
              <span className="text-accent transition-transform group-hover:translate-x-1">
                ›
              </span>
              {work.title}
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}