import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, legalLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-carbon border-t border-white/8">
      <Container className="section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="mb-6 scale-110 origin-left" />
            <p className="mt-6 max-w-md text-sm leading-7 text-silver">{site.tagline}</p>
            <p className="mt-4 text-sm text-slate">
              {site.contact.city} · {site.contact.phone}
            </p>
          </div>

          <div>
            <p className="font-mono-label text-copper">Navigare</p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-off-white/85 transition-colors hover:text-copper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-copper">Servicii</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicii/${service.slug}`}
                    className="text-sm text-off-white/85 transition-colors hover:text-copper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-sm border border-white/10 bg-charcoal/60 px-5 py-5 md:px-6">
          <p className="text-sm leading-7 text-silver">{site.demoDisclosure}</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate">
            © {year} {site.brandName}. Proiect demonstrativ de portofoliu.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs text-silver hover:text-copper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
