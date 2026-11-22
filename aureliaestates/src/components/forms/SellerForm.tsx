"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DemoNote, Field, InquirySuccess, inputClass } from "@/components/forms/FormBits";
import { fieldErrors, sellerSchema } from "@/lib/schemas";
import { postInquiry } from "@/lib/submit-inquiry";
import { propertyCategoryLabels, type PropertyCategory } from "@/types";

const categories = Object.entries(propertyCategoryLabels) as [PropertyCategory, string][];

export function SellerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [estimatedArea, setEstimatedArea] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const payload = {
      name,
      email,
      phone,
      location,
      propertyCategory,
      message,
      ...(estimatedArea.trim() ? { estimatedArea: Number(estimatedArea) } : {}),
    };
    const parsed = sellerSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setPending(true);
    const result = await postInquiry("/api/seller", parsed.data);
    setPending(false);

    if (!result.ok) {
      setErrors(result.errors ?? {});
      setFormError(result.message ?? "Cererea nu a fost salvată.");
      return;
    }

    setReference(result.reference ?? "");
  }

  if (reference) return <InquirySuccess reference={reference} />;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume" name="seller-name" error={errors.name}>
          <input
            id="seller-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className={inputClass()}
          />
        </Field>
        <Field label="Email" name="seller-email" error={errors.email}>
          <input
            id="seller-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={inputClass()}
          />
        </Field>
        <Field label="Telefon" name="seller-phone" error={errors.phone}>
          <input
            id="seller-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            className={inputClass()}
          />
        </Field>
        <Field label="Zonă" name="seller-location" error={errors.location}>
          <input
            id="seller-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={inputClass()}
            list="zone-aurelia"
          />
          <datalist id="zone-aurelia">
            <option value="Herăstrău" />
            <option value="Primăverii" />
            <option value="Floreasca" />
            <option value="Pipera" />
            <option value="Corbeanca" />
            <option value="Brașov" />
          </datalist>
        </Field>
        <Field label="Tip" name="seller-category" error={errors.propertyCategory}>
          <select
            id="seller-category"
            value={propertyCategory}
            onChange={(event) => setPropertyCategory(event.target.value)}
            className={inputClass()}
          >
            <option value="">Alegeți</option>
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Suprafață aproximativă"
          name="seller-area"
          error={errors.estimatedArea}
          hint="Opțional, în metri pătrați."
        >
          <input
            id="seller-area"
            inputMode="numeric"
            value={estimatedArea}
            onChange={(event) => setEstimatedArea(event.target.value)}
            className={inputClass()}
          />
        </Field>
      </div>
      <Field label="Despre proprietate" name="seller-message" error={errors.message}>
        <textarea
          id="seller-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className={inputClass()}
        />
      </Field>
      <DemoNote />
      {formError ? (
        <p className="text-sm text-coral" role="alert">
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Se salvează" : "Trimite prezentarea"}
      </Button>
    </form>
  );
}
