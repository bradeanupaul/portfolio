import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div
      className="min-h-[60vh] bg-ice pt-[var(--header-height)]"
      aria-busy="true"
      aria-live="polite"
    >
      <Container className="py-12 md:py-16">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cobalt">
          Aurelia Estates
        </p>
        <p className="mt-4 max-w-xl font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
          Se încarcă pagina.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="aspect-[3/2] animate-pulse rounded-2xl bg-white shadow-soft motion-reduce:animate-none"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
