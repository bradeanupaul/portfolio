import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Servicii",
  description:
    "Cumpărare, vânzare și închiriere cu Aurelia Estates: selecție scurtă, vizionări cu programare și aceleași condiții de la început.",
};

const buySteps = [
  {
    title: "O conversație scurtă",
    text: "Spuneți zona, ritmul zilei și dacă vreți cumpărare sau închiriere. Restul se limpezește din felul în care descrieți o dimineață.",
  },
  {
    title: "Selecție scurtă",
    text: "Propunem case pe care le putem apăra: lumină, plan, stare reală și un cartier pe care îl putem descrie.",
  },
  {
    title: "Vizionare privată",
    text: "Nu există tur deschis. Ora se alege ca lumina să spună adevărul, iar consultantul proprietății este de față.",
  },
  {
    title: "Până la predare",
    text: "Oferta, actele și termenul notarului rămân în aceeași conversație. Costurile se spun înainte, nu la semnare.",
  },
];

const sellSteps = [
  {
    title: "Mai întâi casa",
    text: "Începem cu o discuție și cu o vizită. Dacă nu putem prezenta locuința cu grijă, o spunem devreme.",
  },
  {
    title: "Preț argumentat",
    text: "Cererea proprietarului rămâne vizibilă. Discuția despre preț vine după ce casa a fost văzută, cu argumente concrete.",
  },
  {
    title: "Vizionări cu nume",
    text: "Nu deschidem ușa unui șir de curioși. Fiecare vizită are un nume și o oră.",
  },
  {
    title: "Onorariu scris",
    text: "Condițiile se stabilesc înainte de promovare. Nu apar costuri noi în ziua actelor.",
  },
];

const rentSteps = [
  {
    title: "Criterii de zi cu zi",
    text: "Buget lunar, durată, zonă și ce trebuie să existe din prima zi: birou, parcare, lift sau curte.",
  },
  {
    title: "Adrese verificabile",
    text: "Arătăm locuințe pe care le-am văzut. Spunem ce este inclus și ce rămâne de discutat cu proprietarul.",
  },
  {
    title: "Ora potrivită",
    text: "Vizionarea ține de lumină și de acces. Nu trimitem vizitatori unul după altul.",
  },
  {
    title: "Contract și predare",
    text: "Garanția, durata și data mutării se stabilesc în scris, înainte de semnare.",
  },
];

export default function ServicesPage() {
  return (
    <article className="bg-white pt-[var(--header-height)]">
      <section className="bg-white">
        <Container className="py-8 md:py-10">
          <div className="overflow-hidden rounded-[20px] bg-ice shadow-[0_18px_48px_rgba(12,23,40,0.07)] lg:grid lg:min-h-[640px] lg:grid-cols-12">
            <div className="relative min-h-[320px] sm:min-h-[420px] lg:col-span-7 lg:min-h-full">
              <Image
                src="/images/lifestyle/urban.jpg"
                alt="Interior urban luminos, folosit pentru capitolul de cumpărare"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:col-span-5 lg:px-10 lg:py-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                01 · Cumpărare
              </p>
              <RevealHeading
                as="h1"
                priority
                className="mt-3 font-display text-[clamp(2rem,3.2vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink"
              >
                Căutare cu puține adrese.
              </RevealHeading>
              <p className="mt-4 text-[17px] leading-relaxed text-slate">
                Pentru cine vrea să locuiască, nu să colecționeze vizionări. Același drum, cu
                onestitate: puține case, spuse pe îndelete.
              </p>
              <ol className="mt-8 space-y-5">
                {buySteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="pt-0.5 text-[12px] font-semibold tracking-[0.14em] text-cobalt">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/proprietati">Vezi proprietățile</Button>
                <Button href="/programeaza-vizionare" variant="secondary">
                  Programează o vizionare
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="vanzare" className="bg-midnight text-white">
        <Container className="py-12 md:py-16">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-sky">02 · Vânzare</p>
              <RevealHeading
                as="h2"
                className="mt-3 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
              >
                O reprezentare discretă.
              </RevealHeading>
            </div>
            <p className="max-w-xl text-[17px] leading-relaxed text-white/75 lg:col-span-6 lg:col-start-7">
              Pentru o adresă care merită puțini vizitatori și o poveste precisă. Fotografia, textul
              și calendarul se pregătesc după ce casa a fost văzută.
            </p>
          </div>

          <div className="relative mt-8 min-h-[420px] overflow-hidden rounded-[20px] md:min-h-[520px]">
            <Image
              src="/images/editorial/seller-cta-blue-hour.jpg"
              alt="Reședință la ora albastră, cu ferestre luminate"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="max-w-lg font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
                Proprietatea se prezintă o dată. Vizitatorii se aleg.
              </p>
            </div>
          </div>

          <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {sellSteps.map((step, index) => (
              <li key={step.title} className="rounded-[16px] bg-white/8 p-5">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-sky">0{index + 1}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/vinde-cu-noi" variant="light">
              Începe o conversație
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[12px] bg-white/10 px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              Scrie la studio
            </Link>
          </div>
        </Container>
      </section>

      <section id="inchiriere" className="bg-soft-blue">
        <Container className="py-12 md:py-16">
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_18px_48px_rgba(12,23,40,0.07)]">
            <div className="relative min-h-[280px] sm:min-h-[380px] md:min-h-[440px]">
              <Image
                src="/images/properties/penthouse-rooftop-twilight.jpg"
                alt="Terasă de penthouse la amurg, folosită pentru capitolul de închiriere"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
              <Reveal className="lg:col-span-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                  03 · Închiriere
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl">
                  Locuințe gata de trăit.
                </h2>
                <p className="mt-4 leading-relaxed text-slate">
                  Pentru cine caută un contract limpede și o casă în care se poate muta fără șantier.
                  Durata, garanția și ce este inclus se spun de la prima vizită.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/proprietati?tranzactie=inchiriere">Vezi închirierile</Button>
                  <Button href="/contact" variant="secondary">
                    Scrie despre un criteriu
                  </Button>
                </div>
              </Reveal>
              <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {rentSteps.map((step, index) => (
                  <li key={step.title} className="rounded-[16px] bg-ice p-5">
                    <p className="text-[12px] font-semibold tracking-[0.14em] text-cobalt">0{index + 1}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
