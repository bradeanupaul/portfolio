import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "@/data/collections";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPropertiesByCollection } from "@/lib/properties";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* static-export: instant removed */
export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  return {
    title: collection?.title ?? "Colecție",
    description: collection?.shortDescription,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();

  const list = getPropertiesByCollection(collection.id);
  const others = collections.filter((item) => item.id !== collection.id);
  const support = list[0]?.images[1] ?? list[0]?.images[0] ?? collection.image;
  const paragraphs = collection.description.split("\n\n").filter(Boolean);
  const countLabel =
    list.length === 1 ? "1 proprietate în colecție" : `${list.length} proprietăți în colecție`;

  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-ice">
        <Container className="grid items-center gap-6 py-7 md:py-9 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Colecție</p>
            <RevealHeading
              as="h1"
              priority
              className="mt-3 font-display text-[clamp(2rem,3.2vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              {collection.title}
            </RevealHeading>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">{collection.shortDescription}</p>
            <p className="mt-3 text-sm font-medium text-ink">{countLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#proprietati" variant="cobalt">
                Vezi proprietățile
              </Button>
              <Button href="/colectii" variant="secondary">
                Toate colecțiile
              </Button>
            </div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] bg-white shadow-soft lg:col-span-7">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </header>

      <section className="bg-white">
        <Container className="grid items-center gap-8 py-10 md:py-12 lg:grid-cols-12">
          <div className="space-y-4 text-[17px] leading-relaxed text-slate lg:col-span-7">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-ice shadow-soft lg:col-span-5">
            <Image
              src={support}
              alt={`Imagine din colecția ${collection.title}`}
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section id="proprietati" className="bg-ice">
        <Container className="py-10 md:py-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Selecție</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
            Proprietățile colecției
          </h2>
          <p className="mt-3 max-w-2xl text-slate">
            {list.length === 0
              ? "Colecția nu are încă o adresă publică. Portofoliul rămâne deschis, cu filtrare după zonă și buget."
              : "Fiecare adresă se deschide cu preț, suprafață și consultant. Lista face parte din catalogul demonstrativ."}
          </p>
          {list.length === 0 ? (
            <div className="mt-6">
              <Button href="/proprietati" variant="cobalt">
                Deschide catalogul
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-10 md:py-12">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink">Celelalte colecții</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((item) => (
              <li key={item.id}>
                <Link href={`/colectii/${item.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-ice shadow-soft">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">{item.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
