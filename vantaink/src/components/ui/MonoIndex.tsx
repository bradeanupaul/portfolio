import { cn } from "@/lib/utils";

type MonoIndexProps = {
  index: string;
  label: string;
  className?: string;
};

export function MonoIndex({ index, label, className }: MonoIndexProps) {
  return (
    <p
      className={cn("mono-index text-text-subtle", className)}
      aria-hidden="true"
    >
      <span>{index}</span>
      <span aria-hidden="true"> / </span>
      <span>{label}</span>
    </p>
  );
}