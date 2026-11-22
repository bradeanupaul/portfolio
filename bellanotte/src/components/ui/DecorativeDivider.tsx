import { cn } from "@/lib/utils";

export interface DecorativeDividerProps {
  className?: string;
  wide?: boolean;
}

export function DecorativeDivider({ className, wide }: DecorativeDividerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span
        className={cn(
          "h-px bg-gradient-to-r from-transparent via-bn-gold/55 to-bn-gold/55",
          wide ? "w-20 sm:w-28" : "w-14 sm:w-20",
        )}
      />
      <span className="size-1.5 rotate-45 bg-bn-gold" />
      <span
        className={cn(
          "h-px bg-gradient-to-l from-transparent via-bn-gold/55 to-bn-gold/55",
          wide ? "w-20 sm:w-28" : "w-14 sm:w-20",
        )}
      />
    </div>
  );
}
