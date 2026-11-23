import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getProjectBySlug, projectSlugs } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { projectImages } from "@/lib/images";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/proiecte/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const images = projectImages(project.slug);
  const relatedServices = project.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={project.demoLabel}
        title={project.title}
        description={project.summary}
        imageSrc={images[0]}
      >
        <p className="font-mono-label text-copper">
          {project.car} · {project.year}
        </p>
      </PageHero>

      <section className="band-white section-pad">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Intervenție</SectionEyebrow>
            <p className="text-base leading-8 text-slate md:text-lg">{project.intervention}</p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-carbon">Proces</h2>
            <ol className="mt-5 space-y-4">
              {project.process.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm leading-7 text-slate md:text-base">
                  <span className="font-mono-label shrink-0 text-copper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Button href="/programare" className="mt-10">
              Solicită proiect similar
            </Button>
          </div>
          <div className="grid gap-3">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={project.gallery[i]?.alt ?? project.title}
                className="w-full rounded-sm border border-carbon/10 object-cover"
              />
            ))}
          </div>
        </Container>
      </section>

      {relatedServices.length ? (
        <section className="band-off section-pad">
          <Container>
            <SectionEyebrow>Servicii legate</SectionEyebrow>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedServices.map((service) =>
                service ? (
                  <Link
                    key={service.slug}
                    href={`/servicii/${service.slug}`}
                    className="rounded-sm border border-carbon/15 bg-white px-4 py-3 text-sm font-medium text-carbon hover:border-copper hover:text-copper"
                  >
                    {service.title}
                  </Link>
                ) : null,
              )}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
