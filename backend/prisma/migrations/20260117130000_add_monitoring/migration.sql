-- Create monitoring settings table
CREATE TABLE "monitoring_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "botToken" TEXT,
    "allowedChatIdsJson" TEXT NOT NULL DEFAULT '[]',
    "dailySummaryHour" INTEGER NOT NULL DEFAULT 22,
    "lastDailySummaryDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitoring_settings_pkey" PRIMARY KEY ("id")
);

-- Create monitoring events table
CREATE TABLE "monitoring_events" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitoring_events_pkey" PRIMARY KEY ("id")
);

-- Create monitoring sessions table
CREATE TABLE "monitoring_sessions" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "lastEventAt" TIMESTAMP(3) NOT NULL,
    "actionsJson" TEXT NOT NULL,
    "userAgent" TEXT,
    "reportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitoring_sessions_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX "monitoring_events_ip_createdAt_idx" ON "monitoring_events"("ip", "createdAt");
CREATE INDEX "monitoring_sessions_ip_lastEventAt_idx" ON "monitoring_sessions"("ip", "lastEventAt");
