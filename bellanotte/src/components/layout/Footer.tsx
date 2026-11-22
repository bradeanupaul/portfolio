import Link from "next/link";
import type { ReactNode } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { footerNavigation, mainNavigation } from "@/data/navigation";
import { restaurant } from "@/data/restaurant";
import { copyrightYear, formatPhoneDisplay, formatPhoneHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { OpeningHours } from "@/components/contact/OpeningHours";
import { Logo } from "@/components/layout/Logo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function Footer() {
  const year = copyrightYear;
  const mapsUrl =
    restaurant.social.googleMaps ??
    `https://maps.google.com/?q=${encodeURIComponent(restaurant.address.mapsQuery)}`;

  const primaryNav = mainNavigation.slice(0, 8);

  return (
    <footer className="mt-auto text-bn-text-muted">
      {/* Zone 1: brand + navigation */}
      <div className="border-t border-bn-border/50 bg-bn-bg-elevated">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="space-y-6 text-center lg:text-left">
              <Logo variant="footer" className="mx-auto max-w-full lg:mx-0" />
              <p className="mx-auto max-w-md text-base leading-relaxed text-[#CFC5B7] sm:text-[1.0625rem] lg:mx-0">
                {restaurant.shortDescription}
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-bn-gold">
                {restaurant.tagline}
              </p>
              <nav aria-label="Navigare footer">
                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-sm lg:justify-start">
                  {primaryNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-bn-text-muted transition-colors hover:text-bn-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {footerNavigation.map((section) => (
              <div key={section.title}>
                <h2 className="mb-5 font-display text-xl tracking-wide text-bn-heading sm:text-[1.35rem]">
                  {section.title}
                </h2>
                <ul className="space-y-3 text-base leading-relaxed">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[#CFC5B7] transition-colors hover:text-bn-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Zone 2: restaurant info */}
      <div className="bg-bn-bg">
        <Container className="py-12 sm:py-14 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <FooterBlock
              title="Adresă"
              icon={<MapPin className="size-4 text-bn-gold" aria-hidden />}
            >
              <p className="text-bn-text">{restaurant.address.street}</p>
              <p className="text-bn-text">
                {restaurant.address.postalCode} {restaurant.address.city}, {restaurant.address.country}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-bn-gold hover:text-bn-gold-light"
              >
                <MapPin className="size-3.5" aria-hidden />
                Deschide în Maps
              </a>
            </FooterBlock>

            <FooterBlock
              title="Contact"
              icon={<Phone className="size-4 text-bn-gold" aria-hidden />}
            >
              <p>
                <a
                  href={`tel:${formatPhoneHref(restaurant.contact.phoneHref)}`}
                  className="inline-flex items-center gap-2 text-bn-text hover:text-bn-gold"
                >
                  <Phone className="size-3.5 shrink-0 text-bn-gold" aria-hidden />
                  {formatPhoneDisplay(restaurant.contact.phone)}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${restaurant.contact.email}`}
                  className="inline-flex items-center gap-2 text-bn-text hover:text-bn-gold"
                >
                  <Mail className="size-3.5 shrink-0 text-bn-gold" aria-hidden />
                  {restaurant.contact.email}
                </a>
              </p>
              <p className="text-bn-text-dim">
                Rezervări:{" "}
                <a
                  href={`mailto:${restaurant.contact.reservationsEmail}`}
                  className="text-bn-text hover:text-bn-gold"
                >
                  {restaurant.contact.reservationsEmail}
                </a>
              </p>
            </FooterBlock>

            <FooterBlock
              title="Program"
              icon={<Clock3 className="size-4 text-bn-gold" aria-hidden />}
            >
              <OpeningHours compact />
              <p className="mt-3 text-xs text-bn-text-dim">
                Ultima comandă cu circa 90 de minute înainte de închidere.
              </p>
            </FooterBlock>

            <FooterBlock title="Social">
              <div className="flex flex-wrap gap-3">
                {restaurant.social.instagram ? (
                  <a
                    href={restaurant.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-bn-border bg-bn-bg-elevated px-3.5 py-2.5 text-bn-text transition-colors hover:border-bn-gold hover:text-bn-gold"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram
                  </a>
                ) : null}
                {restaurant.social.facebook ? (
                  <a
                    href={restaurant.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-bn-border bg-bn-bg-elevated px-3.5 py-2.5 text-bn-text transition-colors hover:border-bn-gold hover:text-bn-gold"
                  >
                    <FacebookIcon className="size-4" />
                    Facebook
                  </a>
                ) : null}
              </div>
            </FooterBlock>
          </div>
        </Container>
      </div>

      {/* Zone 3: legal */}
      <div className="bg-[#070605]">
        <Container className="flex flex-col gap-5 py-7 text-sm sm:flex-row sm:items-start sm:justify-between sm:py-8">
          <div className="space-y-3">
            <p className="text-bn-text-muted">
              © {year} {restaurant.name}. Toate drepturile rezervate.
            </p>
            <p className="max-w-2xl text-xs leading-relaxed text-bn-text-dim">
              Site demonstrativ pentru portofoliu. Datele de contact, imaginile și recenziile sunt
              fictive. Nu reprezintă un restaurant real în funcțiune.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:justify-end sm:text-sm">
            <Link href="/politica-de-confidentialitate" className="text-bn-text-dim hover:text-bn-gold">
              Confidențialitate
            </Link>
            <Link href="/termeni-si-conditii" className="text-bn-text-dim hover:text-bn-gold">
              Termeni de utilizare
            </Link>
            <Link href="/politica-cookies" className="text-bn-text-dim hover:text-bn-gold">
              Politica de cookie-uri
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterBlock({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-display text-lg tracking-wide text-bn-heading sm:text-xl">
        {icon}
        {title}
      </h3>
      <div className="space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
