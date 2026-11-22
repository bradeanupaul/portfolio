import { NextResponse } from "next/server";

import { getArtistBySlug } from "@/lib/artists";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get("artist")?.trim();

  if (!artist) {
    return NextResponse.json(
      { ok: false, error: "Parametrul artist este obligatoriu." },
      { status: 400 },
    );
  }

  if (!getArtistBySlug(artist)) {
    return NextResponse.json(
      { ok: false, error: "Artist necunoscut." },
      { status: 404 },
    );
  }

  const now = new Date();
  const slots = await prisma.demoSlot.findMany({
    where: {
      artistSlug: artist,
      isBooked: false,
      startsAt: { gt: now },
    },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      startsAt: true,
      endsAt: true,
      label: true,
    },
  });

  return NextResponse.json({ ok: true, slots });
}