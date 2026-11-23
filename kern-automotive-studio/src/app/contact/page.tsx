import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { still } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact demonstrativ KERN Automotive Studio. Mesajele nu sunt livrate unui atelier real.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Scrie-ne în demo"
        description="Formularul de pe această pagină confirmă doar pe ecran. Nu se trimite email real și nu se deschide un ticket de suport."
        imageSrc={still.interior}
      />
      <section className="band-off section-pad">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-sm border border-carbon/10 bg-white p-6 md:p-8">
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div>
              <p className="font-mono-label text-copper">Date demonstrative</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate">
                <li>{site.contact.email}</li>
                <li>{site.contact.phone}</li>
                <li>
                  {site.contact.addressLine}, {site.contact.city}
                </li>
                <li>{site.contact.mapsLabel}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono-label text-copper">Program ilustrativ</p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate">
                <li>{site.hours.weekdays}</li>
                <li>{site.hours.saturday}</li>
                <li>{site.hours.sunday}</li>
              </ul>
            </div>
            <p className="rounded-sm border border-copper/25 bg-copper/10 p-4 text-sm leading-7 text-carbon">
              {site.demoDisclosure}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
