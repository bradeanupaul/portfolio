import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LegalProse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-6 text-sm leading-relaxed text-text-muted",
        "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-text",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:text-text",
        className,
      )}
    >
      {children}
    </div>
  );
}