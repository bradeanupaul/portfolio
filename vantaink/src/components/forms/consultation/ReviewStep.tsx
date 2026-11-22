"use client";

import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import type { ConsultationSubmissionInput } from "@/lib/validation/consultation";
import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { fieldErrorClass } from "./form-classes";

type ReviewStepProps = {
  register: UseFormRegister<ConsultationSubmissionInput>;
  errors: FieldErrors<ConsultationSubmissionInput>;
  watch: UseFormWatch<ConsultationSubmissionInput>;
};

export function ReviewStep({ register, errors, watch }: ReviewStepProps) {
  const values = watch();
  const artist = artists.find((a) => a.slug === values.artistSlug);
  const styleNames = (values.styleSlugs ?? [])
    .map((slug) => styles.find((s) => s.slug === slug)?.name ?? slug)
    .join(", ");

  return (
    <div className="space-y-8">
      <div className="border border-line bg-surface p-6">
        <h3 className="font-display text-2xl uppercase text-text">Rezumat</h3>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Stiluri
            </dt>
            <dd className="mt-1 text-text">{styleNames || "Nespecificat"}</dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Plasament
            </dt>
            <dd className="mt-1 text-text">{values.placement}</dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Dimensiune
            </dt>
            <dd className="mt-1 text-text">{values.approximateSize}</dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Descriere
            </dt>
            <dd className="mt-1 whitespace-pre-wrap text-text">
              {values.ideaDescription}
            </dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Artist
            </dt>
            <dd className="mt-1 text-text">
              {artist?.name ?? values.artistSlug}
            </dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Perioadă demo
            </dt>
            <dd className="mt-1 text-text">
              {values.preferredPeriod || "Neselectată"}
            </dd>
          </div>
          <div>
            <dt className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle">
              Contact
            </dt>
            <dd className="mt-1 text-text">
              {values.contactName}, {values.contactEmail}
            </dd>
          </div>
        </dl>
      </div>

      <div className="space-y-3">
        <label className="flex gap-3 text-sm leading-relaxed text-text">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-accent"
            {...register("demoAcknowledged")}
          />
          <span>
            Confirm că înțeleg că aceasta este o solicitare demonstrativă. Nu
            rezervă o ședință reală și nu voi primi confirmare prin email.
          </span>
        </label>
        {errors.demoAcknowledged && (
          <p className={fieldErrorClass} role="alert">
            {errors.demoAcknowledged.message}
          </p>
        )}
      </div>
    </div>
  );
}