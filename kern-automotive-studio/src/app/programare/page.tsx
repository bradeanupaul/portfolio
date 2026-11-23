import { BookingForm } from "@/components/forms/BookingForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { still } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Programare",
  description:
    "Formular demonstrativ de programare KERN. Mesajele nu ajung la un atelier real.",
  path: "/programare",
});

export default function ProgramarePage() {
  return (
    <>
      <PageHero
        eyebrow="Programare"
        title="Solicită o evaluare demonstrativă"
        description="Completează datele mașinii și serviciul de interes. Formularul simulează fluxul UX — nu confirmă un slot real și nu generează ofertă comercială."
        imageSrc={still.detailGloss}
      />
      <section className="band-off section-pad">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-sm border border-carbon/10 bg-white p-6 md:p-8">
            <BookingForm />
          </div>
          <aside className="h-fit rounded-sm border border-carbon/10 bg-white p-6 md:p-8">
            <p className="font-mono-label text-copper">Informații demo</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate">
              <li>
                <span className="font-semibold text-carbon">Email:</span> {site.contact.email}
              </li>
              <li>
                <span className="font-semibold text-carbon">Telefon:</span> {site.contact.phone}
              </li>
              <li>
                <span className="font-semibold text-carbon">Program:</span> {site.hours.weekdays}
              </li>
              <li>{site.demoDisclosure}</li>
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
