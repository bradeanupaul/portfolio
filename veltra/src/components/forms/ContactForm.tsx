"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "motion/react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { listCascade, listCascadeItem } from "@/lib/motion/variants";

const SUBJECTS = [
  "Rezervare",
  "SPA și wellness",
  "Restaurant ARBOR",
  "Experiențe",
  "Grup",
  "General",
] as const;

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Numele este obligatoriu.").max(100),
  email: z.string().trim().email("Adresa de email este invalidă.").max(120),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, "Alege tipul solicitării.").max(120),
  checkIn: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().trim().min(10, "Mesajul este prea scurt.").max(2000),
  acknowledge: z.boolean().refine((v) => v === true, {
    message: "Confirmă că înțelegi caracterul demonstrativ.",
  }),
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const reduce = useReducedMotion();
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      checkIn: "",
      guests: "",
      message: "",
      acknowledge: false,
      website: "",
    },
  });

  const subjectValue = watch("subject");

  async function onSubmit(data: ContactFormValues) {
    if (data.website) return;
    setStatus("sending");
    try {
      const extras = [
        data.checkIn ? `Date dorite: ${data.checkIn}` : null,
        data.guests ? `Oaspeți: ${data.guests}` : null,
      ]
        .filter(Boolean)
        .join(" · ");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          subject: data.subject,
          message: extras ? `${data.message}\n\n[${extras}]` : data.message,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "",
        checkIn: "",
        guests: "",
        message: "",
        acknowledge: false,
        website: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      variants={listCascade}
      initial={reduce ? false : "hidden"}
      animate="show"
    >
      <p className="rounded-sm border border-clay/30 bg-clay/8 px-3 py-2.5 text-[0.9rem] text-ink/80">
        Solicitare demonstrativă, nu este transmisă unei proprietăți reale.
      </p>

      {/* honeypot — excluded from a11y tree */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        hidden
        aria-hidden
        {...register("website")}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nume" error={errors.name?.message} id={`${formId}-name`}>
          <input
            id={`${formId}-name`}
            className="contact-input"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} id={`${formId}-email`} errId={`${formId}-email-err`}>
          <input
            id={`${formId}-email`}
            type="email"
            className="contact-input"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Telefon (opțional)" error={errors.phone?.message} id={`${formId}-phone`}>
          <input
            id={`${formId}-phone`}
            type="tel"
            className="contact-input"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>
        <Field label="Tip solicitare" error={errors.subject?.message} id={`${formId}-subject`}>
          <select
            id={`${formId}-subject`}
            className="contact-input"
            aria-invalid={Boolean(errors.subject)}
            value={
              SUBJECTS.some((s) => subjectValue === s || subjectValue?.startsWith(s))
                ? SUBJECTS.find((s) => subjectValue === s || subjectValue?.startsWith(s))
                : subjectValue
                  ? "__custom"
                  : ""
            }
            onChange={(e) => {
              const v = e.target.value;
              if (v && v !== "__custom") setValue("subject", v, { shouldValidate: true });
            }}
          >
            <option value="">Alege tipul</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            {subjectValue && !SUBJECTS.includes(subjectValue as (typeof SUBJECTS)[number]) ? (
              <option value="__custom">{subjectValue}</option>
            ) : null}
          </select>
          <input type="hidden" {...register("subject")} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Date dorite (opțional)" id={`${formId}-checkIn`}>
          <input
            id={`${formId}-checkIn`}
            type="text"
            className="contact-input"
            placeholder="ex. 12 până pe 15 martie"
            {...register("checkIn")}
          />
        </Field>
        <Field label="Număr oaspeți (opțional)" id={`${formId}-guests`}>
          <input id={`${formId}-guests`} type="text" className="contact-input" placeholder="ex. 2 adulți" {...register("guests")} />
        </Field>
      </div>

      <Field label="Mesaj" error={errors.message?.message} id={`${formId}-message`} errId={`${formId}-message-err`}>
        <textarea
          id={`${formId}-message`}
          className="contact-input min-h-[150px] resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-err` : undefined}
          {...register("message")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-ink/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--clay)]"
            aria-invalid={Boolean(errors.acknowledge)}
            aria-describedby={errors.acknowledge ? `${formId}-ack-err` : undefined}
            {...register("acknowledge")}
          />
          <span>
            Înțeleg că VELTRA este un proiect demonstrativ și că acest mesaj nu ajunge la o proprietate reală.
          </span>
        </label>
        {errors.acknowledge ? (
          <p id={`${formId}-ack-err`} className="error-text" role="alert">
            {errors.acknowledge.message}
          </p>
        ) : null}
      </div>

      {status === "ok" ? (
        <p className="border border-moss/30 bg-moss/10 px-3 py-2.5 text-sm font-medium text-moss" role="status">
          Mulțumim. Mesajul demonstrativ a fost înregistrat local.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="error-text" role="alert">
          Nu am putut salva mesajul. Încercați din nou.
        </p>
      ) : null}

      <motion.div variants={listCascadeItem}>
        <Button type="submit" variant="copper" arrow disabled={status === "sending"}>
          {status === "sending" ? "Se trimite..." : "Trimite mesajul"}
        </Button>
      </motion.div>
    </motion.form>
  );
}

function Field({
  label,
  error,
  children,
  id,
  errId,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  id: string;
  errId?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errId ?? `${id}-err`} className="error-text" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
