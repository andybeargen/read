/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Critter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Critter_name_key" ON "Critter"("name");
