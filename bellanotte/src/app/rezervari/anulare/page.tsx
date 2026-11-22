import { Suspense } from "react";
import { CancelReservationForm } from "@/components/reservations/CancelReservationForm";
import { Container } from "@/components/ui/Container";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Anulare rezervare",
  description:
    "Anulați o rezervare demonstrativă folosind referința și token-ul unic. Flux securizat fără enumerare.",
  path: "/rezervari/anulare",
  noIndex: true,
});

export default function AnulareRezervarePage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-bn-gold">Rezervări</p>
          <h1 className="mt-2 font-display text-4xl text-bn-text">Anulare demonstrativă</h1>
        </header>
        <Suspense
          fallback={
            <p className="flex items-center justify-center gap-2 text-sm text-bn-text-muted">
              <LoadingSpinner className="size-4" />
              Se încarcă formularul...
            </p>
          }
        >
          <CancelReservationForm />
        </Suspense>
      </Container>
    </div>
  );
}