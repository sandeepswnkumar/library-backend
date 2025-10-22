/*
  Warnings:

  - A unique constraint covering the columns `[libraryName]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Library_libraryName_key" ON "Library"("libraryName");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
