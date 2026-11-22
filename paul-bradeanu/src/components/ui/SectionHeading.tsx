"use client";

import { Stagger, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <Stagger
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      stagger={0.07}
      delay={0.02}
      wrap={false}
    >
      {eyebrow ? (
        <RevealItem
          as="p"
          variant="fadeLeft"
          className={cn(
            "eyebrow mb-2.5 md:mb-4",
            tone === "light" &&
              "text-[color-mix(in_srgb,var(--ink-on-light)_65%,#5e6c7e)]",
          )}
        >
          {eyebrow}
        </RevealItem>
      ) : null}
      <RevealItem
        as="h2"
        variant="fadeUp"
        className={cn(
          "section-title",
          tone === "light"
            ? "text-[var(--ink-on-light)]"
            : "text-[var(--text-primary)]",
        )}
      >
        {title}
      </RevealItem>
      {description ? (
        <RevealItem
          as="p"
          variant="fadeUp"
          className={cn(
            "mt-3 max-w-2xl text-[15px] leading-relaxed md:mt-3.5 md:text-base lg:mt-4 lg:text-lg",
            tone === "light"
              ? "text-[var(--muted-on-light)]"
              : "text-[var(--text-secondary)]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </RevealItem>
      ) : null}
    </Stagger>
  );
}
