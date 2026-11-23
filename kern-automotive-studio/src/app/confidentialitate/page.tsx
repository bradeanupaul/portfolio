import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Confidențialitate",
  description: "Politică demonstrativă de confidențialitate pentru KERN Automotive Studio.",
  path: "/confidentialitate",
});

export default function ConfidentialitatePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Politică de confidențialitate"
        description="Text demonstrativ. Site-ul nu colectează date reale de clienți și nu operează un atelier."
        tone="light"
      />
      <section className="band-white section-pad">
        <Container narrow className="space-y-8 text-base leading-8 text-slate">
          <p>
            {site.brandName} este un proiect demonstrativ de portofoliu. Formularele de pe site
            (contact, programare, configurator) afișează un mesaj de succes local și nu trimit date
            către un server de producție sau către un atelier real.
          </p>
          <p>
            Nu operăm un sistem CRM, nu stocăm mesaje și nu vindem date. Dacă în viitor acest
            proiect ar fi conectat la un backend, politica ar fi actualizată înainte de orice
            colectare.
          </p>
          <p>
            Pentru întrebări despre acest demo, folosește datele illustrative din pagina de contact —
            fără așteptarea unui răspuns operațional.
          </p>
        </Container>
      </section>
    </>
  );
}
