import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="band-carbon flex min-h-[70vh] items-center section-pad">
      <Container>
        <p className="font-mono-label text-copper">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-off-white md:text-6xl">
          Pagina nu există
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-silver">
          Linkul poate fi greșit sau pagina a fost mutată. Revino la pagina principală sau explorează
          serviciile demonstrative.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Acasă</Button>
          <Button
            href="/servicii"
            variant="outline"
            className="border-white/30 text-off-white hover:bg-white hover:text-carbon"
          >
            Servicii
          </Button>
        </div>
      </Container>
    </section>
  );
}
