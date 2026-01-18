-- Add PIN context to monitoring events
ALTER TABLE "monitoring_events"
ADD COLUMN "pinId" TEXT,
ADD COLUMN "pinLabel" TEXT;

CREATE INDEX "monitoring_events_pinId_createdAt_idx"
ON "monitoring_events"("pinId", "createdAt");

-- Add PIN context to monitoring sessions
ALTER TABLE "monitoring_sessions"
ADD COLUMN "pinId" TEXT,
ADD COLUMN "pinLabel" TEXT;

CREATE INDEX "monitoring_sessions_pinId_lastEventAt_idx"
ON "monitoring_sessions"("pinId", "lastEventAt");
