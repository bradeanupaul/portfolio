"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatReservationDate, formatReservationDateTime } from "@/lib/reservations";
import { parse } from "date-fns";

export type ReservationSuccess = {
  reference: string;
  cancelToken: string;
  name: string;
  date: string;
  time: string;
  partySize: number;
};

type ReservationConfirmationProps = {
  data: ReservationSuccess;
  onNewReservation: () => void;
};

export function ReservationConfirmation({ data, onNewReservation }: ReservationConfirmationProps) {
  const date = parse(data.date, "yyyy-MM-dd", new Date());
  const cancelHref = `/rezervari/anulare?ref=${encodeURIComponent(data.reference)}&token=${encodeURIComponent(data.cancelToken)}`;

  return (
    <div className="rounded-sm border border-bn-gold/40 bg-bn-bg-surface p-8 sm:p-10">
      <CheckCircle2 className="size-10 text-bn-gold" strokeWidth={1.25} aria-hidden />
      <h2 className="mt-4 font-display text-3xl text-bn-text">Rezervare demonstrativă înregistrată.</h2>
      <p className="mt-3 text-sm text-bn-text-muted">
        Nu s-a trimis email de confirmare. Datele sunt salvate local în baza demonstrativă a
        portofoliului.
      </p>

      <dl className="mt-8 space-y-3 text-sm">
        <Row label="Referință" value={data.reference} mono />
        <Row label="Nume" value={data.name} />
        <Row
          label="Data și ora"
          value={formatReservationDateTime(date, data.time)}
        />
        <Row label="Persoane" value={String(data.partySize)} />
        <Row label="Data (ISO)" value={formatReservationDate(date)} />
      </dl>

      <div className="mt-8 rounded-sm border border-bn-border bg-bn-bg-elevated p-4 text-sm text-bn-text-muted">
        <p className="font-medium text-bn-text">Anulare securizată</p>
        <p className="mt-2">
          Păstrați referința și linkul de mai jos. Anularea necesită token-ul unic. Nu este
          afișat public pe site.
        </p>
        <Link
          href={cancelHref}
          className="mt-3 inline-block break-all font-mono text-xs text-bn-gold hover:underline"
        >
          {cancelHref}
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="button" onClick={onNewReservation} variant="secondary">
          Rezervare nouă
        </Button>
        <Button href="/meniu" showArrow>
          Vezi meniul
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-bn-text-dim">{label}</dt>
      <dd className={mono ? "font-mono text-bn-gold-light" : "text-bn-text"}>{value}</dd>
    </div>
  );
}