import { z } from "zod";
import { isPastDate, isPastSlot, isViewingTime } from "@/lib/dates";
import { propertyCategoryLabels, type PropertyCategory } from "@/types";

const categories = Object.keys(propertyCategoryLabels) as [
  PropertyCategory,
  ...PropertyCategory[],
];

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Introduceți numele.").max(120, "Numele este prea lung."),
    email: z
      .string()
      .trim()
      .pipe(z.email("Adresa de email nu este validă.")),
    phone: z.string().trim().max(20, "Numărul de telefon este prea lung.").optional().default(""),
    subject: z.string().trim().max(120, "Subiectul este prea lung.").optional().default(""),
    message: z
      .string()
      .trim()
      .min(10, "Scrieți un mesaj de câteva fraze.")
      .max(4000, "Mesajul este prea lung."),
  })
  .superRefine((value, ctx) => {
    if (value.phone && value.phone.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Telefonul pare incomplet.",
      });
    }
  });

export const sellerSchema = z.object({
  name: z.string().trim().min(2, "Introduceți numele.").max(120, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .pipe(z.email("Adresa de email nu este validă.")),
  phone: z
    .string()
    .trim()
    .min(8, "Introduceți un număr de telefon.")
    .max(20, "Numărul de telefon este prea lung."),
  location: z
    .string()
    .trim()
    .min(2, "Indicați zona proprietății.")
    .max(120, "Zona este prea lungă."),
  propertyCategory: z.enum(categories, { error: "Alegeți tipul proprietății." }),
  estimatedArea: z
    .number()
    .int("Suprafața trebuie să fie un număr întreg.")
    .positive("Suprafața trebuie să fie pozitivă.")
    .max(100000, "Suprafața pare nerealistă.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "Scrieți câteva fraze despre proprietate.")
    .max(4000, "Mesajul este prea lung."),
});

export const viewingSchema = z
  .object({
    propertyId: z.string().trim().min(1, "Alegeți o proprietate."),
    name: z.string().trim().min(2, "Introduceți numele.").max(120, "Numele este prea lung."),
    email: z
      .string()
      .trim()
      .pipe(z.email("Adresa de email nu este validă.")),
    phone: z
      .string()
      .trim()
      .min(8, "Introduceți un număr de telefon.")
      .max(20, "Numărul de telefon este prea lung."),
    message: z.string().trim().max(2000, "Mesajul este prea lung.").optional().default(""),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Alegeți data vizionării."),
    preferredTime: z.string().trim().min(1, "Alegeți ora vizionării."),
  })
  .superRefine((value, ctx) => {
    if (!isViewingTime(value.preferredTime)) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredTime"],
        message: "Alegeți o oră din listă.",
      });
    }
    if (isPastDate(value.preferredDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredDate"],
        message: "Alegeți o dată de azi sau din viitor.",
      });
    } else if (isPastSlot(value.preferredDate, value.preferredTime)) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredTime"],
        message: "Ora aleasă a trecut deja pentru azi.",
      });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
export type SellerInput = z.infer<typeof sellerSchema>;
export type ViewingInput = z.infer<typeof viewingSchema>;

export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
