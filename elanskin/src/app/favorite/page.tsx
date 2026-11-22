import { WishlistView } from "@/components/wishlist-view";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Favorite",
  "Produsele salvate în acest browser, în demonstrația ÉLAN SKIN.",
);

export default function Page() {
  return <WishlistView />;
}
