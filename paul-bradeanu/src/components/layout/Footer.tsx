import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 7.1a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92zM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.45-2.15 2.96V20h-3.37V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line-on-dark)] bg-[var(--bg-ink)]">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(37,140,255,0.03),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent"
        aria-hidden
      />

      <div className="container-shell relative grid gap-10 py-16 md:grid-cols-[1.25fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" aria-label="Paul Brădeanu, pagina principală" className="inline-flex">
            <Image
              src="/branding/logo-pb-mark.png?v3"
              alt=""
              width={56}
              height={56}
              className="footer-mark shrink-0 object-contain"
              unoptimized
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
            Dezvoltator software din Cluj-Napoca. Frontend, aplicații full stack
            și integrări AI.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-secondary)] transition hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
                aria-label={`GitHub @${siteConfig.githubHandle}`}
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-secondary)] transition hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
                aria-label={`LinkedIn ${siteConfig.linkedinHandle}`}
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-[var(--text-secondary)] transition hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <a
              href={siteConfig.cvUrl}
              download
              className="inline-flex h-9 w-fit items-center gap-2 rounded-full px-1 text-sm text-[var(--accent-hover)] transition hover:text-[var(--text-primary)]"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigare</p>
          <ul className="space-y-2.5 text-[15px] text-[var(--text-secondary)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--text-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-[var(--text-primary)]">
                Confidențialitate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Proiecte</p>
          <ul className="space-y-2.5 text-[15px] text-[var(--text-secondary)]">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-[var(--text-primary)]"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Conectare</p>
          <ul className="space-y-3 text-[15px] text-[var(--text-secondary)]">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
              >
                <Mail className="h-4 w-4 text-[var(--accent-hover)]" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
              >
                <Phone className="h-4 w-4 text-[var(--accent-hover)]" />
                {siteConfig.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--accent-hover)]" />
              Cluj-Napoca, România
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
              >
                <GitHubIcon className="h-4 w-4 text-[var(--accent-hover)]" />
                @{siteConfig.githubHandle}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
              >
                <LinkedInIcon className="h-4 w-4 text-[var(--accent-hover)]" />
                /in/{siteConfig.linkedinHandle}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.cvUrl}
                download
                className="inline-flex items-center gap-2 font-medium text-[var(--accent-hover)] hover:text-[var(--text-primary)]"
              >
                <Download className="h-4 w-4" />
                Descarcă CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-shell relative flex flex-col gap-3 border-t border-[var(--line-on-dark)] py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {siteConfig.name} · Cluj-Napoca</p>
        <a
          href="#main-content"
          className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
        >
          Înapoi sus
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
