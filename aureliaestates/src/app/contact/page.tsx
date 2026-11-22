import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: `Aurelia Estates, ${site.address.street}, ${site.address.city}. Date ilustrative, pentru un site de portofoliu.`,
};

const details = [
  {
    icon: MapPin,
    label: "Adresă",
    value: `${site.address.street}, ${site.address.region}, ${site.address.city}`,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    label: "Program",
    value: site.hours,
  },
];

export default function ContactPage() {
  const teaser = faq.slice(0, 4);

  return (
    <article className="bg-soft-blue pt-[var(--header-height)]">
      <Container className="py-8 md:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Studio</p>
              <RevealHeading
                as="h1"
                priority
                className="mt-3 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink"
              >
                Scrieți la Aurelia.
              </RevealHeading>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
                Mesajul se salvează în demonstrație și nu este trimis pe email. Telefonul și adresa
                de mai jos sunt illustrative.
              </p>
            </Reveal>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(12,23,40,0.1)]">
              <Image
                src="/images/editorial/facade-detail.jpg"
                alt="Detaliu de fațadă contemporană, piatră și sticlă"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <ul className="mt-5 grid gap-3">
              {details.map((item) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-cobalt text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[15px] font-medium leading-snug text-ink">
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 rounded-[16px] bg-white/80 p-4 shadow-[0_10px_28px_rgba(12,23,40,0.06)] transition-colors hover:bg-white"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-[16px] bg-white/80 p-4 shadow-[0_10px_28px_rgba(12,23,40,0.06)]">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-[20px] bg-white p-6 shadow-[0_20px_50px_rgba(12,23,40,0.1)] sm:p-8 lg:col-span-7 lg:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">Mesaj</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-ink">
              Spuneți-ne ce căutați.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate">
              Vizionare, vânzare, închiriere sau o întrebare despre o adresă din catalog. Răspunsul,
              într-o casă reală, ar veni de la consultant, nu dintr-un automat.
            </p>
            <div className="mt-8">
              <ContactForm tone="light" />
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <RevealHeading as="h2" className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
              Întrebări pe care le primim des
            </RevealHeading>
            <Link href="/intrebari-frecvente" className="text-sm font-semibold text-cobalt">
              Toate răspunsurile
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {teaser.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/intrebari-frecvente#intrebare-${item.id}`}
                  className="block rounded-[16px] bg-ice px-5 py-5 font-display text-xl font-semibold leading-snug text-ink transition-colors hover:bg-soft-blue md:text-2xl"
                >
                  {item.question}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
