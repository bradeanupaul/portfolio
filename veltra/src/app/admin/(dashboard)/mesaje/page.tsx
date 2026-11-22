import { prisma } from "@/lib/db/client";
import { formatDateRo } from "@/lib/utils";

function formatCreated(date: Date) {
  return formatDateRo(
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
  );
}

export default async function AdminMessagesPage() {
  const [contacts, experiences] = await Promise.all([
    prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.experienceInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { experience: { select: { name: true } } },
    }),
  ]);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl text-pine">Mesaje</h1>
        <p className="mt-2 text-sm text-ink/70">Formulare de contact și cereri pentru experiențe.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-pine">Contact general</h2>
        <div className="overflow-x-auto rounded-xl border border-stone/50 bg-mist">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone/40 bg-stone/20 text-xs uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nume</th>
                <th className="px-4 py-3">Subiect</th>
                <th className="px-4 py-3">Stare</th>
                <th className="px-4 py-3">Mesaj</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink/55">
                    Niciun mesaj.
                  </td>
                </tr>
              ) : (
                contacts.map((row) => (
                  <tr key={row.id} className="border-b border-stone/30 align-top last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">{formatCreated(row.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div>{row.name}</div>
                      <div className="text-xs text-ink/55">{row.email}</div>
                    </td>
                    <td className="px-4 py-3">{row.subject}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3 max-w-xs text-ink/75">{row.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-pine">Experiențe</h2>
        <div className="overflow-x-auto rounded-xl border border-stone/50 bg-mist">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone/40 bg-stone/20 text-xs uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nume</th>
                <th className="px-4 py-3">Experiență</th>
                <th className="px-4 py-3">Stare</th>
                <th className="px-4 py-3">Mesaj</th>
              </tr>
            </thead>
            <tbody>
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink/55">
                    Nicio cerere.
                  </td>
                </tr>
              ) : (
                experiences.map((row) => (
                  <tr key={row.id} className="border-b border-stone/30 align-top last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">{formatCreated(row.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div>{row.name}</div>
                      <div className="text-xs text-ink/55">{row.email}</div>
                    </td>
                    <td className="px-4 py-3">{row.experience?.name ?? "General"}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3 max-w-xs text-ink/75">{row.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}