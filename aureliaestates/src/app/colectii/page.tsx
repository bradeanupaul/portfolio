import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPropertiesByCollection } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Colecții",
  description:
    "Trei colecții Aurelia Estates: viață urbană, spațiu pentru familie și priveliști excepționale.",
};

const tones = ["bg-white", "bg-midnight", "bg-soft-blue"] as const;

export default function CollectionsPage() {
  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-ice">
        <Container className="grid items-center gap-8 py-8 lg:grid-cols-12 lg:py-10">
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Colecții</p>
            <RevealHeading
              as="h1"
              priority
              className="mt-3 font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Trei feluri de a locui.
            </RevealHeading>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">
              Fiecare colecție adună locuințe cu același fel de a fi trăite, în București și în
              Brașov. Coperta deschide povestea. Proprietățile vin imediat după, cu preț, suprafață
              și consultant.
            </p>
            <ul className="mt-6 space-y-2">
              {collections.map((collection, index) => (
                <li key={collection.id}>
                  <a
                    href={`#${collection.slug}`}
                    className="inline-flex items-baseline gap-3 text-ink transition-colors hover:text-cobalt"
                  >
                    <span className="text-[12px] font-semibold tracking-[0.14em] text-cobalt">0{index + 1}</span>
                    <span className="font-display text-xl font-semibold">{collection.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <Link
              href={`/colectii/${collections[0].slug}`}
              className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-[18px]"
            >
              <Image
                src={collections[0].image}
                alt={collections[0].title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </Link>
            {collections.slice(1).map((collection) => (
              <Link
                key={collection.id}
                href={`/colectii/${collection.slug}`}
                className="group relative aspect-[3/2] overflow-hidden rounded-[16px]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </Link>
            ))}
          </div>
        </Container>
      </header>

      {collections.map((collection, index) => {
        const count = getPropertiesByCollection(collection.id).length;
        const dark = index === 1;
        return (
          <section key={collection.id} id={collection.slug} className={tones[index] ?? "bg-white"}>
            <Container className="py-12 md:py-16">
              <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
                <div
                  className={`relative aspect-[3/2] overflow-hidden rounded-[20px] shadow-soft lg:col-span-7 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center lg:col-span-5">
                  <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-cobalt"}`}>
                    0{index + 1}
                  </p>
                  <h2
                    className={`mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] ${
                      dark ? "text-white" : "text-ink"
                    }`}
                  >
                    {collection.title}
                  </h2>
                  <p className={`mt-4 text-[17px] leading-relaxed ${dark ? "text-white/75" : "text-slate"}`}>
                    {collection.description}
                  </p>
                  <p className={`mt-4 text-sm font-medium ${dark ? "text-white" : "text-ink"}`}>
                    {count === 1 ? "1 proprietate în colecție" : `${count} proprietăți în colecție`}
                  </p>
                  <div className="mt-6">
                    <Button href={`/colectii/${collection.slug}`} variant={dark ? "light" : "cobalt"}>
                      Deschide colecția
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </article>
  );
}
