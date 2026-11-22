import { CheckoutForm } from "@/components/checkout-form";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Comandă",
  "Finalizează o comandă demonstrativă ÉLAN SKIN, fără date de card.",
);

export default function Page() {
  return <CheckoutForm />;
}
