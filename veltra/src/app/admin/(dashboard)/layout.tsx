import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdminSession } from "@/lib/auth/admin";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const { admin } = await requireAdminSession();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminNav adminName={admin.name} />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}