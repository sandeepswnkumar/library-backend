/*
  Warnings:

  - You are about to drop the column `grossAmount` on the `BookingDetails` table. All the data in the column will be lost.
  - You are about to drop the column `roomTypeId` on the `BookingDetails` table. All the data in the column will be lost.
  - Added the required column `bookingAmount` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftPeriod` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "dueOn" DROP NOT NULL,
ALTER COLUMN "isSubscription" SET DEFAULT false,
ALTER COLUMN "nextDueOn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BookingDetails" DROP COLUMN "grossAmount",
DROP COLUMN "roomTypeId",
ADD COLUMN     "bookingAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "roomType" TEXT NOT NULL,
ADD COLUMN     "shiftPeriod" TEXT NOT NULL,
ALTER COLUMN "rate" SET DEFAULT 0,
ALTER COLUMN "noOfUnit" SET DEFAULT 0,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "igst" SET DEFAULT 0,
ALTER COLUMN "paidAmount" SET DEFAULT 0,
ALTER COLUMN "sgst" SET DEFAULT 0,
ALTER COLUMN "totalAmount" SET DEFAULT 0;
