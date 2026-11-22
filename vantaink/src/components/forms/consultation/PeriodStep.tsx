"use client";

import type { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ConsultationSubmissionInput } from "@/lib/validation/consultation";
import type { DemoSlot } from "@/lib/booking/demo-slots-client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldErrorClass, fieldHintClass, fieldLabelClass } from "./form-classes";

type PeriodStepProps = {
  errors: FieldErrors<ConsultationSubmissionInput>;
  setValue: UseFormSetValue<ConsultationSubmissionInput>;
  watch: UseFormWatch<ConsultationSubmissionInput>;
  slotError: string | null;
  setSlotError: (message: string | null) => void;
  slots: DemoSlot[];
  loading: boolean;
  fetchError: string | null;
  onReload: () => void;
};

function formatSlotRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const dateFmt = new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeFmt = new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateFmt.format(start)}, ${timeFmt.format(start)} până la ${timeFmt.format(end)}`;
}

export function PeriodStep({
  errors,
  setValue,
  watch,
  slotError,
  setSlotError,
  slots,
  loading,
  fetchError,
  onReload,
}: PeriodStepProps) {
  const slotId = watch("slotId");

  const selectSlot = (slot: DemoSlot) => {
    setValue("slotId", slot.id, { shouldValidate: true, shouldDirty: true });
    setValue("preferredPeriod", slot.label, { shouldDirty: true });
    setSlotError(null);
  };

  return (
    <div className="space-y-6">
      <p className={fieldLabelClass}>Interval demonstrativ</p>
      <p className={fieldHintClass}>
        Intervalele sunt generate pentru prezentare și nu blochează un calendar
        real.
      </p>

      {loading && (
        <p className="text-sm text-text-muted" aria-live="polite">
          Se încarcă intervalele disponibile...
        </p>
      )}

      {fetchError && (
        <div className="space-y-3">
          <p className={fieldErrorClass} role="alert">
            {fetchError}
          </p>
          <Button type="button" variant="secondary" size="sm" onClick={onReload}>
            Reîncearcă
          </Button>
        </div>
      )}

      {!loading && !fetchError && slots.length === 0 && (
        <p className="text-sm text-text-muted">
          Nu există intervale libere în demo pentru acest artist. Reveniți mai
          târziu sau alegeți alt artist.
        </p>
      )}

      {slots.length > 0 && (
        <ul className="space-y-3" role="list">
          {slots.map((slot) => {
            const selected = slotId === slot.id;
            return (
              <li key={slot.id}>
                <button
                  type="button"
                  onClick={() => selectSlot(slot)}
                  className={cn(
                    "w-full border p-4 text-left transition-colors",
                    selected
                      ? "border-accent bg-surface"
                      : "border-line bg-surface-muted hover:border-text-subtle",
                  )}
                  aria-pressed={selected}
                >
                  <span className="block font-semibold text-text">
                    {slot.label}
                  </span>
                  <span className="mt-1 block font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
                    {formatSlotRange(slot.startsAt, slot.endsAt)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {(errors.slotId || slotError) && (
        <p className={fieldErrorClass} role="alert">
          {slotError ?? errors.slotId?.message ?? "Selectați un interval."}
        </p>
      )}
    </div>
  );
}