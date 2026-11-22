"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toIsoDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  tone?: "light" | "dark";
};

export function CompactBookingWidget({ tone = "dark" }: Props) {
  const router = useRouter();
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);
  const dayAfter = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  }, []);

  const [checkIn, setCheckIn] = useState(toIsoDate(tomorrow));
  const [checkOut, setCheckOut] = useState(toIsoDate(dayAfter));
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const labelClass =
    tone === "light"
      ? "mb-1.5 block text-sm font-medium text-ink/70"
      : "mb-1 block text-xs font-semibold tracking-wide text-stone uppercase";
  const inputClass =
    tone === "light"
      ? "input-field min-h-11 bg-ivory text-ink"
      : "input-field bg-mist/95";

  return (
    <form
      className={cn(
        "grid gap-4 text-left md:grid-cols-[1.1fr_1.1fr_0.75fr_auto] md:items-end",
        tone === "dark" && "rounded-2xl bg-ivory/10 p-4 backdrop-blur-md",
      )}
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        if (checkOut <= checkIn) {
          setError("Data de check-out trebuie să fie după check-in.");
          return;
        }
        const today = toIsoDate(new Date());
        if (checkIn < today) {
          setError("Check-in nu poate fi în trecut.");
          return;
        }
        if (guests < 1 || guests > 8) {
          setError("Alege între 1 și 8 oaspeți.");
          return;
        }
        const params = new URLSearchParams({
          checkIn,
          checkOut,
          guests: String(guests),
        });
        router.push(`/rezervari?${params.toString()}`);
      }}
    >
      <label className="block">
        <span className={labelClass}>Sosire</span>
        <input
          type="date"
          required
          value={checkIn}
          min={toIsoDate(new Date())}
          onChange={(e) => setCheckIn(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Plecare</span>
        <input
          type="date"
          required
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Oaspeți</span>
        <input
          type="number"
          min={1}
          max={8}
          required
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inputClass}
        />
      </label>
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className={cn(
            "btn min-h-11 w-full md:min-w-[12rem]",
            tone === "light" ? "btn-pine" : "btn-primary",
          )}
        >
          Verifică disponibilitatea
        </button>
      </div>
      {error ? (
        <p className="md:col-span-4 text-sm text-clay" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
