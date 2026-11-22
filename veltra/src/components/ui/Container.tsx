import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}) {
  return <Tag className={cn("container-editorial", className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  id,
  tone = "ivory",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "mist" | "pine" | "stone" | "transparent";
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    mist: "bg-mist text-ink",
    pine: "surface-dark",
    stone: "bg-stone/40 text-ink",
    transparent: "",
  } as const;

  return (
    <section id={id} className={cn("section-pad", tones[tone], className)}>
      {children}
    </section>
  );
}
