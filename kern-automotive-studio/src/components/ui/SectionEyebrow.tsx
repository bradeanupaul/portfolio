import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionEyebrow({
  children,
  className,
  tone = "dark",
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono-label mb-4",
        tone === "light" ? "text-copper" : "text-copper",
        className,
      )}
    >
      {children}
    </p>
  );
}
