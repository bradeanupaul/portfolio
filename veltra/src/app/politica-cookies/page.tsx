import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { RevealHero, RevealItem, RevealStagger } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Politica cookies | VELTRA Alpine Hideaway",
  description: "Informații demonstrative despre cookie uri în site ul VELTRA.",
};

const blocks = [
  {
    title: "Cookie uri esențiale",
    body: "Mențin funcționarea formularelor și a zonei de admin. Fără ele, anumite fluxuri demo nu pot fi testate.",
  },
  {
    title: "Cookie uri analitice",
    body: "Într o lansare reală, analitica ar fi activată doar cu consimțământ. În demo, analitica poate fi dezactivată.",
  },
  {
    title: "Gestionare",
    body: "Puteți șterge cookie urile din setările browserului oricând. Acest text are caracter informativ pentru portofoliu.",
  },
];

export default function PoliticaCookiesPage() {
  return (
    <Section tone="ivory" className="pt-24">
      <Container className="max-w-3xl">
        <RevealHero>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-serif text-4xl text-pine">Politica cookies</h1>
          <p className="mt-6 text-ink/75">
            VELTRA demo poate utiliza cookie uri tehnice strict necesare pentru sesiunea de administrare și pentru
            preferințe de afișare. Nu folosim, în această variantă, profiling comercial.
          </p>
        </RevealHero>
        <RevealStagger className="mt-10 space-y-10">
          {blocks.map((b) => (
            <RevealItem key={b.title}>
              <section>
                <h2 className="font-serif text-2xl text-pine">{b.title}</h2>
                <p className="mt-4 text-ink/80">{b.body}</p>
              </section>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
