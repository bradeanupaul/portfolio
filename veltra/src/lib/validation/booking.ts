import { z } from "zod";
import { toIsoDate } from "@/lib/utils";

const todayIso = () => toIsoDate(new Date());

export const dateSelectionSchema = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data de check-in este invalidă."),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data de check-out este invalidă."),
    guestCount: z.coerce.number().int().min(1, "Selectează cel puțin un oaspete.").max(8, "Maximum 8 oaspeți."),
  })
  .superRefine((data, ctx) => {
    if (data.checkIn < todayIso()) {
      ctx.addIssue({
        code: "custom",
        path: ["checkIn"],
        message: "Check-in nu poate fi în trecut.",
      });
    }
    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        path: ["checkOut"],
        message: "Check-out trebuie să fie după check-in.",
      });
    }
  });

export const guestInfoSchema = z.object({
  firstName: z.string().trim().min(2, "Prenumele este obligatoriu.").max(80),
  lastName: z.string().trim().min(2, "Numele este obligatoriu.").max(80),
  email: z.string().trim().email("Adresa de email este invalidă.").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Numărul de telefon este prea scurt.")
    .max(30, "Numărul de telefon este prea lung."),
  specialRequests: z.string().trim().max(1000).optional(),
});

export const createReservationSchema = dateSelectionSchema.and(
  guestInfoSchema.extend({
    roomTypeId: z.string().min(1, "Selectează o cameră."),
  }),
);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Numele este obligatoriu.").max(100),
  email: z.string().trim().email("Adresa de email este invalidă.").max(120),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, "Subiectul este obligatoriu.").max(120),
  message: z.string().trim().min(10, "Mesajul este prea scurt.").max(2000),
});

export const experienceInquirySchema = z.object({
  experienceId: z.string().optional(),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(30).optional(),
  preferredDate: z.string().optional(),
  message: z.string().trim().min(10).max(2000),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});
