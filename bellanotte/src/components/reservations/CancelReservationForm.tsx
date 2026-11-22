"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { reservationCancelSchema } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { FormField, FormInput } from "@/components/ui/FormField";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function CancelReservationForm() {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState(searchParams.get("ref") ?? "");
  const [token, setToken] = useState(searchParams.get("token") ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const parsed = reservationCancelSchema.safeParse({ reference, token });
    if (!parsed.success) {
      setError("Completați referința și token-ul primite la confirmare.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rezervari/anulare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Anularea nu a putut fi efectuată.");
        return;
      }

      setMessage(payload.message ?? "Rezervare demonstrativă anulată.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-6">
      <p className="text-sm text-bn-text-muted">
        Anularea necesită referința și token-ul unic din ecranul de confirmare. Fără token corect,
        nu se dezvăluie dacă o referință există. Protecție împotriva enumerării.
      </p>

      {error ? (
        <p role="alert" className="rounded-sm border border-red-400/40 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-sm border border-bn-gold/40 bg-bn-gold/10 px-4 py-3 text-sm text-bn-gold-light">
          {message}
        </p>
      ) : null}

      <FormField id="reference" label="Referință rezervare">
        <FormInput
          id="reference"
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          autoComplete="off"
          required
        />
      </FormField>

      <FormField id="token" label="Token anulare">
        <FormInput
          id="token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          required
        />
      </FormField>

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoadingSpinner className="size-4" />
            Se procesează...
          </>
        ) : (
          "Anulează rezervarea demonstrativă"
        )}
      </Button>
    </form>
  );
}