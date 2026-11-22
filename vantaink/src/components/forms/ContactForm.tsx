"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
} from "@/lib/validation/contact";
import {
  fieldErrorClass,
  fieldHintClass,
  fieldInputClass,
  fieldLabelClass,
} from "./consultation/form-classes";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ referenceId: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        referenceId?: string;
        error?: string;
        issues?: Record<string, string[] | undefined>;
      };

      if (!res.ok || !payload.ok || !payload.referenceId) {
        if (payload.issues) {
          for (const [field, messages] of Object.entries(payload.issues)) {
            if (messages?.[0]) {
              setError(field as keyof ContactSubmissionInput, {
                message: messages[0],
              });
            }
          }
        }
        setSubmitError(payload.error ?? "Nu am putut înregistra mesajul.");
        return;
      }

      setSuccess({ referenceId: payload.referenceId });
      reset();
    } catch {
      setSubmitError("Nu am putut înregistra mesajul.");
    } finally {
      setSubmitting(false);
    }
  });

  if (success) {
    return (
      <div
        className="border border-accent/40 bg-surface-muted p-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl uppercase text-text">
          Mesajul demonstrativ a fost înregistrat.
        </p>
        <p className="mt-3 text-text-muted">
          Referință demo:{" "}
          <span className="font-mono-ui text-text">{success.referenceId}</span>
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Nu trimitem răspuns pe email. Conținutul rămâne în baza locală demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <p className="text-sm text-text-muted">
        Formular demonstrativ. Mesajele nu ajung la un studio real și nu
        generează notificări email.
      </p>

      <div>
        <label className={fieldLabelClass} htmlFor="contact-name">
          Nume
        </label>
        <input id="contact-name" className={fieldInputClass} {...register("name")} />
        {errors.name && (
          <p className={fieldErrorClass} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="contact-email">
          Adresă de email
        </label>
        <input
          id="contact-email"
          type="email"
          className={fieldInputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className={fieldErrorClass} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="contact-subject">
          Subiect
        </label>
        <input id="contact-subject" className={fieldInputClass} {...register("subject")} />
        {errors.subject && (
          <p className={fieldErrorClass} role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="contact-message">
          Mesaj
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className={cn(fieldInputClass, "resize-y")}
          {...register("message")}
        />
        {errors.message && (
          <p className={fieldErrorClass} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex gap-3 text-sm text-text">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-accent"
            {...register("demoAck")}
          />
          <span>
            Confirm că înțeleg caracterul demonstrativ al acestui site și că nu
            voi primi răspuns real.
          </span>
        </label>
        {errors.demoAck && (
          <p className={fieldErrorClass} role="alert">
            {errors.demoAck.message}
          </p>
        )}
        <p className={fieldHintClass}>
          Datele sunt salvate local în SQLite pentru prezentarea portofoliului.
        </p>
      </div>

      {submitError && (
        <p className={fieldErrorClass} role="alert">
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Se trimite..." : "Trimite mesajul demo"}
      </Button>
    </form>
  );
}