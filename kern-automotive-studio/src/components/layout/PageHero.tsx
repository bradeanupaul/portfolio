import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "dark" | "light";
  imageSrc?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "dark",
  imageSrc,
  children,
  className,
}: PageHeroProps) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 md:pt-32",
        dark ? "band-carbon" : "band-off",
        className,
      )}
    >
      {imageSrc ? (
        <div className="pointer-events-none absolute inset-0 opacity-35">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt="" className="h-full w-full object-cover" />
          <div
            className={cn(
              "absolute inset-0",
              dark
                ? "bg-gradient-to-r from-carbon via-carbon/90 to-carbon/55"
                : "bg-gradient-to-r from-off-white via-off-white/92 to-off-white/70",
            )}
          />
        </div>
      ) : null}
      <Container className="relative section-pad !pt-16 !pb-20 md:!pt-20">
        <SectionEyebrow tone={dark ? "light" : "dark"}>{eyebrow}</SectionEyebrow>
        <h1
          className={cn(
            "max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl",
            dark ? "text-off-white" : "text-carbon",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-7 md:text-lg",
            dark ? "text-silver" : "text-slate",
          )}
        >
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
