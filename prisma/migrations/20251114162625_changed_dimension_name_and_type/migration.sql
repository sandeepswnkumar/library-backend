/*
  Warnings:

  - You are about to drop the column `diamension` on the `Library` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "diamension",
ADD COLUMN     "dimension" INTEGER;
