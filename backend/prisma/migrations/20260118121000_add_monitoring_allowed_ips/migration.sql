ALTER TABLE "monitoring_settings"
ADD COLUMN "allowedIpsJson" TEXT NOT NULL DEFAULT '[]';
