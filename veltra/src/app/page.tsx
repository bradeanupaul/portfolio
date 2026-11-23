import { prisma } from "@/lib/db/client";
import { Hero } from "@/components/sections/Hero";
import { RoomsIntro } from "@/components/sections/RoomsIntro";
import { FacilitiesPreview } from "@/components/sections/FacilitiesPreview";
import { ExperiencesPreview } from "@/components/sections/ExperiencesPreview";
import { RestaurantPreview } from "@/components/sections/RestaurantPreview";
import { SpaPreview } from "@/components/sections/SpaPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { GuestStories } from "@/components/sections/GuestStories";
import { SurroundingsPreview } from "@/components/sections/SurroundingsPreview";
import { BookingCta } from "@/components/sections/BookingCta";
import { VeltraFloorExplorerLazy } from "@/components/sections/VeltraFloorExplorerLazy";

export default async function HomePage() {
  const rooms = await prisma.roomType.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  });

  const featured = rooms.map((room) => ({
    slug: room.slug,
    name: room.name,
    description: room.description,
    capacityMax: room.capacityMax,
    areaSqm: room.areaSqm,
    viewType: room.viewType,
    basePriceBan: room.basePriceBan,
    image: room.images[0]?.src ?? "/images/rooms/forest-primary.webp",
  }));

  return (
    <>
      <Hero />
      <FacilitiesPreview />
      <RoomsIntro rooms={featured} />
      <VeltraFloorExplorerLazy />
      <ExperiencesPreview />
      <RestaurantPreview />
      <SpaPreview />
      <GalleryPreview />
      <GuestStories />
      <SurroundingsPreview />
      <BookingCta />
    </>
  );
}
