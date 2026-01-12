-- Add borderRadius field to design_system
-- This will contain JSON config for outer/inner card radius and media radius

ALTER TABLE "design_system" ADD COLUMN "borderRadius" TEXT;

-- Set default values
UPDATE "design_system" 
SET "borderRadius" = '{"cardOuter":20,"cardInner":12,"media":8}'::text
WHERE id = 1;
