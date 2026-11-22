import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllMenuItems,
  getCategoryForMenuItem,
  getMenuItemBySlug,
  getRelatedDishes,
} from "@/data/menu";
import { absoluteUrl, formatCurrencyRon, siteConfig } from "@/lib/site";
import { DishDetails } from "@/components/menu/DishDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllMenuItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    return {
      title: "Preparat negăsit",
    };
  }

  const title = item.name;
  const description = `${item.description} ${formatCurrencyRon(item.priceRon)}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/meniu/${item.slug}`),
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/meniu/${item.slug}`),
      images: [
        {
          url: absoluteUrl(item.image),
          width: 1200,
          height: 800,
          alt: item.name,
        },
      ],
    },
  };
}

export default async function MeniuDishPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const category = getCategoryForMenuItem(slug);
  const related = getRelatedDishes(slug);

  return <DishDetails item={item} category={category} related={related} />;
}