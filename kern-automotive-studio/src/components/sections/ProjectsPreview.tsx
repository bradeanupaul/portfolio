import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { projects } from "@/data/projects";
import { projectImages } from "@/lib/images";

export function ProjectsPreview() {
  const featured = projects.slice(0, 4);

  return (
    <section className="band-off section-pad">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionEyebrow>Proiecte</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold text-carbon md:text-5xl">
              Studii de caz demonstrative
            </h2>
          </div>
          <Link href="/proiecte" className="text-sm font-semibold text-copper hover:text-carbon">
            Toate proiectele →
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((project) => {
            const [hero] = projectImages(project.slug);
            return (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/proiecte/${project.slug}`}
                  className="group block overflow-hidden rounded-sm border border-carbon/10 bg-white"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hero}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-mono-label text-copper">{project.car}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-carbon group-hover:text-copper">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate line-clamp-2">{project.summary}</p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
