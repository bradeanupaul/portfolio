import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  FileCode2,
  ImageIcon,
  Languages,
  LayoutGrid,
  Map,
  MessageCircle,
  PersonStanding,
  ShieldCheck,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { projectCoverAlt, projectCoverSrc } from "@/data/projects";
import { getDemoAudit } from "@/data/audits";
import { resolveProjectLiveUrl } from "@/lib/project-links";
import { RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { TechBadge } from "@/components/ui/TechBadge";
import { CaseStudyDeviceHero } from "@/components/projects/CaseStudyDeviceHero";
import { CaseStudyHighlights } from "@/components/projects/CaseStudyHighlights";
import { DemoAuditRings } from "@/components/projects/DemoAuditRings";
import { showcaseKeywords } from "@/data/project-highlights";

const caseKeywords = [
  ...showcaseKeywords,
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Prisma",
  "Zod",
  "SQLite",
  "Framer Motion",
  "SEO",
  "metadata",
  "Open Graph",
  "JSON-LD",
  "mobil",
  "brand",
];

export function CaseStudyView({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const live = resolveProjectLiveUrl(project.slug, project.liveUrl);
  const demoAudit = getDemoAudit(project.slug);
  const hero =
    project.screenshots.find((s) => s.kind === "hero") ?? project.screenshots[0];
  const mobile = project.screenshots.find((s) => s.kind === "mobile");
  const details = project.screenshots.filter((s) => s.kind === "detail");

  return (
    <article className="relative overflow-x-clip overflow-y-visible pb-20 pt-8 md:pt-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(900px_380px_at_8%_-10%,rgba(37,140,255,0.04),transparent_58%),radial-gradient(640px_300px_at_92%_8%,rgba(15,79,154,0.03),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-40 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `${project.accent}22` }}
        aria-hidden
      />

      <div className="container-shell relative">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <RevealItem delay={0.02} variant="fadeLeft">
              <div className="inline-flex items-center gap-3">
                <span
                  className="h-px w-8"
                  style={{ background: project.accent }}
                  aria-hidden
                />
                <p className="eyebrow !normal-case tracking-[0.16em]">
                  {project.category}
                  <span className="mx-2 text-white/25">/</span>
                  {project.status === "demo-local" ? "Demo local" : "Live"}
                </p>
              </div>
            </RevealItem>

            <RevealItem as="h1" delay={0.08} className="font-display mt-5 text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink-on-dark)]">
              {project.name}
            </RevealItem>

            <RevealItem as="p" delay={0.14} className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted-on-dark)] md:text-lg">
              <BoldKeywords text={project.tagline} keywords={caseKeywords} />
            </RevealItem>

            <RevealItem delay={0.2} className="mt-7 flex flex-wrap gap-2">
              {live.href ? (
                <ButtonLink
                  href={live.href}
                  external
                  icon={ExternalLink}
                  showArrow
                >
                  {live.label}
                </ButtonLink>
              ) : (
                <span className="inline-flex min-h-9 items-center text-sm text-[var(--muted-on-dark)]">
                  {live.label}
                </span>
              )}
              <ButtonLink
                href="/projects"
                variant="secondary"
                icon={LayoutGrid}
              >
                Toate proiectele
              </ButtonLink>
            </RevealItem>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.slice(0, 5).map((tech, i) => (
                <RevealItem key={tech} variant="pop" delay={0.24 + i * 0.04}>
                  <TechBadge name={tech} />
                </RevealItem>
              ))}
              {project.stack.length > 5 ? (
                <RevealItem delay={0.44} className="inline-flex items-center px-2 text-xs text-[var(--muted-on-dark)]">
                  +{project.stack.length - 5}
                </RevealItem>
              ) : null}
            </div>
          </div>

          <CaseStudyDeviceHero
            desktop={{ src: hero.src, alt: hero.alt }}
            mobile={mobile ? { src: mobile.src, alt: mobile.alt } : null}
            accent={project.accent}
          />
        </div>
      </div>

      {/* Overview band */}
      <section className="relative mt-20 border-y border-white/6 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_100%)] py-16 md:mt-24 md:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,140,255,0.45),transparent)]"
          aria-hidden
        />
        <div className="container-shell relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <RevealItem as="p" className="eyebrow" delay={0.02}>
              Overview
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.08}
              className="mt-3 max-w-xl text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
            >
              Context și direcție vizuală
            </RevealItem>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--muted-on-dark)] md:text-base">
              <RevealItem as="p" delay={0.14}>
                <BoldKeywords text={project.context} keywords={caseKeywords} />
              </RevealItem>
              <RevealItem as="p" delay={0.2}>
                <BoldKeywords
                  text={project.visualDirection}
                  keywords={caseKeywords}
                />
              </RevealItem>
            </div>
          </div>

          <div>
            <RevealItem as="p" className="eyebrow" delay={0.04} variant="fadeLeft">
              Implementare
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.1}
              variant="fadeLeft"
              className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
            >
              Ce am construit
            </RevealItem>
            <ul className="mt-7 space-y-0">
              {project.features.map((feature, i) => (
                <RevealItem
                  key={feature}
                  as="li"
                  delay={0.16 + i * 0.06}
                  variant="fadeLeft"
                  className="group grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-t border-white/8 py-4 first:border-t-0 first:pt-0"
                >
                  <span className="font-display text-2xl font-semibold tracking-tight text-[var(--accent)]/70 transition group-hover:text-[var(--accent-hover)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug text-[var(--ink-on-dark)]/90">
                    <BoldKeywords text={feature} keywords={caseKeywords} />
                  </span>
                </RevealItem>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Capabilities + engineering */}
      <div className="container-shell relative mt-16 md:mt-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative pl-5 md:pl-6">
            <span
              className="absolute bottom-0 left-0 top-0 w-px bg-[linear-gradient(180deg,var(--accent),transparent)]"
              aria-hidden
            />
            <RevealItem as="p" className="eyebrow" delay={0.02}>
              Experiență
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.08}
              className="mt-3 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
            >
              Capabilități
            </RevealItem>
            <ul className="mt-8 space-y-7">
              {project.capabilities.map((item, index) => (
                <RevealItem
                  key={item.title}
                  as="li"
                  delay={0.14 + index * 0.07}
                  className="relative"
                >
                  <p className="font-semibold text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-[var(--ink-on-dark)]">
                    {item.title}
                  </p>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--muted-on-dark)] md:text-[15px]">
                    <BoldKeywords
                      text={item.subtitle}
                      keywords={caseKeywords}
                    />
                  </p>
                </RevealItem>
              ))}
            </ul>
          </div>

          <div className="relative pl-5 md:pl-6">
            <span
              className="absolute bottom-0 left-0 top-0 w-px bg-[linear-gradient(180deg,rgba(85,182,255,0.8),transparent)]"
              aria-hidden
            />
            <RevealItem as="p" className="eyebrow" delay={0.04} variant="fadeLeft">
              Engineering
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.1}
              variant="fadeLeft"
              className="mt-3 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
            >
              Arhitectură și stack
            </RevealItem>
            <ul className="mt-8 space-y-4">
              {project.engineeringNotes.map((note, i) => (
                <RevealItem
                  key={note}
                  as="li"
                  delay={0.16 + i * 0.06}
                  variant="fadeLeft"
                  className="text-[15px] leading-relaxed text-[var(--muted-on-dark)]"
                >
                  <BoldKeywords text={note} keywords={caseKeywords} />
                </RevealItem>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <RevealItem key={tech} variant="pop" delay={0.28 + i * 0.035}>
                  <TechBadge name={tech} />
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="container-shell relative mt-20 md:mt-24">
        <CaseStudyHighlights slug={project.slug} projectName={project.name} />
      </div>

      {/* Gallery */}
      {details.length ? (
        <section className="relative mt-20 md:mt-24">
          <div className="container-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <RevealItem as="p" className="eyebrow" delay={0.02}>
                  Galerie
                </RevealItem>
                <RevealItem
                  as="h2"
                  delay={0.08}
                  className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
                >
                  Detalii vizuale
                </RevealItem>
              </div>
              <RevealItem
                as="p"
                delay={0.12}
                className="max-w-xs text-sm text-[var(--muted-on-dark)]"
              >
                Cadre din produs, păstrate la scară reală.
              </RevealItem>
            </div>
          </div>
          <div className="container-shell mt-8">
            <div className="grid gap-5 md:grid-cols-2">
              {details.map((shot, index) => (
                <RevealItem
                  key={shot.src}
                  delay={0.1 + index * 0.08}
                  variant="scaleIn"
                  className={`glass-card relative overflow-hidden rounded-[16px] border border-white/15 ${
                    index === 0 ? "md:translate-y-3" : "md:-translate-y-3"
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Challenges */}
      <section className="relative mt-20 border-y border-white/6 bg-[radial-gradient(700px_280px_at_50%_0%,rgba(37,140,255,0.08),transparent_65%)] py-16 md:mt-24 md:py-20">
        <div className="container-shell">
          <RevealItem as="p" className="eyebrow" delay={0.02}>
            Proces
          </RevealItem>
          <RevealItem
            as="h2"
            delay={0.08}
            className="mt-3 max-w-xl text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
          >
            Provocări și soluții
          </RevealItem>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
            {project.challenges.map((item, index) => (
              <RevealItem
                key={item.title}
                delay={0.12 + index * 0.08}
                className="relative"
              >
                <p className="font-display text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--accent)]/15">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-[-0.6em] text-xl font-semibold text-[var(--ink-on-dark)] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--muted-on-dark)]">
                  <BoldKeywords text={item.solution} keywords={caseKeywords} />
                </p>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* Performance */}
      <div className="container-shell relative mt-16 md:mt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <RevealItem as="p" className="eyebrow" delay={0.02}>
              Performanță
            </RevealItem>
            <RevealItem
              as="h2"
              delay={0.08}
              className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
            >
              SEO și calitate tehnică
            </RevealItem>
            <RevealItem
              as="p"
              delay={0.14}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted-on-dark)]"
            >
              {project.audit
                ? `Audit măsurat pe ${project.audit.testedUrl} (${project.audit.device}).`
                : "Valori demonstrative pentru portofoliu, aliniate cu checklist-ul tehnic din proiect."}
            </RevealItem>
            <ul className="mt-6 space-y-2 text-sm text-[var(--muted-on-dark)]">
              {[
                { label: "Metadata și Open Graph", icon: FileCode2 },
                { label: "Sitemap și robots", icon: Map },
                { label: "Imagini optimizate", icon: ImageIcon },
                { label: "Validare Zod", icon: ShieldCheck },
                { label: "Reduced motion", icon: PersonStanding },
                { label: "Conținut în română", icon: Languages },
              ].map(({ label, icon: Icon }, i) => (
                <RevealItem
                  key={label}
                  as="li"
                  delay={0.2 + i * 0.05}
                  className="flex items-center gap-3 border-b border-white/6 py-2.5 last:border-0"
                >
                  <Icon
                    className="size-4 shrink-0 text-[var(--accent)]"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                  {label}
                </RevealItem>
              ))}
            </ul>
          </div>
          {demoAudit ? (
            <RevealItem delay={0.18} variant="scaleIn">
              <DemoAuditRings audit={demoAudit} />
            </RevealItem>
          ) : null}
        </div>
      </div>

      {/* Related */}
      {related.length ? (
        <div className="container-shell relative mt-20 md:mt-24">
          <RevealItem as="p" className="eyebrow" delay={0.02}>
            Continuă
          </RevealItem>
          <RevealItem
            as="h2"
            delay={0.08}
            className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-[var(--ink-on-dark)]"
          >
            Proiecte conexe
          </RevealItem>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
            {related.map((item, index) => (
              <RevealItem
                key={item.slug}
                delay={0.12 + index * 0.08}
                variant="scaleIn"
              >
                <Link href={`/projects/${item.slug}`} className="group block">
                  <div className="glass-card relative overflow-hidden rounded-[16px] border border-white/15 transition group-hover:border-[var(--accent)]/35">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={projectCoverSrc(item)}
                        alt={projectCoverAlt(item)}
                        fill
                        className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                        <div>
                          <p className="font-semibold text-[10px] tracking-[0.16em] text-[var(--accent-hover)]">
                            {item.category}
                          </p>
                          <h3 className="mt-1 text-xl font-semibold text-white">
                            {item.name}
                          </h3>
                        </div>
                        <ArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-white/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-[var(--muted-on-dark)]">
                    {item.tagline}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <div className="container-shell relative mt-20 md:mt-24">
        <div className="glass-card relative overflow-hidden rounded-[22px] border border-white/15 px-6 py-8 md:px-10 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_280px_at_0%_50%,rgba(37,140,255,0.08),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,140,255,0.7),transparent)]"
            aria-hidden
          />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <RevealItem
                as="p"
                delay={0.02}
                className="font-hand hand-accent text-[var(--accent-hover)]"
              >
                hai să construim
              </RevealItem>
              <RevealItem
                as="p"
                delay={0.08}
                className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink-on-dark)] md:text-3xl"
              >
                Vrei ceva similar?
              </RevealItem>
              <RevealItem
                as="p"
                delay={0.14}
                className="mt-2 max-w-md text-sm text-[var(--muted-on-dark)] md:text-[15px]"
              >
                Spune-mi pe scurt despre proiect și îți răspund cu următorii
                pași.
              </RevealItem>
            </div>
            <RevealItem delay={0.18} className="flex flex-wrap gap-2">
              {live.href ? (
                <ButtonLink
                  href={live.href}
                  external
                  icon={ExternalLink}
                  showArrow
                >
                  {live.label}
                </ButtonLink>
              ) : null}
              <ButtonLink
                href="/contact?intent=project"
                variant="secondary"
                icon={MessageCircle}
                showArrow
              >
                Hai să discutăm
              </ButtonLink>
            </RevealItem>
          </div>
        </div>
      </div>
    </article>
  );
}
