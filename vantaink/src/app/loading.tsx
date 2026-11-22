import { Container } from "@/components/ui/Container";

export default function RootLoading() {
  return (
    <div className="min-h-[50vh] bg-bg">
      <Container className="flex min-h-[50vh] flex-col justify-center py-16">
        <p className="mono-index" aria-live="polite">
          Se încarcă VANTA INK
        </p>
        <div className="mt-8 h-1 w-48 overflow-hidden bg-line">
          <div
            className="h-full w-1/3 animate-pulse bg-accent"
            aria-hidden="true"
          />
        </div>
      </Container>
    </div>
  );
}