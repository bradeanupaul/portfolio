import { Container, PageHero } from "@/components/chrome";
import { AccountPanel } from "@/components/account-panel";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cont",
  "Cont demonstrativ ÉLAN SKIN, fără parolă. Preferințele rămân în browser.",
);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Cont"
        title="Un cont care nu cere parolă."
        lede="Aici vezi cum ar arăta preferințele și căutarea unei comenzi. Totul este local și fictiv."
      />
      <Container className="py-14">
        <AccountPanel />
      </Container>
    </>
  );
}
