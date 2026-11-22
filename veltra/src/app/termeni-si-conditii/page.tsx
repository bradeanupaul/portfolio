import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Reveal, RevealHero } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Termeni și condiții | VELTRA Alpine Hideaway",
  description: "Termeni demonstrativi pentru utilizarea site ului și a rezervărilor fictive VELTRA.",
};

const clauses = [
  "VELTRA Alpine Hideaway este un proiect demonstrativ. Rezervările nu generează contracte reale de cazare.",
  "Prețurile afișate sunt orientative și nu implică obligații de plată.",
  "Conținutul site ului, inclusiv imagini și texte, este protejat de drepturile de autor ale autorului proiectului.",
  "Utilizatorii nu vor folosi formularele pentru transmiterea de conținut ilegal sau dăunător.",
  "Operatorul demo își rezervă dreptul de a modifica conținutul fără notificare prealabilă.",
];

export default function TermeniSiConditiiPage() {
  return (
    <Section tone="ivory" className="pt-24">
      <Container className="max-w-3xl">
        <RevealHero>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-serif text-4xl text-pine">Termeni și condiții</h1>
          <p className="mt-6 text-ink/75">
            Citiți cu atenție înainte de a folosi motorul de rezervări sau formularele. Document demonstrativ.
          </p>
        </RevealHero>
        <ol className="mt-12 list-decimal space-y-6 pl-5 text-ink/80 marker:font-serif marker:text-clay">
          {clauses.map((text, i) => (
            <li key={text} className="pl-2 leading-relaxed">
              <Reveal delay={Math.min(i * 0.06, 0.3)}>{text}</Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
