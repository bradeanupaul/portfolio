import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { z } from "zod";

const artistSlugs = artists.map((a) => a.slug) as [string, ...string[]];
const styleSlugSet = new Set(styles.map((s) => s.slug));

export const KNOWN_ARTIST_SLUGS = artistSlugs;
export const KNOWN_STYLE_SLUGS = styles.map((s) => s.slug);

const styleSlugSchema = z
  .string()
  .refine((slug) => styleSlugSet.has(slug as (typeof styles)[number]["slug"]), {
    message: "Stil necunoscut.",
  });

export const consultationIdeaStageSchema = z.object({
  styleSlugs: z.array(styleSlugSchema).min(1, "Selectați cel puțin un stil."),
  placement: z
    .string()
    .trim()
    .min(2, "Plasamentul este prea scurt.")
    .max(120, "Plasamentul este prea lung."),
  approximateSize: z
    .string()
    .trim()
    .min(1, "Indicați o dimensiune aproximativă.")
    .max(80, "Dimensiunea aproximativă este prea lungă."),
  ideaDescription: z
    .string()
    .trim()
    .min(20, "Descrierea ideii trebuie să aibă cel puțin 20 de caractere.")
    .max(2000, "Descrierea ideii poate avea maximum 2000 de caractere."),
});

export const consultationSubmissionSchema = consultationIdeaStageSchema.extend({
  artistSlug: z.enum(artistSlugs, {
    message: "Artist necunoscut.",
  }),
  slotId: z.string().trim().min(1).optional(),
  contactName: z
    .string()
    .trim()
    .min(2, "Numele este prea scurt.")
    .max(120, "Numele este prea lung."),
  contactEmail: z
    .string()
    .trim()
    .email("Adresa de email nu este validă.")
    .max(254),
  preferredPeriod: z.string().trim().max(200).optional(),
  demoAcknowledged: z.literal(true, {
    message: "Confirmați că înțelegeți caracterul demonstrativ al proiectului.",
  }),
});

export type ConsultationSubmissionInput = z.infer<
  typeof consultationSubmissionSchema
>;