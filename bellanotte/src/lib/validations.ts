import { z } from "zod";
import {
  MIN_PARTY_SIZE,
  ONLINE_RESERVATION_MAX_PARTY,
} from "@/lib/reservations";

/** Acceptă 07xxxxxxxx / 02xxxxxxxx / 03xxxxxxxx sau echivalent +40… */
const phoneRegex = /^(\+40|0)[237]\d{8}$/;

export const reservationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere.")
    .max(80, "Numele este prea lung."),
  email: z
    .string()
    .trim()
  .toLowerCase()
    .pipe(z.email("Introduceți o adresă de email validă.")),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s.-]/g, ""))
    .refine(
      (value) => phoneRegex.test(value),
      "Introduceți un număr de telefon românesc valid.",
    ),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Alegeți o dată validă."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Alegeți o oră validă."),
  partySize: z
    .number({ error: "Alegeți numărul de persoane." })
    .int()
    .min(MIN_PARTY_SIZE, `Minim ${MIN_PARTY_SIZE} persoană.`)
    .max(
      ONLINE_RESERVATION_MAX_PARTY,
      `Maximum ${ONLINE_RESERVATION_MAX_PARTY} persoane per rezervare online.`,
    ),
  notes: z
    .string()
    .trim()
    .max(500, "Mesajul poate avea maximum 500 de caractere.")
    .optional()
    .or(z.literal("")),
  acceptsTerms: z
    .boolean()
    .refine((value) => value === true, "Trebuie să acceptați prelucrarea datelor pentru rezervare."),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere.")
    .max(80, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Introduceți o adresă de email validă.")),
  subject: z
    .string()
    .trim()
    .min(3, "Subiectul trebuie să aibă cel puțin 3 caractere.")
    .max(120, "Subiectul este prea lung."),
  message: z
    .string()
    .trim()
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere.")
    .max(2000, "Mesajul poate avea maximum 2000 de caractere."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Introduceți o adresă de email validă.")),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export const eventInquiryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele trebuie să aibă cel puțin 2 caractere.")
    .max(80, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Introduceți o adresă de email validă.")),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s.-]/g, ""))
    .refine(
      (value) => value === "" || phoneRegex.test(value),
      "Introduceți un număr de telefon românesc valid.",
    )
    .optional(),
  eventSlug: z.string().trim().max(80).optional().or(z.literal("")),
  eventTitle: z.string().trim().max(120).optional().or(z.literal("")),
  partySize: z
    .number({ error: "Introduceți un număr valid." })
    .int()
    .min(1, "Minim 1 persoană.")
    .max(120, "Pentru grupuri foarte mari, contactați-ne telefonic.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere.")
    .max(2000, "Mesajul poate avea maximum 2000 de caractere."),
});

export type EventInquiryFormValues = z.infer<typeof eventInquiryFormSchema>;

export const reservationCancelSchema = z.object({
  reference: z
    .string()
    .trim()
    .min(6, "Referința este invalidă.")
    .max(32, "Referința este invalidă."),
  token: z.string().trim().min(16, "Token-ul este invalid.").max(64),
});

export type ReservationCancelValues = z.infer<typeof reservationCancelSchema>;