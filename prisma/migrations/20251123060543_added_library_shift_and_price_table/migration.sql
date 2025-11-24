/*
  Warnings:

  - You are about to drop the `LibraryShifts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LibraryShifts" DROP CONSTRAINT "LibraryShifts_bookingUnitId_fkey";

-- DropForeignKey
ALTER TABLE "LibraryShifts" DROP CONSTRAINT "LibraryShifts_libraryLocationId_fkey";

-- DropForeignKey
ALTER TABLE "LibraryShifts" DROP CONSTRAINT "LibraryShifts_roomTypeId_fkey";

-- DropTable
DROP TABLE "LibraryShifts";

-- CreateTable
CREATE TABLE "LibraryShiftAndPrice" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryLocationId" INTEGER NOT NULL,
    "libraryRoomTypeId" INTEGER NOT NULL,
    "libraryBookingUnitId" INTEGER NOT NULL,
    "period" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LibraryShiftAndPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryShiftAndPrice_libraryId_libraryLocationId_libraryRoo_key" ON "LibraryShiftAndPrice"("libraryId", "libraryLocationId", "libraryRoomTypeId", "libraryBookingUnitId");

-- AddForeignKey
ALTER TABLE "LibraryShiftAndPrice" ADD CONSTRAINT "LibraryShiftAndPrice_libraryLocationId_fkey" FOREIGN KEY ("libraryLocationId") REFERENCES "LibraryLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryShiftAndPrice" ADD CONSTRAINT "LibraryShiftAndPrice_libraryRoomTypeId_fkey" FOREIGN KEY ("libraryRoomTypeId") REFERENCES "LibraryRoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryShiftAndPrice" ADD CONSTRAINT "LibraryShiftAndPrice_libraryBookingUnitId_fkey" FOREIGN KEY ("libraryBookingUnitId") REFERENCES "LibraryBookingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
