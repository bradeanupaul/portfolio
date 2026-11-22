import { cn } from "@/lib/utils";

type VisuallyHiddenProps = {
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
};

export function VisuallyHidden({
  as: Component = "span",
  className,
  children,
}: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0",
        "[clip:rect(0,0,0,0)] [clip-path:inset(50%)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}