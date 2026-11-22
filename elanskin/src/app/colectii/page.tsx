import Link from "next/link";
import { Container, PageHero } from "@/components/chrome";
import { Media } from "@/components/media";
import { Reveal, StaggerChildren } from "@/components/motion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { collections } from "@/lib/collections";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Colecții",
  "Patru colecții ÉLAN: dimineața, seara, lumina lină și confortul zilnic.",
);

const shared: { icon: SectionIconName; title: string; copy: string }[] = [
  {
    icon: "ritual",
    title: "Ordine, nu obligație",
    copy: "Poți folosi două produse din colecție și să lași restul pentru altă zi.",
  },
  {
    icon: "shield",
    title: "Voalul de zi",
    copy: "Dimineața se închide cu protecție solară în colecțiile care țin un ritual de zi.",
  },
  {
    icon: "lab",
    title: "Limbaj cosmetic",
    copy: "Vorbim despre textură și confort. Nu despre diagnostice sau procente miraculoase.",
  },
];

const covers: Record<string, string> = {
  "ritualul-diminetii": "/assets/editorial/ritual.webp",
  "ritualul-serii": "/assets/editorial/texturi.webp",
  "lumina-lina": "/assets/collections/lumina-lina.webp",
  "confort-zilnic": "/assets/collections/confort-zilnic.webp",
};

export default function Page() {
  const [lead, ...rest] = collections;

  return (
    <>
      <PageHero
        eyebrow="Colecții"
        title="Rutine gata legate."
        lede="Nu trebuie să începi de la zero. Fiecare colecție este un raft mic, cu un singur fel de zi în minte. Poți sări un produs. Nimic de aici nu este sfat medical."
      />
      <Container className="py-14">
        {lead ? (
          <Link href={`/colectii/${lead.slug}`} className="group grid items-end gap-6 md:grid-cols-[1.4fr_0.8fr]">
            <Media
              src={covers[lead.slug] ?? "/assets/editorial/ritual.webp"}
              alt={lead.name}
              className="aspect-[16/9] rounded-[1.8rem]"
              priority
            />
            <div className="pb-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-plum">Colecție</p>
              <h2 className="mt-3 text-5xl group-hover:text-orchid">{lead.name}</h2>
              <p className="mt-3 text-lg text-ink">{lead.lede}</p>
            </div>
          </Link>
        ) : null}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {rest.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 0.05}>
              <Link href={`/colectii/${collection.slug}`} className="group block">
                <Media
                  src={covers[collection.slug] ?? "/assets/editorial/atelier.webp"}
                  alt={collection.name}
                  className="aspect-[4/5] rounded-[1.5rem]"
                />
                <h2 className="mt-4 text-3xl group-hover:text-orchid">{collection.name}</h2>
                <p className="mt-2 text-sm leading-6 text-ink">{collection.lede}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-plum">
                  {collection.productSlugs.length} produse în ritual
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <StaggerChildren className="mt-16 grid gap-4 md:grid-cols-3">
          {shared.map((item) => (
            <article key={item.title} className="rounded-[1.4rem] bg-white p-6">
              <SectionIcon name={item.icon} className="text-orchid" />
              <h2 className="mt-4 text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{item.copy}</p>
            </article>
          ))}
        </StaggerChildren>
      </Container>
    </>
  );
}
