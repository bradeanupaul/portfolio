import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";
import {
  Reveal,
  RevealHero,
  RevealImage,
  RevealItem,
  RevealStagger,
} from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact | VELTRA Alpine Hideaway",
  description: "Scrieți echipei VELTRA. Formular demonstrativ, fără răspuns comercial real.",
};

type Props = {
  searchParams: Promise<{ subiect?: string }>;
};

const infoBlocks = [
  {
    title: "Sosire și plecare",
    text: "Check in de la 15:00, check out până la 11:00. Program ilustrativ pentru demo.",
    icon: "clock",
  },
  {
    title: "Parcare",
    text: "Locuri private pe domeniul lodge-ului, în concept. Fără coordonate GPS reale.",
    icon: "park",
  },
  {
    title: "Familii și grupuri",
    text: "Puteți întreba despre weekenduri de grup sau nevoi alimentare. Răspunsul rămâne demonstrativ.",
    icon: "group",
  },
  {
    title: "Răspuns în demo",
    text: "Mesajele se salvează local. Nu există inbox comercial și nu se trimite email real.",
    icon: "mail",
  },
] as const;

const contactFaq = [
  {
    id: "availability",
    question: "Cum aflu disponibilitatea?",
    answer:
      "Folosiți formularul sau pagina de rezervări. În demo, calendarul arată date ilustrative, nu inventar real.",
  },
  {
    id: "confirm",
    question: "Primesc confirmare de rezervare?",
    answer:
      "Da, în fluxul demonstrativ vedeți o confirmare pe ecran. Nu se emite confirmare comercială reală.",
  },
  {
    id: "guests",
    question: "Câți oaspeți pot veni?",
    answer:
      "Fiecare tip de cameră are o capacitate afișată. Pentru grupuri mai mari, scrieți la tipul de solicitare Grup.",
  },
  {
    id: "pets",
    question: "Acceptați animale de companie?",
    answer:
      "În acest concept, animalele de companie nu sunt acceptate în camere. Politica este fictivă și poate fi ajustată în portofoliu.",
  },
  {
    id: "parking",
    question: "Există parcare?",
    answer:
      "Da, în narațiune există locuri private pe domeniu. Nu furnizăm navigație către o adresă reală.",
  },
  {
    id: "sauna",
    question: "Sauna și ciubărul sunt incluse?",
    answer:
      "Accesul la facilitățile de relaxare face parte din conceptul lodge-ului. Detaliile practice apar pe pagina Facilități.",
  },
  {
    id: "diet",
    question: "Pot cere meniuri speciale?",
    answer:
      "Menționați preferințele alimentare în mesaj. ARBOR este demonstrativ, dar formularul acceptă astfel de cereri.",
  },
];

