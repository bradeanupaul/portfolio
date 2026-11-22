import { Home, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <Reveal>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-[var(--ink-on-dark)]">
          Pagina pe care o cauți nu există.
        </h1>
        <p className="mt-4 max-w-lg text-[var(--muted-on-dark)]">
          Poate a fost mutată sau linkul este incomplet. Poți reveni acasă sau
          poți explora proiectele.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <ButtonLink href="/" icon={Home} showArrow>
            Acasă
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary" icon={LayoutGrid}>
            Proiecte
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
