import Image from "next/image";
import Link from "next/link";
import { brandingAssets } from "@/data/ai-assets";
import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "horizontal" | "compact" | "icon" | "light" | "footer";
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  compact: {
    src: brandingAssets.logoMobile,
    width: 260,
    className: "h-16 w-auto max-w-[15rem] sm:h-[4.25rem] sm:max-w-[16rem]",
  },
  icon: {
    src: brandingAssets.logoMobile,
    width: 200,
    className: "h-14 w-auto max-w-[13rem]",
  },
  horizontal: {
    src: brandingAssets.logoDesktop,
    width: 400,
    className: "h-[5.5rem] w-auto max-w-[22rem] xl:h-24 xl:max-w-[24rem]",
  },
  light: {
    src: brandingAssets.logoDesktop,
    width: 380,
    className: "h-[5.25rem] w-auto max-w-[21rem]",
  },
  footer: {
    src: brandingAssets.logoDesktop,
    width: 420,
    className: "h-auto w-[clamp(17rem,55vw,26rem)]",
  },
} as const;

export function Logo({ variant = "horizontal", className, priority = false }: LogoProps) {
  const config = sizeMap[variant] ?? sizeMap.horizontal;
  const height = Math.round(config.width * 0.465);

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="Bella Notte, pagina principală"
    >
      <Image
        src={config.src}
        alt="Bella Notte Ristorante Italiano"
        width={config.width}
        height={height}
        priority={priority}
        unoptimized
        className={cn(
          "max-w-full object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] transition-opacity duration-200 group-hover:opacity-90",
          config.className,
        )}
      />
    </Link>
  );
}
