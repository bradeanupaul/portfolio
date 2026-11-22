const DEFAULT_KEYWORDS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Prisma",
  "PostgreSQL",
  "OpenAI",
  "Spring Boot",
  "REST",
  "Swagger",
  "OpenAPI",
  "NestJS",
  "Supabase",
  "Python",
  "Google Gemini",
  "SaaS",
  "AI",
  "CSV",
  "PDF",
  "Excel",
  "tenant",
  "validare",
  "documentelor",
  "bugete",
  "rapoarte",
  "backend",
  "frontend",
  "brandului",
  "conversiei",
  "autentificare",
  "e-commerce",
  "checkout",
  "catalog",
];

export function BoldKeywords({
  text,
  keywords = DEFAULT_KEYWORDS,
  className,
  tone = "dark",
}: {
  text: string;
  keywords?: string[];
  className?: string;
  tone?: "dark" | "light";
}) {
  const pattern = new RegExp(
    `\\b(${keywords
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})\\b`,
    "gi",
  );
  const parts = text.split(pattern);
  const strongClass =
    tone === "light"
      ? "font-semibold text-[var(--text-on-light)]"
      : "font-semibold text-[var(--text-primary)]";

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = keywords.some(
          (k) => k.toLowerCase() === part.toLowerCase(),
        );
        return match ? (
          <strong key={`${part}-${i}`} className={strongClass}>
            {part}
          </strong>
        ) : (
          <span key={`${part}-${i}`}>{part}</span>
        );
      })}
    </span>
  );
}
