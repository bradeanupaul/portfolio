"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ConsultationSubmissionInput } from "@/lib/validation/consultation";
import {
  fieldErrorClass,
  fieldHintClass,
  fieldInputClass,
  fieldLabelClass,
} from "./form-classes";

type ContactStepProps = {
  register: UseFormRegister<ConsultationSubmissionInput>;
  errors: FieldErrors<ConsultationSubmissionInput>;
};

export function ContactStep({ register, errors }: ContactStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className={fieldLabelClass} htmlFor="contactName">
          Nume
        </label>
        <input
          id="contactName"
          className={fieldInputClass}
          autoComplete="name"
          {...register("contactName")}
        />
        {errors.contactName && (
          <p className={fieldErrorClass} role="alert">
            {errors.contactName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className={fieldLabelClass} htmlFor="contactEmail">
          Adresă de email
        </label>
        <input
          id="contactEmail"
          type="email"
          className={fieldInputClass}
          autoComplete="email"
          {...register("contactEmail")}
        />
        {errors.contactEmail && (
          <p className={fieldErrorClass} role="alert">
            {errors.contactEmail.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className={fieldLabelClass} htmlFor="referenceUpload">
          Fișier referință (dezactivat în demo)
        </label>
        <input
          id="referenceUpload"
          type="file"
          disabled
          className={fieldInputClass}
          aria-describedby="reference-upload-hint"
        />
        <p id="reference-upload-hint" className={fieldHintClass}>
          În acest proiect nu se încarcă fișiere reale. Descrieți ideea în
          text; imaginile din galerie sunt doar ilustrative.
        </p>
      </div>
    </div>
  );
}