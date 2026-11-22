"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReservationCancelButton({
  reservationId,
  disabled,
}: {
  reservationId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cancel() {
    if (disabled || loading) return;
    if (!window.confirm("Anulezi această rezervare demonstrativă?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/reservations/${reservationId}`, { method: "PATCH" });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Anularea a eșuat.");
        return;
      }
      router.refresh();
    } catch {
      setError("Eroare de rețea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void cancel()}
        disabled={disabled || loading}
        className="text-sm font-medium text-clay hover:text-pine disabled:opacity-40"
      >
        {loading ? "..." : "Anulează"}
      </button>
      {error && <span className="text-xs text-clay">{error}</span>}
    </div>
  );
}