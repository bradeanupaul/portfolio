import { products, type Product } from "@/lib/catalog";

export type ProductVisualIdentity = {
  productId: string;
  name: string;
  sku: string;
  category: string;
  container: string;
  finish: string;
  label: string;
  volume: string;
  textureType: string;
  distinguishing: string;
  referenceFront: string;
  gallery: string[];
};

function containerFor(product: Product): string {
  const kind = product.kind.toLowerCase();
  if (kind.includes("ser") || kind.includes("fluid") || kind.includes("ulei")) {
    return "Sticlă sau flacon vertical cu dropper sau pompă";
  }
  if (kind.includes("gel") || kind.includes("ceață") || kind.includes("spf")) {
    return "Flacon opac cu pompă sau spray";
  }
  if (kind.includes("balsam") || kind.includes("cremă") || kind.includes("cushion")) {
    return "Borcan sau vas cu capac";
  }
  return "Ambalaj cosmetic premium ÉLAN";
}

export const productVisualIdentities: ProductVisualIdentity[] = products.map((product, index) => {
  const gallery = [
    product.images.front,
    product.images.opened,
    product.images.texture,
    product.images.editorial,
    product.images.detail,
    product.images.angle,
  ].filter(Boolean) as string[];

  return {
    productId: product.slug,
    name: product.name,
    sku: `ELAN-${String(index + 1).padStart(3, "0")}`,
    category: product.category,
    container: containerFor(product),
    finish: "Sticlă sau plastic mat, etichetă tipărită ÉLAN SKIN",
    label: `ÉLAN SKIN · ${product.name} · ${product.size}`,
    volume: product.size,
    textureType: product.texture,
    distinguishing: product.kind,
    referenceFront: product.images.front,
    gallery,
  };
});

export function visualIdentityFor(slug: string) {
  return productVisualIdentities.find((item) => item.productId === slug);
}
