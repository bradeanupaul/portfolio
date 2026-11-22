import { prisma } from "@/lib/db/client";
import { formatRon } from "@/lib/utils";

export default async function AdminRoomsPage() {
  const roomTypes = await prisma.roomType.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { units: true } },
      units: { where: { active: true } },
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-pine">Camere</h1>
        <p className="mt-2 text-sm text-ink/70">Prezentare inventar demonstrativ pe tipuri de camere.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {roomTypes.map((room) => (
          <article key={room.id} className="rounded-xl border border-stone/50 bg-mist p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-pine">{room.name}</h2>
                <p className="text-xs text-ink/50">{room.slug}</p>
              </div>
              <span className="rounded-full bg-pine/10 px-2 py-0.5 text-xs text-pine">
                {room._count.units} unități
              </span>
            </div>
            {room.featured && (
              <p className="mt-2 text-xs font-medium text-clay uppercase tracking-wide">Recomandată</p>
            )}
            <p className="mt-2 text-sm text-ink/70">
              Capacitate {room.capacityMin} până la {room.capacityMax} oaspeți · {room.viewType}
            </p>
            <p className="mt-1 text-sm font-medium text-pine">
              Tarif de bază {formatRon(room.basePriceBan)} / noapte
            </p>
            <p className="mt-3 text-xs text-ink/55">
              Unități active: {room.units.map((u) => u.label).join(", ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}