import Image from "next/image";
import { Suspense } from "react";
import { ReservationForm } from "@/components/reservations/ReservationForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Container } from "@/components/ui/Container";
import { reservationAssets } from "@/data/ai-assets";
import { summarizeWeeklyHours } from "@/lib/reservations";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Rezervări",
  description:
    "Rezervați o masă demonstrativ la Bella Notte. Alegeți data, intervalul orar și numărul de persoane.",
  path: "/rezervari",
});

function FormFallback() {
  return (
    <p className="flex items-center gap-2 text-sm text-bn-text-muted">
      <LoadingSpinner className="size-4" />
      Se încarcă formularul de rezervare...
    </p>
  );
}

export default function RezervariPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <Image
          src={reservationAssets.candlelit}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-bn-bg via-bn-bg/88 to-bn-bg/45"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-transparent to-bn-bg/40" aria-hidden />
      </div>

      <div className="relative aspect-[16/10] w-full lg:hidden">
        <Image
          src={reservationAssets.candlelit}
          alt="Masă romantică la lumina lumânărilor"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/30 to-transparent" />
      </div>

      <Container
        size="wide"
        className="relative grid gap-8 pb-14 pt-7 sm:gap-10 sm:pb-16 sm:pt-9 lg:min-h-[calc(100dvh-var(--header-height))] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10 lg:pb-10 lg:pt-[calc(var(--header-height)+0.75rem)] xl:gap-12"
      >
        <div className="max-w-xl lg:ml-auto lg:w-full lg:max-w-md lg:self-center lg:text-right">
          <DecorativeDivider className="justify-start lg:justify-end" wide />
          <p className="bn-eyebrow mt-4 text-bn-gold sm:mt-5">Masă la lumina lumânărilor</p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.25rem)] leading-[1.05] text-bn-heading">
            Rezervă o masă
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-bn-text-muted sm:mt-4 sm:text-base">
            Completați formularul. Cererea se salvează în baza demonstrativă, fără email de
            confirmare.
          </p>
          <p className="mt-5 text-sm text-bn-text">
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-bn-gold">
              Program
            </span>
            <span className="mt-1.5 block font-display text-base leading-snug text-bn-heading sm:text-lg">
              {summarizeWeeklyHours()}
            </span>
          </p>
        </div>

        <div className="border border-bn-border bg-bn-bg p-4 sm:p-6 lg:bn-glass-strong lg:max-h-[calc(100dvh-var(--header-height)-2rem)] lg:overflow-y-auto lg:border-bn-border/60 lg:p-6 xl:p-7">
          <h2 className="font-display text-xl text-bn-heading sm:text-2xl">Detalii rezervare</h2>
          <p className="mt-1.5 text-sm text-bn-text-muted">
            Alegeți data, intervalul și numărul de persoane.
          </p>
          <div className="mt-5">
            <Suspense fallback={<FormFallback />}>
              <ReservationForm compact />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
