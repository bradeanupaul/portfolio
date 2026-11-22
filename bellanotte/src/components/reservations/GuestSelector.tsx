"use client";

import Link from "next/link";
import { ONLINE_RESERVATION_MAX_PARTY } from "@/lib/reservations";
import { cn } from "@/lib/utils";

type GuestSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  hasError?: boolean;
  compact?: boolean;
};

export function GuestSelector({
  value,
  onChange,
  hasError,
  compact = false,
}: GuestSelectorProps) {
  return (
    <div className={cn(compact ? "space-y-2" : "space-y-3")}>
      <p className="text-sm font-medium text-bn-text-muted">Număr de persoane</p>
      <div
        className={cn("flex flex-wrap", compact ? "gap-1.5" : "gap-2")}
        role="radiogroup"
        aria-label="Număr de persoane la masă"
      >
        {Array.from({ length: ONLINE_RESERVATION_MAX_PARTY }, (_, i) => i + 1).map((count) => (
          <button
            key={count}
            type="button"
            role="radio"
            aria-checked={value === count}
            onClick={() => onChange(count)}
            className={cn(
              "inline-flex items-center justify-center rounded-sm border text-sm font-medium transition",
              compact ? "size-9" : "size-11",
              value === count
                ? "border-bn-gold bg-bn-gold/15 text-bn-gold"
                : "border-bn-border text-bn-text-muted hover:border-bn-gold/40",
              hasError && value !== count && "border-red-400/40",
            )}
          >
            {count}
          </button>
        ))}
      </div>
      <p className="text-xs text-bn-text-dim">
        Pentru grupuri mai mari de {ONLINE_RESERVATION_MAX_PARTY} persoane,{" "}
        <Link href="/evenimente" className="text-bn-gold underline-offset-2 hover:underline">
          solicitați un eveniment privat
        </Link>
        .
      </p>
    </div>
  );
}
