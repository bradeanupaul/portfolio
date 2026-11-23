import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  KeyRound,
  Search,
  CalendarCheck,
  FileCheck2,
} from "lucide-react";
import { agents } from "@/data/agents";
import { collections } from "@/data/collections";
import { faq } from "@/data/faq";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { HeroHome } from "@/components/home/HeroHome";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProperties } from "@/lib/properties";

const serviceBlocks = [
  {
    title: "Prezentare și evaluare",
    text: "Stabilim prețul pe baza comparabilelor din zonă și a stării reale a locuinței. Pregătim fotografia, textul și calendarul de vizionări.",
    benefits: ["Comparabile actuale", "Strategie de preț", "Material de prezentare"],
    icon: ClipboardCheck,
    href: "/servicii",
  },
  {
    title: "Cumpărare și închiriere",
    text: "Filtrăm portofoliul după buget, zonă și tip. Organizăm vizionări, clarificăm documentele și rămânem până la semnarea contractului.",
    benefits: ["Selecție pe criterii clare", "Vizionări programate", "Suport la negociere"],
    icon: KeyRound,
    href: "/programeaza-vizionare",
  },
];

const steps = [
  {
    title: "Spui ce cauți",
    text: "Zonă, buget, tip de locuință și ce contează zi de zi: birou, grădină, lift, parcare.",
    icon: Search,
  },
  {
    title: "Primești o selecție scurtă",
    text: "Îți trimitem doar adresele potrivite, cu preț, suprafață și ce trebuie verificat la fața locului.",
    icon: FileCheck2,
  },
  {
    title: "Vizitezi cu programare",
    text: "Stabilim orele, accesul și punctele de control. Fără șiruri de vizite aleatorii.",
    icon: CalendarCheck,
  },
  {
    title: "Finalizezi tranzacția",
    text: "Te sprijinim la ofertă, documente și predare, cu același consultant pe tot parcursul.",
    icon: KeyRound,
  },
];

