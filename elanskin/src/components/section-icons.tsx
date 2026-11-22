import {
  Beaker,
  BookOpen,
  Clock,
  Droplets,
  Flower2,
  Leaf,
  Mail,
  MapPin,
  Moon,
  Package,
  Phone,
  Shield,
  Sparkles,
  Sun,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const sectionIcons = {
  texture: Droplets,
  lab: Beaker,
  shipping: Truck,
  ritual: Sparkles,
  sun: Sun,
  moon: Moon,
  pack: Package,
  shield: Shield,
  flower: Flower2,
  leaf: Leaf,
  clock: Clock,
  book: BookOpen,
  pin: MapPin,
  mail: Mail,
  phone: Phone,
} as const satisfies Record<string, LucideIcon>;

export type SectionIconName = keyof typeof sectionIcons;

export function SectionIcon({
  name,
  className,
  size = 22,
}: {
  name: SectionIconName;
  className?: string;
  size?: number;
}) {
  const Icon = sectionIcons[name];
  return <Icon className={className} size={size} aria-hidden />;
}
