import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { services } from "@/data/services";
import { serviceImage } from "@/lib/images";

export function ServicesAsymmetric() {
  const featured = services.slice(0, 3);
  const rest = services.slice(3, 7);

  return (
    <section className="band-carbon section-pad">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionEyebrow tone="light">Servicii</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-off-white md:text-5xl">
              Intervenții pe tip de suprafață
            </h2>
          </div>
          <Link
            href="/servicii"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-white"
          >
            Toate serviciile <ArrowUpRight size={16} />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/servicii/${service.slug}`}
                className="group block overflow-hidden rounded-sm border border-white/10 bg-charcoal"
              >
                <div className="aspect-[5/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={serviceImage(service.slug)}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-off-white group-hover:text-copper">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-silver">{service.short}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {rest.map((service) => (
            <Link
              key={service.slug}
              href={`/servicii/${service.slug}`}
              className="rounded-sm border border-white/10 bg-charcoal/80 p-5 transition hover:border-copper/50"
            >
              <h3 className="font-display text-lg font-semibold text-off-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate line-clamp-3">{service.short}</p>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
