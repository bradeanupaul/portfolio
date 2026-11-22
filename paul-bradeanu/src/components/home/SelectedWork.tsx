"use client";

import Link from "next/link";
import {
  CalendarDays,
  ExternalLink,
  FileText,
  GalleryVertical,
  MapPinned,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { getDemoAudit } from "@/data/audits";
import { projectPosterSrc, projects } from "@/data/projects";
import { resolveProjectLiveUrl } from "@/lib/project-links";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { IconFeature } from "@/components/ui/IconFeature";
import { DemoAuditRings } from "@/components/projects/DemoAuditRings";
import { TechBadge } from "@/components/ui/TechBadge";
import {
  LaptopFrame,
  PhoneFrame,
  useDeviceActive,
} from "@/components/ui/DeviceFrames";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { useEffect, useState } from "react";

const featureIcons = [
  CalendarDays,
  GalleryVertical,
  Search,
  ShoppingBag,
  Palette,
  MapPinned,
  Users,
  Sparkles,
] as const;

function useIsLg() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return lg;
}

function ProjectWorkRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const desktop =
    project.screenshots.find((s) => s.kind === "hero") ??
    project.screenshots[0];
  const mobile = project.screenshots.find((s) => s.kind === "mobile");
  const reverse = index % 2 === 1;
  const audit = getDemoAudit(project.slug);
  const live = resolveProjectLiveUrl(project.slug, project.liveUrl);
  const icons = project.capabilities.map((cap, i) => ({
    label: cap.title,
    subtitle: cap.subtitle,
    icon: featureIcons[i % featureIcons.length],
  }));
  const { ref: devicesRef, active } = useDeviceActive(0.32);
  const isLg = useIsLg();
  const laptopFrom = reverse ? "right" : "left";
  const phoneFrom = reverse ? "left" : "right";

  return (
    <article className="grid items-center gap-6 overflow-visible md:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
      <div
        ref={devicesRef}
        className={cn(
          "relative overflow-visible py-1 sm:py-2 lg:col-span-7 lg:py-4",
          reverse && "lg:order-2",
        )}
      >
        <div
          className={cn(
            // Mobile: centered. Desktop: modest oversize, shift only outward.
            "relative z-10 mx-auto w-[100%] max-w-none sm:w-[102%] lg:mx-0 lg:w-[112%]",
            reverse ? "lg:ml-[2%] xl:ml-[3%]" : "lg:-ml-[14%] xl:-ml-[15%]",
          )}
        >
          <LaptopFrame
            image={{
              src: desktop.src,
              poster: projectPosterSrc(desktop.src, project.slug),
              alt: desktop.alt,
              priority: index === 0,
            }}
            active={active}
            appearDelay={0}
            appearFrom={laptopFrom}
          />

          {mobile ? (
            <div
              className={cn(
                "pointer-events-none absolute z-30 w-[72%] max-w-[300px] sm:w-[70%] sm:max-w-[320px] lg:w-[72%] lg:min-w-[260px] lg:max-w-[420px]",
                reverse
                  ? "bottom-[18%] left-[4%] sm:bottom-[16%] sm:left-[6%] lg:bottom-[14%] lg:left-[-2%] xl:bottom-[16%] xl:left-[-4%]"
                  : "bottom-[18%] right-[4%] sm:bottom-[16%] sm:right-[6%] lg:bottom-[14%] lg:right-[-2%] xl:bottom-[16%] xl:right-[-4%]",
              )}
            >
              <PhoneFrame
                image={{
                  src: mobile.src,
                  poster: projectPosterSrc(mobile.src, project.slug),
                  alt: mobile.alt,
                }}
                sizes="(max-width: 1024px) 300px, 420px"
                active={active}
                appearDelay={0.16}
                appearFrom={isLg ? phoneFrom : "up"}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>
                  <RevealItem
                    as="p"
                    variant="fadeLeft"
                    delay={0.04}
                    className="font-semibold text-[11px] tracking-[0.18em] text-[var(--accent-hover)] md:text-xs md:tracking-[0.2em]"
                  >
                    {String(index + 1).padStart(2, "0")} / 05 ·{" "}
                    {project.category.toUpperCase()}
                  </RevealItem>
                  <RevealItem
                    as="h3"
                    delay={0.1}
                    className="font-display mt-2 text-[1.7rem] font-semibold tracking-tight text-[var(--text-primary)] md:mt-3 md:text-[2.1rem]"
                  >
                    {project.name}
                  </RevealItem>
                  <RevealItem
                    as="p"
                    delay={0.16}
                    className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] md:mt-3 md:text-base"
                  >
                    {project.tagline}
                  </RevealItem>

                  <div className="mt-4 hidden grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 md:mt-6 md:grid md:gap-y-4">
                    {icons.slice(0, 4).map((item, i) => (
                      <RevealItem
                        key={item.label}
                        variant="fadeLeft"
                        delay={0.2 + i * 0.07}
                      >
                        <IconFeature
                          icon={item.icon}
                          label={item.label}
                          subtitle={item.subtitle}
                        />
                      </RevealItem>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                    {project.stack.slice(0, 6).map((tech, i) => (
                      <RevealItem
                        key={tech}
                        variant="pop"
                        delay={0.22 + i * 0.04}
                      >
                        <TechBadge name={tech} />
                      </RevealItem>
                    ))}
                  </div>

                  {audit ? (
                    <RevealItem
                      delay={0.36}
                      className="mt-4 md:mt-5"
                    >
                      <DemoAuditRings audit={audit} />
                    </RevealItem>
                  ) : null}

                  <RevealItem
                    delay={0.4}
                    className="mt-4 flex w-full flex-row flex-wrap gap-2 md:mt-7 md:gap-3"
                  >
                    {live.href ? (
                      <ButtonLink
                        href={live.href}
                        external
                        icon={ExternalLink}
                        showArrow
                        className="min-w-0 flex-1 justify-center sm:flex-none"
                      >
                        {live.label}
                      </ButtonLink>
                    ) : (
                      <span className="inline-flex min-h-[34px] min-w-0 flex-1 items-center justify-center rounded-full border border-[var(--line-on-dark)] px-3 text-xs text-[var(--text-muted)] sm:flex-none md:min-h-9">
                        {live.label}
                      </span>
                    )}
                    <ButtonLink
                      href={`/projects/${project.slug}`}
                      variant="secondary"
                      icon={FileText}
                      className="min-w-0 flex-1 justify-center sm:flex-none"
                    >
                      Studiu de caz
                    </ButtonLink>
                  </RevealItem>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="relative scroll-mt-24 overflow-x-clip overflow-y-visible border-y border-[var(--line-on-dark)] bg-[var(--bg-deep)] py-8 md:scroll-mt-28 md:py-24"
    >
      <div className="container-shell relative max-md:overflow-x-clip md:overflow-visible">
        <SectionHeading
          eyebrow="Proiecte selectate"
          title="Cinci experiențe web construite integral"
          description="Branduri demonstrative, cu preview-uri din site-urile locale reale. Nu reprezintă comenzi de client."
        />

        <div className="mt-6 space-y-12 md:mt-14 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectWorkRow
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>

        <Reveal className="mt-10 md:mt-14">
          <p className="max-w-2xl text-sm text-[var(--text-muted)]">
            Site-urile sunt proiecte demonstrative. Scorurile din secțiunea de
            date sunt illustrative, până la audituri reale.
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-flex items-center gap-2 text-[var(--accent-hover)] transition hover:gap-3"
          >
            Vezi toate proiectele
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
