"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Prezentare generală", exact: true },
  { href: "/admin/rezervari", label: "Rezervări" },
  { href: "/admin/mesaje", label: "Mesaje" },
  { href: "/admin/camere", label: "Camere" },
];

export function AdminNav({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex flex-col gap-6 border-b border-stone/50 bg-mist px-4 py-6 md:w-56 md:border-b-0 md:border-r md:min-h-screen">
      <div>
        <p className="text-xs font-semibold tracking-widest text-clay uppercase">VELTRA Admin</p>
        <p className="mt-1 text-sm text-ink/70">{adminName}</p>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active =
            link.exact === true ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-pine text-ivory" : "text-ink/75 hover:bg-stone/40 hover:text-pine",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={() => void logout()}
        className="mt-auto rounded-lg border border-stone/60 px-3 py-2 text-left text-sm text-ink/70 hover:border-clay hover:text-pine"
      >
        Deconectare
      </button>
    </aside>
  );
}