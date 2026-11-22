"use client";

import { format, parse } from "date-fns";
import { generateReservationSlots } from "@/lib/reservations";
import { cn } from "@/lib/utils";

type TimeSlotPickerProps = {
  dateValue: string;
  value: string;
  onChange: (time: string) => void;
  hasError?: boolean;
  compact?: boolean;
};

export function TimeSlotPicker({
  dateValue,
  value,
  onChange,
  hasError,
  compact = false,
}: TimeSlotPickerProps) {
  const date = dateValue ? parse(dateValue, "yyyy-MM-dd", new Date()) : null;

  const slots = date ? generateReservationSlots(date) : [];
  const available = slots.filter((slot) => slot.available);

  if (!dateValue) {
    return (
      <p
        className={cn(
          "rounded-sm border border-dashed border-bn-border text-sm text-bn-text-dim",
          compact ? "px-3 py-3.5" : "px-4 py-6",
        )}
      >
        Alegeți mai întâi o dată pentru a vedea intervalele orare.
      </p>
    );
  }

  if (available.length === 0) {
    return (
      <p
        className={cn(
          "rounded-sm border border-bn-border bg-bn-bg-surface text-sm text-bn-text-muted",
          compact ? "px-3 py-3.5" : "px-4 py-6",
        )}
      >
        Nu există intervale disponibile în această zi. Alegeți altă dată.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
        compact ? "gap-1.5" : "gap-2",
      )}
      role="radiogroup"
      aria-label="Interval orar rezervare"
    >
      {available.map((slot) => (
        <button
          key={slot.time}
          type="button"
          role="radio"
          aria-checked={value === slot.time}
          onClick={() => onChange(slot.time)}
          className={cn(
            "rounded-sm border text-sm transition",
            compact ? "px-1.5 py-2" : "px-2 py-2.5",
            value === slot.time
              ? "border-bn-gold bg-bn-gold/15 text-bn-gold"
              : "border-bn-border text-bn-text-muted hover:border-bn-gold/40",
            hasError && !value && "border-red-400/40",
          )}
        >
          {slot.label}
        </button>
      ))}
    </div>
  );
}

export function minReservationDateInput(): string {
  return format(new Date(), "yyyy-MM-dd");
}
