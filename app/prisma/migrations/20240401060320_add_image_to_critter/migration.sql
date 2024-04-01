/*
  Warnings:

  - Added the required column `image` to the `Critter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Critter" ADD COLUMN     "image" TEXT NOT NULL;
