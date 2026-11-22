import type { Metadata } from "next";
import Image from "next/image";
import { agents } from "@/data/agents";
import { collections } from "@/data/collections";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Despre noi",
  description: site.description,
};

const zones = ["Herăstrău", "Primăverii", "Floreasca", "Pipera", "Corbeanca", "Brașov"];

const process = [
  {
    title: "Ascultăm",
    text: "Începem cu felul în care vreți să locuiți: lumina de dimineață, drumul până la școală, o curte închisă sau o terasă deasupra teilor.",
  },
  {
    title: "Alegem puțin",
    text: "Nu aducem zece adrese ca să umplem o jumătate de zi. Aducem casele pe care le putem povesti fără să inventăm.",
  },
  {
    title: "Vedem la fața locului",
    text: "Ora vizionării ține de lumină, nu de un gol din calendar. Consultantul proprietății este în casă, nu un înlocuitor.",
  },
  {
    title: "Rămânem până la cheie",
    text: "Negocierea, documentele și predarea fac parte din același drum. Nu dispărem după ce prețul a fost rostit.",
  },
];

const stats = [
  { value: String(properties.length), label: "Adrese în catalogul demo" },
  { value: String(agents.length), label: "Consultanți, fiecare cu o zonă" },
  { value: String(collections.length), label: "Colecții de locuire" },
  { value: String(zones.length), label: "Zone parcurse des" },
];

export default function AboutPage() {
  return (
    <article className="bg-white pt-[var(--header-height)]">
      <header className="bg-white">
        <Container className="grid items-center gap-8 py-8 lg:grid-cols-12 lg:py-12">
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Casa</p>
            <RevealHeading
              as="h1"
              priority
              className="mt-3 font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              {site.tagline}
            </RevealHeading>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">
              Aurelia Estates este o casă de reprezentare imaginată pentru acest portofoliu. Tonul,
              selecția și ritmul sunt reale ca exercițiu de design. Agenția, consultanții și
              proprietățile nu sunt.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[14px] bg-ice px-4 py-4">
                  <dt className="font-display text-3xl font-bold text-ink">{item.value}</dt>
                  <dd className="mt-1 text-sm leading-snug text-slate">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative pb-2 lg:col-span-7 lg:pb-8">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] bg-ice shadow-[0_16px_40px_rgba(12,23,40,0.08)]">
              <Image
                src="/images/hero/hero-flagship-villa.webp"
                alt="Vilă contemporană lângă lac, folosită ca imagine de prezentare"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 hidden w-[36%] overflow-hidden rounded-[16px] shadow-[0_16px_40px_rgba(12,23,40,0.16)] sm:block">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/images/editorial/detail-stone-glass.webp"
                  alt="Detaliu de piatră și sticlă"
                  fill
                  sizes="24vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-ice">
        <Container className="grid gap-8 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Felul de a lucra</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Puține case, cunoscute bine.
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-slate lg:col-span-8">
            <p>
              Lucrăm, în povestea acestui site, cu proprietari care vor o vânzare discretă și cu
              cumpărători care caută o locuință pentru mulți ani. Nu promitem tot orașul. Promitem
              să cunoaștem bine casele pe care le arătăm.
            </p>
            <p>
              Herăstrău, Primăverii, Floreasca, Pipera, Corbeanca și Brașov sunt zone pe care un
              consultant adevărat le-ar parcurge des. Aici ele sunt cadrul unei selecții scrise cu
              grijă, nu un inventar de anunțuri.
            </p>
            <p>
              Fotografiile vin dintr-o bibliotecă de prezentare. Ele descriu lumină, proporție și
              material, nu o adresă pe care o puteți cumpăra.
            </p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {zones.map((zone) => (
                <li key={zone} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-ink">
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Valori</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {site.principles.map((principle, index) => (
              <article key={principle.title} className="rounded-[18px] bg-ice p-7">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-cobalt">0{index + 1}</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-ink">{principle.title}</h2>
                <p className="mt-3 leading-relaxed text-slate">{principle.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-midnight text-white">
        <Container className="grid gap-8 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-sky">Proces</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              Patru timpi, același om.
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">
              De la prima conversație până la cheie rămâne același consultant. Nu predăm dosarul
              altcuiva după ce prețul a fost acceptat.
            </p>
            <div className="mt-6">
              <Button href="/echipa" variant="light">
                Cunoaște echipa
              </Button>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {process.map((step, index) => (
              <li key={step.title} className="rounded-[16px] bg-white/8 p-6">
                <Reveal delay={index * 0.05}>
                  <p className="text-[12px] font-semibold tracking-[0.14em] text-sky">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-soft-blue">
        <Container className="grid items-center gap-8 py-10 md:py-12 lg:grid-cols-12">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] shadow-soft lg:col-span-5">
            <Image
              src="/images/lifestyle/family.webp"
              alt="Interior cald, potrivit unei case de familie"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Mai departe</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-ink md:text-4xl">
              Dacă o adresă vi se potrivește, o vedem împreună.
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
              Catalogul este scurt și demonstrativ. Alegeți o zonă, o colecție sau un consultant,
              apoi programați vizionarea în cadrul acestui exercițiu de portofoliu.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/proprietati" variant="cobalt">
                Deschide catalogul
              </Button>
              <Button href="/echipa" variant="secondary">
                Consultanții
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
