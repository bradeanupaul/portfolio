"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatDateRo, formatRon, toIsoDate } from "@/lib/utils";

type RoomResult = {
  id: string;
  slug: string;
  name: string;
  description: string;
  capacityMax: number;
  areaSqm: number;
  image: string;
  available: boolean;
  pricing: {
    nights: number;
    basePerNightBan: number;
    subtotalBan: number;
    totalBan: number;
  };
};

type Step = 1 | 2 | 3 | 4 | 5;

export function BookingWizard() {
  const params = useSearchParams();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const later = new Date();
  later.setDate(later.getDate() + 3);

  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState(params.get("checkIn") || toIsoDate(tomorrow));
  const [checkOut, setCheckOut] = useState(params.get("checkOut") || toIsoDate(later));
  const [guestCount, setGuestCount] = useState(Number(params.get("guests") || 2));
  const [rooms, setRooms] = useState<RoomResult[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    roomName: string;
    totalBan: number;
  } | null>(null);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId],
  );

  async function searchRooms() {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({
        checkIn,
        checkOut,
        guests: String(guestCount),
      });
      const res = await fetch(`/api/availability?${q}`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Căutarea nu a reușit.");
        return;
      }
      setRooms(data.rooms);
      const preferred = params.get("room");
      if (preferred) {
        const match = data.rooms.find((r: RoomResult) => r.slug === preferred);
        if (match) setSelectedRoomId(match.id);
      }
      setStep(2);
    } catch {
      setError("A apărut o eroare la verificarea disponibilității.");
    } finally {
      setLoading(false);
    }
  }

  async function submitReservation() {
    if (!selectedRoom) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guestCount,
          roomTypeId: selectedRoom.id,
          ...guest,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Rezervarea nu a putut fi creată.");
        return;
      }
      setConfirmation({
        reference: data.reservation.reference,
        roomName: data.reservation.roomName,
        totalBan: data.reservation.totalBan,
      });
      setStep(5);
    } catch {
      setError("A apărut o eroare la salvarea rezervării demonstrative.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[1.5rem] bg-mist p-6 md:p-8">
      <ol className="mb-8 flex flex-wrap gap-2 text-xs font-semibold tracking-wide text-moss uppercase">
        {["Date", "Camere", "Date oaspete", "Confirmare", "Final"].map((label, i) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 ${step === i + 1 ? "bg-pine text-ivory" : "bg-stone/40"}`}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      {error ? (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#9b3b2e]" role="alert">
          {error}
        </p>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="label-field">Check-in</span>
            <input type="date" className="input-field" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </label>
          <label>
            <span className="label-field">Check-out</span>
            <input type="date" className="input-field" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </label>
          <label>
            <span className="label-field">Număr oaspeți</span>
            <input
              type="number"
              min={1}
              max={8}
              className="input-field"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
            />
          </label>
          <div className="md:col-span-3">
            <Button type="button" variant="pine" disabled={loading} onClick={searchRooms}>
              {loading ? "Se caută…" : "Vezi camerele disponibile"}
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          {rooms.length === 0 ? (
            <p>Nu există camere pentru criteriile selectate.</p>
          ) : (
            rooms.map((room) => (
              <label
                key={room.id}
                className={`flex cursor-pointer flex-col gap-4 rounded-2xl border p-4 md:flex-row ${
                  selectedRoomId === room.id ? "border-clay bg-ivory" : "border-stone/60 bg-ivory/60"
                } ${!room.available ? "opacity-55" : ""}`}
              >
                <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-32 md:w-44">
                  <Image src={room.image} alt={room.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="room"
                      disabled={!room.available}
                      checked={selectedRoomId === room.id}
                      onChange={() => setSelectedRoomId(room.id)}
                      className="mt-1"
                    />
                    <div>
                      <h3 className="font-serif text-2xl text-pine">{room.name}</h3>
                      <p className="mt-1 text-sm text-ink/70">{room.description}</p>
                      <p className="mt-2 text-sm text-ink/60">
                        {room.areaSqm} m² · max. {room.capacityMax} oaspeți · {room.pricing.nights} nopți
                      </p>
                      <p className="mt-2 font-semibold text-pine">
                        {room.available ? formatRon(room.pricing.totalBan) : "Indisponibilă"}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            ))
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="ghost-dark" onClick={() => setStep(1)}>
              Înapoi
            </Button>
            <Button
              type="button"
              variant="pine"
              disabled={!selectedRoom || !selectedRoom.available}
              onClick={() => setStep(3)}
            >
              Continuă
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["firstName", "Prenume"],
              ["lastName", "Nume"],
              ["email", "Email"],
              ["phone", "Telefon"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <span className="label-field">{label}</span>
              <input
                className="input-field"
                value={guest[key]}
                onChange={(e) => setGuest((g) => ({ ...g, [key]: e.target.value }))}
                required
              />
            </label>
          ))}
          <label className="md:col-span-2">
            <span className="label-field">Cerințe speciale (opțional)</span>
            <textarea
              className="input-field min-h-[6rem]"
              value={guest.specialRequests}
              onChange={(e) => setGuest((g) => ({ ...g, specialRequests: e.target.value }))}
            />
          </label>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <Button type="button" variant="ghost-dark" onClick={() => setStep(2)}>
              Înapoi
            </Button>
            <Button
              type="button"
              variant="pine"
              onClick={() => {
                if (!guest.firstName || !guest.lastName || !guest.email || !guest.phone) {
                  setError("Completează toate câmpurile obligatorii.");
                  return;
                }
                setError(null);
                setStep(4);
              }}
            >
              Revizuiește
            </Button>
          </div>
        </div>
      ) : null}

      {step === 4 && selectedRoom ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-ivory p-5">
            <h3 className="font-serif text-2xl text-pine">Sumar rezervare demonstrativă</h3>
            <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              <div>
                <dt className="text-ink/55">Cameră</dt>
                <dd className="font-semibold">{selectedRoom.name}</dd>
              </div>
              <div>
                <dt className="text-ink/55">Oaspete</dt>
                <dd className="font-semibold">
                  {guest.firstName} {guest.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-ink/55">Check-in</dt>
                <dd className="font-semibold">{formatDateRo(checkIn)}</dd>
              </div>
              <div>
                <dt className="text-ink/55">Check-out</dt>
                <dd className="font-semibold">{formatDateRo(checkOut)}</dd>
              </div>
              <div>
                <dt className="text-ink/55">Oaspeți</dt>
                <dd className="font-semibold">{guestCount}</dd>
              </div>
              <div>
                <dt className="text-ink/55">Total</dt>
                <dd className="font-semibold">{formatRon(selectedRoom.pricing.totalBan)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-ink/60">
              Aceasta este o rezervare demonstrativă. Nu se procesează plăți și nu se rezervă o cameră reală.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="ghost-dark" onClick={() => setStep(3)}>
              Înapoi
            </Button>
            <Button type="button" variant="primary" disabled={loading} onClick={submitReservation}>
              {loading ? "Se confirmă…" : "Confirmă rezervarea demonstrativă"}
            </Button>
          </div>
        </div>
      ) : null}

      {step === 5 && confirmation ? (
        <div className="rounded-2xl bg-ivory p-6 text-center">
          <p className="eyebrow">Confirmare</p>
          <h3 className="mt-3 font-serif text-3xl text-pine">
            Rezervarea demonstrativă a fost înregistrată cu succes.
          </h3>
          <p className="mt-4 text-ink/70">
            Referință: <strong>{confirmation.reference}</strong>
          </p>
          <p className="mt-2 text-ink/70">
            {confirmation.roomName} · {formatRon(confirmation.totalBan)}
          </p>
          <Button href="/" variant="pine" className="mt-8">
            Înapoi la pagina principală
          </Button>
        </div>
      ) : null}
    </div>
  );
}
