/*
  Warnings:

  - You are about to drop the `CountryRule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CountryRule";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CountryRules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryRules_country_key" ON "CountryRules"("country");
