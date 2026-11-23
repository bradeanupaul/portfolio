import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getServiceBySlug, serviceSlugs, services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { serviceImage } from "@/lib/images";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.short,
    path: `/servicii/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Serviciu"
        title={service.title}
        description={service.short}
        imageSrc={serviceImage(service.slug)}
      >
        <Button href="/programare">Programează evaluare</Button>
      </PageHero>

      <section className="band-white section-pad">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionEyebrow>Descriere</SectionEyebrow>
            <p className="text-base leading-8 text-slate md:text-lg">{service.long}</p>
            <h2 className="mt-12 font-display text-2xl font-semibold text-carbon">Beneficii</h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-7 text-slate md:text-base">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-sm border border-carbon/10 bg-off-white p-6">
            <p className="font-mono-label text-copper">Flux tipic</p>
            <ol className="mt-5 space-y-5">
              {service.process.map((step, i) => (
                <li key={step.title}>
                  <p className="font-mono-label text-slate">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-display font-semibold text-carbon">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate">{step.detail}</p>
                </li>
              ))}
            </ol>
          </aside>
        </Container>
      </section>

      <section className="band-off section-pad">
        <Container>
          <SectionEyebrow>FAQ serviciu</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold text-carbon">Întrebări frecvente</h2>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={service.faq} />
          </div>
        </Container>
      </section>

      <section className="band-carbon section-pad">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-off-white">Alte servicii</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/servicii/${s.slug}`}
                className="rounded-sm border border-white/10 bg-charcoal p-5 hover:border-copper/40"
              >
                <h3 className="font-display font-semibold text-off-white">{s.title}</h3>
                <p className="mt-2 text-sm text-silver line-clamp-2">{s.short}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
