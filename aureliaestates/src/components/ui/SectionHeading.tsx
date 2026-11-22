import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  text,
  description,
  href,
  action,
  tone = "light",
}: {
  index: string;
  label: string;
  title?: string;
  text?: string;
  description?: string;
  href?: string;
  action?: string;
  tone?: "light" | "dark";
}) {
  const copy = text ?? description;
  const strong = tone === "dark" ? "text-white" : "text-ink";
  const body = tone === "dark" ? "text-steel" : "text-slate";

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", tone === "dark" ? "text-sky" : "text-cobalt")}>
          {index}
          <span className={cn("px-3", tone === "dark" ? "text-sky/70" : "text-cobalt/60")} aria-hidden>
            /
          </span>
          {label}
        </p>
        {title ? (
          <h2 className={cn("mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] md:text-6xl", strong)}>{title}</h2>
        ) : (
          <h2 className="sr-only">{label}</h2>
        )}
        {copy ? (
          <p className={cn("mt-5 max-w-xl text-base leading-relaxed md:text-lg", body)}>{copy}</p>
        ) : null}
      </div>
      {href && action ? (
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors",
            tone === "dark" ? "text-white hover:text-sky" : "text-ink hover:text-azure",
          )}
        >
          {action}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
