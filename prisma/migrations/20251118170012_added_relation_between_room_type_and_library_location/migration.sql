/*
  Warnings:

  - You are about to drop the `_LibraryLocationToLibraryRoomType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LibraryLocationToLibraryRoomType" DROP CONSTRAINT "_LibraryLocationToLibraryRoomType_A_fkey";

-- DropForeignKey
ALTER TABLE "_LibraryLocationToLibraryRoomType" DROP CONSTRAINT "_LibraryLocationToLibraryRoomType_B_fkey";

-- DropTable
DROP TABLE "_LibraryLocationToLibraryRoomType";

-- AddForeignKey
ALTER TABLE "LibraryRoomType" ADD CONSTRAINT "LibraryRoomType_libraryLocationId_fkey" FOREIGN KEY ("libraryLocationId") REFERENCES "LibraryLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
