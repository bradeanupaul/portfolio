"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  consultationIdeaStageSchema,
  consultationSubmissionSchema,
  KNOWN_ARTIST_SLUGS,
  KNOWN_STYLE_SLUGS,
  type ConsultationSubmissionInput,
} from "@/lib/validation/consultation";
import {
  fetchDemoSlotsForArtist,
  type DemoSlot,
} from "@/lib/booking/demo-slots-client";
import { ArtistStep } from "./consultation/ArtistStep";
import { ContactStep } from "./consultation/ContactStep";
import { IdeaStep } from "./consultation/IdeaStep";
import { PeriodStep } from "./consultation/PeriodStep";
import { ReviewStep } from "./consultation/ReviewStep";
import { WizardProgress } from "./consultation/WizardProgress";

const STEP_FIELDS: Record<number, (keyof ConsultationSubmissionInput)[]> = {
  1: ["styleSlugs", "placement", "approximateSize", "ideaDescription"],
  2: ["artistSlug"],
  3: ["slotId"],
  4: ["contactName", "contactEmail"],
  5: ["demoAcknowledged"],
};

const artistSlugSchema = z.enum(KNOWN_ARTIST_SLUGS);

function parsePreselectStyle(raw: string | null): string[] {
  if (!raw) return [];
  const slug = raw.trim();
  return KNOWN_STYLE_SLUGS.includes(slug as (typeof KNOWN_STYLE_SLUGS)[number])
    ? [slug]
    : [];
}

function parsePreselectArtist(
  raw: string | null,
): ConsultationSubmissionInput["artistSlug"] | undefined {
  if (!raw) return undefined;
  const parsed = artistSlugSchema.safeParse(raw.trim());
  return parsed.success ? parsed.data : undefined;
}

const step3Schema = z.object({
  slotId: z.string().trim().min(1, "Selectați un interval demonstrativ."),
});

