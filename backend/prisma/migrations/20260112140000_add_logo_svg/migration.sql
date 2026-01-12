-- Add logoSvgUrl and logoSvgMaskUrl for SVG logo support
-- SVG logos can be colored via CSS, PNG logos are deprecated

ALTER TABLE "profiles" ADD COLUMN "logoSvgUrl" TEXT;
ALTER TABLE "profiles" ADD COLUMN "logoSvgMaskUrl" TEXT;

-- Note: logoUrl will remain for backward compatibility but should be replaced with SVG
