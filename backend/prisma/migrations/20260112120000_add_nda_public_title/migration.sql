-- Add ndaPublicTitle field for NDA cases
-- This field will be shown to users without access instead of the sensitive case title

ALTER TABLE "cases" ADD COLUMN "ndaPublicTitle" TEXT;
