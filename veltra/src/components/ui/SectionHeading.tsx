import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className={cn("eyebrow mb-4", light && "text-stone")}>{eyebrow}</p> : null}
      <h2
        className={cn(
          "text-balance text-[clamp(2.1rem,4.5vw,3.75rem)]",
          light ? "text-ivory" : "text-pine",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[1.05rem] leading-relaxed md:text-lg",
            light ? "text-ivory/80" : "text-ink/75",
          )}
        >
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  );
}
