import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionTone =
  | "bg"
  | "surface"
  | "raised"
  /** @deprecated use `bg` */
  | "bone"
  /** @deprecated use `bg` */
  | "carbon"
  /** @deprecated use `surface` */
  | "concrete"
  /** @deprecated accent band */
  | "vermilion";

const toneClasses: Record<SectionTone, string> = {
  bg: "bg-bg text-text",
  surface: "bg-surface text-text",
  raised: "bg-surface-raised text-text",
  bone: "bg-bg text-text",
  carbon: "bg-bg text-text",
  concrete: "bg-surface text-text",
  vermilion: "bg-accent text-bg",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
};

export function Section({
  id,
  tone = "bg",
  children,
  className,
  containerClassName,
  bleed = false,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], className)}>
      {bleed ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}