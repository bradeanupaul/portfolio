"use client";

import type { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ConsultationSubmissionInput } from "@/lib/validation/consultation";
import { artists } from "@/data/artists";
import { getWorksByArtist } from "@/lib/works";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";
import { fieldErrorClass, fieldLabelClass } from "./form-classes";

type ArtistStepProps = {
  errors: FieldErrors<ConsultationSubmissionInput>;
  setValue: UseFormSetValue<ConsultationSubmissionInput>;
  watch: UseFormWatch<ConsultationSubmissionInput>;
  highlightSelection: boolean;
};

export function ArtistStep({
  errors,
  setValue,
  watch,
  highlightSelection,
}: ArtistStepProps) {
  const artistSlug = watch("artistSlug");

  return (
    <div className="space-y-6">
      <p className={fieldLabelClass}>Alegeți artistul</p>
      <ul className="grid gap-4 md:grid-cols-2" role="list">
        {artists.map((artist) => {
          const selected = highlightSelection && artistSlug === artist.slug;
          const works = getWorksByArtist(artist.slug).slice(0, 3);

          return (
            <li key={artist.slug}>
              <button
                type="button"
                onClick={() =>
                  setValue("artistSlug", artist.slug, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={cn(
                  "w-full border p-4 text-left transition-colors",
                  selected
                    ? "border-accent bg-surface"
                    : "border-line bg-surface-muted hover:border-text-subtle",
                )}
                aria-pressed={selected}
              >
                <div className="flex gap-4">
                  <SmartImage
                    src={artist.portrait}
                    alt=""
                    width={80}
                    height={100}
                    className="aspect-[4/5] w-20 shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="font-display text-xl uppercase text-text">
                      {artist.name}
                    </p>
                    <p className="text-sm text-text-muted">{artist.manifesto}</p>
                  </div>
                </div>
                {works.length > 0 && (
                  <ul
                    className="mt-4 grid grid-cols-3 gap-2"
                    aria-label={`Lucrări reprezentative pentru ${artist.name}`}
                  >
                    {works.map((work) => (
                      <li key={work.id} className="relative aspect-square">
                        <SmartImage
                          src={work.images.main}
                          alt={work.alt}
                          fill
                          className="h-full w-full"
                          sizes="120px"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {errors.artistSlug && (
        <p className={fieldErrorClass} role="alert">
          {errors.artistSlug.message}
        </p>
      )}
    </div>
  );
}