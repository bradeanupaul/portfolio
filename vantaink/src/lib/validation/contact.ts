import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele este prea scurt.")
    .max(120, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .email("Adresa de email nu este validă.")
    .max(254),
  subject: z
    .string()
    .trim()
    .min(2, "Subiectul este prea scurt.")
    .max(200, "Subiectul este prea lung."),
  message: z
    .string()
    .trim()
    .min(10, "Mesajul trebuie să aibă cel puțin 10 caractere.")
    .max(5000, "Mesajul poate avea maximum 5000 de caractere."),
  demoAck: z.literal(true, {
    message: "Confirmați că înțelegeți caracterul demonstrativ al proiectului.",
  }),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;