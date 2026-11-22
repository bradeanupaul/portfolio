import {
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  LayoutTemplate,
  Download,
  FolderGit2,
  MapPin,
  UsersRound,
  MessagesSquare,
  Server,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  experienceEntries,
  skillGroups,
  softwareProjects,
} from "@/data/experience";
import { EducationRoadmap } from "@/components/experience/EducationRoadmap";
import { RevealItem, Stagger } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TechBadge } from "@/components/ui/TechBadge";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Experiență",
  path: "/experience",
  description:
    "Experiență profesională, studii și proiecte software ale lui Paul Brădeanu.",
});

const experienceMeta: Record<
  string,
  {
    icon: typeof Code2;
    accent: string;
    glow: string;
    label: string;
    highlightIcons: (typeof Code2)[];
  }
> = {
  "sr-solutions": {
    icon: Code2,
    accent: "#258cff",
    glow: "rgba(37,140,255,0.05)",
    label: "Full stack · AI",
    highlightIcons: [Code2, Server, Sparkles, Target, Database],
  },
  vodafone: {
    icon: MessagesSquare,
    accent: "#55b6ff",
    glow: "rgba(85,182,255,0.05)",
    label: "Comunicare · Vânzări",
    highlightIcons: [Users, MessagesSquare],
  },
};

const skillMeta: Record<
  string,
  { icon: typeof LayoutTemplate; accent: string; glow: string }
> = {
  frontend: {
    icon: LayoutTemplate,
    accent: "#55b6ff",
    glow: "rgba(85,182,255,0.04)",
  },
  backend: {
    icon: Server,
    accent: "#258cff",
    glow: "rgba(37,140,255,0.04)",
  },
  data: {
    icon: Database,
    accent: "#3ea0ff",
    glow: "rgba(62,160,255,0.04)",
  },
  ai: {
    icon: Bot,
    accent: "#7eb8ff",
    glow: "rgba(126,184,255,0.04)",
  },
};

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
  "AI",
  "multi-tenant",
  "comunicare",
];

