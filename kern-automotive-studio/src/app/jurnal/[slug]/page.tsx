import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getJournalArticleBySlug, journalSlugs } from "@/data/journal";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { journalImage } from "@/lib/images";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/jurnal/${article.slug}`,
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={`${article.demoLabel} · ${article.category}`}
        title={article.title}
        description={article.excerpt}
        imageSrc={journalImage(article.slug)}
      >
        <p className="font-mono-label text-copper">
          {article.date} · {article.readingMinutes} min citire
        </p>
      </PageHero>

      <article className="band-white section-pad">
        <Container narrow>
          {article.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-carbon md:text-3xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-base leading-8 text-slate">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {related.length ? (
            <div className="mt-8 border-t border-carbon/10 pt-10">
              <p className="font-mono-label text-copper">Servicii legate</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {related.map((service) =>
                  service ? (
                    <li key={service.slug}>
                      <Link
                        href={`/servicii/${service.slug}`}
                        className="rounded-sm border border-carbon/15 px-4 py-2 text-sm font-medium text-carbon hover:border-copper hover:text-copper"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ) : null}
        </Container>
      </article>
    </>
  );
}
