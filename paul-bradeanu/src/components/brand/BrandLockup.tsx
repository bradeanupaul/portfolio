import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  showWordmark?: boolean;
};

const sizeMap = {
  sm: { mark: 28, word: "text-sm" },
  md: { mark: 32, word: "text-[15px]" },
  lg: { mark: 44, word: "text-lg" },
};

/** Cache-bust when replacing the mark asset. */
const MARK_VERSION = "v3";

export function BrandLockup({
  className,
  variant = "light",
  size = "md",
  compact = false,
  showWordmark = true,
}: BrandLockupProps) {
  const dims = sizeMap[size];
  const markSrc =
    variant === "light"
      ? `/branding/logo-pb-mark.png?${MARK_VERSION}`
      : `/branding/logo-pb-mark-dark.png?${MARK_VERSION}`;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)]",
        className,
      )}
      aria-label="Paul Brădeanu, pagina principală"
    >
      <Image
        src={markSrc}
        alt=""
        width={dims.mark}
        height={dims.mark}
        className="shrink-0 object-contain"
        style={{ width: dims.mark, height: dims.mark, maxWidth: dims.mark }}
        priority
        unoptimized
      />
      {!compact && showWordmark ? (
        <span
          className={cn(
            "hidden font-display font-semibold tracking-[-0.03em] sm:inline",
            dims.word,
            variant === "light" ? "text-[var(--text-primary)]" : "text-[var(--bg-ink)]",
          )}
        >
          Paul Brădeanu
        </span>
      ) : null}
    </Link>
  );
}
