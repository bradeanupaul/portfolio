import { cn } from "@/lib/utils";

const techIconMap: Record<string, { file: string; label: string }> = {
  "Next.js": { file: "nextjs", label: "Next.js" },
  React: { file: "react", label: "React" },
  TypeScript: { file: "typescript", label: "TypeScript" },
  "JavaScript/TypeScript": { file: "typescript", label: "JavaScript/TypeScript" },
  "JavaScript și TypeScript": {
    file: "typescript",
    label: "JavaScript și TypeScript",
  },
  JavaScript: { file: "javascript", label: "JavaScript" },
  "Tailwind CSS": { file: "tailwindcss", label: "Tailwind CSS" },
  "Framer Motion": { file: "framermotion", label: "Framer Motion" },
  Motion: { file: "framermotion", label: "Motion" },
  Prisma: { file: "prisma", label: "Prisma" },
  SQLite: { file: "sqlite", label: "SQLite" },
  Zod: { file: "zod", label: "Zod" },
  Vitest: { file: "vitest", label: "Vitest" },
  Leaflet: { file: "leaflet", label: "Leaflet" },
  Zustand: { file: "zustand", label: "Zustand" },
  HTML: { file: "html5", label: "HTML" },
  CSS: { file: "css", label: "CSS" },
  "Node.js": { file: "nodejs", label: "Node.js" },
  NestJS: { file: "nestjs", label: "NestJS" },
  "Spring Boot": { file: "springboot", label: "Spring Boot" },
  Python: { file: "python", label: "Python" },
  Java: { file: "java", label: "Java" },
  "C#": { file: "csharp", label: "C#" },
  PostgreSQL: { file: "postgresql", label: "PostgreSQL" },
  MongoDB: { file: "mongodb", label: "MongoDB" },
  Supabase: { file: "supabase", label: "Supabase" },
  Docker: { file: "docker", label: "Docker" },
  Vercel: { file: "vercel", label: "Vercel" },
  Git: { file: "git", label: "Git" },
  PM2: { file: "pm2", label: "PM2" },
  "OpenAI API": { file: "openai", label: "OpenAI API" },
  OpenAI: { file: "openai", label: "OpenAI" },
  "Google Gemini": { file: "gemini", label: "Google Gemini" },
  Stripe: { file: "stripe", label: "Stripe" },
  "REST APIs": { file: "rest", label: "REST APIs" },
  "REST API": { file: "rest", label: "REST API" },
  "Swagger/OpenAPI": { file: "rest", label: "Swagger / OpenAPI" },
  Swagger: { file: "rest", label: "Swagger" },
  OpenAPI: { file: "rest", label: "OpenAPI" },
  "LLM integrations": { file: "llm", label: "LLM integrations" },
  "Integrări LLM": { file: "llm", label: "Integrări LLM" },
  "Document processing": { file: "docs", label: "Document processing" },
  "Procesare documente": { file: "docs", label: "Procesare documente" },
  "Workflow automation": { file: "workflow", label: "Workflow automation" },
  "Automatizare fluxuri": { file: "workflow", label: "Automatizare fluxuri" },
};

type TechBadgeProps = {
  name: string;
  className?: string;
  iconOnly?: boolean;
};

export function TechBadge({ name, className, iconOnly = false }: TechBadgeProps) {
  const mapped = techIconMap[name];

  return (
    <span
      className={cn("tech-badge", className)}
      title={mapped?.label ?? name}
    >
      {mapped ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/tech/${mapped.file}.svg`}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 shrink-0 brightness-0 invert"
          aria-hidden
        />
      ) : null}
      {iconOnly ? (
        <span className="sr-only">{mapped?.label ?? name}</span>
      ) : (
        <span>{mapped?.label ?? name}</span>
      )}
    </span>
  );
}
