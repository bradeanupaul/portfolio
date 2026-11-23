import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const testimonials = [
  {
    quote:
      "Am înțeles clar diferența dintre PPF și ceramică înainte să alegem kitul frontal. Predarea pe LED a fost partea pe care o așteptam cel mai mult.",
    name: "Andrei M.",
    role: "Porsche 911 — proiect demo",
  },
  {
    quote:
      "Polish pe negru metalizat fără holograme. Au măsurat lacul și au spus unde nu forțează — tocmai asta căutam într-un atelier serios.",
    name: "Elena V.",
    role: "BMW M3 — proiect demo",
  },
  {
    quote:
      "Geamurile spate pe ceramică au schimbat temperatura pe bancheta spate. Instrucțiunile de 72 de ore au fost clare și realiste.",
    name: "Radu C.",
    role: "Audi RS6 — proiect demo",
  },
];

export function TestimonialsDemo() {
  return (
    <section className="band-carbon section-pad">
      <Container>
        <div className="max-w-xl">
          <SectionEyebrow tone="light">Voci demo</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold text-off-white md:text-5xl">
            Feedback ilustrativ
          </h2>
          <p className="mt-4 text-base leading-7 text-silver">
            Testimonialele de mai jos sunt fictive, create pentru a arăta tonul de comunicare al
            brandului — nu provin de la clienți reali.
          </p>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <blockquote className="flex h-full flex-col rounded-sm border border-white/10 bg-charcoal p-7">
                <p className="flex-1 text-base leading-7 text-off-white/90">„{item.quote}”</p>
                <footer className="mt-8 border-t border-white/10 pt-5">
                  <cite className="not-italic">
                    <span className="block font-display font-semibold text-off-white">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs text-slate">{item.role}</span>
                  </cite>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