export default function HomePage() {
  const featured = getFeaturedProperties();
  const lead = featured[0];
  const cards = featured.slice(0, 3);

  return (
    <>
      <HeroHome />

      {/* Featured */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal variant="fadeLeft">
              <SectionHeading
                index="01"
                label="Selecție"
                title="Proprietăți în prim-plan"
                description="Trei adrese din catalogul demo, cu preț, suprafață și dormitoare vizibile din start."
              />
            </Reveal>
            <Reveal variant="scaleFade" delay={0.12}>
              <Button href="/proprietati" variant="secondary" className="shrink-0">
                Vezi toate
              </Button>
            </Reveal>
          </div>

          {lead ? (
            <Reveal variant="mask" className="mt-10 grid gap-6 overflow-hidden rounded-2xl bg-ice lg:grid-cols-12">
              <div className="relative min-h-[280px] lg:col-span-7 lg:min-h-[420px]">
                <Image
                  src={lead.images[0]}
                  alt={lead.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10 lg:col-span-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                  {lead.location}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-ink md:text-4xl">
                  {lead.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-slate">{lead.shortDescription}</p>
                <p className="mt-5 text-sm font-medium text-ink">
                  {lead.bedrooms} dormitoare · {lead.areaSqm} m² · {lead.bathrooms} băi
                </p>
                <Link
                  href={`/proprietati/${lead.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:text-ink"
                >
                  Deschide proprietatea
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          ) : null}

          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {cards.map((property) => (
              <RevealItem key={property.id} variant="maskUp">
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Value / services */}
      <section className="bg-ice py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <RevealGroup className="lg:col-span-5" stagger={0.1}>
              <RevealItem variant="fadeLeft">
                <RevealHeading
                  as="h2"
                  className="font-display text-3xl font-bold tracking-[-0.02em] text-ink md:text-5xl"
                >
                  Cum te sprijinim, concret.
                </RevealHeading>
              </RevealItem>
              <RevealItem variant="maskUp">
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate">
                  De la prima filtrare până la predarea cheilor: selecție scurtă, vizionări cu
                  programare și documente clare, fără tururi deschise.
                </p>
              </RevealItem>
              <RevealItem variant="scaleFade">
                <Button href="/servicii" className="mt-8">
                  Vezi serviciile
                </Button>
              </RevealItem>
            </RevealGroup>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {serviceBlocks.map((block, index) => (
                <Reveal key={block.title} variant="maskUp" delay={0.08 * index} className="rounded-2xl bg-white p-7 shadow-soft">
                  <block.icon className="h-7 w-7 text-cobalt" aria-hidden />
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{block.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{block.text}</p>
                  <RevealGroup className="mt-5 space-y-2">
                    {block.benefits.map((benefit) => (
                      <RevealItem key={benefit} variant="slide">
                        <div className="flex items-center gap-2 text-sm text-ink">
                          <span className="h-1.5 w-1.5 rounded-full bg-cobalt" aria-hidden />
                          {benefit}
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                  <Link
                    href={block.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:text-ink"
                  >
                    Află mai mult
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Collections */}
      <section className="bg-soft-blue/40 py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              index="02"
              label="Colecții"
              title="Teme de locuire"
              description="Trei direcții din catalog: viață urbană, spațiu pentru familie și priveliști largi."
            />
            <Link
              href="/colectii"
              className="text-sm font-semibold text-cobalt hover:text-ink"
            >
              Toate colecțiile
            </Link>
          </div>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {collections.map((collection) => (
              <RevealItem key={collection.slug} variant="mask">
                <Link
                  href={`/colectii/${collection.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white">
                      {collection.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white">{collection.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                      Deschide
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Process timeline */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeading
            index="03"
            label="Proces"
            title="Cum lucrăm, în patru pași"
            description="Un flux clar, de la primul mesaj până la predarea cheilor."
          />
          <div className="relative mt-12">
            <div
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-steel md:block"
              aria-hidden
            />
            <RevealGroup className="grid gap-8 md:grid-cols-4">
              {steps.map((step, index) => (
                <RevealItem key={step.title}>
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-cobalt">
                      <step.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{step.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Full-width navy feature */}
      <section className="bg-midnight py-16 text-white md:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal variant="mask" className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-6">
              <Image
                src="/images/editorial/facade-detail.webp"
                alt="Detaliu de fațadă contemporană"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <RevealGroup className="lg:col-span-5 lg:col-start-8" stagger={0.1}>
              <RevealItem variant="fadeLeft">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-soft-blue">
                  Pentru proprietari
                </p>
              </RevealItem>
              <RevealItem variant="maskUp">
                <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl">
                  Vrei o prezentare clară pentru proprietatea ta?
                </h2>
              </RevealItem>
              <RevealItem variant="maskUp">
                <p className="mt-5 text-[16px] leading-relaxed text-slate-soft">
                  Trimite tipul, zona și o estimare de preț. Răspundem în cadrul demonstrației, fără a
                  pretinde că am trimis un email real.
                </p>
              </RevealItem>
              <RevealItem variant="scaleFade">
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/vinde-cu-noi" className="bg-white text-ink hover:bg-soft-blue">
                    Vreau să vând
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact
                  </Button>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Districts */}
      <section className="bg-ice py-16 md:py-20">
        <Container>
          <SectionHeading
            index="04"
            label="Cartiere"
            title="Explorează zona"
            description="Alege un cartier, vezi listările demo din zonă și harta cu pinuri aproximative."
          />
          <DistrictExplorer />
        </Container>
      </section>

      {/* Agents */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              index="05"
              label="Echipă"
              title="Consultanții proiectului demo"
              description="Portrete și specializări fictive, legate de listările din catalog."
            />
            <Link href="/echipa" className="text-sm font-semibold text-cobalt hover:text-ink">
              Vezi echipa
            </Link>
          </div>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {agents.map((agent) => (
              <RevealItem key={agent.slug}>
                <Link href={`/echipa/${agent.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ice">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold text-ink">{agent.name}</p>
                  <p className="mt-1 text-sm text-slate">{agent.role}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-ice py-16 md:py-20">
        <Container>
          <SectionHeading
            index="06"
            label="Mărturii demo"
            title="Ce spun vizitatorii fictivi"
            description="Textele de mai jos sunt inventate pentru portofoliu. Nu reprezintă clienți reali."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {testimonials[0] ? (
              <Reveal className="rounded-2xl bg-white p-8 shadow-soft md:p-10 lg:col-span-7">
                <p className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-ink md:text-3xl">
                  „{testimonials[0].quote}”
                </p>
                <p className="mt-8 text-sm font-semibold text-ink">{testimonials[0].name}</p>
                <p className="mt-1 text-sm text-slate">
                  {testimonials[0].role} · {testimonials[0].location}
                </p>
              </Reveal>
            ) : null}
            <div className="flex flex-col gap-5 lg:col-span-5">
              {testimonials.slice(1, 3).map((item, index) => (
                <Reveal key={item.name} delay={0.08 * (index + 1)} className="rounded-2xl bg-white p-6 shadow-soft">
                  <p className="text-[15px] leading-relaxed text-slate">„{item.quote}”</p>
                  <p className="mt-5 text-sm font-semibold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-slate">
                    {item.role} · {item.location}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                index="07"
                label="Întrebări"
                title="Înainte de vizionare"
              />
              <Link
                href="/intrebari-frecvente"
                className="mt-6 inline-flex text-sm font-semibold text-cobalt hover:text-ink"
              >
                Toate răspunsurile
              </Link>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={faq.slice(0, 6)} />
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-16 text-white md:py-20">
        <Container className="text-center">
          <RevealGroup stagger={0.1} className="mx-auto max-w-2xl">
            <RevealItem variant="maskUp">
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                Gata să vezi o adresă din catalog?
              </h2>
            </RevealItem>
            <RevealItem variant="maskUp">
              <p className="mx-auto mt-5 max-w-lg text-[16px] text-slate-soft">
                {site.tagline} Deschide filtrul sau trimite o cerere de vizionare în demonstrație.
              </p>
            </RevealItem>
            <RevealItem variant="scaleFade">
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/proprietati" className="bg-white text-ink hover:bg-soft-blue">
                  Catalogul demo
                </Button>
                <Button href="/programeaza-vizionare" variant="secondary">
                  Programează vizionare
                </Button>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
