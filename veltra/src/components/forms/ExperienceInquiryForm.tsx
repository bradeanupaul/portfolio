"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { experienceInquirySchema } from "@/lib/validation/booking";

type InquiryValues = z.infer<typeof experienceInquirySchema>;

export function ExperienceInquiryForm({
  experienceId,
  experienceName,
}: {
  experienceId?: string;
  experienceName?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(experienceInquirySchema),
    defaultValues: {
      experienceId: experienceId ?? "",
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      message: "",
    },
  });

  async function onSubmit(data: InquiryValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/experience-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      reset({ experienceId: experienceId ?? "", name: "", email: "", phone: "", preferredDate: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="hidden" {...register("experienceId")} />
      {experienceName ? (
        <p className="text-sm text-ink/70">
          Solicitare pentru: <span className="font-semibold text-pine">{experienceName}</span>
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nume" error={errors.name?.message}>
          <input className="input-field" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" className="input-field" autoComplete="email" {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Telefon (opțional)" error={errors.phone?.message}>
          <input type="tel" className="input-field" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field label="Dată preferată (opțional)" error={errors.preferredDate?.message}>
          <input type="date" className="input-field" {...register("preferredDate")} />
        </Field>
      </div>
      <Field label="Mesaj" error={errors.message?.message}>
        <textarea className="input-field min-h-[120px] resize-y" {...register("message")} />
      </Field>

      {status === "ok" ? (
        <p className="text-sm font-medium text-moss" role="status">
          Solicitarea demonstrativă a fost înregistrată. Vă contactăm în varianta comercială.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="error-text" role="alert">
          Nu am putut trimite solicitarea.
        </p>
      ) : null}

      <Button type="submit" variant="pine" disabled={status === "sending"}>
        {status === "sending" ? "Se trimite..." : "Trimite solicitarea"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      {children}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}