import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconFeatureProps = {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  className?: string;
};

export function IconFeature({
  icon: Icon,
  label,
  subtitle,
  className,
}: IconFeatureProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm text-[var(--text-secondary)]",
        className,
      )}
    >
      <Icon
        className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-hover)]"
        aria-hidden
      />
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-snug text-[var(--text-primary)] md:text-base">
          {label}
        </p>
        {subtitle ? (
          <p className="mt-0.5 text-[13px] leading-snug text-[var(--text-muted)]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
