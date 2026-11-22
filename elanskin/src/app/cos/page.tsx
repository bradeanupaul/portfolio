import { CartView } from "@/components/cart-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Coș",
  "Coșul tău ÉLAN SKIN. Transport ilustrativ gratuit de la 250 lei.",
);

export default function Page() {
  return <CartView />;
}
