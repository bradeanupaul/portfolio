import Link from "next/link";
import { buttonClass, Container } from "@/components/chrome";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-plum">404</p>
      <h1 className="mt-4 text-5xl md:text-6xl">Pagina nu există.</h1>
      <p className="mt-4 max-w-md text-lg text-ink">
        Linkul duce spre o pagină goală. Magazinul și jurnalul sunt în continuare aici.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonClass("solid")}>
          Acasă
        </Link>
        <Link href="/magazin" className={buttonClass("line")}>
          Magazin
        </Link>
      </div>
    </Container>
  );
}
