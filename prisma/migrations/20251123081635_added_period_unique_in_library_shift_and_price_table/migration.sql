/*
  Warnings:

  - A unique constraint covering the columns `[libraryId,libraryLocationId,libraryRoomTypeId,libraryBookingUnitId,period]` on the table `LibraryShiftAndPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LibraryShiftAndPrice_libraryId_libraryLocationId_libraryRoo_key";

-- CreateIndex
CREATE UNIQUE INDEX "LibraryShiftAndPrice_libraryId_libraryLocationId_libraryRoo_key" ON "LibraryShiftAndPrice"("libraryId", "libraryLocationId", "libraryRoomTypeId", "libraryBookingUnitId", "period");
