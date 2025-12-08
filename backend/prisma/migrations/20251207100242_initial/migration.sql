/*
  Warnings:

  - You are about to drop the column `previewUrlsJson` on the `cases` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT,
    "year" INTEGER NOT NULL,
    "summary" TEXT,
    "isNda" BOOLEAN NOT NULL DEFAULT false,
    "coverUrl" TEXT NOT NULL,
    "orderRank" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_cases" ("coverUrl", "createdAt", "id", "isNda", "orderRank", "shortTitle", "slug", "summary", "title", "updatedAt", "year") SELECT "coverUrl", "createdAt", "id", "isNda", "orderRank", "shortTitle", "slug", "summary", "title", "updatedAt", "year" FROM "cases";
DROP TABLE "cases";
ALTER TABLE "new_cases" RENAME TO "cases";
CREATE UNIQUE INDEX "cases_slug_key" ON "cases"("slug");
CREATE INDEX "cases_orderRank_idx" ON "cases"("orderRank");
CREATE INDEX "cases_isNda_idx" ON "cases"("isNda");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
