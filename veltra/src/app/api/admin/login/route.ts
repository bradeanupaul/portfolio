import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth/admin";
import { adminLoginSchema } from "@/lib/validation/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Date de autentificare invalide." }, { status: 400 });
    }

    const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
    if (!admin) {
      return NextResponse.json({ ok: false, message: "Email sau parolă incorectă." }, { status: 401 });
    }

    await createAdminSession(admin.id);
    return NextResponse.json({ ok: true, name: admin.name });
  } catch {
    return NextResponse.json({ ok: false, message: "Autentificarea a eșuat." }, { status: 500 });
  }
}
