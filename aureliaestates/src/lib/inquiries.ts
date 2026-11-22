import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export type InquiryKind = "contact" | "viewing" | "seller";

type InquiryRecord = {
  id: string;
  kind: InquiryKind;
  createdAt: string;
  delivery: string;
  payload: unknown;
};

type PrismaLike = {
  contactMessage: {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  };
  viewingRequest: {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  };
  sellerInquiry: {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  };
  $disconnect: () => Promise<void>;
};

const deliveryNote = "Niciun email nu a fost trimis. Înregistrare de demonstrație.";

function createReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return `AE${code}`;
}

async function loadPrisma(): Promise<PrismaLike | null> {
  const base = path.join(process.cwd(), "src", "generated", "prisma");
  const candidates = ["client.js", "index.js", "default.js"].map((file) =>
    path.join(base, file),
  );

  let entry: string | undefined;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      entry = candidate;
      break;
    } catch {
      continue;
    }
  }

  if (!entry) return null;

  try {
    const loader = new Function(
      "specifier",
      "return import(specifier);",
    ) as (specifier: string) => Promise<{ PrismaClient: new () => PrismaLike }>;
    const imported = await loader(pathToFileURL(entry).href);
    return new imported.PrismaClient();
  } catch {
    return null;
  }
}

async function saveWithPrisma(record: InquiryRecord) {
  const prisma = await loadPrisma();
  if (!prisma) return false;

  const payload = record.payload as Record<string, unknown>;

  try {
    if (record.kind === "contact") {
      await prisma.contactMessage.create({
        data: {
          id: record.id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone || null,
          subject: payload.subject || null,
          message: payload.message,
        },
      });
    } else if (record.kind === "viewing") {
      await prisma.viewingRequest.create({
        data: {
          id: record.id,
          propertyId: payload.propertyId,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message || "",
          preferredDate: payload.preferredDate,
          preferredTime: payload.preferredTime,
          status: "noua",
        },
      });
    } else {
      await prisma.sellerInquiry.create({
        data: {
          id: record.id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          location: payload.location || "",
          propertyCategory: payload.propertyCategory || "",
          estimatedArea: payload.estimatedArea ?? null,
          message: payload.message,
        },
      });
    }
    return true;
  } catch {
    return false;
  } finally {
    await prisma.$disconnect().catch(() => undefined);
  }
}

async function appendJson(record: InquiryRecord) {
  const directory = path.join(process.cwd(), "prisma", "data");
  const file = path.join(directory, "inquiries.json");
  await mkdir(directory, { recursive: true });

  let current: InquiryRecord[] = [];
  try {
    const raw = await readFile(file, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) current = parsed as InquiryRecord[];
  } catch {
    current = [];
  }

  current.push(record);
  await writeFile(file, `${JSON.stringify(current, null, 2)}\n`, "utf8");
}

export async function persistInquiry(kind: InquiryKind, payload: unknown) {
  const record: InquiryRecord = {
    id: createReference(),
    kind,
    createdAt: new Date().toISOString(),
    delivery: deliveryNote,
    payload,
  };

  const saved = await saveWithPrisma(record);
  if (!saved) await appendJson(record);
  return record.id;
}
