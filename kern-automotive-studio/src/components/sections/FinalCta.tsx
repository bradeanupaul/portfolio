import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden band-charcoal section-pad">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cta/cta-dark-detail.jpg"
          alt=""
          className="h-full w-full object-cover object-[75%_center] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/92 to-charcoal/55" />
      </div>
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="font-mono-label text-copper">Următorul pas</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-off-white md:text-5xl">
            Spune-ne ce vrei să protejezi.
          </h2>
          <p className="mt-4 text-base leading-7 text-silver">
            Completează o solicitare demonstrativă cu modelul mașinii și zona de interes. Nu
            confirmăm programări reale — formularul simulează fluxul UX pentru portofoliu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/programare" size="lg">
              Solicită o evaluare
            </Button>
            <Button
              href="/pachete"
              size="lg"
              variant="outline"
              className="border-white/30 text-off-white hover:bg-white hover:text-carbon"
            >
              Explorează pachetele
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
