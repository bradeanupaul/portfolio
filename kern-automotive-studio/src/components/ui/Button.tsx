import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "dark" | "ghost";
type ButtonSize = "md" | "lg" | "sm";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-copper text-white hover:bg-[color-mix(in_srgb,var(--copper)_88%,black)] border border-transparent",
  outline:
    "bg-transparent text-carbon border border-carbon/25 hover:border-carbon hover:bg-carbon hover:text-off-white",
  dark: "bg-carbon text-off-white border border-transparent hover:bg-graphite",
  ghost:
    "bg-transparent text-current border border-transparent hover:bg-white/10",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  sheen?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    sheen = variant === "primary" || variant === "dark",
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold tracking-[-0.02em] transition-colors duration-300 disabled:opacity-50",
    sheen && "btn-sheen",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} target={props.target} rel={props.rel}>
        {children}
      </Link>
    );
  }

  const {
    children: _c,
    className: _cl,
    variant: _v,
    size: _s,
    sheen: _sh,
    href: _h,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
