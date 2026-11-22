import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  showDivider?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  showDivider = true,
  className,
  ...props
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)} {...props}>
      {eyebrow ? <p className="bn-eyebrow mb-4 text-bn-gold">{eyebrow}</p> : null}
      <h2 className="font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-bn-text">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-bn-text-muted sm:text-lg",
            isCenter && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      {showDivider ? (
        <DecorativeDivider
          className={cn("mt-7", isCenter ? "mx-auto" : "")}
        />
      ) : null}
    </div>
  );
}
