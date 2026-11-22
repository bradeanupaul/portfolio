import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { styles } from "@/data/styles";
import { works } from "@/data/works";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import {
  COMPOSITION_LABELS,
  FORMAT_LABELS,
  SCALE_LABELS,
  workAspectClass,
} from "@/components/gallery/work-display";
import { getArtistBySlug } from "@/lib/artists";
import {
  getAdjacentWorks,
  getRelatedWorks,
  getWorkBySlug,
} from "@/lib/works";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Work } from "@/types/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const styleNames = Object.fromEntries(styles.map((s) => [s.slug, s.name]));

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return { title: "Lucrare negăsită" };
  }

  const artist = getArtistBySlug(work.artistSlug);
  const styleList = work.styles.map((s) => styleNames[s] ?? s).join(", ");

  return {
    title: work.title,
    description: `${work.description} Artist: ${artist?.name ?? work.artistSlug}. Stiluri: ${styleList}. Amplasare: ${work.placement}.`,
    openGraph: {
      title: `${work.title} · ${site.brandName}`,
      description: work.description,
      images: work.images.main ? [{ url: work.images.main }] : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const artist = getArtistBySlug(work.artistSlug);
  const { previous, next } = getAdjacentWorks(slug);
  const related = getRelatedWorks(slug, 4);

  const bookingQuery = new URLSearchParams({
    artist: work.artistSlug,
    style: work.styles[0] ?? "",
  }).toString();

  const styleLabels = work.styles.map((s) => styleNames[s] ?? s);

  return (
    <>
      <section className="border-b border-line bg-bg py-12 text-text md:py-16">
        <Container>
          <MonoIndex index="02" label={`LUCRARE / ${work.slug.toUpperCase()}`} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <Reveal className="lg:col-span-6">
              <div
                className={cn(
                  "relative mx-auto w-full max-w-xl overflow-hidden bg-surface-muted",
                  workAspectClass(work),
                )}
              >
                <SmartImage
                  src={work.images.main}
                  alt={work.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="absolute inset-0 h-full w-full"
                  imageClassName={
                    work.composition === "landscape" ? "object-contain" : "object-cover"
                  }
                />
              </div>
              {work.images.detail ? (
                <Reveal delay={0.06} className="mt-4">
                  <figure className="mx-auto max-w-md">
                    <DetailFigureCaption label="Detaliu" />
                    <DetailFigureImage
                      src={work.images.detail}
                      alt={`Detaliu: ${work.alt}`}
                    />
                  </figure>
                </Reveal>
              ) : null}
            </Reveal>

            <Reveal delay={0.05} className="lg:col-span-6">
              <header className="space-y-4">
                <p className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-accent">
                  {styleLabels.join(", ")}
                </p>
                <h1 className="display-section font-display uppercase text-text">
                  {work.title}
                </h1>
                <p className="text-lg text-text-muted">{work.description}</p>
              </header>

              <dl className="mt-8 space-y-4 border-t border-line pt-8 text-sm">
                <DetailRow label="Artist">
                  <Link
                    href={`/artisti/${work.artistSlug}`}
                    className="font-semibold text-text underline decoration-accent underline-offset-4"
                  >
                    {artist?.name ?? work.artistSlug}
                  </Link>
                </DetailRow>
                <DetailRow label="Stiluri">
                  <ul className="m-0 flex flex-wrap gap-2 p-0 list-none">
                    {work.styles.map((styleSlug) => (
                      <li key={styleSlug}>
                        <Link
                          href={`/servicii#${styleSlug}`}
                          className="font-mono-ui text-xs uppercase tracking-widest text-text underline decoration-line underline-offset-4 hover:decoration-accent"
                        >
                          {styleNames[styleSlug] ?? styleSlug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </DetailRow>
                <DetailRow label="Amplasare" value={work.placement} />
                <DetailRow label="Scară" value={SCALE_LABELS[work.scale]} />
                <DetailRow
                  label="Format"
                  value={`${FORMAT_LABELS[work.format]} · ${COMPOSITION_LABELS[work.composition]}`}
                />
              </dl>

              <div className="mt-8 space-y-4 border-t border-line pt-8">
                <h2 className="font-display text-xl uppercase text-text">Proces</h2>
                <p className="text-text-muted">{work.processNote}</p>
              </div>

              <EntryCtas bookingQuery={bookingQuery} />
            </Reveal>
          </div>
        </Container>
      </section>

      <nav
        aria-label="Navigare între lucrări"
        className="border-b border-line bg-surface"
      >
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <AdjacentLink work={previous} label="Lucrarea anterioară" />
          <Button href="/portofoliu" variant="ghost" size="sm">
            Înapoi la portofoliu
          </Button>
          <AdjacentLink work={next} label="Lucrarea următoare" />
        </Container>
      </nav>

      {related.length > 0 ? (
        <Section tone="surface" className="border-b border-line py-16 md:py-20">
          <Container>
            <MonoIndex index="02" label="LEGATE DE ACEASTĂ PIESĂ" />
            <h2 className="mt-4 display-section font-display uppercase text-text">
              Lucrări învecinate
            </h2>
            <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/portofoliu/${item.slug}`}
                    className="group block space-y-3 no-underline"
                  >
                    <RelatedWorkThumb work={item} />
                    <p className="font-display text-lg uppercase text-text group-hover:underline">
                      {item.title}
                    </p>
                    <p className="text-sm text-text-muted">{item.placement}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[8rem_1fr]">
      <dt className="font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        {label}
      </dt>
      <dd className="text-text">{children ?? value}</dd>
    </div>
  );
}

function EntryCtas({ bookingQuery }: { bookingQuery: string }) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Button href={`/programare?${bookingQuery}`} size="lg">
        Programează consultație demo
      </Button>
      <Button href="/portofoliu" variant="secondary" size="lg">
        Explorează portofoliul
      </Button>
    </div>
  );
}

function AdjacentLink({
  work,
  label,
}: {
  work: ReturnType<typeof getAdjacentWorks>["previous"];
  label: string;
}) {
  if (!work) {
    return <span className="min-w-[10rem] text-sm text-text-subtle" />;
  }

  return (
    <Link
      href={`/portofoliu/${work.slug}`}
      className="min-w-[10rem] text-sm text-text no-underline hover:underline"
    >
      <span className="block font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
        {label}
      </span>
      <span className="font-display text-lg uppercase">{work.title}</span>
    </Link>
  );
}

function DetailFigureCaption({ label }: { label: string }) {
  return (
    <figcaption className="mb-2 font-mono-ui text-[0.65rem] uppercase tracking-widest text-text-subtle">
      {label}
    </figcaption>
  );
}

function DetailFigureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
      <SmartImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 92vw, 28vw"
        className="absolute inset-0 h-full w-full"
        imageClassName="object-contain"
      />
    </div>
  );
}

function RelatedWorkThumb({ work }: { work: Work }) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", workAspectClass(work))}>
      <SmartImage
        src={work.images.main}
        alt={work.alt}
        fill
        sizes="25vw"
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover"
      />
    </div>
  );
}