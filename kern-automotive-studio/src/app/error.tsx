"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="band-off flex min-h-[60vh] items-center section-pad">
      <Container>
        <p className="font-mono-label text-copper">Eroare</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-carbon md:text-5xl">
          Ceva nu a mers cum trebuie
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate">
          A apărut o eroare la încărcarea acestei pagini. Poți reîncerca sau poți reveni la pagina
          principală.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" onClick={reset}>
            Reîncearcă
          </Button>
          <Button href="/" variant="outline">
            Acasă
          </Button>
        </div>
      </Container>
    </section>
  );
}
