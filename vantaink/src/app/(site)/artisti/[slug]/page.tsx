import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Artist } from "@/types/content";
import { styles } from "@/data/styles";
import { site } from "@/data/site";
import { getArtistBySlug, getAllArtists } from "@/lib/artists";
import { getWorksByArtist } from "@/lib/works";
import { ArtistWorksGallery } from "@/components/artists/ArtistWorksGallery";
import { Button } from "@/components/ui/Button";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const profileAccent: Record<string, string> = {
  "alex-muresan": "GEOMETRIE",
  "mara-ionescu": "LINIE",
  "david-radu": "REALISM",
  "iris-pavel": "CULOARE",
};

export function generateStaticParams() {
  return getAllArtists().map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) {
    return { title: "Artist negăsit" };
  }
  return {
    title: artist.name,
    description: `${artist.manifesto} Profil demo ${site.brandName} pentru ${artist.practices.join(", ")}.`,
  };
}

export default async function ArtistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) {
    notFound();
  }

  const indexLabel = profileAccent[artist.slug] ?? "PROFIL";
  const allWorks = getWorksByArtist(artist.slug);
  const showcaseWorks = allWorks.slice(0, 6);
  const linkedStyles = styles.filter((style) =>
    (style.artistSlugs as readonly string[]).includes(artist.slug),
  );

  const nameParts = artist.name.split(" ");
  const givenName = nameParts[0] ?? artist.name;
  const familyName = nameParts.slice(1).join(" ");

  return (
    <>
      <Section className="border-b border-line py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-5">
            <MonoIndex index="02" label={indexLabel} />
            <Reveal eager>
              <h1 className="font-display uppercase leading-[1.08] text-text text-[clamp(2.25rem,7vw,4.5rem)]">
                <span className="block">{givenName}</span>
                {familyName ? (
                  <span className="block text-accent">{familyName}</span>
                ) : null}
              </h1>
            </Reveal>
            <Reveal delay={0.06} eager>
              <p className="text-measure text-lg text-text-muted md:text-xl">{artist.manifesto}</p>
            </Reveal>
          </div>
          <Reveal delay={0.08} className="lg:justify-self-end">
            <ArtistPortraitPanel artist={artist} />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <ProfileBlock title="Despre artist">
            <ArtistBio paragraphs={artist.bio} />
          </ProfileBlock>

          <ProfileBlock title="Specialități">
            <ul className="space-y-3 border-t border-line pt-4">
              {artist.specialties.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line py-3 text-text">
                  <span className="font-mono-ui text-accent" aria-hidden>
                    +
                  </span>
                  <span className="text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
            {linkedStyles.length > 0 ? <LinkedStylesList linkedStyles={linkedStyles} /> : null}
          </ProfileBlock>
        </div>
      </Section>

      <Section className="py-14 md:py-16">
        <blockquote className="border-l-2 border-accent bg-surface-raised px-6 py-6 md:px-8">
          <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-text-subtle">
            Filozofie de lucru
          </p>
          <p className="mt-3 font-display text-xl uppercase leading-tight text-text md:text-2xl">
            {artist.manifesto}
          </p>
          <p className="mt-4 text-sm text-text-muted">{artist.workingStyle}</p>
        </blockquote>
      </Section>

      <Section tone="raised" id="disponibilitate" className="py-14 md:py-16">
        <MonoIndex index="03" label="DISPONIBILITATE DEMO" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(0,0.55fr)] lg:items-start">
          <Reveal>
            <h2 className="font-display text-2xl uppercase leading-[1.08] text-text md:text-3xl">
              Calendar ilustrativ, fără legătură cu un atelier real
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <AvailabilityNotice demoText={artist.demoAvailability} slug={artist.slug} />
          </Reveal>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <WorksSectionHeader artistName={artist.name} />
        <div className="mt-10">
          <ArtistWorksGallery artistSlug={artist.slug} works={showcaseWorks} />
        </div>
      </Section>

      <Section tone="surface" className="border-t border-line py-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ArtistCtaCopy name={artist.name} />
          <Button
            href={`/programare?artist=${artist.slug}`}
            variant="secondary"
            size="lg"
          >
            Programează cu {artist.shortName}
          </Button>
        </div>
      </Section>
    </>
  );
}

function ArtistPortraitPanel({ artist }: { artist: Artist }) {
  return (
    <figure className="w-full max-w-md border border-line bg-surface-muted">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <SmartImage
          src={artist.portrait}
          alt={`Portret ${artist.name}, profil artist VANTA INK demo.`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover"
        />
      </div>
      <figcaption className="px-4 py-3 font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-text-subtle">
        Portret editorial, dimensiune restrânsă pentru citire confortabilă
      </figcaption>
    </figure>
  );
}

function ProfileBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="space-y-4">
      <h2 className="font-mono-ui text-xs uppercase tracking-[0.2em] text-text-subtle">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

function ArtistBio({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="text-text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function LinkedStylesList({
  linkedStyles: linked,
}: {
  linkedStyles: (typeof styles)[number][];
}) {
  return (
    <div className="mt-10 space-y-3">
      <p className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
        Stiluri în galerie
      </p>
      <ul className="flex flex-wrap gap-2">
        {linked.map((style) => (
          <li key={style.id}>
            <span className="font-mono-ui border border-line bg-surface px-2 py-1 text-[0.65rem] uppercase tracking-widest text-text-muted">
              {style.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AvailabilityNotice({
  demoText,
  slug,
}: {
  demoText: string;
  slug: string;
}) {
  return (
    <div className="space-y-4 border border-line bg-surface p-6">
      <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-accent">
        Status demo pentru {slug.replace(/-/g, " ")}
      </p>
      <p className="text-text-muted">{demoText}</p>
      <p className="text-sm text-text-subtle">{site.demoDisclaimer}</p>
    </div>
  );
}

function WorksSectionHeader({ artistName }: { artistName: string }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <MonoIndex index="04" label="LUCRĂRI" />
        <h2 className="mt-4 font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
          Portofoliu {artistName}
        </h2>
      </div>
      <p className="max-w-sm text-sm text-text-muted">
        Selecție de patru până la șase lucrări relevante. Filtrele de stil sunt locale paginii.
      </p>
    </div>
  );
}

function ArtistCtaCopy({ name }: { name: string }) {
  return (
    <div className="space-y-3">
      <MonoIndex index="05" label="URMĂTORUL PAS" />
      <p className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
        Trimite solicitarea demo cu {name} preselectat
      </p>
    </div>
  );
}