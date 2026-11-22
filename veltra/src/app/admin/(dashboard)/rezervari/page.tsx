import { ReservationCancelButton } from "@/components/admin/ReservationCancelButton";
import { prisma } from "@/lib/db/client";
import { formatDateRo, formatRon } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  CONFIRMED_DEMO: "Confirmată demo",
  PENDING: "În așteptare",
  CANCELLED: "Anulată",
};

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      guest: true,
      roomUnit: { include: { roomType: true } },
    },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-pine">Rezervări</h1>
        <p className="mt-2 text-sm text-ink/70">Listă demonstrativă. Poți anula rezervările simulate.</p>
      </header>
      <div className="overflow-x-auto rounded-xl border border-stone/50 bg-mist">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone/40 bg-stone/20 text-xs uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Referință</th>
              <th className="px-4 py-3">Cameră</th>
              <th className="px-4 py-3">Perioadă</th>
              <th className="px-4 py-3">Oaspete</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Stare</th>
              <th className="px-4 py-3 text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink/55">
                  Nu există rezervări încă.
                </td>
              </tr>
            ) : (
              reservations.map((row) => {
                const cancellable = row.status === "CONFIRMED_DEMO" || row.status === "PENDING";
                return (
                  <tr key={row.id} className="border-b border-stone/30 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{row.reference}</td>
                    <td className="px-4 py-3">{row.roomUnit.roomType.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDateRo(row.checkIn)} până la {formatDateRo(row.checkOut)}
                    </td>
                    <td className="px-4 py-3">
                      {row.guest ? `${row.guest.firstName} ${row.guest.lastName}` : "Nedefinit"}
                    </td>
                    <td className="px-4 py-3">{formatRon(row.totalBan)}</td>
                    <td className="px-4 py-3">{STATUS_LABEL[row.status] ?? row.status}</td>
                    <td className="px-4 py-3 text-right">
                      <ReservationCancelButton reservationId={row.id} disabled={!cancellable} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}