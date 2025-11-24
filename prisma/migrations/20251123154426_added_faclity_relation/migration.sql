-- AddForeignKey
ALTER TABLE "LibraryFacility" ADD CONSTRAINT "LibraryFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
