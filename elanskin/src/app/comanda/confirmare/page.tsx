import Link from "next/link";
import { Suspense } from "react";
import { buttonClass, Container } from "@/components/chrome";
import { formatPrice } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { pageMeta } from "@/lib/seo";
import { paymentLabels } from "@/lib/validators";

export const metadata = pageMeta(
  "Confirmare",
  "Confirmarea unei comenzi demonstrative ÉLAN SKIN. Nu se trimite niciun colet.",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <Container className="py-20">
          <p className="text-ink">Se pregătește confirmarea.</p>
        </Container>
      }
    >
      <Confirmation searchParams={searchParams} />
    </Suspense>
  );
}

async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const code = typeof params.cod === "string" ? params.cod.toUpperCase() : "";

  if (!code) {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Lipsește codul comenzii.</h1>
        <Link href="/magazin" className={buttonClass("solid", "mt-8")}>
          Înapoi în magazin
        </Link>
      </Container>
    );
  }

  let order: {
    code: string;
    fullName: string;
    email: string;
    phone: string;
    county: string;
    city: string;
    address: string;
    postalCode: string;
    notes: string;
    payment: string;
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: Date;
    items: { id: string; name: string; quantity: number; unitPrice: number }[];
  } | null = null;

  try {
    order = await prisma.order.findUnique({ where: { code }, include: { items: true } });
  } catch {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Comanda nu a putut fi citită.</h1>
        <p className="mt-4 text-ink">Verifică baza locală, apoi încearcă din nou.</p>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Nu găsim acest cod.</h1>
        <p className="mt-4 text-ink">Codul {code} nu este în baza demonstrativă.</p>
      </Container>
    );
  }

  const payment =
    order.payment === "ramburs" || order.payment === "transfer"
      ? paymentLabels[order.payment]
      : order.payment;
  const when = new Intl.DateTimeFormat("ro-RO", { dateStyle: "long" }).format(order.createdAt);

  return (
    <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-success">Comandă salvată</p>
      <h1 className="mt-4 text-5xl md:text-6xl">Mulțumim, {order.fullName}.</h1>
      <p className="mt-4 max-w-xl text-lg text-ink">
        Codul este {order.code}. Comanda a rămas în baza locală, la {when}. Nu pleacă niciun colet și nu se încasează nimic.
      </p>
      <div className="mt-10 max-w-xl rounded-[1.6rem] border border-line bg-white p-6">
        <p className="text-sm text-ink">
          {order.address}, {order.city}, {order.county}, {order.postalCode}
        </p>
        <p className="mt-2 text-sm text-ink">
          {order.email}, {order.phone}
        </p>
        <p className="mt-2 text-sm">{payment}</p>
        <ul className="mt-6 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.name}, {item.quantity} buc.
              </span>
              <span>{formatPrice(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink">Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink">Transport</dt>
            <dd>{order.shipping === 0 ? "Gratuit" : formatPrice(order.shipping)}</dd>
          </div>
          <div className="flex justify-between font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>
        {order.notes ? <p className="mt-4 text-sm text-ink">Observații: {order.notes}</p> : null}
        {order.payment === "transfer" ? (
          <p className="mt-4 text-sm text-ink">
            Un magazin real ar trimite datele de plată. Aici nu există un cont bancar.
          </p>
        ) : (
          <p className="mt-4 text-sm text-ink">
            Rambursul este doar o etichetă. Nimeni nu vine să încaseze.
          </p>
        )}
      </div>
      <Link href="/magazin" className={buttonClass("solid", "mt-8")}>
        Continuă prin magazin
      </Link>
    </Container>
  );
}
