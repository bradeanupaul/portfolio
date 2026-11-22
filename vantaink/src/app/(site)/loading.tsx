import { Container } from "@/components/ui/Container";

export default function SiteLoading() {
  return (
    <div className="bg-bg py-16">
      <Container>
        <p className="mono-index" aria-live="polite">
          Se pregătește conținutul
        </p>
        <div className="mt-8 space-y-3">
          <div className="h-4 w-3/4 max-w-md animate-pulse bg-surface-muted" />
          <div className="h-4 w-1/2 max-w-sm animate-pulse bg-surface-muted" />
          <div className="mt-6 aspect-[16/9] w-full max-w-2xl animate-pulse border border-line bg-surface-raised" />
        </div>
      </Container>
    </div>
  );
}