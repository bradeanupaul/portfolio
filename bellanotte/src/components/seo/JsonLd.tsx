import { restaurant } from "@/data/restaurant";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: `${siteConfig.description} Locație fictivă pentru portofoliu demonstrativ. Nu reprezintă un restaurant real.`,
    url: absoluteUrl("/"),
    image: absoluteUrl(siteConfig.defaultOgImage),
    servesCuisine: restaurant.cuisine,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.city,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.countryCode,
    },
    telephone: restaurant.contact.phone,
    email: restaurant.contact.email,
    openingHoursSpecification: Object.entries(restaurant.hours)
      .filter(([, slot]) => slot !== null)
      .map(([day, slot]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: slot!.open,
        closes: slot!.close,
      })),
    sameAs: [restaurant.social.instagram, restaurant.social.facebook].filter(Boolean),
    isAccessibleForFree: false,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Disclaimer",
        value:
          "Date demonstrative pentru portofoliu. Nu există recenzii agregate reale pe acest site.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}