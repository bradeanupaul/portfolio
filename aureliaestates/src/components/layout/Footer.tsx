import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { footerNavigation, footerServices } from "@/lib/navigation";

const linkClass = "text-sm text-slate-soft transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <Container className="py-20 md:py-28">
        <Reveal>
          <Link href="/" className="inline-block w-[240px] sm:w-[280px] md:w-[300px]">
            <Image
              src="/branding/logo-stacked-metallic.png"
              alt="Aurelia Estates"
              width={468}
              height={262}
              unoptimized
              className="h-auto w-full"
            />
          </Link>
          <p className="mt-8 max-w-md font-display text-2xl font-semibold leading-snug tracking-[-0.03em] text-white md:text-3xl">
            {site.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="max-w-sm text-base leading-relaxed text-slate-soft">{site.description}</p>
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <p className="text-sm font-semibold text-white">Navigație</p>
              <ul className="mt-5 space-y-3">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-white">Servicii</p>
              <ul className="mt-5 space-y-3">
                {footerServices.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-sm font-semibold text-white">Contact</p>
              <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-slate-soft">
                <p>
                  {site.address.street}
                  <br />
                  {site.address.region}, {site.address.city}
                  <br />
                  {site.address.country}
                </p>
                <p>
                  <a href={`tel:${site.phoneHref}`} className={linkClass}>
                    {site.phone}
                  </a>
                  <br />
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                </p>
                <p>{site.hours}</p>
              </address>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="max-w-3xl text-sm leading-relaxed text-slate-soft">
              Acest site este o demonstrație de portofoliu. Aurelia Estates este o casă fictivă.
              Proprietățile, consultanții, fotografiile și datele de contact nu reprezintă o agenție
              reală.
            </p>
            <nav aria-label="Legal" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/confidentialitate" className={linkClass}>
                Confidențialitate
              </Link>
              <Link href="/termeni" className={linkClass}>
                Termeni
              </Link>
              <Link href="/cookie-uri" className={linkClass}>
                Cookie-uri
              </Link>
            </nav>
            <p className="mt-6 text-xs font-medium tracking-[0.08em] text-slate-soft">
              © 2026 Aurelia Estates
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
