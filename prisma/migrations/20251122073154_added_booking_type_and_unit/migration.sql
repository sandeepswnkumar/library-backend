-- DropForeignKey
ALTER TABLE "LibraryShifts" DROP CONSTRAINT "LibraryShifts_bookingUnitId_fkey";


-- CreateTable
CREATE TABLE "BookingType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryBookingUnit" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryLocationId" INTEGER NOT NULL,
    "bookingUnit" TEXT NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LibraryBookingUnit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LibraryShifts" ADD CONSTRAINT "LibraryShifts_bookingUnitId_fkey" FOREIGN KEY ("bookingUnitId") REFERENCES "LibraryBookingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBookingUnit" ADD CONSTRAINT "LibraryBookingUnit_libraryLocationId_fkey" FOREIGN KEY ("libraryLocationId") REFERENCES "LibraryLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
