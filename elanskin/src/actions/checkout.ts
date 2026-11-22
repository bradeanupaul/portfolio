"use server";

import { randomBytes } from "node:crypto";
import { getProduct } from "@/lib/catalog";
import { shippingFor } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { checkoutPayloadSchema } from "@/lib/validators";

export type CheckoutResult =
  | { ok: true; code: string }
  | { ok: false; message: string; fields?: Record<string, string> };

function fieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export async function placeOrder(input: unknown): Promise<CheckoutResult> {
  const parsed = checkoutPayloadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Verifică câmpurile marcate.",
      fields: fieldErrors(parsed.error),
    };
  }

  const lines = [];
  for (const item of parsed.data.items) {
    const product = getProduct(item.slug);
    if (!product) {
      return { ok: false, message: "Un produs din coș nu mai este disponibil." };
    }
    lines.push({ product, quantity: item.quantity });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const code = `ELN${randomBytes(4).toString("hex").toUpperCase()}`;

  try {
    await prisma.order.create({
      data: {
        code,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        county: parsed.data.county,
        city: parsed.data.city,
        address: parsed.data.address,
        postalCode: parsed.data.postalCode,
        notes: parsed.data.notes,
        payment: parsed.data.payment,
        subtotal,
        shipping,
        total,
        items: {
          create: lines.map((line) => ({
            slug: line.product.slug,
            name: line.product.name,
            quantity: line.quantity,
            unitPrice: line.product.price,
          })),
        },
      },
    });
  } catch {
    return { ok: false, message: "Comanda nu a putut fi salvată. Încearcă din nou." };
  }

  return { ok: true, code };
}
