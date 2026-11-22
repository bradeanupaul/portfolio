import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { studioImages } from "@/data/asset-manifest";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Despre studioul demo",
  description:
    "Povestea studioului fictiv VANTA INK: atelier, colaborare și valori, pentru prezentarea portofoliului.",
};

const approachSteps = [
  {
    index: "01",
    title: "Consultație",
    body: "Începem cu întrebări, referințe și limită clară între demo și serviciu real.",
  },
  {
    index: "02",
    title: "Concept",
    body: "Schițe, proporții și ritm de linie discutate înainte de orice decizie de sesiune.",
  },
  {
    index: "03",
    title: "Sesiune",
    body: "Fluxul arată cum arată o ședință în UI: pauze, note și progres ilustrativ.",
  },
] as const;

const values = [
  {
    title: "Claritate",
    body: "Spunem explicit ce este demonstrativ și ce nu trimite date în afara mediului local.",
  },
  {
    title: "Respect",
    body: "Textele evită promisiuni medicale sau certificări care nu există în acest proiect.",
  },
  {
    title: "Colaborare",
    body: "Siteul arată dialog între client, artist și atelier, nu doar o galerie statică.",
  },
] as const;

export default function DesprePage() {
  return (
    <div>
      <Section className="border-b border-line py-14 md:py-20">
        <MonoIndex index="08" label="DESPRE" />
        <Reveal eager className="mt-5">
          <h1 className="display-section font-display uppercase text-text">
            Atelierul ca spațiu de dialog
          </h1>
        </Reveal>
        <Reveal delay={0.08} eager className="mt-5 max-w-2xl text-lg text-text-muted">
          {site.brandName} este un studiou de portofoliu. Imaginile și textele descriu un ritm
          de lucru posibil în Cluj Napoca, fără pretenția unui studio comercial verificat.
        </Reveal>
        <Reveal delay={0.12} eager className="mt-6 max-w-xl text-text-muted">
          Pagina aceasta este construită din conținut citibil, nu din zone goale. Fiecare
          secțiune are rol narativ: introducere, atelier, valori și invitație spre programare
          demo.
        </Reveal>
      </Section>

      <Section tone="surface" className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-[1.08] text-text md:text-4xl">
              Povestea atelierului demo
            </h2>
            <p className="mt-4 text-text-muted">
              În scenariul VANTA INK, masa de lucru este punctul unde schița întâlnește pielea.
              Lampa laterală, hârtia de tras și scaunul reglabil apar ca detalii de proces, nu ca
              listă de echipamente oficiale.
            </p>
            <p className="mt-4 text-text-muted">
              Studioul fictiv se poziționează într-un cartier narativ din {site.locale.city}.
              Adresa și orele afișate pe site sunt placeholdere pentru interfață și pentru
              fluxul de consultație.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <blockquote className="border-l-2 border-accent bg-surface-raised px-6 py-5 lg:-translate-x-4">
              <p className="font-display text-2xl uppercase leading-tight text-text md:text-3xl">
                Ritm. Respirație. Linie.
              </p>
              <p className="mt-3 text-sm text-text-muted">
                O pauză tipografică în flux. Timpul se măsoară în consultații, schițe și
                sesiuni simulate.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <MonoIndex index="09" label="COMPOZIȚIE" />
        <Reveal className="mt-4">
          <h2 className="font-display text-3xl uppercase text-text md:text-4xl">
            Lumina și materialitatea
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <Reveal mode="mask" className="md:col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-line bg-surface-muted">
              <SmartImage
                src={studioImages.atelierWide}
                alt="Interior de atelier cu lumină laterală, banc de lucru și scaun reglabil."
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                objectPosition="center"
              />
            </div>
          </Reveal>
          <div className="grid gap-4 md:col-span-5">
            <Reveal mode="mask" delay={0.08}>
              <div className="relative aspect-[5/4] w-full overflow-hidden border border-line bg-surface-muted">
                <SmartImage
                  src={studioImages.workstation}
                  alt="Stație de lucru: lampă, mașină de tatuat și hârtie de tras."
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal mode="mask" delay={0.12}>
              <div className="relative aspect-[5/4] w-full overflow-hidden border border-line bg-surface-muted">
                <SmartImage
                  src={studioImages.materialDetail}
                  alt="Detaliu de materiale: cerneală, mănuși și hârtie de calc pe masă."
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-6 max-w-2xl text-text-muted">
          Lampa laterală taie umbre moi pe bancul de lucru. Hârtia de calc, cerneala și
          metalul steril definesc atmosfera atelierului: ordine practică, nu scenografie
          goală.
        </Reveal>
      </Section>

      <Section tone="raised" className="py-14 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl uppercase text-text md:text-4xl">
            Abordare în trei pași
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {approachSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.05}>
              <li className="border border-line bg-surface p-6">
                <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-accent">
                  {step.index}
                </p>
                <h3 className="mt-2 font-display text-xl uppercase text-text">{step.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="py-14 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl uppercase text-text md:text-4xl">Valori</h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="h-full border border-line bg-surface p-6">
                <h3 className="font-display text-xl uppercase text-text">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="surface" className="border-t border-line py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl uppercase text-text md:text-4xl">
              Colaborare cu artiștii demo
            </h2>
            <p className="mt-4 text-text-muted">
              Patru practicieni fictivi ilustrează direcții stilistice. Portretele și lucrările
              nu reprezintă o echipă angajată verificabilă, ci un exercițiu de prezentare.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="relative aspect-[3/2] w-full max-w-lg overflow-hidden border border-line lg:ml-auto">
              <SmartImage
                src={studioImages.studioTeam}
                alt="Echipă de atelier în scenariul fictiv VANTA INK."
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line py-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal className="space-y-2">
            <MonoIndex index="10" label="PROGRAMARE" />
            <p className="font-display text-2xl uppercase leading-[1.08] text-text md:text-3xl">
              Pornește o consultație demonstrativă
            </p>
            <p className="max-w-md text-sm text-text-muted">
              Formularul nu rezervă o ședință reală. Salvează date local pentru prezentarea
              portofoliului.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Button href="/programare" size="lg">
              Deschide programarea
            </Button>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}