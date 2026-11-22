import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { getAdminSession } from "@/lib/auth/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, { params }: Params) {
  const auth = await getAdminSession();
  if (!auth?.admin) {
    return NextResponse.json({ ok: false, message: "Neautorizat." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.reservation.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, message: "Rezervarea nu a fost găsită." }, { status: 404 });
  }

  if (existing.status === "CANCELLED") {
    return NextResponse.json({ ok: true, message: "Rezervarea este deja anulată." });
  }

  const updated = await prisma.reservation.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({
    ok: true,
    message: "Rezervarea a fost anulată.",
    reservation: { id: updated.id, status: updated.status },
  });
}