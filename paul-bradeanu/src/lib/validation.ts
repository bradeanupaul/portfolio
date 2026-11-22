import { z } from "zod";

export const projectInquirySchema = z.object({
  intent: z.literal("project"),
  name: z.string().trim().min(2, "Te rugăm să introduci numele.").max(80),
  email: z.string().trim().email("Adresa de email nu pare validă."),
  workType: z.enum(
    [
      "site-prezentare",
      "aplicatie-web",
      "ecommerce",
      "integrare-ai",
      "optimizare",
      "altceva",
    ],
    { message: "Selectează tipul de proiect." },
  ),
  brief: z
    .string()
    .trim()
    .min(20, "Spune câteva detalii despre proiect (minim 20 caractere).")
    .max(4000),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
  link: z.string().optional(),
  website: z.string().max(0).optional(),
});

export const careerInquirySchema = z.object({
  intent: z.literal("career"),
  name: z.string().trim().min(2, "Te rugăm să introduci numele.").max(80),
  email: z.string().trim().email("Adresa de email nu pare validă."),
  company: z.string().trim().min(2, "Adaugă numele companiei.").max(120),
  role: z.string().trim().min(2, "Adaugă rolul sau tipul de oportunitate.").max(120),
  message: z
    .string()
    .trim()
    .min(20, "Mesajul este prea scurt.")
    .max(4000),
  link: z
    .string()
    .trim()
    .url("Link invalid.")
    .optional()
    .or(z.literal("")),
  workType: z.string().optional(),
  brief: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  website: z.string().max(0).optional(),
});

export const contactSchema = z.discriminatedUnion("intent", [
  projectInquirySchema,
  careerInquirySchema,
]);

export type ContactPayload = z.infer<typeof contactSchema>;
