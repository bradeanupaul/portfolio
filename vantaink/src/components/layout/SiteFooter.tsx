import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { footerGroups, legalLinks } from "@/data/navigation";
import { site } from "@/data/site";

const COPYRIGHT_YEAR = 2026;

const COLUMN_LABELS = ["Studio", "Explorează", "Informații"] as const;

const DEMO_DISCLOSURE =
  "Proiect demonstrativ de portofoliu. Studioul, artiștii și programările sunt fictive.";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface text-text">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-display text-2xl leading-tight tracking-wide md:text-3xl">
            Ai o idee? Hai să o desenăm.
          </p>
          <Button href="/programare" size="md" className="shrink-0">
            Programează o consultație
          </Button>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group, index) => (
            <nav
              key={group.title}
              aria-label={COLUMN_LABELS[index] ?? group.title}
            >
              <p className="font-mono-ui text-xs uppercase tracking-[0.12em] text-text-subtle">
                {COLUMN_LABELS[index] ?? group.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="no-underline transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.12em] text-text-subtle">
              Contact și program
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li>{site.hours.weekdays}</li>
              <li>{site.hours.saturday}</li>
              <li>{site.hours.sunday}</li>
            </ul>
            <address className="mt-4 space-y-2 text-sm not-italic text-text-muted">
              <p>{site.locale.city}, {site.locale.region}</p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="underline decoration-line underline-offset-4 hover:text-accent"
                >
                  {site.contact.email}
                </a>
                {site.contact.isDemo ? (
                  <span className="ml-1 text-xs text-text-subtle">(demo)</span>
                ) : null}
              </p>
              <p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="underline decoration-line underline-offset-4 hover:text-accent"
                >
                  {site.contact.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <h2 className="sr-only">Rețele sociale demonstrative</h2>
        <ul className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
          <li>
            <a
              href={site.social.instagram}
              className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle underline decoration-line underline-offset-4 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram (demo)
            </a>
          </li>
          <li>
            <a
              href={site.social.behance}
              className="font-mono-ui text-xs uppercase tracking-widest text-text-subtle underline decoration-line underline-offset-4 hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance (demo)
            </a>
          </li>
        </ul>
      </Container>

      <div className="border-t border-line bg-bg">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between">
          <Logo variant="footer" />
          <div className="space-y-3 md:max-w-xl md:text-right">
            <p className="font-mono-ui text-xs text-text-subtle">
              © {COPYRIGHT_YEAR} {site.brandName}
            </p>
            <p className="text-xs leading-relaxed text-text-subtle">
              {DEMO_DISCLOSURE}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:justify-end">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-subtle underline decoration-line underline-offset-4 hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}