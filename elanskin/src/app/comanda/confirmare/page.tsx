import Link from "next/link";
import { Suspense } from "react";
import { buttonClass, Container } from "@/components/chrome";
import { pageMeta } from "@/lib/seo";
import { ConfirmationClient } from "./confirmation-client";

export const metadata = pageMeta(
  "Confirmare",
  "Confirmarea unei comenzi demonstrative ÉLAN SKIN. Nu se trimite niciun colet.",
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <Container className="py-20">
          <p className="text-ink">Se pregătește confirmarea.</p>
        </Container>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
