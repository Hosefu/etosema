-- Move logo fields from profiles to design_system
-- SVG logos should be part of design system, not profile

-- Add logo fields to design_system
ALTER TABLE "design_system" ADD COLUMN "logoSvgUrl" TEXT;
ALTER TABLE "design_system" ADD COLUMN "logoSvgMaskUrl" TEXT;
ALTER TABLE "design_system" ADD COLUMN "logoText" TEXT;

-- Copy existing logo data from profiles to design_system (if exists)
UPDATE "design_system" 
SET "logoSvgUrl" = (SELECT "logoSvgUrl" FROM "profiles" WHERE id = 1),
    "logoSvgMaskUrl" = (SELECT "logoSvgMaskUrl" FROM "profiles" WHERE id = 1),
    "logoText" = (SELECT "logoText" FROM "profiles" WHERE id = 1)
WHERE id = 1;

-- Remove logo fields from profiles (keep old logoUrl for backward compatibility during migration)
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "logoSvgUrl";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "logoSvgMaskUrl";
