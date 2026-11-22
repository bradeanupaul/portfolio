"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function GlobalError({
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
    <div className="min-h-[60vh] bg-bg">
      <Container className="flex min-h-[60vh] flex-col justify-center py-16">
        <p className="mono-index">EROARE APLICAȚIE</p>
        <h1 className="mt-4 display-section font-display uppercase text-text">
          Ceva nu a funcționat
        </h1>
        <p className="mt-4 max-w-md text-text-muted">
          A apărut o eroare neașteptată în demo ul VANTA INK. Puteți încerca din
          nou; datele fictive ale site ului nu sunt afectate permanent.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono-ui text-xs text-text-subtle">
            Referință tehnică: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button type="button" onClick={reset}>
            Încearcă din nou
          </Button>
          <Button href="/" variant="secondary">
            Acasă
          </Button>
        </div>
      </Container>
    </div>
  );
}