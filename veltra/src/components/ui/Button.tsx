import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "pine" | "ghost" | "ghost-dark" | "sand" | "copper" | "copper-outline";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  pine: "btn-pine",
  ghost: "btn-ghost",
  "ghost-dark": "btn-ghost-dark",
  sand: "btn-sand",
  copper: "btn-copper",
  "copper-outline": "btn-copper-outline",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", arrow, className, ...rest } = props;
  const classes = cn("btn", variants[variant], arrow && "btn-arrow", className);

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
