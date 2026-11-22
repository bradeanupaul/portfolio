import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/chrome";
import { ProductPurchase } from "@/components/product-purchase";
import { getProduct, products } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return pageMeta("Produs", "Produs ÉLAN SKIN.");
  return pageMeta(product.name, product.short);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    brand: { "@type": "Brand", name: "ÉLAN SKIN" },
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Container className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-ink">
        <Link href="/magazin" className="hover:text-orchid">
          Magazin
        </Link>
      </p>
      <div className="mt-6">
        <ProductPurchase product={product} />
      </div>
    </Container>
  );
}
