import { prisma } from "../prismaClient.js";

// Create a new Library Facility
export const createLibraryFacility = async (facilityData) => {
  return await prisma.libraryFacility.create({
    data: facilityData,
  });
};

// Update an existing Library Facility
export const updateLibraryFacility = async (facilityId, facilityData) => {
  return await prisma.libraryFacility.update({
    where: { id: facilityId },
    data: { ...facilityData },
  });
};

// Soft delete a Library Facility
export const deleteLibraryFacility = async (facilityId, facilityData) => {
  return await prisma.libraryFacility.update({
    where: { id: facilityId },
    data: { ...facilityData },
  });
};

// Get a single Library Facility by ID
export const getLibraryFacility = async (facilityId) => {
  return await prisma.libraryFacility.findFirst({
    where: { id: facilityId },
    include: {
      library: true,
      location: true,
    },
  });
};

// Get multiple Library Facilities with filters and pagination
export const getLibraryFacilities = async (
  { conditions, pagination },
  includeChilds = false
) => {
  return await prisma.libraryFacility.findMany({
    where: { ...conditions },
    ...pagination,
    include: includeChilds
      ? {
          library: true,
          location: true,
        }
      : undefined,
  });
};
