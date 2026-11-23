import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { journalArticles } from "@/data/journal";
import { buildMetadata } from "@/lib/metadata";
import { journalImage, posters } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Jurnal",
  description: "Articole demonstrative despre PPF, polish, geamuri, jante și interior.",
  path: "/jurnal",
});

export default function JurnalPage() {
  return (
    <>
      <PageHero
        eyebrow="Jurnal"
        title="Note din atelierul demo"
        description="Articole scurte pe protecție, corecție și întreținere. Conținutul e fictiv, scris pentru tonul editorial al brandului."
        imageSrc={posters.paintCloseup}
      />
      <section className="band-off section-pad">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {journalArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/jurnal/${article.slug}`}
                className="group overflow-hidden rounded-sm border border-carbon/10 bg-white"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={journalImage(article.slug)}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7">
                  <p className="font-mono-label text-copper">
                    {article.category} · {article.readingMinutes} min
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-carbon group-hover:text-copper">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
