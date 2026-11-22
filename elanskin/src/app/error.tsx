"use client";

import { buttonClass, Container } from "@/components/chrome";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-24">
      <h1 className="text-5xl">Ceva s-a întrerupt.</h1>
      <p className="mt-4 max-w-md text-ink">Poți încerca din nou. Pagina nu a putut fi afișată.</p>
      <button type="button" className={buttonClass("solid", "mt-8")} onClick={() => reset()}>
        Încearcă din nou
      </button>
    </Container>
  );
}
