/*
  Warnings:

  - You are about to drop the column `libraryBookingId` on the `LibraryLocation` table. All the data in the column will be lost.
  - You are about to drop the `LibraryBooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."LibraryBooking" DROP CONSTRAINT "LibraryBooking_bookingUnitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LibraryLocation" DROP CONSTRAINT "LibraryLocation_libraryBookingId_fkey";

-- AlterTable
ALTER TABLE "LibraryLocation" DROP COLUMN "libraryBookingId",
ADD COLUMN     "libraryShiftId" INTEGER;

-- DropTable
DROP TABLE "public"."LibraryBooking";

-- CreateTable
CREATE TABLE "LibraryShifts" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryLocationId" INTEGER NOT NULL,
    "roomTypeId" INTEGER NOT NULL,
    "bookingUnitId" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LibraryShifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryRoomType" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryLocationId" INTEGER NOT NULL,
    "roomType" TEXT NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LibraryRoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LibraryLocationToLibraryRoomType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LibraryLocationToLibraryRoomType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibraryShifts_libraryId_libraryLocationId_roomTypeId_bookin_key" ON "LibraryShifts"("libraryId", "libraryLocationId", "roomTypeId", "bookingUnitId");

-- CreateIndex
CREATE INDEX "_LibraryLocationToLibraryRoomType_B_index" ON "_LibraryLocationToLibraryRoomType"("B");

-- AddForeignKey
ALTER TABLE "LibraryShifts" ADD CONSTRAINT "LibraryShifts_bookingUnitId_fkey" FOREIGN KEY ("bookingUnitId") REFERENCES "BookingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryShifts" ADD CONSTRAINT "LibraryShifts_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "LibraryRoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryShifts" ADD CONSTRAINT "LibraryShifts_libraryLocationId_fkey" FOREIGN KEY ("libraryLocationId") REFERENCES "LibraryLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryLocationToLibraryRoomType" ADD CONSTRAINT "_LibraryLocationToLibraryRoomType_A_fkey" FOREIGN KEY ("A") REFERENCES "LibraryLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryLocationToLibraryRoomType" ADD CONSTRAINT "_LibraryLocationToLibraryRoomType_B_fkey" FOREIGN KEY ("B") REFERENCES "LibraryRoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
