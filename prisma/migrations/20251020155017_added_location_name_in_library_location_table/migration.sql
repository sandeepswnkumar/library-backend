/*
  Warnings:

  - Added the required column `locationName` to the `LibraryLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LibraryLocation" ADD COLUMN     "locationName" TEXT NOT NULL;
