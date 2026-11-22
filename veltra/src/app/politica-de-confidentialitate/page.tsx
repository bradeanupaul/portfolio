import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { RevealHero, RevealItem, RevealStagger } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Politica de confidențialitate | VELTRA Alpine Hideaway",
  description: "Informații demonstrative despre prelucrarea datelor în proiectul VELTRA.",
};

const sections = [
  {
    title: "Scopul documentului",
    body: "Această pagină descrie, în mod demonstrativ, cum ar putea fi tratate datele personale într o implementare comercială a VELTRA. Nu reprezintă politică juridică obligatorie.",
  },
  {
    title: "Ce date colectăm în demo",
    body: "Formularele de contact, rezervare și solicitări experiențe pot stoca nume, email, telefon și mesaje în baza de date locală, exclusiv pentru testare.",
  },
  {
    title: "Temei și durată",
    body: "Într un produs real, prelucrarea s ar baza pe consimțământ sau contract. În demo, datele pot fi șterse la resetarea bazei de date.",
  },
  {
    title: "Drepturile persoanelor vizate",
    body: "Utilizatorii reali ar avea dreptul de acces, rectificare și ștergere conform legislației aplicabile. Pentru acest proiect, contactați dezvoltatorul portofoliului.",
  },
];

export default function PoliticaConfidentialitatePage() {
  return (
    <Section tone="ivory" className="pt-24">
      <Container className="max-w-3xl">
        <RevealHero>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-serif text-4xl text-pine">Politica de confidențialitate</h1>
          <p className="mt-6 text-ink/75">Ultima actualizare: noiembrie 2026. Document demonstrativ.</p>
        </RevealHero>
        <RevealStagger className="mt-12 space-y-10">
          {sections.map((s) => (
            <RevealItem key={s.title}>
              <section>
                <h2 className="font-serif text-2xl text-pine">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-ink/80">{s.body}</p>
              </section>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
