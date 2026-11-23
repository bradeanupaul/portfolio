import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Termeni",
  description: "Termeni și condiții demonstrative pentru KERN Automotive Studio.",
  path: "/termeni",
});

export default function TermeniPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termeni și condiții"
        description="Condiții illustrative pentru un site demonstrativ. Nu constituie ofertă comercială."
        tone="light"
      />
      <section className="band-white section-pad">
        <Container narrow className="space-y-8 text-base leading-8 text-slate">
          <p>
            Conținutul de pe {site.brandName} — texte, imagini, prețuri, studii de caz și programări —
            este fictiv și creat pentru prezentare de portofoliu. Nu reprezintă un angajament de
            prestare a unor servicii auto.
          </p>
          <p>
            Utilizarea site-ului nu creează un contract între vizitator și un atelier. Orice
            „programare” sau „configurare” rămâne o simulare de interfață.
          </p>
          <p>
            Materialele video și foto pot proveni din seturi generate sau licențiate pentru demo;
            drepturile aparțin surselor indicate în proiectul de portofoliu.
          </p>
        </Container>
      </section>
    </>
  );
}
