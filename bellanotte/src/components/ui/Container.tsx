import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: "div" | "section" | "article";
  size?: "standard" | "reading" | "wide";
}

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "standard",
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        size === "reading" && "bn-container-reading",
        size === "wide" && "bn-container-wide",
        size === "standard" && "bn-container",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
