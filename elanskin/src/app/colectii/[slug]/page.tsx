import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, buttonClass } from "@/components/chrome";
import { Media } from "@/components/media";
import { MaskReveal } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { getBySlugs, type RoutineStep } from "@/lib/catalog";
import { collections, getCollection, type Collection } from "@/lib/collections";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return pageMeta("Colecție", "Colecție ÉLAN SKIN.");
  return pageMeta(collection.name, collection.lede);
}

const art = {
  "ritualul-diminetii": {
    tone: "dawn",
    hero: "/assets/editorial/ritual.jpg",
    secondary: "/assets/collections/curatare.jpg",
  },
  "ritualul-serii": {
    tone: "dusk",
    hero: "/assets/editorial/texturi.jpg",
    secondary: "/assets/collections/noapte.jpg",
  },
  "lumina-lina": {
    tone: "glow",
    hero: "/assets/collections/lumina-lina.jpg",
    secondary: "/assets/macro-dropper.jpg",
  },
  "confort-zilnic": {
    tone: "soft",
    hero: "/assets/collections/confort-zilnic.jpg",
    secondary: "/assets/editorial/atelier.jpg",
  },
} as const;

const stepIcon: Record<RoutineStep, SectionIconName> = {
  curatare: "texture",
  tratament: "lab",
  hidratare: "flower",
  protectie: "shield",
  finisare: "ritual",
};

const stepLabel: Record<RoutineStep, string> = {
  curatare: "Curățare",
  tratament: "Pas concentrat",
  hidratare: "Hidratare",
  protectie: "Protecție",
  finisare: "Finisare",
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const items = getBySlugs(collection.productSlugs);
  const look = art[collection.slug as keyof typeof art] ?? art["ritualul-diminetii"];

  return (
    <>
      <CollectionHero collection={collection} look={look} />
      <CollectionStory collection={collection} look={look} />
      <Container className="py-14">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">Ordinea</p>
          <h2 className="mt-3 text-4xl">Cum se așază colecția</h2>
          <p className="mt-4 text-ink leading-7">
            Produsele stau în ritmul colecției. Poți sări un pas. Nu trebuie să le folosești pe toate în aceeași zi.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((product, index) => (
            <li key={product.slug} className="rounded-[1.4rem] border border-line bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
                  0{index + 1} {stepLabel[product.step]}
                </span>
                <SectionIcon name={stepIcon[product.step]} className="text-orchid" size={18} />
              </div>
              <Link href={`/produs/${product.slug}`} className="mt-3 block text-2xl hover:text-orchid">
                {product.name}
              </Link>
              <p className="mt-2 text-sm leading-6 text-ink">
                {product.kind}. {product.texture}. {product.size}.
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-ink">
          Ordinea este cosmetică. Dacă pielea se simte iritată, oprești pasul și ceri un consult. Poți reface lista în Rutina mea, după ten și timp.
        </p>
        <Link href="/rutina-mea" className={buttonClass("line", "mt-6")}>
          Deschide rutina
        </Link>
        <h2 className="mt-14 text-4xl">În raft</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-12">
          <Link href="/colectii" className="text-sm font-semibold text-orchid">
            Toate colecțiile
          </Link>
        </p>
      </Container>
    </>
  );
}

function CollectionHero({
  collection,
  look,
}: {
  collection: Collection;
  look: (typeof art)[keyof typeof art];
}) {
  if (look.tone === "dusk") {
    return (
      <header className="bg-aubergine text-white">
        <Container className="grid items-center gap-10 py-16 md:grid-cols-[0.9fr_1.1fr]">
          <Media src={look.hero} alt="" className="aspect-[4/5] rounded-[1.8rem] md:order-2" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-lilac">Seara</p>
            <h1 className="mt-4 text-5xl md:text-6xl">
              <MaskReveal>{collection.name}</MaskReveal>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-white/80">{collection.lede}</p>
          </div>
        </Container>
      </header>
    );
  }

  if (look.tone === "glow") {
    return (
      <header className="bg-pearl">
        <Container className="py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-plum">Lumină</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl md:text-7xl">
            <MaskReveal>{collection.name}</MaskReveal>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink">{collection.lede}</p>
          <Media src={look.hero} alt="" className="mx-auto mt-10 aspect-[16/8] max-w-4xl rounded-[1.8rem]" priority />
        </Container>
      </header>
    );
  }

  if (look.tone === "soft") {
    return (
      <header className="bg-lilac">
        <Container className="grid gap-8 py-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-plum">Confort</p>
            <h1 className="mt-4 text-5xl md:text-6xl">
              <MaskReveal>{collection.name}</MaskReveal>
            </h1>
          </div>
          <p className="max-w-md text-lg leading-8 text-ink md:pb-2">{collection.lede}</p>
          <Media src={look.hero} alt="" className="aspect-[16/8] rounded-[1.8rem] md:col-span-2" priority />
        </Container>
      </header>
    );
  }

  return (
    <header className="bg-lavender">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-plum">Dimineața</p>
          <h1 className="mt-4 text-5xl md:text-6xl">
            <MaskReveal>{collection.name}</MaskReveal>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-ink">{collection.lede}</p>
        </div>
        <Media src={look.hero} alt="" className="aspect-[4/5] rounded-[1.8rem]" priority />
      </Container>
    </header>
  );
}

function CollectionStory({
  collection,
  look,
}: {
  collection: Collection;
  look: (typeof art)[keyof typeof art];
}) {
  const copy = (
    <div className="max-w-xl space-y-4 text-lg leading-8">
      {collection.story.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );

  if (look.tone === "dusk") {
    return (
      <section className="bg-aubergine text-white/85">
        <Container className="grid items-center gap-10 pb-16 md:grid-cols-2">
          {copy}
          <Media src={look.secondary} alt="" className="aspect-[4/3] rounded-[1.6rem]" />
        </Container>
      </section>
    );
  }

  return (
    <Container className="grid items-center gap-10 py-14 md:grid-cols-2">
      <Media src={look.secondary} alt="" className={look.tone === "glow" ? "aspect-square rounded-[1.8rem]" : "aspect-[4/3] rounded-[1.6rem]"} />
      <div className="text-ink">{copy}</div>
    </Container>
  );
}
