import Link from "next/link";
import { Container, PageHero } from "@/components/chrome";
import { Media } from "@/components/media";
import { Reveal, StaggerChildren } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { articles } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Jurnal",
  "Texte scurte despre ordinea pașilor, texturi de seară și cum citești o etichetă cosmetică.",
);

const habits: { icon: SectionIconName; title: string; copy: string }[] = [
  {
    icon: "ritual",
    title: "Ordine",
    copy: "Curățare, pas concentrat, hidratare. Dimineața se închide cu protecție solară.",
  },
  {
    icon: "texture",
    title: "Textură",
    copy: "Balsam, ulei, fluid sau cremă. Alegi după senzație, nu după un regulament.",
  },
  {
    icon: "book",
    title: "Etichetă",
    copy: "Lista spune ce este mai mult. Nu spune cum se va simți pielea ta mâine.",
  },
];

export default function Page() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Jurnal"
        title="Note de atelier, nu sfaturi medicale."
        lede="Patru texte despre ritm, textură și etichete. Le poți citi cât bei o cafea. Dacă pielea te îngrijorează, întrebi un specialist, nu un articol de portofoliu."
      />
      <Container className="py-14">
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {habits.map((habit) => (
            <article key={habit.title} className="rounded-[1.4rem] border border-line bg-white p-5">
              <SectionIcon name={habit.icon} className="text-orchid" />
              <h2 className="mt-4 text-2xl">{habit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{habit.copy}</p>
            </article>
          ))}
        </StaggerChildren>

        {featured ? (
          <Link href={`/jurnal/${featured.slug}`} className="group mt-14 grid items-center gap-8 md:grid-cols-2">
            <Media src={featured.image} alt="" className="aspect-[16/10] rounded-[1.8rem]" priority />
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-plum">
                {featured.date}, {featured.reading}
              </p>
              <h2 className="mt-3 text-5xl group-hover:text-orchid">{featured.title}</h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-ink">{featured.excerpt}</p>
              <p className="mt-4 text-sm font-semibold text-orchid">Citește textul</p>
            </div>
          </Link>
        ) : null}

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.06}>
              <Link href={`/jurnal/${article.slug}`} className="group block">
                <Media src={article.image} alt="" className="aspect-[4/5] rounded-[1.5rem]" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-plum">
                  {article.date}, {article.reading}
                </p>
                <h2 className="mt-2 text-3xl group-hover:text-orchid">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink">{article.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
