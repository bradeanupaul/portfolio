import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { allocateUnit } from "@/lib/booking/availability";
import { calculateStayPrice } from "@/lib/pricing/engine";
import { createReservationSchema } from "@/lib/validation/booking";
import { generateReference } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createReservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Datele rezervării sunt incomplete sau invalide.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const roomType = await tx.roomType.findUnique({
        where: { id: data.roomTypeId },
        include: { priceRules: true },
      });
      if (!roomType) {
        throw new Error("ROOM_NOT_FOUND");
      }
      if (data.guestCount > roomType.capacityMax || data.guestCount < roomType.capacityMin) {
        throw new Error("CAPACITY");
      }

      const unit = await allocateUnit(roomType.id, data.checkIn, data.checkOut);
      if (!unit) {
        throw new Error("UNAVAILABLE");
      }

      // Re-check inside transaction against overlapping confirmed/pending
      const conflict = await tx.reservation.findFirst({
        where: {
          roomUnitId: unit.id,
          status: { in: ["PENDING", "CONFIRMED_DEMO"] },
          checkIn: { lt: data.checkOut },
          checkOut: { gt: data.checkIn },
        },
      });
      if (conflict) {
        throw new Error("UNAVAILABLE");
      }

      const pricing = calculateStayPrice(
        roomType.basePriceBan,
        data.checkIn,
        data.checkOut,
        roomType.priceRules,
      );

      const reservation = await tx.reservation.create({
        data: {
          reference: generateReference(),
          roomUnitId: unit.id,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          guestCount: data.guestCount,
          nights: pricing.nights,
          subtotalBan: pricing.subtotalBan,
          feesBan: pricing.feesBan,
          totalBan: pricing.totalBan,
          status: "CONFIRMED_DEMO",
          specialRequests: data.specialRequests || null,
          guest: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            },
          },
        },
        include: {
          guest: true,
          roomUnit: { include: { roomType: true } },
        },
      });

      return reservation;
    });

    return NextResponse.json({
      ok: true,
      message: "Rezervarea demonstrativă a fost înregistrată cu succes.",
      reservation: {
        reference: result.reference,
        checkIn: result.checkIn,
        checkOut: result.checkOut,
        guestCount: result.guestCount,
        nights: result.nights,
        totalBan: result.totalBan,
        roomName: result.roomUnit.roomType.name,
        guestName: `${result.guest?.firstName} ${result.guest?.lastName}`,
      },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (code === "UNAVAILABLE") {
      return NextResponse.json(
        { ok: false, message: "Camera nu mai este disponibilă pentru intervalul selectat." },
        { status: 409 },
      );
    }
    if (code === "CAPACITY") {
      return NextResponse.json(
        { ok: false, message: "Numărul de oaspeți nu se potrivește cu capacitatea camerei." },
        { status: 400 },
      );
    }
    if (code === "ROOM_NOT_FOUND") {
      return NextResponse.json({ ok: false, message: "Camera selectată nu există." }, { status: 404 });
    }
    return NextResponse.json(
      { ok: false, message: "Nu am putut finaliza rezervarea demonstrativă." },
      { status: 500 },
    );
  }
}
