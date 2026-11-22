"use server";

import { prisma } from "@/lib/prisma";
import { orderLookupSchema } from "@/lib/validators";

export type FoundOrder = {
  code: string;
  fullName: string;
  city: string;
  total: number;
  payment: string;
  createdAt: string;
  items: { name: string; quantity: number; unitPrice: number }[];
};

export type LookupResult = { ok: true; order: FoundOrder } | { ok: false; message: string };

export async function findOrder(input: unknown): Promise<LookupResult> {
  const parsed = orderLookupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Verifică datele." };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { code: parsed.data.code.toUpperCase() },
      include: { items: true },
    });
    if (!order || order.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
      return { ok: false, message: "Nu am găsit o comandă cu aceste date." };
    }
    return {
      ok: true,
      order: {
        code: order.code,
        fullName: order.fullName,
        city: order.city,
        total: order.total,
        payment: order.payment,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    };
  } catch {
    return { ok: false, message: "Căutarea nu a putut continua. Încearcă din nou." };
  }
}
