import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.reservationGuest.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.availabilityBlock.deleteMany();
  await prisma.roomAmenity.deleteMany();
  await prisma.roomImage.deleteMany();
  await prisma.roomUnit.deleteMany();
  await prisma.priceRule.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.experienceInquiry.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.adminSession.deleteMany();
  await prisma.adminUser.deleteMany();

  const rooms = [
    {
      slug: "forest-room",
      name: "Forest Room",
      shortName: "Forest",
      description:
        "O cameră caldă, cu texturi naturale și priveliște spre pădure, creată pentru dimineți lente.",
      longDescription:
        "Forest Room te întâmpină cu lemn deschis, textile crem și o fereastră generoasă spre pădure. Spațiul este gândit pentru odihnă, lectură și momente liniștite, cu lumină caldă și detalii scandinave.",
      capacityMin: 1,
      capacityMax: 2,
      areaSqm: 28,
      basePriceBan: 89000,
      viewType: "pădure",
      sortOrder: 1,
      featured: true,
      units: 2,
      image: "/images/rooms/forest-primary.jpg",
      amenities: ["Pat king", "Baie privată", "Priveliște pădure", "Wi-Fi", "Minibar"],
    },
    {
      slug: "mountain-view-suite",
      name: "Mountain View Suite",
      shortName: "Mountain View",
      description:
        "Suită spațioasă cu ferestre panoramice și priveliște largă spre crestele munților.",
      longDescription:
        "Mountain View Suite deschide peisajul montan prin ferestre ample. Lounge-ul mic și zona de dormit se întâlnesc într-o atmosferă aerisită, ideală pentru cupluri care caută confort și orizont.",
      capacityMin: 2,
      capacityMax: 3,
      areaSqm: 42,
      basePriceBan: 129000,
      viewType: "munte",
      sortOrder: 2,
      featured: true,
      units: 2,
      image: "/images/rooms/mountain-suite-primary.jpg",
      amenities: ["Pat king", "Lounge", "Baie cu duș ploaie", "Priveliște munte", "Terasă"],
    },
    {
      slug: "panorama-loft",
      name: "Panorama Loft",
      shortName: "Panorama",
      description:
        "Suită la etaj, cu geamuri generoase și o atmosferă contemporană, aproape de cer.",
      longDescription:
        "Panorama Loft ocupă un nivel superior al lodjei, cu ferestre înalte și mobilier rafinat. Este locul potrivit pentru sejururi mai lungi, în care peisajul rămâne parte din ritmul zilei.",
      capacityMin: 2,
      capacityMax: 4,
      areaSqm: 55,
      basePriceBan: 169000,
      viewType: "panoramă",
      sortOrder: 3,
      featured: true,
      units: 1,
      image: "/images/rooms/panorama-loft-primary.jpg",
      amenities: ["Pat king", "Zonă living", "Baie spațioasă", "Priveliște panoramă", "Espressor"],
    },
    {
      slug: "signature-residence",
      name: "Signature Residence",
      shortName: "Signature",
      description:
        "Cea mai generoasă cazare VELTRA, cu lounge, confort elevat și intimitate totală.",
      longDescription:
        "Signature Residence este gândită pentru grupuri mici sau sejururi speciale. Spațiile ample, lounge-ul și detaliile premium creează o experiență de rezidență, nu doar o cameră de hotel.",
      capacityMin: 2,
      capacityMax: 6,
      areaSqm: 78,
      basePriceBan: 239000,
      viewType: "munte și pădure",
      sortOrder: 4,
      featured: false,
      units: 1,
      image: "/images/rooms/signature-residence-primary.jpg",
      amenities: [
        "Două zone de dormit",
        "Lounge generos",
        "Baie dublă",
        "Priveliște munte",
        "Terasă privată",
      ],
    },
  ];

  for (const room of rooms) {
    const created = await prisma.roomType.create({
      data: {
        slug: room.slug,
        name: room.name,
        shortName: room.shortName,
        description: room.description,
        longDescription: room.longDescription,
        capacityMin: room.capacityMin,
        capacityMax: room.capacityMax,
        areaSqm: room.areaSqm,
        basePriceBan: room.basePriceBan,
        viewType: room.viewType,
        sortOrder: room.sortOrder,
        featured: room.featured,
        amenities: {
          create: room.amenities.map((label) => ({ label })),
        },
        images: {
          create: [
            {
              src: room.image,
              alt: `${room.name} la VELTRA`,
              isPrimary: true,
              sortOrder: 0,
            },
          ],
        },
        units: {
          create: Array.from({ length: room.units }, (_, i) => ({
            label: `${room.shortName} ${i + 1}`,
          })),
        },
        priceRules: {
          create: [
            {
              name: "Sezon de iarnă",
              type: "seasonal_percent",
              amountBan: 0,
              percentBps: 1500,
              startMonth: 12,
              endMonth: 2,
            },
            {
              name: "Weekend",
              type: "weekend_percent",
              amountBan: 0,
              percentBps: 800,
              weekendOnly: true,
            },
          ],
        },
      },
      include: { units: true },
    });

    // Seed a few demo reservations to create unavailable windows
    if (created.units[0]) {
      const start = new Date();
      start.setMonth(start.getMonth() + 2);
      const y = start.getFullYear();
      const m = String(start.getMonth() + 1).padStart(2, "0");
      await prisma.reservation.create({
        data: {
          reference: `VEL-DEMO-${created.slug.slice(0, 4).toUpperCase()}`,
          roomUnitId: created.units[0].id,
          checkIn: `${y}-${m}-10`,
          checkOut: `${y}-${m}-14`,
          guestCount: 2,
          nights: 4,
          subtotalBan: room.basePriceBan * 4,
          totalBan: room.basePriceBan * 4,
          status: "CONFIRMED_DEMO",
          guest: {
            create: {
              firstName: "Ana",
              lastName: "Demo",
              email: "ana.demo@veltra.demo",
              phone: "+40 700 000 000",
            },
          },
        },
      });
    }
  }

  const experiences = [
    {
      slug: "drumetii-montane",
      name: "Drumeții montane",
      category: "natura",
      description: "Trasee ghidate printre păduri și creste, în ritmul tău.",
      longDescription:
        "Pornim pe poteci de pădure și creste deschise, cu opriri pentru peisaj și respirație. Experiența este adaptată nivelului grupului și vremii zilei.",
      duration: "3–6 ore",
      difficulty: "Ușor până la moderat",
      suitableFor: "Cupluri, familii, grupuri mici",
      imageSrc: "/images/experiences/hiking.jpg",
      imageAlt: "Drumeție montană în zona VELTRA",
      sortOrder: 1,
    },
    {
      slug: "tururi-cu-bicicleta",
      name: "Tururi cu bicicleta",
      category: "aventura",
      description: "Rute de mountain bike prin pădure și drumuri de creastă.",
      longDescription:
        "Explorezi trasee de pădure și drumuri montane pe bicicletă, cu pauze pentru priveliști și hidratare. Echipament de bază poate fi pregătit la cerere.",
      duration: "2–4 ore",
      difficulty: "Moderat",
      suitableFor: "Adulți și adolescenți",
      imageSrc: "/images/experiences/cycling.jpg",
      imageAlt: "Tur cu bicicleta pe traseu montan",
      sortOrder: 2,
    },
    {
      slug: "tururi-cu-atv",
      name: "Tururi cu ATV",
      category: "aventura",
      description: "Excursii pe drumuri de pădure, cu peisaje care se schimbă rapid.",
      longDescription:
        "Tururile cu ATV urmează drumuri forestiere și poteci largi, cu opriri în puncte de belvedere. Activitatea este demonstrativă și necesită echipament de protecție.",
      duration: "1.5–3 ore",
      difficulty: "Moderat",
      suitableFor: "Adulți",
      imageSrc: "/images/experiences/atv.jpg",
      imageAlt: "Tur cu ATV prin pădure",
      sortOrder: 3,
    },
    {
      slug: "seri-la-foc",
      name: "Seri la foc de tabără",
      category: "relaxare",
      description: "Seri lungi, povești bune și foc aprins sub cerul montan.",
      longDescription:
        "În jurul focului, seara se desfășoară lent: băuturi calde, conversații și lumina flăcărilor. Ideal după o zi de explorare sau o sesiune de wellness.",
      duration: "2–3 ore",
      difficulty: null,
      suitableFor: "Toți oaspeții",
      imageSrc: "/images/experiences/campfire.jpg",
      imageAlt: "Foc de tabără seara la VELTRA",
      sortOrder: 4,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@veltra.demo";
  const password = process.env.ADMIN_PASSWORD ?? "VeltraDemo2026!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name: "Administrator VELTRA",
      role: "admin",
    },
  });

  console.log("Seed completed.");
  console.log(`Admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
