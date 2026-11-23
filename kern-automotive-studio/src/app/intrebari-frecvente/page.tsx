import { PageHero } from "@/components/layout/PageHero";
import { FaqBrowser } from "@/components/ui/FaqBrowser";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { posters } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Întrebări frecvente",
  description:
    "Răspunsuri pe PPF, ceramică, polish, geamuri, jante și interior — plus clarificări despre demo.",
  path: "/intrebari-frecvente",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Întrebări frecvente"
        description="Răspunsuri pe PPF, ceramică, polish, geamuri, jante și interior — plus clarificări despre natura demonstrativă a site-ului."
        imageSrc={posters.waterBeads}
      />
      <section className="band-off section-pad">
        <Container>
          <FaqBrowser />
        </Container>
      </section>
    </>
  );
}
