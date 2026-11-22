import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  showArrow?: boolean;
  icon?: LucideIcon;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  showArrow = false,
  icon: Icon,
}: ButtonLinkProps) {
  const classes = cn(
    "btn",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "ghost" && "btn-ghost",
    className,
  );

  const Arrow = external ? ArrowUpRight : ArrowRight;
  const showTrailing = showArrow || (variant === "primary" && !Icon);

  const content = (
    <>
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden strokeWidth={2} /> : null}
      <span>{children}</span>
      {showTrailing ? (
        <Arrow className="btn-arrow h-3.5 w-3.5 shrink-0" aria-hidden />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
