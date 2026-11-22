import { z } from "zod";

export const paymentMethods = ["ramburs", "transfer"] as const;

export const paymentLabels: Record<(typeof paymentMethods)[number], string> = {
  ramburs: "Ramburs, la livrare",
  transfer: "Transfer bancar",
};

export const checkoutDetailsSchema = z.object({
  fullName: z.string().trim().min(3, "Scrie numele complet."),
  email: z.email("Adresa de email nu pare validă."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Telefonul trebuie să aibă cel puțin 10 cifre.",
    ),
  county: z.string().trim().min(2, "Completează județul."),
  city: z.string().trim().min(2, "Completează orașul."),
  address: z.string().trim().min(5, "Completează adresa."),
  postalCode: z.string().trim().regex(/^\d{6}$/, "Codul poștal are 6 cifre."),
  notes: z.string().trim().max(400, "Observațiile sunt prea lungi."),
  payment: z.enum(paymentMethods, "Alege metoda de plată."),
});

export const cartItemSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().min(1).max(6),
});

export const checkoutPayloadSchema = checkoutDetailsSchema.extend({
  items: z.array(cartItemSchema).min(1, "Coșul este gol."),
});

export const contactSchema = z.object({
  fullName: z.string().trim().min(3, "Scrie numele."),
  email: z.email("Adresa de email nu pare validă."),
  message: z
    .string()
    .trim()
    .min(10, "Mesajul este prea scurt.")
    .max(1000, "Mesajul este prea lung."),
});

export const newsletterSchema = z.object({
  email: z.email("Adresa de email nu pare validă."),
});

export const orderLookupSchema = z.object({
  code: z.string().trim().min(4, "Scrie codul comenzii."),
  email: z.email("Adresa de email nu pare validă."),
});

export type CheckoutDetails = z.infer<typeof checkoutDetailsSchema>;
export type CheckoutPayload = z.infer<typeof checkoutPayloadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
