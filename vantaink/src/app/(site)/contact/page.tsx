import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { CityMap } from "@/components/contact/CityMap";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { MonoIndex } from "@/components/ui/MonoIndex";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact (demo)",
  description:
    "Contact fictiv, program demonstrativ și formular care salvează mesaje local, fără email real.",
};

const responseExpectations = [
  "Mesajele trimise prin formular sunt salvate în SQLite pe mediul demo.",
  "Nu trimitem răspuns pe email și nu există recepție umană legată de acest site.",
  "Timp de răspuns afișat în UI este fictiv: între 24 și 72 de ore în scenariul de prezentare.",
] as const;

export default function ContactPage() {
  return (
    <div>
      <Section className="border-b border-line py-14 md:py-20">
        <MonoIndex index="10" label="CONTACT" />
        <Reveal eager className="mt-5">
          <h1 className="display-section font-display uppercase text-text">
            Contact demonstrativ
          </h1>
        </Reveal>
        <Reveal delay={0.08} eager className="mt-5 max-w-2xl text-lg text-text-muted">
          {site.demoDisclaimer}
        </Reveal>
      </Section>

      <Section tone="surface" className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-10 lg:col-span-5">
            <Reveal className="space-y-6">
              <div>
                <h2 className="font-display text-2xl uppercase text-text" id="program">
                  Program (fictiv)
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  <li>{site.hours.weekdays}</li>
                  <li>{site.hours.saturday}</li>
                  <li>{site.hours.sunday}</li>
                </ul>
              </div>

              <address className="space-y-2 text-sm not-italic text-text-muted">
                <p className="font-mono-ui text-[0.65rem] uppercase tracking-[0.16em] text-text-subtle">
                  Date de contact
                </p>
                <p>{site.contact.address}</p>
                <p>
                  Email demonstrativ:{" "}
                  <span className="text-text">{site.contact.email}</span>
                </p>
                <p>
                  Telefon demonstrativ:{" "}
                  <span className="text-text">{site.contact.phone}</span>
                </p>
              </address>

              <div>
                <h2 className="font-display text-xl uppercase text-text">
                  Ce poți aștepta (demo)
                </h2>
                <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-text-muted">
                  {responseExpectations.map((line) => (
                    <li key={line.slice(0, 40)}>{line}</li>
                  ))}
                </ul>
              </div>

              <CityMap />
            </Reveal>
          </div>

          <Reveal delay={0.06} className="lg:col-span-7">
            <div className="border border-line bg-surface-raised p-6 md:p-8">
              <h2 className="font-display text-2xl uppercase text-text">
                Trimiteți un mesaj
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Preferi programarea ghidată?{" "}
                <Link href="/programare" className="text-accent no-underline hover:text-accent-hover">
                  Deschide fluxul de consultație
                </Link>
                .
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}