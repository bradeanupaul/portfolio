"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { sendContact } from "@/actions/contact";
import { buttonClass } from "@/components/chrome";
import { contactSchema, type ContactInput } from "@/lib/validators";

export function ContactForm() {
  const [note, setNote] = useState("");
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    const result = await sendContact(values);
    setNote(result.message);
    if (result.ok) form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Nume" error={form.formState.errors.fullName?.message}>
        <input {...form.register("fullName")} className={inputClass} autoComplete="name" />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input {...form.register("email")} className={inputClass} autoComplete="email" />
      </Field>
      <Field label="Mesaj" error={form.formState.errors.message?.message}>
        <textarea {...form.register("message")} rows={5} className={`${inputClass} h-auto py-3`} />
      </Field>
      <button className={buttonClass("solid")} disabled={form.formState.isSubmitting} type="submit">
        {form.formState.isSubmitting ? "Se trimite" : "Trimite mesajul"}
      </button>
      {note ? (
        <p className="text-sm text-ink" role="status">
          {note}
        </p>
      ) : null}
    </form>
  );
}

const inputClass = "mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 outline-none focus:border-lilac";

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
    <label className="block text-sm">
      <span className="font-semibold">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
