import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type LegalProseProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalProse({ title, updated, children }: LegalProseProps) {
  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <header className="border-b border-bn-border pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-bn-gold">
            Informații legale
          </p>
          <h1 className="mt-3 font-display text-4xl text-bn-text sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-bn-text-dim">Ultima actualizare: {updated}</p>
        </header>
        <div className="prose-legal mt-10 space-y-6 text-base leading-relaxed text-bn-text-muted">
          {children}
        </div>
      </Container>
    </article>
  );
}