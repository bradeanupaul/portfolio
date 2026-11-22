import Image from "next/image";
import {
  BriefcaseBusiness,
  Database,
  FileSearch,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { softwareProjects } from "@/data/experience";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { IconFeature } from "@/components/ui/IconFeature";
import { TechBadge } from "@/components/ui/TechBadge";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

const featureSets: Record<string, { icon: typeof FileSearch; label: string }[]> = {
  "invoice-extractor": [
    { icon: FileSearch, label: "Extracție asistată de AI" },
    { icon: ShieldCheck, label: "Validare umană și izolare pe tenant" },
    { icon: Workflow, label: "Procesare pe loturi" },
    { icon: Database, label: "Stocare și export CSV" },
  ],
  "finance-advisor": [
    { icon: Database, label: "Servicii REST pe Spring Boot" },
    { icon: Workflow, label: "Cheltuieli, bugete, rapoarte" },
    { icon: ShieldCheck, label: "Documentație OpenAPI" },
    { icon: FileSearch, label: "PostgreSQL ca sursă de adevăr" },
  ],
};

export function SoftwareProjects() {
  return (
    <section id="software" className="scroll-mt-24 border-y border-white/5 bg-black py-12 pb-8 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Software"
          title="Proiecte de inginerie"
          description="Platforme cu backend, AI și logică de business, distincte de site-urile demo vizuale."
        />

        <SnapCarousel
          className="mt-8 md:mt-12"
          ariaLabel="Proiecte software"
          trackClassName="max-lg:-mx-3 max-lg:px-3 lg:flex-col lg:gap-10 lg:overflow-visible lg:snap-none lg:pb-0"
          slideClassName="max-lg:w-[min(90vw,400px)] lg:w-full lg:shrink lg:snap-none"
        >
          {softwareProjects.map((project, index) => {
            const image =
              project.id === "invoice-extractor"
                ? "/images/software/invoice-soft.jpg"
                : "/images/software/finance-soft.jpg";
            const features = featureSets[project.id] ?? [];
            const reverse = index % 2 === 1;

            return (
              <article
                key={project.id}
                className="grid h-full items-stretch gap-0 overflow-hidden rounded-[22px] border border-white/15 glass-card md:rounded-[28px] lg:grid-cols-2"
              >
                <Reveal
                  variant="scaleIn"
                  className={`relative aspect-[16/10] overflow-hidden sm:min-h-[220px] lg:aspect-auto lg:min-h-[280px] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    unoptimized
                  />
                </Reveal>
                <Stagger
                  className={`flex flex-col justify-center p-5 sm:p-6 md:p-8 ${
                    reverse ? "lg:order-1" : ""
                  }`}
                  stagger={0.05}
                  delay={0.06}
                  wrap={false}
                >
                  <RevealItem
                    as="p"
                    variant="fadeLeft"
                    className="text-[11px] font-semibold tracking-[0.16em] text-[var(--accent-hover)] md:text-xs"
                  >
                    {project.role}
                  </RevealItem>
                  <RevealItem
                    as="h3"
                    className="mt-2 text-xl font-semibold text-[var(--text-primary)] md:text-3xl"
                  >
                    {project.name}
                  </RevealItem>
                  <RevealItem
                    as="p"
                    className="mt-3 text-sm text-[var(--text-secondary)] md:mt-4 md:text-base"
                  >
                    <BoldKeywords text={project.summary} />
                  </RevealItem>
                  <RevealItem className="mt-4 hidden space-y-3 sm:block md:mt-6">
                    <Stagger stagger={0.045} delay={0} itemVariant="fadeLeft">
                      {features.map((item) => (
                        <IconFeature
                          key={item.label}
                          icon={item.icon}
                          label={item.label}
                        />
                      ))}
                    </Stagger>
                  </RevealItem>
                  <RevealItem className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                    <Stagger
                      className="flex flex-wrap gap-1.5 md:gap-2"
                      stagger={0.035}
                      delay={0}
                      itemVariant="pop"
                      itemClassName="!min-w-0"
                    >
                      {project.stack.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </Stagger>
                  </RevealItem>
                </Stagger>
              </article>
            );
          })}
        </SnapCarousel>

        <Reveal className="mt-5 md:mt-8" delay={0.08}>
          <ButtonLink
            href="/experience"
            variant="ghost"
            icon={BriefcaseBusiness}
            showArrow
            className="w-full justify-center !px-0 sm:w-auto"
          >
            Detalii în pagina de experiență
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
