import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-bn-gold">Eroare 404</p>
        <h1 className="mt-4 font-display text-5xl text-bn-text sm:text-6xl">Pagina nu există</h1>
        <p className="mx-auto mt-6 max-w-md text-bn-text-muted">
          Poate ați urmat un link vechi sau o rută care nu face parte din acest demo de portofoliu Bella
          Notte.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" showArrow>
            Înapoi acasă
          </Button>
          <Button href="/rezervari" variant="secondary" showCalendar>
            Rezervări
          </Button>
        </div>
        <p className="mt-8 text-sm text-bn-text-dim">
          Doriți meniul?{" "}
          <Link href="/meniu" className="text-bn-gold hover:underline">
            Vezi felurile demonstrative
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}