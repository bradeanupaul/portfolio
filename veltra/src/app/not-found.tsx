import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="pine" className="flex min-h-[70vh] items-center pt-24">
      <Container className="max-w-xl text-center">
        <p className="eyebrow text-stone">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ivory">Poteca se oprește aici</h1>
        <p className="mt-5 text-ivory/80">
          Pagina căutată nu există în proiectul demonstrativ VELTRA. Reveniți la camere sau la pagina principală.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Acasă
          </Button>
          <Button href="/camere" variant="ghost">
            Camere
          </Button>
        </div>
      </Container>
    </Section>
  );
}