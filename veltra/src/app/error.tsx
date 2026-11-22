"use client";

import { useEffect } from "react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="mist" className="flex min-h-[70vh] items-center pt-24">
      <Container className="max-w-xl text-center">
        <p className="eyebrow">Eroare</p>
        <h1 className="mt-4 font-serif text-4xl text-pine">Ceva nu a mers bine</h1>
        <p className="mt-5 text-ink/75">
          A apărut o problemă la încărcarea paginii în demo. Puteți încerca din nou sau reveni la explorare.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="primary" onClick={() => reset()}>
            Încearcă din nou
          </Button>
          <Button href="/" variant="ghost-dark">
            Acasă
          </Button>
        </div>
      </Container>
    </Section>
  );
}