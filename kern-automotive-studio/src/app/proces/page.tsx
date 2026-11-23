import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { processStages } from "@/data/process";
import { buildMetadata } from "@/lib/metadata";
import { posters } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Proces",
  description:
    "Consultare, inspecție, pregătire, aplicare și predare — fluxul demonstrativ KERN pe cinci etape.",
  path: "/proces",
});

export default function ProcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Proces"
        title="De la consultare la predare pe LED"
        description="Cinci etape cu durate illustrative. Nu comprimăm curing-ul și nu sărim măsurătorile — UI-ul arată un flux pe care un atelier real l-ar putea comunica."
        imageSrc={posters.polish}
      >
        <Button href="/programare">Începe cu o evaluare</Button>
      </PageHero>

      <section className="band-off section-pad">
        <Container className="space-y-6">
          {processStages.map((stage, index) => (
            <article
              key={stage.id}
              id={stage.slug}
              className="grid gap-6 rounded-sm border border-carbon/10 bg-white p-8 lg:grid-cols-[6rem_1fr]"
            >
              <p className="font-mono-label text-copper">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold text-carbon md:text-3xl">
                    {stage.title}
                  </h2>
                  <p className="font-mono-label text-slate">{stage.durationHint}</p>
                </div>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate">{stage.summary}</p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {stage.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-7 text-slate">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
