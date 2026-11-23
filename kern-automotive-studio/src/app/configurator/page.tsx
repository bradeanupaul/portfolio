import { ConfiguratorWizard } from "@/components/forms/ConfiguratorWizard";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { still } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Configurator",
  description:
    "Wizard demonstrativ pe 4 pași: mașină, servicii, pachet și contact — fără ofertă comercială reală.",
  path: "/configurator",
});

export default function ConfiguratorPage() {
  return (
    <>
      <PageHero
        eyebrow="Configurator"
        title="Construiește un profil de protecție"
        description="Patru pași: date despre mașină, servicii de interes, pachet de plecare și date de contact. Totul rămâne în demo — fără trimitere către un atelier real."
        imageSrc={still.heroAngle}
        tone="dark"
      />
      <section className="band-off section-pad">
        <Container narrow>
          <ConfiguratorWizard />
        </Container>
      </section>
    </>
  );
}
