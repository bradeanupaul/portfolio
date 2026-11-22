import Link from "next/link";
import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-accent text-white hover:bg-accent-hover hover:text-white focus-visible:outline-focus",
  secondary:
    "border border-line bg-transparent text-text hover:border-accent hover:text-accent",
  ghost:
    "border border-transparent bg-transparent text-text-muted hover:bg-surface-muted hover:text-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-none font-body font-semibold tracking-wide no-underline transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    asChild?: false;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  asChild?: false;
  external?: boolean;
};

type ButtonAsChild = CommonProps & {
  asChild: true;
  href?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsChild;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  asChild,
  ...rest
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, external } = rest as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  const { ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}