"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DemoNote, Field, InquirySuccess, inputClass } from "@/components/forms/FormBits";
import { bucharestNow, isPastSlot, viewingTimes } from "@/lib/dates";
import { fieldErrors, viewingSchema } from "@/lib/schemas";
import { postInquiry } from "@/lib/submit-inquiry";

export function ViewingRequestForm({
  propertyId,
  propertySlug,
  reserved = false,
}: {
  propertyId: string;
  propertySlug: string;
  reserved?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");
  const today = bucharestNow().date;
  const times = viewingTimes.filter((time) => !preferredDate || !isPastSlot(preferredDate, time));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const parsed = viewingSchema.safeParse({
      propertyId,
      name,
      email,
      phone,
      message,
      preferredDate,
      preferredTime,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    const result = await postInquiry("/api/viewing", parsed.data);
    setPending(false);
    if (!result.ok) {
      setErrors(result.errors ?? {});
      setFormError(result.message ?? "Programarea nu a fost salvată.");
      return;
    }
    setReference(result.reference ?? "");
  }

  if (reference) return <InquirySuccess reference={reference} />;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {reserved ? (
        <p className="text-sm leading-relaxed text-slate">
          Proprietatea este rezervată. În viața reală, vizionarea s-ar face doar cu acordul
          proprietarului. Aici cererea se salvează doar ca demonstrație.
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume" name="view-name" error={errors.name}>
          <input id="view-name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass()} autoComplete="name" />
        </Field>
        <Field label="Email" name="view-email" error={errors.email}>
          <input id="view-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass()} autoComplete="email" />
        </Field>
        <Field label="Telefon" name="view-phone" error={errors.phone}>
          <input id="view-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass()} autoComplete="tel" />
        </Field>
        <Field label="Dată" name="view-date" error={errors.preferredDate}>
          <input
            id="view-date"
            type="date"
            min={today}
            value={preferredDate}
            onChange={(event) => {
              setPreferredDate(event.target.value);
              setPreferredTime("");
            }}
            className={inputClass()}
          />
        </Field>
        <Field label="Oră" name="view-time" error={errors.preferredTime}>
          <select id="view-time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} className={inputClass()}>
            <option value="">Alegeți ora</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>
        {preferredDate && times.length === 0 ? (
          <p className="text-sm text-slate sm:col-span-2">
            Pentru azi nu mai este nicio oră liberă. Alegeți o altă dată.
          </p>
        ) : null}
      </div>
      <Field label="Notă" name="view-message" error={errors.message} hint="Opțional.">
        <textarea id="view-message" value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className={inputClass()} />
      </Field>
      <DemoNote />
      {formError ? <p className="text-sm text-coral" role="alert">{formError}</p> : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="cobalt" disabled={pending}>
          {pending ? "Se salvează" : "Cere vizionarea"}
        </Button>
        <Link href={`/programeaza-vizionare?proprietate=${propertySlug}`} className="text-sm font-semibold text-cobalt">
          Deschide programarea pas cu pas
        </Link>
      </div>
    </form>
  );
}
