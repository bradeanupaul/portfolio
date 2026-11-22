"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { FormField, FormInput, FormTextarea } from "@/components/ui/FormField";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as {
      success?: boolean;
      message?: string;
      error?: string;
    };

    if (!response.ok || !payload.success) {
      setServerError(payload.error ?? "Mesajul nu a putut fi înregistrat.");
      return;
    }

    setServerMessage(payload.message ?? "Mesaj demonstrativ înregistrat.");
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {serverError ? (
        <p role="alert" className="rounded-sm border border-red-400/35 bg-red-950/25 px-3 py-2.5 text-sm text-red-200">
          {serverError}
        </p>
      ) : null}
      {serverMessage ? (
        <p
          role="status"
          className="rounded-sm border border-bn-gold/30 bg-bn-gold/10 px-3 py-2.5 text-sm text-bn-gold-light"
        >
          {serverMessage}
        </p>
      ) : null}

      <div className="grid gap-5 min-[900px]:grid-cols-2">
        <FormField id="contact-name" label="Nume" error={errors.name?.message}>
          <FormInput
            id="contact-name"
            hasError={Boolean(errors.name)}
            className="h-12 py-3 text-base"
            autoComplete="name"
            {...register("name")}
          />
        </FormField>
        <FormField id="contact-email" label="Email" error={errors.email?.message}>
          <FormInput
            id="contact-email"
            type="email"
            hasError={Boolean(errors.email)}
            className="h-12 py-3 text-base"
            autoComplete="email"
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField id="contact-subject" label="Subiect" error={errors.subject?.message}>
        <FormInput
          id="contact-subject"
          hasError={Boolean(errors.subject)}
          className="h-12 py-3 text-base"
          {...register("subject")}
        />
      </FormField>

      <FormField id="contact-message" label="Mesaj" error={errors.message?.message}>
        <FormTextarea
          id="contact-message"
          rows={5}
          hasError={Boolean(errors.message)}
          className="min-h-[140px] text-base"
          {...register("message")}
        />
      </FormField>

      <div className="space-y-3 pt-1">
        <Button type="submit" disabled={isSubmitting} showArrow size="lg" className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <LoadingSpinner className="size-4" />
              Se trimite...
            </>
          ) : (
            "Trimite mesaj demonstrativ"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-bn-text-dim">
          Demonstrativ: mesajul se salvează local în SQLite. Nu se trimite email real.
        </p>
      </div>
    </form>
  );
}
