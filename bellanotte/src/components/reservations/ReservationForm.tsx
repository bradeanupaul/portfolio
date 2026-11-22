"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { parse } from "date-fns";
import { isRestaurantOpenOnDate } from "@/lib/reservations";
import {
  reservationFormSchema,
  type ReservationFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { FormField, FormInput, FormTextarea } from "@/components/ui/FormField";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";
import { GuestSelector } from "./GuestSelector";
import {
  minReservationDateInput,
  TimeSlotPicker,
} from "./TimeSlotPicker";
import {
  ReservationConfirmation,
  type ReservationSuccess,
} from "./ReservationConfirmation";

export function ReservationForm({ compact = false }: { compact?: boolean }) {
  const [success, setSuccess] = useState<ReservationSuccess | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      partySize: 2,
      notes: "",
      acceptsTerms: false,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const dateValue = watch("date");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const response = await fetch("/api/rezervari", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as {
      success?: boolean;
      error?: string;
      reference?: string;
      cancelToken?: string;
      notice?: string;
    };

    if (!response.ok || !payload.success || !payload.reference || !payload.cancelToken) {
      setServerError(payload.error ?? "Nu am putut înregistra rezervarea demonstrativă.");
      return;
    }

    setSuccess({
      reference: payload.reference,
      cancelToken: payload.cancelToken,
      name: values.name,
      date: values.date,
      time: values.time,
      partySize: values.partySize,
    });
  });

  if (success) {
    return (
      <ReservationConfirmation
        data={success}
        onNewReservation={() => {
          setSuccess(null);
          form.reset();
        }}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(compact ? "space-y-4" : "space-y-8")}
      noValidate
    >
      <p
        className={cn(
          "rounded-sm border border-bn-border bg-bn-bg-elevated text-sm text-bn-text-muted",
          compact ? "px-3 py-2.5" : "px-4 py-3",
        )}
      >
        Formular demonstrativ. Rezervările sunt salvate în SQLite local, fără trimitere de email.
      </p>

      {serverError ? (
        <p
          role="alert"
          className="rounded-sm border border-red-400/40 bg-red-950/20 px-3 py-2.5 text-sm text-red-200"
        >
          {serverError}
        </p>
      ) : null}

      <div className={cn("grid md:grid-cols-2", compact ? "gap-3.5" : "gap-6")}>
        <FormField id="name" label="Nume complet" error={errors.name?.message}>
          <FormInput
            id="name"
            hasError={Boolean(errors.name)}
            className={compact ? "py-2.5" : undefined}
            {...register("name")}
            autoComplete="name"
          />
        </FormField>
        <FormField id="email" label="Email" error={errors.email?.message}>
          <FormInput
            id="email"
            type="email"
            hasError={Boolean(errors.email)}
            className={compact ? "py-2.5" : undefined}
            {...register("email")}
            autoComplete="email"
          />
        </FormField>
        <FormField
          id="phone"
          label="Telefon"
          hint={compact ? undefined : "Format: 07xx xxx xxx sau +40 7xx xxx xxx"}
          error={errors.phone?.message}
        >
          <FormInput
            id="phone"
            type="tel"
            hasError={Boolean(errors.phone)}
            className={compact ? "py-2.5" : undefined}
            {...register("phone")}
            autoComplete="tel"
          />
        </FormField>
        <FormField id="date" label="Data" error={errors.date?.message}>
          <FormInput
            id="date"
            type="date"
            min={minReservationDateInput()}
            hasError={Boolean(errors.date)}
            className={compact ? "py-2.5" : undefined}
            {...register("date", {
              onChange: (event) => {
                const next = event.target.value;
                if (next) {
                  const parsed = parse(next, "yyyy-MM-dd", new Date());
                  if (!isRestaurantOpenOnDate(parsed)) {
                    form.setError("date", {
                      message: "Restaurantul este închis în ziua aleasă.",
                    });
                  } else {
                    form.clearErrors("date");
                  }
                }
                setValue("time", "");
              },
            })}
          />
        </FormField>
      </div>

      <FormField id="time" label="Interval orar" error={errors.time?.message}>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TimeSlotPicker
              dateValue={dateValue}
              value={field.value}
              onChange={field.onChange}
              hasError={Boolean(errors.time)}
              compact={compact}
            />
          )}
        />
      </FormField>

      <Controller
        name="partySize"
        control={control}
        render={({ field }) => (
          <div>
            <GuestSelector
              value={field.value}
              onChange={field.onChange}
              hasError={Boolean(errors.partySize)}
              compact={compact}
            />
            {errors.partySize?.message ? (
              <p role="alert" className="mt-2 text-xs text-red-300/90">
                {errors.partySize.message}
              </p>
            ) : null}
          </div>
        )}
      />

      <FormField id="notes" label="Mențiuni (opțional)" error={errors.notes?.message}>
        <FormTextarea
          id="notes"
          hasError={Boolean(errors.notes)}
          rows={compact ? 2 : 4}
          className={compact ? "min-h-[72px]" : undefined}
          {...register("notes")}
        />
      </FormField>

      <FormField id="acceptsTerms" label="Consimțământ" error={errors.acceptsTerms?.message}>
        <label className="flex items-start gap-3 text-sm text-bn-text-muted">
          <input
            id="acceptsTerms"
            type="checkbox"
            className="mt-1 size-4 rounded border-bn-border bg-bn-bg-surface accent-bn-gold"
            {...register("acceptsTerms")}
          />
          <span>
            Accept prelucrarea datelor pentru această rezervare demonstrativă, conform{" "}
            <a href="/politica-de-confidentialitate" className="text-bn-gold hover:underline">
              politicii de confidențialitate
            </a>
            .
          </span>
        </label>
      </FormField>

      <Button
        type="submit"
        size={compact ? "md" : "lg"}
        showCalendar
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner className="size-4" />
            Se înregistrează...
          </>
        ) : (
          "Confirmă rezervarea demonstrativă"
        )}
      </Button>
    </form>
  );
}
