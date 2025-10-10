/*
  Warnings:

  - Added the required column `stateId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UserDetails" DROP CONSTRAINT "UserDetails_cityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserDetails" DROP CONSTRAINT "UserDetails_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserDetails" DROP CONSTRAINT "UserDetails_stateId_fkey";

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "stateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "iso2" TEXT,
ADD COLUMN     "iso3" TEXT,
ADD COLUMN     "phonecode" TEXT;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
