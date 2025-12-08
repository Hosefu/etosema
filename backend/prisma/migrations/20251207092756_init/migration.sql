-- CreateTable
CREATE TABLE "cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT,
    "year" INTEGER NOT NULL,
    "summary" TEXT,
    "isNda" BOOLEAN NOT NULL DEFAULT false,
    "coverUrl" TEXT NOT NULL,
    "orderRank" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "case_blocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "orderRank" TEXT NOT NULL,
    CONSTRAINT "case_blocks_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "case_block_medias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blockId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    CONSTRAINT "case_block_medias_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "case_blocks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pin_codes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT,
    "codeHash" TEXT NOT NULL,
    "accessAll" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "pin_code_cases" (
    "pinCodeId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    PRIMARY KEY ("pinCodeId", "caseId"),
    CONSTRAINT "pin_code_cases_pinCodeId_fkey" FOREIGN KEY ("pinCodeId") REFERENCES "pin_codes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pin_code_cases_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pin_usages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pinCodeId" TEXT,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "success" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pin_usages_pinCodeId_fkey" FOREIGN KEY ("pinCodeId") REFERENCES "pin_codes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contactsJson" TEXT NOT NULL,
    "projectsJson" TEXT NOT NULL,
    "socialsJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cases_slug_key" ON "cases"("slug");

-- CreateIndex
CREATE INDEX "cases_orderRank_idx" ON "cases"("orderRank");

-- CreateIndex
CREATE INDEX "cases_isNda_idx" ON "cases"("isNda");

-- CreateIndex
CREATE INDEX "case_blocks_caseId_orderRank_idx" ON "case_blocks"("caseId", "orderRank");

-- CreateIndex
CREATE INDEX "case_block_medias_blockId_position_idx" ON "case_block_medias"("blockId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "pin_codes_codeHash_key" ON "pin_codes"("codeHash");

-- CreateIndex
CREATE INDEX "pin_codes_codeHash_idx" ON "pin_codes"("codeHash");

-- CreateIndex
CREATE INDEX "pin_usages_ip_createdAt_idx" ON "pin_usages"("ip", "createdAt");

-- CreateIndex
CREATE INDEX "pin_usages_pinCodeId_idx" ON "pin_usages"("pinCodeId");
