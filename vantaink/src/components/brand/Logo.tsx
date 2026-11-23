import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const LOCKUP = {
  light: "/brand/vanta-lockup-horizontal.svg",
  dark: "/brand/vanta-wordmark-dark.svg",
  /** Raster fallback for reliable navbar contrast on dark UI */
  lightPng: "/brand/vanta-wordmark-white.png",
} as const;

const SYMBOL = "/brand/vanta-symbol.svg";
const FOOTER = "/brand/vanta-lockup-horizontal.svg";

type LogoBaseProps = {
  className?: string;
  priority?: boolean;
};

type NavbarLogoProps = LogoBaseProps & {
  variant: "navbar";
  tone?: "light" | "dark";
  linked?: boolean;
};

type FooterLogoProps = LogoBaseProps & {
  variant: "footer";
};

type SymbolLogoProps = LogoBaseProps & {
  variant: "symbol";
  linked?: boolean;
};

export type LogoProps = NavbarLogoProps | FooterLogoProps | SymbolLogoProps;

const altWordmark = `${site.brandName}, ${site.tagline}`;
const altSymbol = `Simbol ${site.brandName}`;
const altFooter = `Siglă ${site.brandName}`;

function LogoLink({
  children,
  className,
  linked,
}: {
  children: ReactNode;
  className?: string;
  linked?: boolean;
}) {
  if (linked === false) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      {children}
    </Link>
  );
}

export function Logo(props: LogoProps) {
  if (props.variant === "navbar") {
    const { tone = "light", className, priority, linked = true } = props;
    const src = tone === "light" ? LOCKUP.lightPng : LOCKUP.dark;

    return (
      <LogoLink linked={linked} className={className}>
        <Image
          src={src}
          alt={altWordmark}
          width={196}
          height={28}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "low" : undefined}
          unoptimized={tone === "light"}
          className="h-6 w-auto max-w-[11rem] object-contain object-left sm:h-7 sm:max-w-[13rem]"
        />
      </LogoLink>
    );
  }

  if (props.variant === "footer") {
    const { className, priority } = props;

    return (
      <Image
        src={FOOTER}
        alt={altFooter}
        width={240}
        height={36}
        priority={priority}
        className={cn(
          "h-7 w-auto max-w-[min(100%,20rem)] object-contain opacity-95 sm:h-8",
          className,
        )}
      />
    );
  }

  const { className, priority, linked = true } = props;

  return (
    <LogoLink linked={linked} className={className}>
      <Image
        src={SYMBOL}
        alt={altSymbol}
        width={32}
        height={32}
        priority={priority}
        className="h-7 w-7"
      />
    </LogoLink>
  );
}
