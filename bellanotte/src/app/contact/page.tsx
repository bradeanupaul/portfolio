import Image from "next/image";
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/contact/FaqSection";
import { OpeningHours } from "@/components/contact/OpeningHours";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { BellaNotteMap } from "@/components/maps/BellaNotteMap";
import { restaurantAssets } from "@/data/ai-assets";
import { restaurant } from "@/data/restaurant";
import { createPageMetadata } from "@/lib/metadata";
import { DEMO_MAP_CENTER } from "@/lib/maps-style";
import { formatPhoneDisplay, formatPhoneHref } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Trimite un mesaj demonstrativ, află programul și vezi locația ilustrativă Bella Notte din Cluj Napoca.",
  path: "/contact",
});

const mapsOpenHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${DEMO_MAP_CENTER.lat},${DEMO_MAP_CENTER.lng}`,
)}`;

export default function ContactPage() {
  return (
    <>
      {/* Chapter 1: cinematic hero */}
      <section className="relative isolate min-h-[min(78vh,720px)] overflow-hidden">
        <Image
          src="/images/contact/hero-twilight.jpg"
          alt="Intrarea Bella Notte la amurg, cu lumină caldă și arce de piatră"
          fill
          priority
          className="object-cover object-[62%_40%] sm:object-[70%_42%] lg:object-[78%_45%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/78 to-bn-bg/25 max-lg:via-bn-bg/70 max-lg:to-bn-bg/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/45"
          aria-hidden
        />

        <Container
          size="wide"
          className="relative flex min-h-[min(78vh,720px)] flex-col justify-end pb-14 pt-[calc(var(--header-height)+2rem)] sm:pb-16 lg:justify-center lg:pb-20"
        >
          <AnimatedReveal variant="clip" className="max-w-2xl">
            <p className="bn-eyebrow text-bn-gold">Contact</p>
            <DecorativeDivider className="mt-5 justify-start" wide />
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.02] text-bn-heading">
              O seară frumoasă începe cu un mesaj.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-bn-text-muted sm:text-base">
              Scrieți-ne pentru întrebări demonstrative despre masă, meniu sau ocazii speciale.
              Răspunsul este simulat, datele rămân locale.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#contact-form" size="lg" showArrow className="w-full sm:w-auto">
                Trimite-ne un mesaj
              </Button>
              <Button href="/rezervari" variant="secondary" size="lg" showArrow className="w-full sm:w-auto">
                Rezervă o masă
              </Button>
            </div>
            <div className="mt-8 inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 border border-bn-border/55 bg-bn-bg/55 px-4 py-3 text-sm backdrop-blur-sm">
              <a
                href={`tel:${formatPhoneHref(restaurant.contact.phoneHref)}`}
                className="font-medium text-bn-gold hover:underline"
              >
                {formatPhoneDisplay(restaurant.contact.phone)}
              </a>
              <span className="hidden h-3 w-px bg-bn-border sm:block" aria-hidden />
              <span className="text-bn-text-muted">Marți–Duminică, seara</span>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      {/* Chapter 2: inquiry lounge */}
      <section className="relative isolate overflow-hidden border-t border-bn-border/40">
        <div className="absolute inset-0">
          <Image
            src={restaurantAssets.interiorMain}
            alt=""
            fill
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bn-bg/88" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-bn-bg via-transparent to-bn-bg" aria-hidden />
        </div>

        <Container size="wide" className="relative py-14 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <AnimatedReveal className="max-w-xl">
              <p className="bn-eyebrow text-bn-gold">Scrie-ne</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08] text-bn-heading">
                Spune-ne cum îți putem face seara specială.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-bn-text-muted sm:text-base">
                Întrebări despre meniu, cine private sau preferințe alimentare. Mesajul este
                demonstrativ și nu ajunge la un restaurant real.
              </p>

              <ul className="mt-8 space-y-5">
                <li>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bn-text-dim">Telefon</p>
                  <a
                    href={`tel:${formatPhoneHref(restaurant.contact.phoneHref)}`}
                    className="mt-1 inline-flex items-center gap-2 font-display text-xl text-bn-heading transition-colors hover:text-bn-gold sm:text-2xl"
                  >
                    <Phone className="size-4 text-bn-gold" aria-hidden />
                    {formatPhoneDisplay(restaurant.contact.phone)}
                  </a>
                </li>
                <li>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bn-text-dim">Email</p>
                  <a
                    href={`mailto:${restaurant.contact.email}`}
                    className="mt-1 inline-flex items-center gap-2 break-all font-display text-lg text-bn-gold transition-colors hover:text-bn-gold-light sm:text-xl"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    {restaurant.contact.email}
                  </a>
                </li>
                <li>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bn-text-dim">Oraș</p>
                  <p className="mt-1 inline-flex items-start gap-2 font-display text-lg text-bn-heading sm:text-xl">
                    <MapPin className="mt-1 size-4 shrink-0 text-bn-gold" aria-hidden />
                    <span>
                      {restaurant.address.city}
                      <span className="mt-1 block text-sm font-sans text-bn-text-muted">
                        {restaurant.address.street} (adresă ilustrativă)
                      </span>
                    </span>
                  </p>
                </li>
              </ul>

              <p className="mt-10 border-l border-bn-gold/40 pl-4 font-display text-lg text-bn-gold/80">
                Un loc pentru conversații memorabile
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.08}>
              <div
                id="contact-form"
                className="scroll-mt-[calc(var(--header-height)+1.25rem)] border border-bn-gold/20 bg-[rgba(19,16,13,0.92)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-7 lg:p-8"
              >
                <div className="pointer-events-none absolute" aria-hidden />
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-bn-heading sm:text-3xl">Formular</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-bn-gold/40 to-transparent" aria-hidden />
                </div>
                <p className="mb-6 text-sm text-bn-text-muted">
                  Completați câmpurile de mai jos. Răspuns demonstrativ.
                </p>
                <ContactForm />
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* Chapter 3: visit + map */}
      <section className="border-y border-bn-border/40 bg-bn-bg-elevated py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <AnimatedReveal>
            <p className="bn-eyebrow text-bn-gold">Vizită</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,3.5vw,3rem)] text-bn-heading">
              Ne găsești în Cluj Napoca
            </h2>
            <p className="mt-3 max-w-xl text-sm text-bn-text-muted sm:text-base">
              Marker ilustrativ pe hartă. Bella Notte este un restaurant fictiv pentru portofoliu.
            </p>
          </AnimatedReveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-7">
            <AnimatedReveal variant="mask" className="relative">
              <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-bn-text-dim">
                Hartă interactivă
              </p>
              <BellaNotteMap
                heightClassName="aspect-[16/10] min-h-[280px] max-h-[500px] w-full sm:min-h-[360px] lg:min-h-[440px] lg:max-h-[500px]"
                zoom={15}
              />
              <a
                href={mapsOpenHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-bn-gold hover:underline"
              >
                Deschide zona în Google Maps
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </AnimatedReveal>

            <AnimatedReveal delay={0.06} className="flex h-full flex-col border border-bn-border/70 bg-bn-bg p-5 sm:p-7">
              <h3 className="font-display text-xl text-bn-heading sm:text-2xl">Informații de vizită</h3>
              <div className="mt-5 space-y-4 text-sm text-bn-text-muted">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-bn-gold" aria-hidden />
                  <span>
                    {restaurant.address.street}
                    <br />
                    {restaurant.address.postalCode} {restaurant.address.city}
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-bn-gold" aria-hidden />
                  <a
                    href={`tel:${formatPhoneHref(restaurant.contact.phoneHref)}`}
                    className="text-bn-gold hover:underline"
                  >
                    {formatPhoneDisplay(restaurant.contact.phone)}
                  </a>
                </p>
              </div>

              <div className="mt-7 border-t border-bn-border/60 pt-6">
                <h4 className="mb-3 font-display text-lg text-bn-heading">Program</h4>
                <OpeningHours compact />
              </div>

              <div className="mt-auto pt-8">
                <Button href="/rezervari" showCalendar showArrow className="w-full sm:w-auto">
                  Rezervă demonstrativ
                </Button>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* Chapter 4: FAQ + closing CTA */}
      <section className="bg-bn-bg py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <AnimatedReveal>
            <FaqSection />
          </AnimatedReveal>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/atmosphere/cta-dining-evening.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bn-bg/72" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/70 to-bn-bg/40" aria-hidden />
        </div>
        <Container size="wide" className="relative py-16 sm:py-20">
          <AnimatedReveal className="max-w-xl">
            <p className="bn-eyebrow text-bn-gold">Invitație</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] text-bn-heading">
              Ne vedem la Bella Notte?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bn-text-muted sm:text-base">
              Alegeți o seară, o masă și ritmul potrivit. Rezervarea de pe site este demonstrativă.
            </p>
            <div className="mt-8">
              <Button href="/rezervari" size="lg" showCalendar showArrow>
                Rezervă o masă
              </Button>
            </div>
          </AnimatedReveal>
        </Container>
      </section>
    </>
  );
}
