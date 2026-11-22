import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-bg">
      <Container className="flex min-h-[60vh] flex-col justify-center py-16">
        <p className="mono-index">EROARE 404</p>
        <h1 className="mt-4 display-section font-display uppercase text-text">
          Pagina nu există
        </h1>
        <p className="mt-4 max-w-md text-text-muted">
          Ruta căutată nu face parte din proiectul demonstrativ VANTA INK. Puteți
          reveni la pagina principală sau la galerie.
        </p>
        <hr className="editorial-rule-strong my-8 w-24 border-0" />
        <div className="flex flex-wrap gap-4">
          <Button href="/">Acasă</Button>
          <Button href="/portofoliu" variant="secondary">
            Lucrări
          </Button>
        </div>
      </Container>
    </div>
  );
}