export function ConsultationWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ referenceId: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [slots, setSlots] = useState<DemoSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsFetchError, setSlotsFetchError] = useState<string | null>(null);

  const form = useForm<ConsultationSubmissionInput>({
    resolver: zodResolver(consultationSubmissionSchema),
    defaultValues: {
      styleSlugs: [],
      placement: "",
      approximateSize: "",
      ideaDescription: "",
      artistSlug: undefined as unknown as ConsultationSubmissionInput["artistSlug"],
      slotId: undefined,
      preferredPeriod: "",
      contactName: "",
      contactEmail: "",
      demoAcknowledged: undefined,
    },
    mode: "onTouched",
  });

  const {
    register,
    setValue,
    watch,
    trigger,
    getValues,
    formState,
    handleSubmit,
  } = form;

  const loadSlotsForArtist = useCallback(
    async (artistSlug: string) => {
      setSlotsLoading(true);
      setSlotsFetchError(null);
      setSlotError(null);
      const result = await fetchDemoSlotsForArtist(artistSlug);
      setSlots(result.slots);
      setSlotsFetchError(result.error);
      setSlotsLoading(false);
      setValue("slotId", undefined, { shouldDirty: true });
      setValue("preferredPeriod", "", { shouldDirty: true });
    },
    [setValue],
  );

  useEffect(() => {
    const style = parsePreselectStyle(searchParams.get("style"));
    const artist = parsePreselectArtist(searchParams.get("artist"));
    if (style.length > 0) {
      setValue("styleSlugs", style);
    }
    if (artist) {
      setValue("artistSlug", artist);
    }
  }, [searchParams, setValue]);

  const goNext = useCallback(async () => {
    setSubmitError(null);
    setSlotError(null);

    if (step === 1) {
      const idea = consultationIdeaStageSchema.safeParse({
        styleSlugs: getValues("styleSlugs"),
        placement: getValues("placement"),
        approximateSize: getValues("approximateSize"),
        ideaDescription: getValues("ideaDescription"),
      });
      if (!idea.success) {
        await trigger(STEP_FIELDS[1]);
        return;
      }
    } else if (step === 2) {
      const ok = await trigger(STEP_FIELDS[2]);
      if (!ok) return;
      const artistSlug = getValues("artistSlug");
      await loadSlotsForArtist(artistSlug);
      setStep(3);
      return;
    } else if (step === 3) {
      const slot = step3Schema.safeParse({ slotId: getValues("slotId") ?? "" });
      if (!slot.success) {
        setSlotError("Selectați un interval demonstrativ.");
        return;
      }
    } else {
      const ok = await trigger(STEP_FIELDS[step]);
      if (!ok) return;
    }

    setStep((s) => Math.min(5, s + 1));
  }, [getValues, loadSlotsForArtist, step, trigger]);

  const goBack = () => {
    setSubmitError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        referenceId?: string;
        message?: string;
        error?: string;
        issues?: Record<string, string[] | undefined>;
      };

      if (!res.ok || !payload.ok || !payload.referenceId) {
        if (payload.issues) {
          for (const [field, messages] of Object.entries(payload.issues)) {
            if (messages?.[0]) {
              form.setError(field as keyof ConsultationSubmissionInput, {
                message: messages[0],
              });
            }
          }
        }
        setSubmitError(payload.error ?? "Nu am putut înregistra solicitarea.");
        return;
      }

      setSuccess({ referenceId: payload.referenceId });
    } catch {
      setSubmitError("Nu am putut înregistra solicitarea.");
    } finally {
      setSubmitting(false);
    }
  });

  if (success) {
    return (
      <div
        className="border border-accent/40 bg-surface p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-3xl uppercase text-text">
          Solicitarea demonstrativă a fost înregistrată.
        </p>
        <p className="mt-4 text-text-muted">
          Referință demo:{" "}
          <span className="font-mono-ui text-text">{success.referenceId}</span>
        </p>
        <p className="mt-4 text-sm text-text-muted">
          Nu trimitem email de confirmare. Datele rămân stocate local pentru
          prezentare.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <p
        className="border-l-2 border-accent bg-surface pl-4 py-2 text-sm text-text-muted"
        role="note"
      >
        Formularul salvează datele în baza locală a proiectului. Nu rezervă o
        ședință reală la studioul fictiv.
      </p>

      <WizardProgress currentStep={step} />

      {step === 1 && (
        <IdeaStep
          register={register}
          errors={formState.errors}
          setValue={setValue}
          watch={watch}
        />
      )}
      {step === 2 && (
        <ArtistStep
          errors={formState.errors}
          setValue={setValue}
          watch={watch}
          highlightSelection={step >= 2}
        />
      )}
      {step === 3 && (
        <PeriodStep
          errors={formState.errors}
          setValue={setValue}
          watch={watch}
          slotError={slotError}
          setSlotError={setSlotError}
          slots={slots}
          loading={slotsLoading}
          fetchError={slotsFetchError}
          onReload={() => {
            const artistSlug = getValues("artistSlug");
            if (artistSlug) void loadSlotsForArtist(artistSlug);
          }}
        />
      )}
      {step === 4 && (
        <ContactStep register={register} errors={formState.errors} />
      )}
      {step === 5 && (
        <ReviewStep
          register={register}
          errors={formState.errors}
          watch={watch}
        />
      )}

      {submitError && (
        <p className="text-sm text-accent" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex flex-wrap gap-4 border-t border-line pt-6">
        {step > 1 && (
          <Button type="button" variant="secondary" onClick={goBack}>
            Înapoi
          </Button>
        )}
        {step < 5 ? (
          <Button type="button" onClick={() => void goNext()}>
            Continuă
          </Button>
        ) : (
          <Button type="submit" disabled={submitting}>
            {submitting ? "Se trimite..." : "Trimite solicitarea demo"}
          </Button>
        )}
      </div>
    </form>
  );
}