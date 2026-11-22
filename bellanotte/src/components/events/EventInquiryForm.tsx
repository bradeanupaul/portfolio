"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { events } from "@/data/events";
import {
  eventInquiryFormSchema,
  type EventInquiryFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { FormField, FormInput, FormSelect, FormTextarea } from "@/components/ui/FormField";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type EventInquiryFormProps = {
  defaultEventSlug?: string;
};

export function EventInquiryForm({ defaultEventSlug }: EventInquiryFormProps) {
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const defaultEvent = events.find((event) => event.slug === defaultEventSlug);

  const form = useForm<EventInquiryFormValues>({
    resolver: zodResolver(eventInquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventSlug: defaultEvent?.slug ?? "",
      eventTitle: defaultEvent?.title ?? "",
      partySize: 12,
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);
    const response = await fetch("/api/evenimente", {
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
      setFeedback({ type: "err", text: payload.error ?? "Solicitarea nu a putut fi salvată." });
      return;
    }

    setFeedback({
      type: "ok",
      text: payload.message ?? "Solicitare demonstrativă înregistrată.",
    });
    reset({ ...values, name: "", email: "", phone: "", message: "" });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {feedback ? (
        <p
          role={feedback.type === "err" ? "alert" : "status"}
          className={
            feedback.type === "err"
              ? "text-sm text-red-200"
              : "rounded-sm border border-bn-gold/30 bg-bn-gold/10 px-4 py-3 text-sm text-bn-gold-light"
          }
        >
          {feedback.text}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="event-name" label="Nume" error={errors.name?.message}>
          <FormInput id="event-name" hasError={Boolean(errors.name)} {...register("name")} />
        </FormField>
        <FormField id="event-email" label="Email" error={errors.email?.message}>
          <FormInput id="event-email" type="email" hasError={Boolean(errors.email)} {...register("email")} />
        </FormField>
        <FormField id="event-phone" label="Telefon (opțional)" error={errors.phone?.message}>
          <FormInput id="event-phone" hasError={Boolean(errors.phone)} {...register("phone")} />
        </FormField>
        <FormField id="event-slug" label="Eveniment / tip" error={errors.eventSlug?.message}>
          <FormSelect
            id="event-slug"
            hasError={Boolean(errors.eventSlug)}
            {...register("eventSlug", {
              onChange: (event) => {
                const slug = event.target.value;
                const match = events.find((item) => item.slug === slug);
                if (match) {
                  form.setValue("eventTitle", match.title);
                }
              },
            })}
          >
            <option value="">Eveniment privat / alt tip</option>
            {events.map((event) => (
              <option key={event.id} value={event.slug}>
                {event.title}
              </option>
            ))}
            <option value="dining-privat">Dining privat</option>
            <option value="nunta-receptie">Recepție / nuntă</option>
            <option value="corporate">Corporate</option>
          </FormSelect>
        </FormField>
      </div>

      <input type="hidden" {...register("eventTitle")} />

      <FormField id="event-party" label="Număr estimativ de persoane" error={errors.partySize?.message}>
        <FormInput
          id="event-party"
          type="number"
          min={1}
          hasError={Boolean(errors.partySize)}
          {...register("partySize", { valueAsNumber: true })}
        />
      </FormField>

      <FormField id="event-message" label="Detalii" error={errors.message?.message}>
        <FormTextarea id="event-message" rows={5} hasError={Boolean(errors.message)} {...register("message")} />
      </FormField>

      <Button type="submit" disabled={isSubmitting} showArrow>
        {isSubmitting ? (
          <>
            <LoadingSpinner className="size-4" />
            Se trimite...
          </>
        ) : (
          "Trimite solicitarea demonstrativă"
        )}
      </Button>
    </form>
  );
}