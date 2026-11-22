import { cn } from "@/lib/utils";

export function VeltraLogo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const stroke = variant === "dark" ? "#243D36" : "#F4F1E9";
  const accent = variant === "dark" ? "#B77758" : "#D9D0C1";
  const fill = stroke;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      className={cn("h-8 w-auto md:h-9", className)}
      role="img"
      aria-label="VELTRA"
    >
      <path
        d="M4 32 L16 6 L28 32"
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 32 L18 14 L25 32"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="38"
        y="28"
        fill={fill}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        letterSpacing="0.28em"
      >
        VELTRA
      </text>
    </svg>
  );
}
