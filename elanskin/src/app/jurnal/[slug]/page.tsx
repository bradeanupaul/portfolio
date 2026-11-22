import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/chrome";
import { Media } from "@/components/media";
import { MaskReveal, Reveal } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { SectionIcon } from "@/components/section-icons";
import { getBySlugs } from "@/lib/catalog";
import { articles, getArticle } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return pageMeta("Jurnal", "Jurnal ÉLAN SKIN.");
  return pageMeta(article.title, article.excerpt);
}

const asideImage: Record<string, string> = {
  "ordinea-pasilor": "/assets/editorial/routine.webp",
  "texturi-de-seara": "/assets/editorial/textura.webp",
  "cum-citesti-o-eticheta": "/assets/botanical-ingredients.webp",
  "un-ritual-scurt": "/assets/editorial/atelier.webp",
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const items = getBySlugs(article.productSlugs);
  const others = articles.filter((item) => item.slug !== article.slug);

  return (
    <article>
      <Container className="py-12">
        <p className="text-sm text-ink">
          <Link href="/jurnal" className="hover:text-orchid">
            Jurnal
          </Link>
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-plum">
          {article.date}, {article.reading}
        </p>
        <h1 className="mt-3 max-w-3xl text-5xl md:text-7xl">
          <MaskReveal>{article.title}</MaskReveal>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink">{article.excerpt}</p>
      </Container>
      <Container>
        <Media src={article.image} alt="" className="aspect-[16/8] rounded-[1.8rem]" priority />
      </Container>
      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,42rem)_16rem]">
        <div>
          <div className="space-y-5 text-lg leading-8 text-aubergine">
            {article.body.map((paragraph, index) => (
              <div key={paragraph}>
                <p>{paragraph}</p>
                {index === 2 ? (
                  <Media
                    src={asideImage[article.slug] ?? "/assets/editorial/textura.webp"}
                    alt=""
                    className="my-8 aspect-[16/9] rounded-[1.4rem]"
                  />
                ) : null}
              </div>
            ))}
          </div>
          <section className="mt-10 rounded-[1.4rem] bg-lavender p-6">
            <div className="flex items-center gap-3">
              <SectionIcon name="book" className="text-orchid" size={18} />
              <h2 className="text-2xl">De reținut</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {article.remember.map((line) => (
                <li key={line} className="text-sm leading-6 text-ink">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-ink">
              Text de portofoliu. Nu este sfat medical și nu înlocuiește un specialist.
            </p>
          </section>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-[1.4rem] bg-lavender p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-plum">În text</p>
            <ul className="mt-4 space-y-3">
              {items.map((product) => (
                <li key={product.slug}>
                  <Link href={`/produs/${product.slug}`} className="text-lg hover:text-orchid">
                    {product.name}
                  </Link>
                  <p className="text-sm text-ink">{product.kind}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.4rem] border border-line bg-white p-5">
            <SectionIcon name="shield" className="text-orchid" size={18} />
            <p className="mt-3 text-sm leading-6 text-ink">
              Dacă un gest ustură sau pielea se schimbă brusc, oprești produsul. Jurnalul descrie senzații cosmetice.
            </p>
          </div>
        </aside>
      </Container>
      <Container className="pb-8">
        <h2 className="text-4xl">Produse din text</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink">
          Formulele pomenite mai sus, cu preț ilustrativ. Le poți pune în coș ca să vezi fluxul, nu ca să primești un colet.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        {others.length > 0 ? (
          <Reveal className="mt-16">
            <h2 className="text-3xl">Continuă lectura</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((item) => (
                <Link key={item.slug} href={`/jurnal/${item.slug}`} className="group block">
                  <Media src={item.image} alt="" className="aspect-[4/3] rounded-[1.2rem]" />
                  <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-plum">{item.reading}</p>
                  <h3 className="mt-1 text-2xl group-hover:text-orchid">{item.title}</h3>
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </article>
  );
}
