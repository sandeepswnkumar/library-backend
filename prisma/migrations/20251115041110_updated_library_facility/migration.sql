/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `LibraryFacility` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `LibraryFacility` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[libraryId,libraryLocationId,facilityId]` on the table `LibraryFacility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facilityId` to the `LibraryFacility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LibraryFacility" DROP COLUMN "imageUrl",
DROP COLUMN "name",
ADD COLUMN     "facilityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LibraryFacility_libraryId_libraryLocationId_facilityId_key" ON "LibraryFacility"("libraryId", "libraryLocationId", "facilityId");
