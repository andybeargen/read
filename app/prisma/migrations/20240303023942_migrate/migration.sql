/*
  Warnings:

  - The `image` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `file` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "file" BYTEA NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL,
DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;
