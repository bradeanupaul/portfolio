"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { placeOrder } from "@/actions/checkout";
import { buttonClass, Container } from "@/components/chrome";
import { useStoresReady } from "@/components/use-stores-ready";
import { getProduct } from "@/lib/catalog";
import { formatPrice, shippingFor, shippingMessage } from "@/lib/money";
import {
  checkoutDetailsSchema,
  paymentLabels,
  paymentMethods,
  type CheckoutDetails,
} from "@/lib/validators";
import { useCartStore } from "@/store/cart-store";

const fields: { name: keyof CheckoutDetails; label: string; autoComplete?: string }[] = [
  { name: "fullName", label: "Nume complet", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email" },
  { name: "phone", label: "Telefon", autoComplete: "tel" },
  { name: "county", label: "Județ", autoComplete: "address-level1" },
  { name: "city", label: "Oraș", autoComplete: "address-level2" },
  { name: "address", label: "Adresă", autoComplete: "street-address" },
  { name: "postalCode", label: "Cod poștal", autoComplete: "postal-code" },
];

export function CheckoutForm() {
  const ready = useStoresReady();
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const [formError, setFormError] = useState("");
  const form = useForm<CheckoutDetails>({
    resolver: zodResolver(checkoutDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      county: "",
      city: "",
      address: "",
      postalCode: "",
      notes: "",
      payment: "ramburs",
    },
  });

  const lines = items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = shippingFor(subtotal);

  async function onSubmit(values: CheckoutDetails) {
    setFormError("");
    const result = await placeOrder({
      ...values,
      items: lines.map((line) => ({ slug: line.product.slug, quantity: line.quantity })),
    });
    if (!result.ok) {
      setFormError(result.message);
      if (result.fields) {
        for (const [key, message] of Object.entries(result.fields)) {
          if (key in values) form.setError(key as keyof CheckoutDetails, { message });
        }
      }
      return;
    }
    clear();
    router.push(`/comanda/confirmare?cod=${result.code}`);
  }

  if (!ready) {
    return (
      <Container className="py-20">
        <p className="text-ink">Se pregătește comanda.</p>
      </Container>
    );
  }

  if (lines.length === 0) {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Nu ai ce comanda încă.</h1>
        <Link href="/magazin" className={buttonClass("solid", "mt-8")}>
          Alege produse
        </Link>
      </Container>
    );
  }

  return (
    <Container className="grid gap-12 py-12 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <h1 className="text-5xl">Comandă</h1>
          <p className="mt-3 max-w-lg text-ink">
            Nu cerem date de card. Plata aleasă este ilustrativă: ramburs sau transfer.
          </p>
        </div>
        {fields.map((field) => (
          <label key={field.name} className="block text-sm">
            <span className="font-semibold">{field.label}</span>
            <input
              {...form.register(field.name)}
              autoComplete={field.autoComplete}
              className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 outline-none focus:border-lilac"
            />
            {form.formState.errors[field.name]?.message ? (
              <span className="mt-1 block text-danger" role="alert">
                {form.formState.errors[field.name]?.message}
              </span>
            ) : null}
          </label>
        ))}
        <label className="block text-sm">
          <span className="font-semibold">Observații</span>
          <textarea
            {...form.register("notes")}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-lilac"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold">Metodă de plată</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4"
              >
                <input type="radio" value={method} {...form.register("payment")} />
                <span>{paymentLabels[method]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {formError ? (
          <p className="text-sm text-danger" role="alert">
            {formError}
          </p>
        ) : null}
        <button className={buttonClass("solid")} disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Se salvează" : "Plasează comanda"}
        </button>
      </form>
      <aside className="h-fit rounded-[1.6rem] bg-white p-6 border border-line">
        <h2 className="text-3xl">În colet</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {lines.map((line) => (
            <li key={line.product.slug} className="flex justify-between gap-4">
              <span>
                {line.product.name}, {line.quantity} buc.
              </span>
              <span>{formatPrice(line.product.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink">Transport</dt>
            <dd>{shipping === 0 ? "Gratuit" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-ink">{shippingMessage(subtotal)}</p>
      </aside>
    </Container>
  );
}
