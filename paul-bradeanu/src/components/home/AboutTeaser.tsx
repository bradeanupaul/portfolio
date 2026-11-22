import Image from "next/image";
import { Code2, Download, Layers3, Sparkles, UserRound } from "lucide-react";
import { Reveal, RevealItem, Stagger } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BoldKeywords } from "@/components/ui/BoldKeywords";
import { siteConfig } from "@/lib/site";

const aboutKeywords = [
  "Full stack",
  "frontend",
  "Cluj-Napoca",
  "React",
  "Next.js",
  "TypeScript",
  "backend",
  "AI",
  "obiective",
  "interfață",
  "cod tipizat",
  "fluxuri",
];

const focusAreas = [
  {
    icon: Code2,
    title: "Interfețe React / Next.js",
    subtitle:
      "UI responsive, fluxuri în mai mulți pași, tipografie și stare clară pe desktop și mobil.",
  },
  {
    icon: Layers3,
    title: "Servicii API și arhitectură menținabilă",
    subtitle:
      "Servicii tipizate, validare, izolare pe tenant și structură care ține pe termen lung.",
  },
  {
    icon: Sparkles,
    title: "Integrări AI pe fluxuri concrete",
    subtitle:
      "Modele LLM, procesare documente și automatizări doar unde reduc muncă reală.",
  },
] as const;

export function AboutTeaser() {
  return (
    <section className="section-light section-y-lg relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(820px_420px_at_12%_30%,rgba(37,140,255,0.1),transparent_58%)]"
        aria-hidden
      />
      <div className="container-shell relative">
        <div className="lg:grid lg:grid-cols-[minmax(240px,32%)_1fr] lg:items-stretch lg:gap-14">
          <div className="flex items-stretch gap-3.5 sm:gap-5 lg:contents">
            <Reveal
              variant="fade"
              className="relative w-[118px] shrink-0 self-stretch sm:w-[150px] lg:mx-0 lg:h-full lg:w-auto"
            >
              <div className="relative h-full min-h-[168px] overflow-hidden rounded-sm border border-[var(--line-on-light)] sm:min-h-[200px] sm:rounded-md lg:absolute lg:inset-0 lg:min-h-0 lg:rounded-[2px] lg:border-0">
                <Image
                  src="/images/paul/portrait.jpg"
                  alt="Portret Paul Brădeanu"
                  fill
                  className="object-cover object-[50%_18%]"
                  sizes="(max-width: 1024px) 150px, 32vw"
                  priority
                />
              </div>
            </Reveal>

            <Stagger
              className="flex min-w-0 flex-1 flex-col justify-center lg:hidden"
              stagger={0.06}
              wrap={false}
            >
              <RevealItem
                as="p"
                variant="fadeLeft"
                className="eyebrow !mb-0 !text-[var(--accent)]"
              >
                Despre mine
              </RevealItem>
              <RevealItem
                as="h2"
                className="font-display mt-1 text-[1.45rem] font-semibold leading-tight tracking-tight text-[var(--text-on-light)] sm:text-3xl"
              >
                Paul Brădeanu
              </RevealItem>
              <RevealItem
                as="p"
                className="mt-2 text-[13px] leading-relaxed text-[var(--muted-on-light)] sm:text-[15px]"
              >
                <BoldKeywords
                  tone="light"
                  keywords={aboutKeywords}
                  text="Full stack developer cu focus pe frontend. Lucrez în Cluj-Napoca pe aplicații web moderne în React, Next.js și TypeScript."
                />
              </RevealItem>
            </Stagger>
          </div>

          <Stagger className="mt-4 lg:mt-0" stagger={0.055} delay={0.04} wrap={false}>
            <RevealItem
              as="p"
              variant="fadeLeft"
              className="eyebrow !hidden !text-[var(--accent)] lg:!block"
            >
              Despre mine
            </RevealItem>
            <RevealItem
              as="h2"
              className="font-display mt-3 hidden text-5xl font-semibold tracking-tight text-[var(--text-on-light)] lg:block"
            >
              Paul Brădeanu
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 hidden max-w-xl text-lg text-[var(--muted-on-light)] lg:block"
            >
              <BoldKeywords
                tone="light"
                keywords={aboutKeywords}
                text="Full stack developer cu focus pe frontend. Lucrez în Cluj-Napoca pe aplicații web moderne în React, Next.js și TypeScript, cu backend și integrări AI acolo unde aduc valoare reală."
              />
            </RevealItem>

            <RevealItem
              as="p"
              className="max-w-xl text-[13px] leading-relaxed text-[var(--muted-on-light)] sm:text-[15px] lg:mt-4 lg:text-base"
            >
              <BoldKeywords
                tone="light"
                keywords={aboutKeywords}
                text="Îmi place să țin produsul clar de la prima versiune: obiective limpede, interfață curată, cod tipizat și livrare pe care o poți menține. Nu construiesc demonstrații goale. Construiesc fluxuri care se pot folosi."
              />
            </RevealItem>

            <RevealItem
              as="p"
              className="mt-2 max-w-xl text-[13px] leading-relaxed text-[var(--muted-on-light)] lg:hidden"
            >
              <BoldKeywords
                tone="light"
                keywords={aboutKeywords}
                text="Backend și integrări AI acolo unde aduc valoare reală."
              />
            </RevealItem>

            <RevealItem className="mt-4 sm:mt-6">
              <Stagger stagger={0.05} delay={0} itemVariant="fadeLeft">
                {focusAreas.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <item.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      aria-hidden
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--text-on-light)] sm:text-[15px]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-[var(--muted-on-light)] sm:text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </Stagger>
            </RevealItem>

            <RevealItem className="mt-5 flex w-full flex-col gap-2 min-[400px]:flex-row sm:mt-7 sm:gap-3">
              <ButtonLink
                href="/about"
                icon={UserRound}
                showArrow
                className="min-w-0 w-full justify-center min-[400px]:flex-1 sm:w-auto sm:flex-none"
              >
                Despre mine
              </ButtonLink>
              <a
                href={siteConfig.cvUrl}
                download
                className="btn btn-secondary min-w-0 w-full justify-center !border-[var(--line-on-light)] !bg-white !text-[var(--text-on-light)] shadow-[0_8px_20px_rgba(16,27,45,0.06)] hover:!border-[var(--accent)]/35 hover:!text-[var(--accent)] min-[400px]:flex-1 sm:w-auto sm:flex-none"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                <span>CV</span>
              </a>
            </RevealItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
