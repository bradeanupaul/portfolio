import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-[3px]",
};

export function LoadingSpinner({
  className,
  label = "Se încarcă…",
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} role="status" aria-live="polite">
      <span
        className={cn(
          "animate-spin rounded-full border-bn-gold/25 border-t-bn-gold",
          sizeMap[size],
        )}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}