-- AlterTable
ALTER TABLE "BookingDetails" ADD COLUMN     "bookingShiftId" INTEGER;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_bookingShiftId_fkey" FOREIGN KEY ("bookingShiftId") REFERENCES "LibraryShiftAndPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