export default function ExperiencePage() {
  return (
    <div className="pb-10 pt-5 md:pb-14 md:pt-8 lg:pb-16 lg:pt-10">
      <div className="container-shell">
        <Stagger stagger={0.06} delay={0.02} wrap={false}>
          <RevealItem as="p" variant="fadeLeft" className="eyebrow">
            Experiență
          </RevealItem>
          <RevealItem
            as="h1"
            className="mt-3 max-w-3xl text-[clamp(1.75rem,6.5vw,3.6rem)] font-semibold tracking-tight text-[var(--ink-on-dark)] md:mt-4"
          >
            Construiesc produse. Înțeleg sistemele din spatele lor.
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-3 max-w-2xl text-[15px] text-[var(--muted-on-dark)] md:mt-5 md:text-lg"
          >
            Pentru hiring managers: un rezumat clar al rolurilor, tehnologiilor
            și proiectelor software, fără metrici inventate.
          </RevealItem>
          <RevealItem className="mt-5 flex w-full flex-col gap-2 sm:mt-7">
            <div className="flex w-full gap-2">
              <ButtonLink
                href={siteConfig.linkedin}
                external
                icon={UsersRound}
                showArrow
                className="min-w-0 flex-1 justify-center sm:flex-none"
              >
                LinkedIn
              </ButtonLink>
              <ButtonLink
                href={siteConfig.github}
                variant="secondary"
                external
                icon={FolderGit2}
                showArrow
                className="min-w-0 flex-1 justify-center sm:flex-none"
              >
                GitHub
              </ButtonLink>
            </div>
            <a
              href={siteConfig.cvUrl}
              download
              className="btn btn-ghost w-full justify-center !px-0 sm:w-auto sm:justify-start"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              <span>Descarcă CV (PDF)</span>
            </a>
          </RevealItem>
        </Stagger>

        <div id="work" className="mt-8 scroll-mt-24 space-y-4 md:mt-14 md:space-y-6">
          {experienceEntries.map((entry) => {
            const meta = experienceMeta[entry.id] ?? experienceMeta["sr-solutions"];
            const RoleIcon = meta.icon;

            return (
              <article
                key={entry.id}
                className="relative overflow-hidden rounded-2xl border border-white/15 glass-card p-4 shadow-[0_18px_44px_rgba(4,10,18,0.32)] sm:p-5 md:rounded-[24px] md:p-8"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: meta.glow }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
                  }}
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <RevealItem variant="pop" delay={0.02}>
                        <span
                          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_12px_28px_rgba(37,140,255,0.28)]"
                          style={{
                            background: `linear-gradient(145deg, ${meta.accent} 0%, #1476ef 100%)`,
                          }}
                        >
                          <RoleIcon className="h-5 w-5" aria-hidden />
                        </span>
                      </RevealItem>
                      <div className="min-w-0">
                        <RevealItem
                          as="p"
                          variant="fadeLeft"
                          delay={0.06}
                          className="font-semibold text-[11px] tracking-[0.16em] text-[var(--accent-hover)]"
                        >
                          {meta.label}
                        </RevealItem>
                        <RevealItem
                          as="h2"
                          delay={0.1}
                          className="mt-1.5 text-xl font-semibold tracking-tight text-white md:text-2xl"
                        >
                          {entry.role}
                        </RevealItem>
                        <RevealItem
                          delay={0.14}
                          className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <Building2
                              className="h-3.5 w-3.5 text-[var(--accent-hover)]"
                              aria-hidden
                            />
                            {entry.company}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin
                              className="h-3.5 w-3.5 text-[var(--accent-hover)]"
                              aria-hidden
                            />
                            {entry.location}
                          </span>
                        </RevealItem>
                      </div>
                    </div>

                    <RevealItem
                      variant="fadeRight"
                      delay={0.12}
                      className="flex flex-wrap items-center gap-2"
                    >
                      {entry.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/35 bg-[rgba(37,140,255,0.03)] px-3 py-1.5 text-xs font-medium text-[var(--accent-hover)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-hover)]" />
                          Rol actual
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.015] px-3 py-1.5 font-semibold text-[11px] tracking-[0.12em] text-[var(--text-secondary)]">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {entry.start} · {entry.end}
                      </span>
                    </RevealItem>
                  </div>

                  <RevealItem
                    as="p"
                    delay={0.16}
                    className="mt-5 max-w-3xl text-[var(--text-secondary)]"
                  >
                    <BoldKeywords
                      text={entry.summary}
                      keywords={experienceKeywords}
                    />
                  </RevealItem>

                  <div className="mt-6 space-y-3">
                    {entry.highlights.map((item, i) => {
                      const PointIcon =
                        meta.highlightIcons[i] ?? CheckCircle2;
                      return (
                        <RevealItem
                          key={item.title}
                          variant="fadeLeft"
                          delay={0.08 + i * 0.07}
                          className="flex items-start gap-2.5 md:gap-3"
                        >
                          <PointIcon
                            className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
                            aria-hidden
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">
                              <BoldKeywords
                                text={item.title}
                                keywords={experienceKeywords}
                              />
                            </p>
                            <p className="mt-0.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                              <BoldKeywords
                                text={item.subtitle}
                                keywords={experienceKeywords}
                              />
                            </p>
                          </div>
                        </RevealItem>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div id="stack" className="mt-10 scroll-mt-24 md:mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <RevealItem as="p" variant="fadeLeft" className="eyebrow">
                Stack
              </RevealItem>
              <RevealItem
                as="h2"
                delay={0.06}
                className="section-title mt-2 text-[var(--ink-on-dark)]"
              >
                Tehnologii
              </RevealItem>
              <RevealItem
                as="p"
                delay={0.12}
                className="mt-2 max-w-xl text-sm text-[var(--text-secondary)] md:mt-3 md:text-base"
              >
                Grupate pe zona în care le folosesc zilnic, cu iconuri pe fiecare
                tehnologie.
              </RevealItem>
            </div>
          </div>

          <SnapCarousel
            className="mt-5 md:mt-8"
            ariaLabel="Grupuri tehnologii"
            trackClassName="max-md:-mx-3 max-md:px-3 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:snap-none md:pb-0"
            slideClassName="h-full max-md:w-[min(calc(100vw-2.5rem),340px)] md:w-auto md:min-w-0 md:shrink md:snap-none"
            dotsHideFrom="md"
          >
            {skillGroups.map((group, index) => {
              const meta = skillMeta[group.id] ?? skillMeta.frontend;
              const GroupIcon = meta.icon;

              return (
                <div
                  key={group.id}
                  className={cn(
                    "glass-card relative h-full overflow-hidden rounded-2xl border border-white/15 p-4 md:rounded-[22px] md:p-6",
                  )}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl"
                    style={{ background: meta.glow }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
                    }}
                    aria-hidden
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <RevealItem variant="pop" delay={0.02}>
                        <span
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white md:h-11 md:w-11 md:rounded-2xl"
                          style={{
                            background: `linear-gradient(145deg, ${meta.accent}, #1476ef)`,
                            boxShadow: `0 10px 24px ${meta.glow}`,
                          }}
                        >
                          <GroupIcon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                        </span>
                      </RevealItem>
                      <div>
                        <RevealItem
                          as="p"
                          variant="fadeLeft"
                          delay={0.06}
                          className="font-semibold text-[10px] tracking-[0.16em] text-[var(--text-muted)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </RevealItem>
                        <RevealItem
                          as="h3"
                          delay={0.1}
                          className="text-base font-semibold text-white md:text-lg"
                        >
                          {group.label}
                        </RevealItem>
                      </div>
                    </div>

                    <RevealItem
                      as="p"
                      delay={0.14}
                      className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:mt-4"
                    >
                      {group.context}
                    </RevealItem>

                    <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                      {group.items.map((item, i) => (
                        <RevealItem
                          key={item}
                          variant="pop"
                          delay={0.16 + i * 0.04}
                        >
                          <TechBadge
                            name={item}
                            className="border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-[var(--accent)]/40"
                          />
                        </RevealItem>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </SnapCarousel>
        </div>

        <div id="education" className="mt-10 scroll-mt-24 md:mt-16">
          <div className="flex items-center gap-3">
            <RevealItem variant="pop">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#258cff,#1476ef)] text-white md:h-10 md:w-10 md:rounded-2xl">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              </span>
            </RevealItem>
            <div>
              <RevealItem
                as="h2"
                delay={0.06}
                className="section-title text-[var(--ink-on-dark)]"
              >
                Studii
              </RevealItem>
              <RevealItem
                as="p"
                delay={0.12}
                className="mt-1 text-sm text-[var(--text-secondary)]"
              >
                Traiectorie academică, de la liceu la master.
              </RevealItem>
            </div>
          </div>
          <EducationRoadmap />
        </div>

        <div id="software" className="mt-10 scroll-mt-24 md:mt-16">
          <div className="flex items-center gap-3">
            <RevealItem variant="pop">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#258cff,#1476ef)] text-white md:h-10 md:w-10 md:rounded-2xl">
                <BriefcaseBusiness className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              </span>
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.06}
              className="section-title text-[var(--ink-on-dark)]"
            >
              Proiecte software
            </RevealItem>
          </div>

          <SnapCarousel
            className="mt-5 md:mt-8"
            ariaLabel="Proiecte software"
            trackClassName="max-lg:-mx-3 max-lg:px-3 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:snap-none lg:pb-0"
            slideClassName="h-full max-lg:w-[min(calc(100vw-2.5rem),340px)] lg:w-auto lg:min-w-0 lg:shrink lg:snap-none"
          >
            {softwareProjects.map((project) => (
              <article
                key={project.id}
                className="relative h-full overflow-hidden rounded-2xl glass-card border border-white/15 p-4 shadow-[0_16px_40px_rgba(4,10,18,0.28)] md:rounded-[22px] md:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.04),transparent_70%)] blur-2xl"
                  aria-hidden
                />
                <div className="relative">
                  <RevealItem
                    as="p"
                    variant="fadeLeft"
                    delay={0.04}
                    className="font-semibold text-[11px] tracking-[0.14em] text-[var(--accent-hover)] md:text-xs"
                  >
                    {project.role}
                  </RevealItem>
                  <RevealItem
                    as="h3"
                    delay={0.1}
                    className="mt-2 text-xl font-semibold text-white md:text-2xl"
                  >
                    {project.name}
                  </RevealItem>
                  <RevealItem
                    as="p"
                    delay={0.16}
                    className="mt-2.5 text-sm text-[var(--text-secondary)] md:mt-3 md:text-base"
                  >
                    {project.summary}
                  </RevealItem>
                  <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                    {project.stack.map((tech, i) => (
                      <RevealItem
                        key={tech}
                        variant="pop"
                        delay={0.2 + i * 0.04}
                      >
                        <TechBadge
                          name={tech}
                          className="border-white/15 bg-white/[0.04] backdrop-blur-md"
                        />
                      </RevealItem>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </SnapCarousel>
        </div>
      </div>
    </div>
  );
}
