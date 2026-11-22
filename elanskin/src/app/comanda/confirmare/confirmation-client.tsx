"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonClass, Container } from "@/components/chrome";

/**
 * Static-export friendly confirmation. Full Prisma lookup stays available
 * in local `next dev` via the previous server page if needed; production
 * portfolio export shows a honest demo confirmation from the query code.
 */
export function ConfirmationClient() {
  const params = useSearchParams();
  const code = (params.get("cod") ?? "").toUpperCase();

  if (!code) {
    return (
      <Container className="py-20">
        <h1 className="text-5xl">Lipsește codul comenzii.</h1>
        <Link href="/magazin" className={buttonClass("solid", "mt-8")}>
          Înapoi în magazin
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <p className="text-sm tracking-[0.2em] text-ink/50 uppercase">Confirmare demo</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-tight">Comanda {code}</h1>
      <p className="mt-6 max-w-xl text-lg text-ink/70">
        În demonstrația din portofoliu, confirmarea e afișată local pe baza
        codului din link. Nu există fulfillment real și nu se trimite email.
      </p>
      <Link href="/magazin" className={buttonClass("solid", "mt-10")}>
        Continuă prin magazin
      </Link>
    </Container>
  );
}
