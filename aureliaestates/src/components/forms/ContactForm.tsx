"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { DemoNote, Field, InquirySuccess, inputClass } from "@/components/forms/FormBits";
import { contactSchema, fieldErrors } from "@/lib/schemas";
import { postInquiry } from "@/lib/submit-inquiry";

const subjects = ["Vizionare", "Vânzare", "Închiriere", "Reprezentare", "Altă întrebare"];

export function ContactForm({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const parsed = contactSchema.safeParse({ name, email, phone, subject, message });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setPending(true);
    const result = await postInquiry("/api/contact", parsed.data);
    setPending(false);

    if (!result.ok) {
      setErrors(result.errors ?? {});
      setFormError(result.message ?? "Mesajul nu a fost salvat.");
      return;
    }

    setReference(result.reference ?? "");
  }

  if (reference) return <InquirySuccess reference={reference} tone={tone} />;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume" name="contact-name" error={errors.name} tone={tone}>
          <input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className={inputClass(tone)}
          />
        </Field>
        <Field label="Email" name="contact-email" error={errors.email} tone={tone}>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={inputClass(tone)}
          />
        </Field>
        <Field label="Telefon" name="contact-phone" error={errors.phone} tone={tone} hint="Opțional.">
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            className={inputClass(tone)}
          />
        </Field>
        <div>
          <Select
            label="Subiect"
            value={subject}
            onValueChange={setSubject}
            placeholder="Alegeți, dacă doriți"
            surface={tone === "dark" ? "white" : "ice"}
            options={subjects.map((item) => ({ value: item, label: item }))}
          />
          {errors.subject ? (
            <p className="mt-2 text-sm text-coral" role="alert">
              {errors.subject}
            </p>
          ) : null}
        </div>
      </div>
      <Field label="Mesaj" name="contact-message" error={errors.message} tone={tone}>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className={inputClass(tone)}
        />
      </Field>
      <DemoNote tone={tone} />
      {formError ? (
        <p className="text-sm text-coral" role="alert">
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} variant={tone === "dark" ? "light" : "primary"}>
        {pending ? "Se salvează" : "Trimite mesajul"}
      </Button>
    </form>
  );
}
