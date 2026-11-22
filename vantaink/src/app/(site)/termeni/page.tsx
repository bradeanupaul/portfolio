import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/ui/LegalProse";
import { MonoIndex } from "@/components/ui/MonoIndex";

export const metadata: Metadata = {
  title: "Termeni de utilizare (demo)",
  description:
    "Termeni fictivi pentru utilizarea site ului demonstrativ VANTA INK, aliniați cu absența serviciilor reale.",
};

export default function TermeniPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <MonoIndex index="L2" label="TERMENI" />
        <Reveal className="mt-6">
          <h1 className="display-section font-display uppercase text-text">
            Termeni de utilizare demonstrativi
          </h1>
        </Reveal>
        <LegalProse className="mt-8 border border-line bg-surface-raised p-6 md:p-8">
          <p>
            Accesând VANTA INK acceptați că utilizați un proiect de portofoliu,
            nu un studio operațional de tatuaj.
          </p>
          <h2>Natură fictivă</h2>
          <p>
            Artiștii, lucrările, programările și datele de contact sunt create
            pentru prezentare. Orice rezervare sau mesaj trimis prin site este
            simulat și stocat local.
          </p>
          <h2>Fără servicii reale</h2>
          <p>
            Nu se efectuează tatuaje, consultații medicale sau plăți prin acest
            site. Informațiile despre îngrijire sunt generale și nu înlocuiesc
            sfatul unui specialist.
          </p>
          <h2>Conținut și imagini</h2>
          <p>
            Imaginile pot fi placeholder sau în curs de generare. Nu garantăm
            disponibilitatea fișierelor media listate în manifest.
          </p>
          <h2>Utilizare acceptabilă</h2>
          <p>
            Este interzisă trimiterea masivă de formulare, tentativa de abuz a
            API urilor demo sau introducerea de date care încalcă legea. Se
            aplică limitări tehnice de rată pe server.
          </p>
          <h2>Limitarea răspunderii</h2>
          <p>
            Proiectul este oferit ca atare, fără garanții. Dezvoltatorul nu
            răspunde pentru decizii luate pe baza conținutului demonstrativ.
          </p>
        </LegalProse>
      </Container>
    </div>
  );
}