-- Add CV fields to profiles
ALTER TABLE "profiles"
  ADD COLUMN "cvDocxUrl" TEXT,
  ADD COLUMN "cvPdfUrl" TEXT,
  ADD COLUMN "cvHhUrl" TEXT,
  ADD COLUMN "cvHabrUrl" TEXT,
  ADD COLUMN "cvDocxEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "cvPdfEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "cvHhEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "cvHabrEnabled" BOOLEAN NOT NULL DEFAULT false;
