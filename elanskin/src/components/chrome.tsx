import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  width = "content",
}: {
  className?: string;
  children: ReactNode;
  width?: "reading" | "content" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        width === "reading" && "max-w-[45rem]",
        width === "content" && "max-w-[77.5rem]",
        width === "wide" && "max-w-[92.5rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function buttonClass(variant: "solid" | "ghost" | "line" = "solid", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px active:scale-[0.985]",
    variant === "solid" &&
      "bg-aubergine text-white shadow-[0_10px_24px_rgba(51,36,63,0.22)] hover:-translate-y-0.5 hover:bg-orchid hover:shadow-[0_14px_28px_rgba(51,36,63,0.28)]",
    variant === "ghost" && "bg-lavender text-aubergine hover:-translate-y-0.5 hover:bg-lilac",
    variant === "line" &&
      "border border-line bg-white text-aubergine shadow-[0_6px_16px_rgba(51,36,63,0.06)] hover:-translate-y-0.5 hover:border-orchid/40",
    className,
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="border-b border-line bg-white">
      <Container className="py-14 md:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-plum">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] text-aubergine md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink">{lede}</p>
      </Container>
    </header>
  );
}

export function ArticlePage({
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />
      <Container className="py-14 md:py-16">
        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl text-aubergine">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-ink">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
