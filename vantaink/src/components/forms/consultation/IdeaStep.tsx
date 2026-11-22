"use client";

import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ConsultationSubmissionInput } from "@/lib/validation/consultation";
import { styles } from "@/data/styles";
import { cn } from "@/lib/utils";
import {
  fieldErrorClass,
  fieldHintClass,
  fieldInputClass,
  fieldLabelClass,
} from "./form-classes";

type IdeaStepProps = {
  register: UseFormRegister<ConsultationSubmissionInput>;
  errors: FieldErrors<ConsultationSubmissionInput>;
  setValue: UseFormSetValue<ConsultationSubmissionInput>;
  watch: UseFormWatch<ConsultationSubmissionInput>;
};

export function IdeaStep({ register, errors, setValue, watch }: IdeaStepProps) {
  const selected = watch("styleSlugs") ?? [];

  const toggleStyle = (slug: string) => {
    const next = selected.includes(slug)
      ? selected.filter((s) => s !== slug)
      : [...selected, slug];
    setValue("styleSlugs", next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <fieldset className="space-y-8 border-0 p-0">
      <legend className="sr-only">Ideea tatuajului</legend>

      <div>
        <span className={fieldLabelClass} id="style-slugs-label">
          Stiluri (alegeți unul sau mai multe)
        </span>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-labelledby="style-slugs-label"
        >
          {styles.map((style) => {
            const checked = selected.includes(style.slug);
            return (
              <button
                key={style.slug}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleStyle(style.slug)}
                className={cn(
                  "border px-3 py-2 text-sm font-semibold transition-colors",
                  checked
                    ? "border-accent bg-accent text-bg"
                    : "border-line bg-surface-muted text-text hover:border-text-subtle",
                )}
              >
                {style.name}
              </button>
            );
          })}
        </div>
        {errors.styleSlugs && (
          <p className={fieldErrorClass} role="alert">
            {errors.styleSlugs.message ?? "Selectați cel puțin un stil."}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="placement">
          Plasament pe corp
        </label>
        <input
          id="placement"
          className={fieldInputClass}
          autoComplete="off"
          {...register("placement")}
        />
        {errors.placement && (
          <p className={fieldErrorClass} role="alert">
            {errors.placement.message}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="approximateSize">
          Dimensiune aproximativă
        </label>
        <input
          id="approximateSize"
          className={fieldInputClass}
          placeholder="ex. 12 cm pe verticală"
          autoComplete="off"
          {...register("approximateSize")}
        />
        {errors.approximateSize && (
          <p className={fieldErrorClass} role="alert">
            {errors.approximateSize.message}
          </p>
        )}
      </div>

      <div>
        <label className={fieldLabelClass} htmlFor="ideaDescription">
          Descrierea ideii
        </label>
        <textarea
          id="ideaDescription"
          rows={6}
          className={cn(fieldInputClass, "resize-y")}
          {...register("ideaDescription")}
        />
        <p className={fieldHintClass}>
          Minim 20 de caractere. Fără date medicale sau informații sensibile în
          acest demo.
        </p>
        {errors.ideaDescription && (
          <p className={fieldErrorClass} role="alert">
            {errors.ideaDescription.message}
          </p>
        )}
      </div>
    </fieldset>
  );
}