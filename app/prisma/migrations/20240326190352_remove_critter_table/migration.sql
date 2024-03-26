/*
  Warnings:

  - You are about to drop the `Critter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCritter" DROP CONSTRAINT "UserCritter_critterId_fkey";

-- DropTable
DROP TABLE "Critter";
