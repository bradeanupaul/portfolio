import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/chrome";

const columns = [
  {
    title: "Magazin",
    links: [
      ["Toate produsele", "/magazin"],
      ["Colecții", "/colectii"],
      ["Ingrediente", "/ingrediente"],
      ["Rutina mea", "/rutina-mea"],
    ],
  },
  {
    title: "Atelier",
    links: [
      ["Despre noi", "/despre-noi"],
      ["Jurnal", "/jurnal"],
      ["Contact", "/contact"],
      ["Cont", "/cont"],
    ],
  },
  {
    title: "Ajutor",
    links: [
      ["Întrebări frecvente", "/intrebari-frecvente"],
      ["Livrare și retur", "/livrare-si-retur"],
      ["Confidențialitate", "/politica-de-confidentialitate"],
      ["Termeni", "/termeni-si-conditii"],
      ["Cookie", "/politica-cookies"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-midnight text-white">
      <Container className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="ÉLAN SKIN, pagina principală" className="inline-flex">
            <BrandLogo variant="light" size="footer" alt="ÉLAN SKIN" />
          </Link>
          <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-white/95">
            Îngrijire clară, texturi alese, un raft pe care îl ții aproape.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
            Demonstrație fictivă de portofoliu. Brandul, formulele și comenzile nu aparțin unei
            afaceri reale. Textele nu sunt sfaturi medicale.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-white/50">© 2026 ÉLAN SKIN. Demonstrație fictivă de portofoliu.</p>
        <p className="text-xs text-white/45">Fără plăți reale. Fără colet. Fără emailuri trimise.</p>
      </Container>
    </footer>
  );
}
