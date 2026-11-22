import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Leaf, Sparkles, Star } from "lucide-react";
import type { MenuBadge, MenuItem } from "@/types";
import { formatCurrencyRon } from "@/lib/site";
import { getMenuBadgeLabel } from "@/lib/menu";
import { cn } from "@/lib/utils";

const badgeIcons: Partial<Record<MenuBadge, typeof Leaf>> = {
  vegetarian: Leaf,
  picant: Flame,
  signature: Star,
  nou: Sparkles,
};

export interface MenuItemCardProps {
  item: MenuItem;
  className?: string;
  priority?: boolean;
}

export function MenuItemCard({ item, className, priority }: MenuItemCardProps) {
  const href = `/meniu/${item.slug}`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-sm border border-bn-border bg-bn-bg-elevated/80 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-bn-gold/50 hover:shadow-[0_20px_48px_rgba(0,0,0,0.38)]",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bn-bg via-bn-bg/20 to-transparent opacity-90"
          aria-hidden
        />
        {item.badges?.length ? (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5" aria-label="Etichete">
            {item.badges.map((badge) => {
              const Icon = badgeIcons[badge];
              return (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1 rounded-sm border border-bn-gold/35 bg-bn-bg/80 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-bn-gold-light backdrop-blur-sm"
                >
                  {Icon ? <Icon className="size-3" aria-hidden /> : null}
                  {getMenuBadgeLabel(badge)}
                </li>
              );
            })}
          </ul>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug text-bn-text">
            <Link href={href} className="transition-colors hover:text-bn-gold-light">
              {item.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm font-semibold text-bn-gold">
            {formatCurrencyRon(item.priceRon)}
          </p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bn-text-muted">{item.description}</p>
        {item.portionNote ? (
          <p className="mt-3 text-xs text-bn-text-dim">{item.portionNote}</p>
        ) : null}
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-bn-gold transition-colors hover:text-bn-gold-light"
        >
          Vezi detalii
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}