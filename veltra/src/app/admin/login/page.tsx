import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Autentificare admin | VELTRA",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone/50 bg-mist p-8 shadow-sm">
        <h1 className="font-serif text-2xl text-pine">Panou administrare</h1>
        <p className="mt-2 text-sm text-ink/70">Acces demonstrativ pentru gestionarea rezervărilor și mesajelor.</p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}