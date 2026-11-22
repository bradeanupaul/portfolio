import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/ui/LegalProse";
import { MonoIndex } from "@/components/ui/MonoIndex";

export const metadata: Metadata = {
  title: "Politica cookie (demo)",
  description:
    "Descriere onestă a cookie urilor în demo ul VANTA INK: fără banner fals și fără tracking de marketing presupus.",
};

export default function CookiesPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <MonoIndex index="L3" label="COOKIE" />
        <Reveal className="mt-6">
          <h1 className="display-section font-display uppercase text-text">
            Cookie uri în proiectul demo
          </h1>
        </Reveal>
        <LegalProse className="mt-8 border border-line bg-surface-raised p-6 md:p-8">
          <p>
            Nu folosim un banner de consimțământ decât dacă există cookie uri
            nenecesare reale. În starea actuală a proiectului, nu integrăm
            servicii de analytics sau publicitate care ar seta cookie uri de
            profilare.
          </p>
          <h2>Ce poate exista</h2>
          <ul>
            <li>
              Cookie uri tehnice strict necesare pentru funcționarea framework
              ului sau a sesiunii de dezvoltare, dacă sunt setate de mediu.
            </li>
            <li>
              Stocare locală a datelor de formulare doar în baza SQLite de pe
              server, nu în cookie uri de browser pentru conținutul mesajelor.
            </li>
          </ul>
          <h2>Ce nu folosim</h2>
          <ul>
            <li>Pixeli de remarketing sau măsurători terțe nedeclarate.</li>
            <li>Cookie uri de preferință cosmetice fără funcție tehnică.</li>
          </ul>
          <h2>Actualizări</h2>
          <p>
            Dacă viitorul proiect adaugă analytics, această pagină și interfața
            vor fi actualizate înainte de activare, fără a pretinde
            comportament inexistent.
          </p>
        </LegalProse>
      </Container>
    </div>
  );
}