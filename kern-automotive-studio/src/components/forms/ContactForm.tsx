"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  fullName: z.string().min(2, "Introdu numele complet."),
  email: z.string().email("Email invalid."),
  phone: z.string().optional(),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere."),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [note, setNote] = useState("");
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(_values: ContactValues) {
    await new Promise((r) => setTimeout(r, 450));
    setNote(
      "Mesaj înregistrat în demo. KERN Automotive Studio este un proiect demonstrativ — nu se trimite corespondență reală.",
    );
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
      <Field label="Telefon (opțional)" error={form.formState.errors.phone?.message}>
        <input {...form.register("phone")} className={inputClass} autoComplete="tel" />
      </Field>
      <Field label="Mesaj" error={form.formState.errors.message?.message}>
        <textarea
          {...form.register("message")}
          rows={5}
          className={`${inputClass} h-auto py-3`}
        />
      </Field>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Se trimite…" : "Trimite mesajul"}
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
