import Link from "next/link";
import { buttonClass, Container, PageHero } from "@/components/chrome";
import { Media } from "@/components/media";
import { SectionIcon, type SectionIconName } from "@/components/section-icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Livrare și retur",
  "Reguli ilustrative de livrare și retur pentru demonstrația ÉLAN SKIN. Nu se expediază produse.",
);

const facts = [
  { value: "19 lei", label: "Transport în poveste" },
  { value: "250 lei", label: "Prag pentru transport gratuit" },
  { value: "14 zile", label: "Răzgândire, doar în regulă" },
  { value: "0 colete", label: "Pleacă din demonstrație" },
];

const sections: { icon: SectionIconName; heading: string; paragraphs: string[] }[] = [
  {
    icon: "clock",
    heading: "Cum ar pleca o comandă",
    paragraphs: [
      "În poveste, o comandă se pregătește în una sau două zile lucrătoare, de luni până vineri. Apoi ar călători prin România în câteva zile.",
      "Aici comanda se oprește la confirmare. Codul rămâne în baza locală, ca să poți revedea datele.",
      "Nu există un depozit, un curier sau un număr de urmărire real.",
    ],
  },
  {
    icon: "shipping",
    heading: "Costul transportului",
    paragraphs: [
      "Transportul ilustrativ costă 19 lei. De la 250 lei în sus, devine gratuit.",
      "Sumele nu corespund unui curier real și nu se încasează.",
      "Bara din coș arată cât mai lipsește până la pragul de 250 lei. Este un detaliu de interfață, nu o ofertă.",
    ],
  },
  {
    icon: "shield",
    heading: "Plata",
    paragraphs: [
      "Poți alege ramburs sau transfer bancar. Formularul nu cere număr de card, dată de expirare sau cod de securitate.",
      "Nu există un cont bancar al mărcii. Transferul este doar o opțiune din poveste.",
      "Nicio sumă nu pleacă din contul tău, pentru că nu există o plată.",
    ],
  },
  {
    icon: "pack",
    heading: "Returul, în poveste",
    paragraphs: [
      "O afacere reală ar oferi 14 zile pentru un produs cosmetic nedesfăcut, trimis înapoi pe cheltuiala cumpărătorului dacă nu este un defect.",
      "Pentru că produsele nu există fizic, nu există nici retur, nici rambursare.",
      "Pagina există ca să arate politica unui magazin de portofoliu, cu regulile spuse pe față.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Ajutor"
        title="Livrare și retur"
        lede="Aceste reguli descriu o poveste de magazin. În demonstrație nu pleacă niciun colet și nu se încasează niciun leu."
      />
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {facts.map((fact) => (
            <article key={fact.label} className="rounded-[1.4rem] bg-white p-5">
              <p className="font-display text-3xl text-aubergine md:text-4xl">{fact.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{fact.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading} className="rounded-[1.6rem] border border-line bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lavender text-orchid">
                    <SectionIcon name={section.icon} size={18} />
                  </span>
                  <h2 className="text-3xl text-aubergine">{section.heading}</h2>
                </div>
                <div className="mt-4 space-y-4 leading-7 text-ink">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28">
            <Media
              src="/assets/editorial/packaging.webp"
              alt="Ambalaje ÉLAN pe o masă deschisă."
              className="aspect-[4/5] rounded-[1.6rem]"
            />
            <div className="rounded-[1.6rem] bg-lavender p-6">
              <SectionIcon name="shipping" className="text-orchid" />
              <h2 className="mt-4 text-3xl">Nimic nu pleacă.</h2>
              <p className="mt-3 text-sm leading-6 text-ink">
                Confirmarea de comandă îți arată datele introduse. Nu generează un colet, o factură fiscală sau un drum până la ușă.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/intrebari-frecvente" className={buttonClass("solid")}>
                  Întrebări frecvente
                </Link>
                <Link href="/contact" className={buttonClass("line")}>
                  Contact ilustrativ
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
