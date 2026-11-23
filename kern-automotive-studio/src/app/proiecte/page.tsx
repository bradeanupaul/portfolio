import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { posters, projectImages } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Proiecte",
  description: "Studii de caz demonstrative KERN: PPF, polish, geamuri, jante, interior și wrap.",
  path: "/proiecte",
});

export default function ProiectePage() {
  return (
    <>
      <PageHero
        eyebrow="Proiecte"
        title="Studii de caz pe mașini premium"
        description="Opt proiecte fictive, cu intervenție, proces și galerie pe still-uri și postere din setul video. Fiecare caz e marcat demonstrativ."
        imageSrc={posters.rearOrbit}
      />
      <section className="band-off section-pad">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const [hero] = projectImages(project.slug);
              return (
                <Link
                  key={project.slug}
                  href={`/proiecte/${project.slug}`}
                  className="group overflow-hidden rounded-sm border border-carbon/10 bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hero}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-mono-label text-copper">{project.car}</p>
                    <h2 className="mt-2 font-display text-xl font-semibold text-carbon group-hover:text-copper">
                      {project.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.category.map((c) => (
                        <span
                          key={c}
                          className="rounded-sm border border-carbon/10 px-2 py-0.5 text-[11px] text-slate"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
