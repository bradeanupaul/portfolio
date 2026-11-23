import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { posters, serviceImage } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Servicii",
  description:
    "PPF, ceramică, corecție vopsea, folii geamuri, detailing jante și interior — oferta demonstrativă KERN.",
  path: "/servicii",
});

export default function ServiciiPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicii"
        title="Protecție pe tip de suprafață"
        description="Opt intervenții demonstrative, de la film pe zone de risc la detailing interior pe Alcantara. Fiecare pagină detaliază beneficii, proces și FAQ."
        imageSrc={posters.ppfApply}
      />
      <section className="band-off section-pad">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicii/${service.slug}`}
                className="group overflow-hidden rounded-sm border border-carbon/10 bg-white"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={serviceImage(service.slug)}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-display text-2xl font-semibold text-carbon group-hover:text-copper">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate">{service.short}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-copper">
                    Vezi detalii →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
