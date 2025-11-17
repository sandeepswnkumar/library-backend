/*
  Warnings:

  - You are about to drop the column `amount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `BookingDetails` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `BookingDetails` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPagePermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId,pageId,permissionId]` on the table `UserPagePermission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dueOn` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSubscription` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextDueOn` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grossAmount` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `igst` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTypeId` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sgst` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `BookingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'ERROR', 'WARNING');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH');

-- DropForeignKey
ALTER TABLE "public"."UserPagePermission" DROP CONSTRAINT "UserPagePermission_userId_fkey";

-- DropIndex
DROP INDEX "public"."UserPagePermission_userId_pageId_permissionId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "amount",
ADD COLUMN     "dueOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isSubscription" BOOLEAN NOT NULL,
ADD COLUMN     "nextDueOn" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BookingDetails" DROP COLUMN "start_date",
DROP COLUMN "start_time",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "grossAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "igst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roomTypeId" INTEGER NOT NULL,
ADD COLUMN     "sgst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "LibraryLocation" ADD COLUMN     "libraryBookingId" INTEGER;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paidAt",
ADD COLUMN     "invoiceId" INTEGER,
ADD COLUMN     "maxRetries" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "nextRetryAt" TIMESTAMP(3),
ADD COLUMN     "paidOn" TIMESTAMP(3),
ADD COLUMN     "paymentFor" TEXT,
ADD COLUMN     "retryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscriptionId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isMpin" BOOLEAN DEFAULT false,
ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3),
ADD COLUMN     "roleId" INTEGER,
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserDetails" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "fullName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserPagePermission" DROP COLUMN "userId",
ADD COLUMN     "roleId" INTEGER;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "nextBillingOn" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "amountPerCycle" DOUBLE PRECISION NOT NULL,
    "cycleUnit" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "subscriptionId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "cgstPercent" DOUBLE PRECISION,
    "cgstAmount" DOUBLE PRECISION,
    "sgstPercent" DOUBLE PRECISION,
    "sgstAmount" DOUBLE PRECISION,
    "igstPercent" DOUBLE PRECISION,
    "igstAmount" DOUBLE PRECISION,
    "totalTax" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidOn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryBooking" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryLocationId" INTEGER NOT NULL,
    "bookingUnitId" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LibraryBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "paymentId" INTEGER,
    "subscriptionId" INTEGER,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel"[],
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToPayment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InvoiceToPayment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_bookingId_key" ON "Subscription"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "_InvoiceToPayment_B_index" ON "_InvoiceToPayment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "UserPagePermission_roleId_pageId_permissionId_key" ON "UserPagePermission"("roleId", "pageId", "permissionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryLocation" ADD CONSTRAINT "LibraryLocation_libraryBookingId_fkey" FOREIGN KEY ("libraryBookingId") REFERENCES "LibraryBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBooking" ADD CONSTRAINT "LibraryBooking_bookingUnitId_fkey" FOREIGN KEY ("bookingUnitId") REFERENCES "BookingUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPagePermission" ADD CONSTRAINT "UserPagePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToPayment" ADD CONSTRAINT "_InvoiceToPayment_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToPayment" ADD CONSTRAINT "_InvoiceToPayment_B_fkey" FOREIGN KEY ("B") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
