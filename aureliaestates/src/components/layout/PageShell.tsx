import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Container } from "@/components/ui/Container";

export function PageShell({
  eyebrow,
  title,
  lede,
  children,
  tone = "light",
  bleed = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
  bleed?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <article className={dark ? "bg-midnight text-white" : "bg-white pt-[var(--header-height)]"}>
      <header className={dark ? "bg-midnight pt-[var(--header-height)]" : "bg-ice"}>
        <Container className="py-7 md:py-9">
          <Reveal>
            <p
              className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-cobalt"}`}
            >
              {eyebrow}
            </p>
          </Reveal>
          <RevealHeading
            as="h1"
            priority
            className={`mt-3 max-w-3xl font-display text-[clamp(1.85rem,3vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}
          >
            {title}
          </RevealHeading>
          {lede ? (
            <Reveal delay={0.08}>
              <p
                className={`mt-3 max-w-2xl text-base leading-relaxed md:text-[17px] ${dark ? "text-white/75" : "text-slate"}`}
              >
                {lede}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </header>
      {children ? (
        <div className="bg-white text-ink">
          {bleed ? children : <Container className="py-8 md:py-10">{children}</Container>}
        </div>
      ) : null}
    </article>
  );
}
