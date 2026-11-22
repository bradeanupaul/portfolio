import { generateFutureDemoSlots } from "../src/lib/booking/slots";
import { prisma } from "../src/lib/db/prisma";

async function main() {
  const deleted = await prisma.demoSlot.deleteMany({
    where: { isBooked: false },
  });

  const slots = generateFutureDemoSlots();
  const created = await prisma.demoSlot.createMany({
    data: slots,
  });

  console.log(
    JSON.stringify({
      seed: "demo-slots",
      removedUnbooked: deleted.count,
      inserted: created.count,
      generated: slots.length,
    }),
  );
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });