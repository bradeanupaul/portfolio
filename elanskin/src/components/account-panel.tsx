"use client";

import { useState } from "react";
import { findOrder, type FoundOrder } from "@/actions/orders";
import { buttonClass } from "@/components/chrome";
import { useStoresReady } from "@/components/use-stores-ready";
import { skinFeels, type SkinFeel } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { paymentLabels } from "@/lib/validators";
import { useProfileStore } from "@/store/profile-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function AccountPanel() {
  const ready = useStoresReady();
  const profile = useProfileStore();
  const wishes = useWishlistStore((state) => state.slugs.length);
  const [saved, setSaved] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");
  const [order, setOrder] = useState<FoundOrder | null>(null);

  if (!ready) {
    return <p className="text-ink">Se deschide contul demonstrativ.</p>;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-[1.6rem] border border-line bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          profile.setProfile({
            fullName: profile.fullName,
            email: profile.email,
            feel: profile.feel,
          });
          setSaved(true);
        }}
      >
        <h2 className="text-3xl">Preferințe în browser</h2>
        <p className="text-sm leading-6 text-ink">
          Nu există parolă și nu există un cont real. Numele, emailul și felul tenului rămân doar pe acest dispozitiv și pot precompleta rutina.
        </p>
        <label className="block text-sm">
          Nume
          <input
            value={profile.fullName}
            onChange={(event) => profile.setProfile({ fullName: event.target.value })}
            className="mt-2 h-12 w-full rounded-2xl border border-line px-4"
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            value={profile.email}
            onChange={(event) => profile.setProfile({ email: event.target.value })}
            className="mt-2 h-12 w-full rounded-2xl border border-line px-4"
          />
        </label>
        <label className="block text-sm">
          Ten
          <select
            value={profile.feel}
            onChange={(event) => profile.setProfile({ feel: event.target.value as SkinFeel | "" })}
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4"
          >
            <option value="">Aleg mai târziu</option>
            {skinFeels.map((feel) => (
              <option key={feel.id} value={feel.id}>
                {feel.label}
              </option>
            ))}
          </select>
        </label>
        <button className={buttonClass("solid")} type="submit">
          Salvează în browser
        </button>
        <p className="text-sm text-ink">
          {saved ? "Preferințele au rămas în acest browser." : `Favorite salvate: ${wishes}.`}
        </p>
      </form>
      <form
        className="space-y-4 rounded-[1.6rem] border border-line bg-white p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await findOrder({ code, email });
          if (!result.ok) {
            setOrder(null);
            setLookupMessage(result.message);
            return;
          }
          setLookupMessage("");
          setOrder(result.order);
        }}
      >
        <h2 className="text-3xl">Găsește o comandă</h2>
        <p className="text-sm leading-6 text-ink">
          Codul vine din confirmare. Căutarea compară emailul folosit la comandă.
        </p>
        <label className="block text-sm">
          Cod
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line px-4"
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line px-4"
          />
        </label>
        <button className={buttonClass("line")} type="submit">
          Caută
        </button>
        {lookupMessage ? <p className="text-sm text-danger">{lookupMessage}</p> : null}
        {order ? (
          <div className="rounded-2xl bg-pearl p-4 text-sm">
            <p className="font-semibold">{order.code}</p>
            <p className="text-ink">
              {order.fullName}, {order.city}
            </p>
            <ul className="mt-3 space-y-1">
              {order.items.map((item) => (
                <li key={item.name}>
                  {item.name}, {item.quantity} buc., {formatPrice(item.unitPrice)}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Total {formatPrice(order.total)}.{" "}
              {order.payment === "ramburs" || order.payment === "transfer"
                ? paymentLabels[order.payment]
                : order.payment}
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
