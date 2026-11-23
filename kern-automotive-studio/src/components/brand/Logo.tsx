import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark" | "compact";

type LogoProps = {
  variant?: LogoVariant;
  href?: string;
  className?: string;
};

export function Logo({ variant = "dark", href = "/", className }: LogoProps) {
  const isLight = variant === "light";
  const compact = variant === "compact";
  const markSrc = isLight ? "/brand/mark-light.svg" : "/brand/mark.svg";
  const wordColor = isLight ? "text-off-white" : "text-carbon";
  const subColor = isLight ? "text-silver" : "text-slate";

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        compact && "gap-2",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={markSrc}
        alt=""
        width={compact ? 36 : 48}
        height={compact ? 36 : 48}
        className={cn("shrink-0 object-contain", compact ? "h-9 w-9" : "h-12 w-12")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-[0.14em]",
            wordColor,
            compact ? "text-base" : "text-lg md:text-xl",
          )}
        >
          KERN
        </span>
        {!compact ? (
          <span className={cn("mt-1 font-mono text-[10px] uppercase tracking-[0.28em]", subColor)}>
            Automotive Studio
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex focus-visible:outline-offset-4" aria-label="KERN Automotive Studio — acasă">
      {content}
    </Link>
  );
}
