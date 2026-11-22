import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { formatRon } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [reservationCount, activeReservations, contactCount, experienceCount, roomTypeCount] =
    await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({
        where: { status: { in: ["PENDING", "CONFIRMED_DEMO"] } },
      }),
      prisma.contactInquiry.count({ where: { status: "NEW" } }),
      prisma.experienceInquiry.count({ where: { status: "NEW" } }),
      prisma.roomType.count(),
    ]);

  const revenue = await prisma.reservation.aggregate({
    _sum: { totalBan: true },
    where: { status: { in: ["PENDING", "CONFIRMED_DEMO"] } },
  });

  const cards = [
    {
      label: "Rezervări active",
      value: String(activeReservations),
      hint: `${reservationCount} total înregistrate`,
      href: "/admin/rezervari",
    },
    {
      label: "Mesaje contact noi",
      value: String(contactCount),
      hint: "Întrebări din formular",
      href: "/admin/mesaje",
    },
    {
      label: "Cereri experiențe noi",
      value: String(experienceCount),
      hint: "Lead-uri demonstrative",
      href: "/admin/mesaje",
    },
    {
      label: "Tipuri de camere",
      value: String(roomTypeCount),
      hint: "Catalog cazare",
      href: "/admin/camere",
    },
    {
      label: "Valoare demo activă",
      value: formatRon(revenue._sum.totalBan ?? 0),
      hint: "Sume simulate, fără plată",
      href: "/admin/rezervari",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-pine">Prezentare generală</h1>
        <p className="mt-2 text-sm text-ink/70">
          Monitorizare demonstrativă pentru rezervări, mesaje și inventar camere.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-stone/50 bg-mist p-5 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-semibold tracking-wide text-clay uppercase">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-pine">{card.value}</p>
            <p className="mt-1 text-sm text-ink/60">{card.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}