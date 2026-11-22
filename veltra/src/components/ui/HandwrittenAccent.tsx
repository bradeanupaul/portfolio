import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Script accent matching the hero "naturii" treatment (Great Vibes). */
export function HandwrittenAccent({ children, className }: Props) {
  return (
    <span
      className={cn(
        "font-script inline-block pb-[0.12em] text-[1.12em] leading-none text-clay",
        className,
      )}
    >
      {children}
    </span>
  );
}
