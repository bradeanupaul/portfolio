import Image from "next/image";
import {
  BriefcaseBusiness,
  Download,
  MapPin,
  MessageCircle,
  Sparkles,
  Code2,
  Layers3,
} from "lucide-react";
import { educationEntries } from "@/data/experience";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Despre",
  path: "/about",
  description:
    "Despre Paul Brădeanu: full-stack developer cu focus frontend, interesat de UX, arhitectură menținabilă și integrări AI pragmatice.",
});

const aboutKeywords = [
  "frontend",
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "Spring Boot",
  "PostgreSQL",
  "AI",
  "design",
  "engineering",
  "interfață",
  "arhitectură",
  "backend",
  "experiență",
  "automatizarea",
];

const focusKeywords = [
  "Fluxuri",
  "tipografie",
  "mobile",
  "experiență",
  "Componente",
  "tipizate",
  "API-uri",
  "modele",
  "documente",
  "analiză",
  "validare",
  "automatizări",
];

const focusAreas = [
  {
    icon: Code2,
    title: "Calitate UX",
    text: "Fluxuri clare, tipografie îngrijită, stări vizibile și mobile gândit ca experiență, nu ca versiune redusă.",
  },
  {
    icon: Layers3,
    title: "Arhitectură menținabilă",
    text: "Componente, date tipizate, API-uri explicite și decizii care rămân ușor de citit după câteva luni.",
  },
  {
    icon: Sparkles,
    title: "AI pragmatic",
    text: "Integrez modele doar unde scurtează muncă reală: documente, analiză, validare asistată, automatizări.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="relative pb-12 pt-6 md:pb-20 md:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(700px_300px_at_18%_0%,rgba(37,140,255,0.04),transparent_60%),radial-gradient(480px_240px_at_88%_12%,rgba(15,79,154,0.025),transparent_55%)]"
        aria-hidden
      />

      <div className="container-shell relative">
        <div
          id="profile"
          className="scroll-mt-24 lg:grid lg:grid-cols-[190px_1fr] lg:items-start lg:gap-10"
        >
          <div className="flex items-start gap-4 sm:gap-5 lg:contents">
            <Reveal
              variant="scaleIn"
              className="relative w-[108px] shrink-0 overflow-hidden rounded-xl border border-white/[0.06] sm:w-[140px] lg:mx-0 lg:min-h-[280px] lg:w-full lg:max-w-none lg:rounded-xl"
            >
              <div className="relative aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src="/images/paul/portrait.jpg"
                  alt="Portret Paul Brădeanu"
                  fill
                  priority
                  className="object-cover object-[50%_18%]"
                  sizes="(max-width: 1024px) 140px, 190px"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 hidden items-center gap-1.5 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.85))] px-3 pb-3 pt-8 text-xs text-white/85 lg:flex">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent-hover)]" aria-hidden />
                Cluj-Napoca
              </div>
            </Reveal>

            <Stagger
              className="min-w-0 flex-1 lg:hidden"
              stagger={0.05}
              wrap={false}
            >
              <RevealItem as="p" variant="fadeLeft" className="eyebrow">
                Despre
              </RevealItem>
              <RevealItem
                as="h1"
                className="mt-1.5 text-[1.55rem] font-semibold leading-tight tracking-tight text-[var(--ink-on-dark)]"
              >
                {siteConfig.name}
              </RevealItem>
              <RevealItem as="p" className="mt-1 text-[13px] text-[var(--accent)]">
                {siteConfig.roleShort}
              </RevealItem>
              <RevealItem className="mt-2 inline-flex items-center gap-1 text-[12px] text-[var(--muted-on-dark)]">
                <MapPin className="h-3 w-3 text-[var(--accent-hover)]" aria-hidden />
                Cluj-Napoca
              </RevealItem>
            </Stagger>
          </div>

          <Stagger
            className="mt-4 flex flex-col justify-center lg:mt-0"
            stagger={0.055}
            delay={0.04}
            wrap={false}
          >
            <RevealItem
              as="p"
              variant="fadeLeft"
              className="eyebrow hidden lg:block"
            >
              Despre
            </RevealItem>
            <RevealItem
              as="h1"
              className="mt-2 hidden text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold tracking-tight text-[var(--ink-on-dark)] lg:block"
            >
              {siteConfig.name}
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-1.5 hidden text-[var(--accent)] lg:block"
            >
              {siteConfig.role}
            </RevealItem>

            <RevealItem
              as="p"
              className="max-w-2xl text-[14px] leading-relaxed text-[var(--muted-on-dark)] md:text-base lg:mt-4"
            >
              <BoldKeywords
                keywords={aboutKeywords}
                text="Lucrez pe aplicații web moderne, cu un accent clar pe frontend: React, Next.js și TypeScript. Completez asta cu backend NestJS / Spring Boot, PostgreSQL și integrări AI acolo unde automatizarea chiar reduce fricțiunea."
              />
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-[var(--muted-on-dark)] md:mt-3 md:text-base"
            >
              <BoldKeywords
                keywords={aboutKeywords}
                text="Filosofia mea este simplă: design meets engineering. O interfață frumoasă fără arhitectură solidă nu ține. Un backend puternic fără grijă pentru experiență nici atât. Încerc să țin ambele părți la același standard."
              />
            </RevealItem>
            <RevealItem className="mt-4 flex w-full flex-col gap-2 sm:mt-5">
              <div className="flex w-full flex-col gap-2 min-[420px]:flex-row">
                <ButtonLink
                  href="/experience"
                  icon={BriefcaseBusiness}
                  showArrow
                  className="min-w-0 w-full justify-center min-[420px]:flex-1 sm:w-auto sm:flex-none"
                >
                  Experiență & studii
                </ButtonLink>
                <a
                  href={siteConfig.cvUrl}
                  download
                  className="btn btn-secondary min-w-0 w-full justify-center min-[420px]:flex-1 sm:w-auto sm:flex-none"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  <span>Descarcă CV</span>
                </a>
              </div>
              <ButtonLink
                href="/contact"
                variant="ghost"
                icon={MessageCircle}
                showArrow
                className="w-full justify-center !px-0 sm:w-auto sm:justify-start"
              >
                Contact
              </ButtonLink>
            </RevealItem>
          </Stagger>
        </div>

        <div id="values" className="mt-8 scroll-mt-24 md:mt-14">
          <SnapCarousel
            ariaLabel="Focus profesional"
            trackClassName="max-md:-mx-3 max-md:px-3 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:snap-none md:pb-0"
            slideClassName="h-full max-md:w-[min(calc(100vw-2rem),300px)] md:w-auto md:min-w-0 md:shrink md:snap-none"
            dotsHideFrom="md"
          >
            {focusAreas.map((item) => (
              <article
                key={item.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 glass-card p-5 shadow-[0_14px_32px_rgba(4,10,18,0.28)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]/35 md:rounded-[22px] md:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.05),transparent_70%)] blur-xl"
                  aria-hidden
                />
                <Stagger className="relative" stagger={0.06} delay={0.04} wrap={false}>
                  <RevealItem
                    variant="pop"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#1476ef_0%,#258cff_55%,#3ea0ff_100%)] text-white shadow-[0_10px_24px_rgba(37,140,255,0.35)]"
                  >
                    <item.icon className="h-4 w-4" aria-hidden />
                  </RevealItem>
                  <RevealItem
                    as="h2"
                    className="mt-4 text-lg font-semibold text-[var(--ink-on-dark)] md:mt-5 md:text-xl"
                  >
                    {item.title}
                  </RevealItem>
                  <RevealItem
                    as="p"
                    className="mt-2 text-sm leading-relaxed text-[var(--muted-on-dark)] md:mt-3"
                  >
                    <BoldKeywords keywords={focusKeywords} text={item.text} />
                  </RevealItem>
                </Stagger>
              </article>
            ))}
          </SnapCarousel>
        </div>

        <section
          id="cv"
          className="relative mt-8 scroll-mt-24 overflow-hidden rounded-2xl glass-card border border-white/15 p-5 md:mt-14 md:rounded-[24px] md:p-8"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,140,255,0.7),transparent)]"
            aria-hidden
          />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <RevealItem as="p" variant="fadeLeft" className="eyebrow">
                Formare
              </RevealItem>
              <RevealItem
                as="h2"
                delay={0.06}
                className="mt-1.5 text-xl font-semibold text-[var(--ink-on-dark)] md:mt-2 md:text-2xl"
              >
                Studii
              </RevealItem>
            </div>
            <RevealItem delay={0.1}>
              <a
                href={siteConfig.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3.5 py-2 text-sm text-[var(--accent-hover)] transition hover:bg-[var(--accent)]/18"
              >
                <Download className="h-4 w-4" aria-hidden />
                CV PDF
              </a>
            </RevealItem>
          </div>

          <div className="mt-5 space-y-0 md:mt-8">
            {educationEntries.map((entry, i) => (
              <RevealItem
                key={entry.id}
                variant="fadeLeft"
                delay={0.08 + i * 0.08}
                className="relative grid gap-1.5 border-l border-white/12 py-4 pl-5 first:pt-0 last:pb-0 md:grid-cols-[140px_1fr] md:gap-6 md:py-5 md:pl-6"
              >
                <span
                  className="absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(37,140,255,0.04)] md:top-6"
                  aria-hidden
                />
                <p className="font-semibold text-[11px] tracking-[0.14em] text-[var(--accent-hover)] md:pt-1 md:text-xs">
                  {entry.period}
                </p>
                <div>
                  <h3 className="text-base font-medium text-[var(--ink-on-dark)] md:text-lg">
                    {entry.degree}
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--muted-on-dark)]">
                    {entry.school}
                    {entry.faculty ? ` · ${entry.faculty}` : ""}
                  </p>
                  {entry.detail ? (
                    <p className="mt-1 text-sm text-[var(--muted-on-dark)]">
                      {entry.detail}
                    </p>
                  ) : null}
                </div>
              </RevealItem>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
