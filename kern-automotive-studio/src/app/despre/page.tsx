import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { posters, still } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Despre",
  description: site.description,
  path: "/despre",
});

export default function DesprePage() {
  return (
    <>
      <PageHero
        eyebrow="Despre KERN"
        title="Studio demonstrativ de protecție auto"
        description={site.description}
        imageSrc={posters.introOrbit}
      />

      <section className="band-white section-pad">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Poziționare</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon">
              Atelier de finisaj, nu spălătorie rapidă
            </h2>
            <p className="mt-4 text-base leading-8 text-slate">
              KERN Automotive Studio este un proiect de portofoliu: un brand fictiv din{" "}
              {site.contact.city}, construit ca să arate cum ar comunica un atelier premium —
              ton editorial, documentare vizuală și fluxuri UX complete (programare, configurator,
              jurnal).
            </p>
            <p className="mt-4 text-base leading-8 text-slate">
              Nu preluăm comenzi reale. Datele de contact, prețurile și studiile de caz sunt
              illustrative. Dacă explorezi site-ul ca referință de design sau de UX, acesta e
              scopul.
            </p>
            <Button href="/proces" className="mt-8" variant="dark">
              Cum lucrăm
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={still.detailPanel} alt="" className="aspect-[3/4] rounded-sm object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={still.ceramicRain} alt="" className="mt-8 aspect-[3/4] rounded-sm object-cover" />
          </div>
        </Container>
      </section>

      <section className="band-carbon section-pad">
        <Container>
          <SectionEyebrow tone="light">Locație demo</SectionEyebrow>
          <div className="mt-4 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-off-white">Adresă</h3>
              <p className="mt-3 text-sm leading-7 text-silver">
                {site.contact.addressLine}
                <br />
                {site.contact.city}, {site.contact.region}
                <br />
                {site.contact.mapsLabel}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-off-white">Program</h3>
              <p className="mt-3 text-sm leading-7 text-silver">
                {site.hours.weekdays}
                <br />
                {site.hours.saturday}
                <br />
                {site.hours.sunday}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-off-white">Contact</h3>
              <p className="mt-3 text-sm leading-7 text-silver">
                {site.contact.email}
                <br />
                {site.contact.phone}
                <br />
                {site.hours.note}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
