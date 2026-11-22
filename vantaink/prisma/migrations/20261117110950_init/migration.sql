-- CreateTable
CREATE TABLE "DemoSlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artistSlug" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL,
    "label" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ConsultationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceId" TEXT NOT NULL,
    "artistSlug" TEXT NOT NULL,
    "styleSlugs" TEXT NOT NULL,
    "placement" TEXT NOT NULL,
    "approximateSize" TEXT NOT NULL,
    "ideaDescription" TEXT NOT NULL,
    "preferredPeriod" TEXT,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "demoAcknowledged" BOOLEAN NOT NULL,
    "slotId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'received',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsultationRequest_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "DemoSlot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "demoAck" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "DemoSlot_artistSlug_startsAt_idx" ON "DemoSlot"("artistSlug", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "DemoSlot_artistSlug_startsAt_key" ON "DemoSlot"("artistSlug", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationRequest_referenceId_key" ON "ConsultationRequest"("referenceId");

-- CreateIndex
CREATE INDEX "ConsultationRequest_artistSlug_slotId_idx" ON "ConsultationRequest"("artistSlug", "slotId");

-- CreateIndex
CREATE INDEX "ConsultationRequest_contactEmail_idx" ON "ConsultationRequest"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ContactRequest_referenceId_key" ON "ContactRequest"("referenceId");
