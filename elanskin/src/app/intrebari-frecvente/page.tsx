import Link from "next/link";
import { buttonClass, Container, PageHero } from "@/components/chrome";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { faqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Întrebări frecvente",
  "Răspunsuri despre demonstrația ÉLAN SKIN: comenzi, transport ilustrativ, retur și rutina.",
);

const topics: { id: string; label: string; icon: SectionIconName; lede: string }[] = [
  {
    id: "despre",
    label: "Despre magazin",
    icon: "lab",
    lede: "Ce este ÉLAN și ce nu se află în spatele raftului.",
  },
  {
    id: "comanda",
    label: "Comandă",
    icon: "pack",
    lede: "Coș, prețuri, carduri și mesajul de contact.",
  },
  {
    id: "livrare",
    label: "Livrare",
    icon: "shipping",
    lede: "Transportul, timpul și returul, toate în poveste.",
  },
  {
    id: "rutina",
    label: "Rutină",
    icon: "ritual",
    lede: "Ordinea gesturilor, fără obligația raftului întreg.",
  },
  {
    id: "piele",
    label: "Piele",
    icon: "leaf",
    lede: "Limita dintre textură și sfat medical.",
  },
  {
    id: "produse",
    label: "Produse",
    icon: "texture",
    lede: "Parfum, textură și ce găsești pe etichetă.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Ajutor"
        title="Întrebări frecvente"
        lede="Pe scurt, înainte să răsfoiești raftul. Dacă lipsește ceva, pagina de contact este tot o demonstrație. Nimic de aici nu este sfat medical."
      />
      <Container className="grid gap-12 py-14 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="h-fit lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">Teme</p>
          <ul className="mt-4 space-y-2">
            {topics.map((topic) => (
              <li key={topic.id}>
                <a href={`#${topic.id}`} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm hover:bg-white">
                  <SectionIcon name={topic.icon} className="text-orchid" size={16} />
                  {topic.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="space-y-12">
          {topics.map((topic) => {
            const items = faqs.filter((faq) => faq.topic === topic.label);
            if (items.length === 0) return null;
            return (
              <section key={topic.id} id={topic.id} className="scroll-mt-28">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lavender text-orchid">
                    <SectionIcon name={topic.icon} />
                  </span>
                  <div>
                    <h2 className="text-3xl">{topic.label}</h2>
                    <p className="mt-2 text-sm leading-6 text-ink">{topic.lede}</p>
                  </div>
                </div>
                <FaqAccordion className="mt-5" items={items} />
              </section>
            );
          })}
          <div className="rounded-[1.6rem] bg-blush px-6 py-8">
            <h2 className="text-3xl">Încă o nelămurire?</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink">
              Formularul de contact arată validarea. Nu deschide o conversație. Livrarea și returul sunt descrise separat, tot ca poveste.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonClass("solid")}>
                Scrie atelierului
              </Link>
              <Link href="/livrare-si-retur" className={buttonClass("line")}>
                Livrare și retur
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
