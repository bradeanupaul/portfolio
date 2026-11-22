import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-hover",
  cobalt: "bg-cobalt text-white hover:bg-cobalt-hover",
  secondary: "bg-soft-blue text-navy hover:bg-sky",
  ghost: "bg-transparent text-ink hover:text-cobalt",
  light: "bg-white text-ink hover:bg-ice",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-[12px] px-5 py-3 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200",
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href) {
    const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
