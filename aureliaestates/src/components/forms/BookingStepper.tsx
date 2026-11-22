"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/Button";
import { DemoNote, Field, InquirySuccess, inputClass } from "@/components/forms/FormBits";
import { bucharestNow, isPastSlot, viewingTimes } from "@/lib/dates";
import { fieldErrors, viewingSchema } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";
import { postInquiry } from "@/lib/submit-inquiry";
import { listingStatusLabels } from "@/types";

const steps = [
  { id: 1, label: "Proprietate" },
  { id: 2, label: "Dată și oră" },
  { id: 3, label: "Detalii" },
  { id: 4, label: "Verificare" },
] as const;

export function BookingStepper() {
  const params = useSearchParams();
  const preset = params.get("proprietate") ?? params.get("slug") ?? "";
  const available = useMemo(
    () => properties.filter((property) => property.status !== "vandut"),
    [],
  );
  const initial = available.find((property) => property.slug === preset || property.id === preset);

  const [step, setStep] = useState(1);
  const [propertyId, setPropertyId] = useState(initial?.id ?? "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");

  const today = bucharestNow().date;
  const property = available.find((item) => item.id === propertyId);
  const times = viewingTimes.filter((time) => !preferredDate || !isPastSlot(preferredDate, time));

  function payload() {
    return { propertyId, preferredDate, preferredTime, name, email, phone, message };
  }

  function validate(keys: string[]) {
    const parsed = viewingSchema.safeParse(payload());
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next = fieldErrors(parsed.error);
    const relevant = Object.fromEntries(
      Object.entries(next).filter(([key]) => keys.includes(key)),
    );
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  }

  function goNext() {
    if (step === 1 && validate(["propertyId"])) setStep(2);
    if (step === 2 && validate(["preferredDate", "preferredTime"])) setStep(3);
    if (step === 3 && validate(["name", "email", "phone", "message"])) setStep(4);
  }

  async function onSubmit() {
    setFormError("");
    const parsed = viewingSchema.safeParse(payload());
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStep(1);
      return;
    }
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

  if (reference) {
    return (
      <InquirySuccess reference={reference} />
    );
  }

  return (
    <div>
      <ol className="grid grid-cols-4 gap-2" aria-label="Pașii programării">
        {steps.map((item) => {
          const current = step === item.id;
          const done = step > item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (item.id < step) setStep(item.id);
                }}
                disabled={item.id > step}
                className="w-full text-left disabled:cursor-default"
                aria-current={current ? "step" : undefined}
              >
                <span className={`block h-1 rounded-full ${done || current ? "bg-azure" : "bg-steel"}`} />
                <span className="mt-3 block text-[11px] font-semibold tracking-[0.16em] text-azure">
                  0{item.id}
                </span>
                <span className={`mt-1 block text-sm ${current ? "text-ink" : "text-muted"}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        {step === 1 ? (
          <Field label="Proprietate" name="booking-property" error={errors.propertyId}>
            <select
              id="booking-property"
              value={propertyId}
              onChange={(event) => setPropertyId(event.target.value)}
              className={inputClass()}
            >
              <option value="">Alegeți o adresă</option>
              {available.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} · {item.location} · {formatPrice(item.priceEur, item.transactionType)}
                  {item.status === "rezervat" ? ` · ${listingStatusLabels.rezervat}` : ""}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Dată" name="booking-date" error={errors.preferredDate}>
              <input
                id="booking-date"
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
            <Field label="Oră" name="booking-time" error={errors.preferredTime}>
              <select
                id="booking-time"
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
                className={inputClass()}
              >
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
        ) : null}

        {step === 3 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nume" name="booking-name" error={errors.name}>
              <input
                id="booking-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className={inputClass()}
              />
            </Field>
            <Field label="Email" name="booking-email" error={errors.email}>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className={inputClass()}
              />
            </Field>
            <Field label="Telefon" name="booking-phone" error={errors.phone}>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
                className={inputClass()}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Ce ați vrea să vedeți"
                name="booking-message"
                error={errors.message}
                hint="Opțional."
              >
                <textarea
                  id="booking-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className={inputClass()}
                />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="border border-line bg-mist p-6 sm:p-8">
            <dl className="grid gap-6 sm:grid-cols-2">
              <ReviewItem label="Proprietate" value={property?.title ?? "Nealeasă"} />
              <ReviewItem label="Loc" value={property ? `${property.location}, ${property.city}` : "Nealeasă"} />
              <ReviewItem label="Dată" value={preferredDate || "Nealeasă"} />
              <ReviewItem label="Oră" value={preferredTime || "Nealeasă"} />
              <ReviewItem label="Nume" value={name || "Lipsă"} />
              <ReviewItem label="Email" value={email || "Lipsă"} />
              <ReviewItem label="Telefon" value={phone || "Lipsă"} />
              <ReviewItem label="Notă" value={message.trim() || "Fără notă"} />
            </dl>
            {property?.status === "rezervat" ? (
              <p className="mt-6 text-sm leading-relaxed text-slate">
                Proprietatea este rezervată. Vizionarea se confirmă doar dacă proprietarul este de
                acord. În această demonstrație, acordul nu este cerut nimănui.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-8 space-y-4">
        <DemoNote />
        {formError ? (
          <p className="text-sm text-coral" role="alert">
            {formError}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep((value) => value - 1)}>
              Înapoi
            </Button>
          ) : null}
          {step < 4 ? (
            <Button onClick={goNext}>Continuă</Button>
          ) : (
            <Button onClick={onSubmit} disabled={pending}>
              {pending ? "Se salvează" : "Confirmă programarea"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}