function InfoIcon({ kind }: { kind: (typeof infoBlocks)[number]["icon"] }) {
  const common = "h-5 w-5 text-clay";
  switch (kind) {
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      );
    case "park":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
          <path d="M4 17h16M7 17V9l5-4 5 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
          <path d="M10 17v-3h4v3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "group":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4.5 17.5c.8-2.2 2.6-3.5 4.5-3.5s3.7 1.3 4.5 3.5M14 14c1.4 0 2.8.8 3.5 2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
          <rect x="3.5" y="6" width="17" height="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultSubject = params.subiect ? decodeURIComponent(params.subiect) : "";

  return (
    <>
      <section className="overflow-hidden bg-ivory pt-[calc(var(--header-h)+1.75rem)] pb-12 md:pb-16">
        <div className="hero-shell grid items-end gap-10 lg:grid-cols-12">
          <RevealHero className="lg:col-span-6">
            <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-clay uppercase">Contact</p>
            <h1 className="mt-4 max-w-[16ch] font-serif text-[clamp(2.4rem,5vw,3.9rem)] leading-[1.04] text-pine text-balance">
              Un mesaj și începe <HandwrittenAccent>povestea</HandwrittenAccent>
            </h1>
            <p className="mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink/75">
              Camere, weekenduri de grup, meniuri speciale sau facilități. Completați formularul demonstrativ;
              datele rămân în mediul local de demo.
            </p>
            <ul className="mt-8 flex flex-wrap gap-6 text-sm text-pine/80">
              <li className="flex items-center gap-2">
                <InfoIcon kind="mail" />
                oaspeti@veltra.demo
              </li>
              <li className="flex items-center gap-2">
                <InfoIcon kind="clock" />
                răspuns ilustrativ
              </li>
            </ul>
          </RevealHero>
          <RevealImage
            from="right"
            immediate
            className="relative aspect-[5/4] max-h-[22rem] bg-forest-ink/8 lg:col-span-6 lg:justify-self-end lg:w-full"
          >
            <div
              className="absolute inset-0"
              style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <Image
                src="/images/about/about-human-moment.webp"
                alt="Intrare și lumină caldă la VELTRA"
                fill
                priority
                className="object-cover object-[50%_35%]"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </RevealImage>
        </div>
      </section>

      <section className="bg-[#EFE6DA] py-16 md:py-24">
        <div className="hero-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <aside className="surface-dark bg-forest-ink p-7 text-[#F3EBE1] md:p-9">
              <h2 className="font-serif text-2xl md:text-[1.75rem]">Date demonstrative</h2>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-[#F3EBE1]/72">
                Întrebări despre camere, grupuri, meniuri sau disponibilitate. Totul rămâne în proiectul de
                portofoliu.
              </p>
              <dl className="mt-8 space-y-5 text-[0.98rem]">
                <div className="border-t border-[#F3EBE1]/18 pt-4">
                  <dt className="font-semibold text-[#F3EBE1]">Email</dt>
                  <dd className="mt-1 text-[#F3EBE1]/72">oaspeti@veltra.demo</dd>
                </div>
                <div className="border-t border-[#F3EBE1]/18 pt-4">
                  <dt className="font-semibold text-[#F3EBE1]">Telefon</dt>
                  <dd className="mt-1 text-[#F3EBE1]/72">+40 700 111 222</dd>
                </div>
                <div className="border-t border-[#F3EBE1]/18 pt-4">
                  <dt className="font-semibold text-[#F3EBE1]">Zonă imaginată</dt>
                  <dd className="mt-1 text-[#F3EBE1]/72">Valea Cerbului Alb, Carpații României</dd>
                </div>
              </dl>
            </aside>
          </Reveal>

          <Reveal className="border border-ink/10 bg-ivory p-6 md:p-9 lg:col-span-7" delay={0.08}>
            <h2 className="font-serif text-2xl text-pine">Formular demo</h2>
            <p className="mt-2 text-[0.98rem] text-ink/65">
              Etichete deasupra câmpurilor, validare pe loc. Mesajele se salvează în baza locală de demo.
            </p>
            <div className="mt-6">
              <ContactForm defaultSubject={defaultSubject} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="hero-shell">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-pine">
              Zona în care ne imaginăm VELTRA
            </h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/70">
              Harta arată o regiune publică din Carpați (zona Brașov), doar ca atmosferă. Proprietatea și
              poziția sunt fictive; nu există pin navigabil către VELTRA.
            </p>
          </Reveal>

          <Reveal className="mt-8 overflow-hidden border border-ink/12 bg-[#EFE6DA]" delay={0.1}>
            <div className="relative aspect-[16/9] min-h-[16rem] w-full md:aspect-[21/9]">
              <iframe
                title="Hartă generală Carpați, zona Brașov (fictivă pentru VELTRA)"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=25.35%2C45.45%2C25.75%2C45.75&amp;layer=mapnik"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-4 py-3 text-sm text-ink/65">
              <p>Vizualizare OpenStreetMap, fără marker inventat.</p>
              <a
                href="https://www.openstreetmap.org/#map=11/45.6/25.55"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-clay underline-offset-4 hover:underline"
              >
                Deschide zona în OpenStreetMap
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#EFE6DA] py-16 md:py-20">
        <div className="hero-shell">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-pine">Înainte de a scrie</h2>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {infoBlocks.map((item) => (
              <RevealItem key={item.title}>
                <div className="border border-ink/10 bg-ivory p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-clay/35">
                      <InfoIcon kind={item.icon} />
                    </span>
                    <h3 className="font-serif text-xl text-pine">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink/70">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="hero-shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-clay uppercase">FAQ</p>
            <h2 className="mt-3 font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] text-pine">
              Înainte să <HandwrittenAccent>ajungi</HandwrittenAccent>
            </h2>
            <p className="mt-4 max-w-[36ch] text-[1.02rem] leading-relaxed text-ink/70">
              Răspunsuri scurte pentru disponibilitate, oaspeți, parcare și facilități. Un singur disclaimer
              de demo e suficient.
            </p>
            <div className="relative mt-8 aspect-[4/3] max-w-[22rem] overflow-hidden bg-forest-ink/8">
              <Image
                src="/images/exterior/lodge-studio.webp"
                alt="Detaliu atmosferic lodge VELTRA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 28vw"
              />
            </div>
            <p className="mt-4 text-sm text-ink/55">Proiect demonstrativ. Nu există check-in real.</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <FaqAccordion items={contactFaq} />
          </Reveal>
        </div>
      </section>

      <section className="surface-dark bg-forest-ink py-16 text-[#F3EBE1] md:py-20">
        <Reveal className="hero-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-balance">
              Preferi să vezi camerele întâi?
            </h2>
            <p className="mt-3 max-w-[40ch] text-[#F3EBE1]/75">
              Explorează tipurile de cazare sau începe o rezervare demonstrativă.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/camere" variant="sand" arrow>
              Vezi camerele
            </Button>
            <Button href="/rezervari" variant="copper-outline" className="border-ivory/40 text-ivory">
              Rezervă acum
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
