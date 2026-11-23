export type AssetStatus = "generated" | "composed" | "vector";

export type AssetEntry = {
  role: string;
  path: string;
  aspect: string;
  alt: string;
  status: AssetStatus;
  notes: string;
};

export const assetManifest: AssetEntry[] = [
  {
    role: "hero-desktop",
    path: "/assets/hero-desktop.webp",
    aspect: "16:9",
    alt: "Trei sticle de îngrijire pe un podium translucid liliac.",
    status: "generated",
    notes: "AI editorial campaign, left negative space for copy.",
  },
  {
    role: "hero-mobile",
    path: "/assets/hero-mobile.webp",
    aspect: "3:4",
    alt: "Ser lavandă pe lumină perlă, cadrăj vertical.",
    status: "generated",
    notes: "Dedicated mobile crop.",
  },
  {
    role: "macro-dropper",
    path: "/assets/macro-dropper.webp",
    aspect: "4:3",
    alt: "Picătură de ser pe vârful unui dropper de sticlă.",
    status: "generated",
    notes: "Signature serum campaign still.",
  },
  {
    role: "botanical-ingredients",
    path: "/assets/botanical-ingredients.webp",
    aspect: "4:3",
    alt: "Macro botanic cu texturi de gel și citrice.",
    status: "generated",
    notes: "Ingredient storytelling backdrop.",
  },
  {
    role: "logo-wordmark",
    path: "/assets/brand/wordmark.svg",
    aspect: "220:48",
    alt: "ÉLAN SKIN",
    status: "vector",
    notes: "Hand-authored SVG wordmark, correct spelling.",
  },
  {
    role: "logo-mark",
    path: "/assets/brand/mark.svg",
    aspect: "1:1",
    alt: "Emblema ÉLAN, picătură și petală.",
    status: "vector",
    notes: "Abstract droplet and petal emblem.",
  },
  {
    role: "og",
    path: "/assets/og.webp",
    aspect: "1:1",
    alt: "Campanie ÉLAN SKIN pentru share social.",
    status: "generated",
    notes: "Open Graph branding image.",
  },
  ...[
    "glow-drops",
    "cloud-cleanse",
    "dew-theory",
    "velvet-barrier",
    "daily-veil-spf-50",
    "night-reset",
    "soft-ritual",
    "calm-current",
    "mist-hour",
    "pearl-polish",
    "linen-veil",
    "amber-milk",
    "quiet-pore",
    "silk-cushion",
    "dawn-balm",
    "afterglow-oil",
  ].flatMap((slug) => [
    {
      role: `product-packshot-${slug}`,
      path: `/assets/products/${slug}/packshot.webp`,
      aspect: "1:1",
      alt: `Packshot ${slug} pe fundal transparent.`,
      status: "composed" as const,
      notes: "AI packshot on green studio, rembg cutout to PNG alpha, pearl JPG composite.",
    },
    {
      role: `product-lifestyle-${slug}`,
      path: `/assets/products/${slug}/lifestyle.jpg`,
      aspect: "4:3",
      alt: `Compoziție lifestyle pentru ${slug}.`,
      status: "generated" as const,
      notes: "AI lifestyle or campaign still assigned per product.",
    },
    {
      role: `product-texture-${slug}`,
      path: `/assets/products/${slug}/texture.jpg`,
      aspect: "4:3",
      alt: `Macro textură pentru ${slug}.`,
      status: "generated" as const,
      notes: "AI gel or cream texture macro.",
    },
  ]),
];
