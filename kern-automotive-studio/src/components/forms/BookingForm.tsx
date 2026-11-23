"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Introdu numele complet."),
  email: z.string().email("Email invalid."),
  phone: z.string().min(6, "Introdu un telefon valid."),
  vehicle: z.string().min(2, "Specifică modelul mașinii."),
  service: z.string().min(1, "Alege un serviciu."),
  notes: z.string().optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const [note, setNote] = useState("");
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicle: "",
      service: "",
      notes: "",
    },
  });

  async function onSubmit(_values: BookingValues) {
    await new Promise((r) => setTimeout(r, 500));
    setNote(
      "Programare demo înregistrată. Nu se confirmă un slot real — acest formular simulează fluxul UX pentru portofoliu.",
    );
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nume complet" error={form.formState.errors.fullName?.message}>
          <input {...form.register("fullName")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input
            {...form.register("email")}
            type="email"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
        <Field label="Telefon" error={form.formState.errors.phone?.message}>
          <input {...form.register("phone")} className={inputClass} autoComplete="tel" />
        </Field>
        <Field label="Mașină (marcă / model / an)" error={form.formState.errors.vehicle?.message}>
          <input {...form.register("vehicle")} className={inputClass} placeholder="ex. Porsche 911, 2024" />
        </Field>
      </div>
      <Field label="Serviciu de interes" error={form.formState.errors.service?.message}>
        <select {...form.register("service")} className={inputClass}>
          <option value="">Selectează…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="pachet">Pachet complet / evaluare</option>
        </select>
      </Field>
      <Field label="Detalii (opțional)" error={form.formState.errors.notes?.message}>
        <textarea {...form.register("notes")} rows={4} className={`${inputClass} h-auto py-3`} />
      </Field>
      <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
        {form.formState.isSubmitting ? "Se trimite…" : "Solicită evaluare demo"}
      </Button>
      {note ? (
        <p className="rounded-sm border border-copper/30 bg-copper/10 px-4 py-3 text-sm text-carbon" role="status">
          {note}
        </p>
      ) : null}
    </form>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-sm border border-carbon/15 bg-white px-4 text-sm text-carbon outline-none transition focus:border-copper";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-carbon">
      <span>{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-auto-red" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
