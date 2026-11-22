import Image from "next/image";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Code2,
  Database,
  MapPin,
  MessagesSquare,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { experienceEntries } from "@/data/experience";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";

const experienceKeywords = [
  "Next.js",
  "React",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Supabase",
  "Python",
  "Google Gemini",
  "SaaS",
  "REST",
  "Stripe",
  "DACH",
  "full stack",
  "AI",
  "editor",
  "multi tenancy",
];

const srHighlightIcons = [Code2, Database, Sparkles, Target] as const;
const salesHighlightIcons = [Users, MessagesSquare] as const;

export function ExperienceTeaser() {
  return (
    <section className="border-y border-[var(--line-on-dark)] bg-[var(--bg-ink)] py-12 md:py-24">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="Experiență"
            title="Traiectorie profesională"
            description="Focus pe munca actuală full stack și AI, plus un rol comercial care a întărit comunicarea cu oamenii."
          />
          <Reveal variant="scaleIn" className="relative mt-8 hidden overflow-hidden rounded-[22px] border border-[var(--line-on-dark)] lg:block">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/experience/work-soft.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="420px"
                unoptimized
              />
            </div>
          </Reveal>
          <Reveal className="mt-6 md:mt-8" delay={0.1}>
            <ButtonLink
              href="/experience"
              variant="secondary"
              icon={BriefcaseBusiness}
              showArrow
              className="w-full justify-center sm:w-auto"
            >
              Vezi experiența completă
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative space-y-10">
          <div
            className="absolute bottom-6 left-[11px] top-6 w-px bg-[linear-gradient(180deg,var(--accent),transparent)]"
            aria-hidden
          />

          {experienceEntries.map((entry) => {
            const Icon =
              entry.id === "sr-solutions" ? BriefcaseBusiness : MessagesSquare;
            const bullets =
              entry.id === "sr-solutions"
                ? entry.highlights.slice(0, 4)
                : entry.highlights;
            const bulletIcons =
              entry.id === "sr-solutions"
                ? srHighlightIcons
                : salesHighlightIcons;

            return (
              <article key={entry.id} className="relative pl-14">
                <Stagger stagger={0.05} delay={0.04} wrap={false}>
                  <RevealItem
                    variant="pop"
                    className="absolute left-0 top-0 z-10 flex h-6 w-6 items-center justify-center bg-[var(--bg-ink)]"
                  >
                    <Icon
                      className="h-6 w-6 text-[var(--accent-hover)]"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </RevealItem>

                  <RevealItem className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-xs tracking-[0.12em] text-[var(--accent-hover)]">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      {entry.start} · {entry.end}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2
                        className="h-3.5 w-3.5 text-[var(--accent)]"
                        aria-hidden
                      />
                      {entry.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin
                        className="h-3.5 w-3.5 text-[var(--accent)]"
                        aria-hidden
                      />
                      {entry.location}
                    </span>
                  </RevealItem>
                  <RevealItem
                    as="h3"
                    className="mt-3 text-xl font-semibold text-[var(--text-primary)]"
                  >
                    {entry.role
                      .replace("Full-Stack", "Full Stack")
                      .replace("R&D", "R și D")}
                  </RevealItem>
                  <RevealItem as="p" className="mt-3 text-[var(--text-secondary)]">
                    <BoldKeywords
                      text={entry.summary
                        .replaceAll("multi-tenant", "multi tenancy")
                        .replaceAll("full-stack", "full stack")}
                      keywords={experienceKeywords}
                    />
                  </RevealItem>
                  <RevealItem className="mt-4">
                    <Stagger stagger={0.045} delay={0} itemVariant="fadeLeft">
                      {bullets.map((item, i) => {
                        const Bullet = bulletIcons[i % bulletIcons.length];
                        return (
                          <div
                            key={item.title}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                          >
                            <Bullet
                              className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
                              aria-hidden
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-[var(--text-primary)]">
                                <BoldKeywords
                                  text={item.title}
                                  keywords={experienceKeywords}
                                />
                              </p>
                              <p className="mt-0.5">
                                <BoldKeywords
                                  text={item.subtitle}
                                  keywords={experienceKeywords}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </Stagger>
                  </RevealItem>
                </Stagger>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
