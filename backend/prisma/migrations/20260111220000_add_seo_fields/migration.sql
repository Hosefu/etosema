-- Add SEO fields for cases and global design system

ALTER TABLE "cases" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "cases" ADD COLUMN "seoDescription" TEXT;

ALTER TABLE "design_system" ADD COLUMN "seo" TEXT;

