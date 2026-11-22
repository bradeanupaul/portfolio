import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { isRoomTypeAvailable } from "@/lib/booking/availability";
import { calculateStayPrice } from "@/lib/pricing/engine";
import { dateSelectionSchema } from "@/lib/validation/booking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = dateSelectionSchema.safeParse({
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    guestCount: searchParams.get("guests") ?? searchParams.get("guestCount"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Parametrii de căutare sunt invalizi.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { checkIn, checkOut, guestCount } = parsed.data;

  const roomTypes = await prisma.roomType.findMany({
    where: {
      capacityMax: { gte: guestCount },
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      priceRules: true,
      units: { where: { active: true } },
    },
    orderBy: { sortOrder: "asc" },
  });

  const results = [];
  for (const room of roomTypes) {
    const available = await isRoomTypeAvailable(room.id, checkIn, checkOut);
    const pricing = calculateStayPrice(
      room.basePriceBan,
      checkIn,
      checkOut,
      room.priceRules,
    );
    results.push({
      id: room.id,
      slug: room.slug,
      name: room.name,
      description: room.description,
      capacityMax: room.capacityMax,
      areaSqm: room.areaSqm,
      viewType: room.viewType,
      image: room.images[0]?.src ?? "/images/rooms/forest-primary.webp",
      available,
      inventory: room.units.length,
      pricing,
    });
  }

  return NextResponse.json({ ok: true, checkIn, checkOut, guestCount, rooms: results });
}
