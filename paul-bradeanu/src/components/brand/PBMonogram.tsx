import { cn } from "@/lib/utils";

type PBMonogramProps = {
  className?: string;
  variant?: "light" | "dark";
  title?: string;
};

export function PBMonogram({
  className,
  variant = "light",
  title = "Paul Brădeanu",
}: PBMonogramProps) {
  const color = variant === "light" ? "#D5E6F3" : "#172435";
  const accent = variant === "light" ? "#A5C4E0" : "#5E6C7E";

  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 72 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Letter P */}
      <path
        d="M8 8h17.2c7.6 0 12.6 4.1 12.6 10.7S32.8 29.4 25.2 29.4H14.6V56H8V8zm6.6 5.2v11h9.8c3.7 0 5.9-1.9 5.9-5.5 0-3.5-2.2-5.5-5.9-5.5H14.6z"
        fill={color}
      />
      {/* Letter B, interlocking on shared optical axis */}
      <path
        d="M28 8h16.4c7.2 0 11.9 3.8 11.9 9.8 0 3.9-2 6.9-5.4 8.3 4.3 1.3 7.1 4.8 7.1 9.7 0 6.5-5.2 11.2-13.5 11.2H28V8zm6.6 5.2v8.4h8.6c3.4 0 5.4-1.7 5.4-4.3s-2-4.1-5.3-4.1h-8.7zm0 14.6v12.8h9.6c4 0 6.5-2 6.5-5.4 0-3.3-2.5-5.4-6.5-5.4h-9.6z"
        fill={color}
        fillOpacity="0.92"
      />
      <path
        d="M8 8v48"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="58" cy="18" r="1.5" fill={accent} />
    </svg>
  );
}
