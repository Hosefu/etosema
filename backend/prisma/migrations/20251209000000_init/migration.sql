-- CreateTable
CREATE TABLE "cases" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT,
    "year" INTEGER NOT NULL,
    "summary" TEXT,
    "isNda" BOOLEAN NOT NULL DEFAULT false,
    "orderRank" TEXT NOT NULL,
    "useCustomDesign" BOOLEAN NOT NULL DEFAULT false,
    "backgroundColor" TEXT,
    "textColor" TEXT,
    "fontFamily" TEXT,
    "settings" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_blocks" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'MEDIA',
    "content" TEXT,
    "settings" TEXT,
    "layout" TEXT NOT NULL,
    "orderRank" TEXT NOT NULL,

    CONSTRAINT "case_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_block_medias" (
    "id" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "aspectRatio" TEXT,

    CONSTRAINT "case_block_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pin_codes" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "codeHash" TEXT NOT NULL,
    "code" TEXT,
    "shortCode" TEXT,
    "accessAll" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pin_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pin_code_cases" (
    "pinCodeId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "pin_code_cases_pkey" PRIMARY KEY ("pinCodeId","caseId")
);

-- CreateTable
CREATE TABLE "pin_usages" (
    "id" TEXT NOT NULL,
    "pinCodeId" TEXT,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "success" BOOLEAN NOT NULL,
    "path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pin_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contactsJson" TEXT NOT NULL,
    "projectsJson" TEXT NOT NULL,
    "socialsJson" TEXT NOT NULL,
    "logoUrl" TEXT,
    "logoText" TEXT,
    "lockedCaseMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "design_system" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "typography" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "links" TEXT NOT NULL,
    "cards" TEXT,
    "grid" TEXT,
    "spacing" TEXT,
    "faviconUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "design_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fonts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "weight" TEXT NOT NULL DEFAULT '400',
    "style" TEXT NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fonts_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "pin_codes_shortCode_key" ON "pin_codes"("shortCode");

-- CreateIndex
CREATE INDEX "pin_codes_codeHash_idx" ON "pin_codes"("codeHash");

-- CreateIndex
CREATE INDEX "pin_usages_ip_createdAt_idx" ON "pin_usages"("ip", "createdAt");

-- CreateIndex
CREATE INDEX "pin_usages_pinCodeId_idx" ON "pin_usages"("pinCodeId");

-- AddForeignKey
ALTER TABLE "case_blocks" ADD CONSTRAINT "case_blocks_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_block_medias" ADD CONSTRAINT "case_block_medias_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "case_blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_code_cases" ADD CONSTRAINT "pin_code_cases_pinCodeId_fkey" FOREIGN KEY ("pinCodeId") REFERENCES "pin_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_code_cases" ADD CONSTRAINT "pin_code_cases_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_usages" ADD CONSTRAINT "pin_usages_pinCodeId_fkey" FOREIGN KEY ("pinCodeId") REFERENCES "pin_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

