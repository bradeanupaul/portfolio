"use client";

import Link from "next/link";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bn-gold-gradient text-bn-bg border border-bn-gold-light/40 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:brightness-110 hover:shadow-[0_14px_36px_rgba(216,175,91,0.22)]",
  secondary:
    "bg-transparent text-bn-gold border border-bn-gold/55 hover:border-bn-gold hover:bg-bn-gold/8 hover:text-bn-gold-light",
} as const;

const sizeStyles = {
  sm: "h-10 px-5 text-[0.68rem] tracking-[0.18em]",
  md: "h-12 px-7 text-[0.72rem] tracking-[0.2em]",
  lg: "h-14 px-9 text-[0.78rem] tracking-[0.22em]",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  asChild?: boolean;
  showCalendar?: boolean;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const baseStyles =
  "group/button relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[2px] font-medium uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bn-gold-light";

function ButtonContent({
  children,
  showCalendar,
  showArrow,
}: Pick<ButtonProps, "children" | "showCalendar" | "showArrow">) {
  return (
    <>
      {showCalendar ? <Calendar className="size-4 shrink-0" aria-hidden /> : null}
      <span className="relative z-[1]">{children}</span>
      {showArrow ? (
        <ArrowRight
          className="relative z-[1] size-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-0.5"
          aria-hidden
        />
      ) : null}
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition-all duration-500 group-hover/button:left-[120%] group-hover/button:opacity-100"
        aria-hidden
      />
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      asChild,
      showCalendar,
      showArrow,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      const { onClick, ...rest } = props;
      return (
        <Link href={href} className={classes} onClick={onClick as never} {...(rest as object)}>
          <ButtonContent showCalendar={showCalendar} showArrow={showArrow}>
            {children}
          </ButtonContent>
        </Link>
      );
    }

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string; children?: ReactNode }>;
      return cloneElement(child, {
        className: cn(classes, child.props.className),
        children: (
          <ButtonContent showCalendar={showCalendar} showArrow={showArrow}>
            {child.props.children}
          </ButtonContent>
        ),
      });
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        <ButtonContent showCalendar={showCalendar} showArrow={showArrow}>
          {children}
        </ButtonContent>
      </button>
    );
  },
);

Button.displayName = "Button";
