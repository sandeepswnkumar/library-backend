import { prisma } from "../prismaClient.js";

export const createLibraryLocation = async (libraryData) => {
  return await prisma.libraryLocation.create({
    data: libraryData,
  });
};

export const updateLibraryLocation = async (libraryLocationId, libraryData) => {
  return await prisma.libraryLocation.update({
    where: { id: libraryLocationId },
    data: { ...libraryData },
  });
};

// Soft Delete a LibraryLocation
export const deleteLibraryLocation = async (locationId, locationData) => {
  // This assumes you're doing a soft delete by setting `deletedAt`, `isActive = false`, etc.
  return await prisma.libraryLocation.update({
    where: { id: locationId },
    data: { ...locationData },
  });
};

// Check if a LibraryLocation exists
export const libraryLocationExists = async (locationId) => {
  return await prisma.libraryLocation.findUnique({
    where: { id: locationId },
  });
};

// Get a single LibraryLocation (with related data)
export const getLibraryLocation = async (locationId) => {
  return await prisma.libraryLocation.findFirst({
    where: { id: locationId },
    include: {
      library: true,
      city: true,
      state: true,
      country: true,
      facilities: true,
      users: true,
      bookings: true,
    },
  });
};

// Get multiple LibraryLocations with optional conditions & pagination
export const getLibraryLocations = async (
  { conditions, pagination },
  includeChilds = false
) => {
  return await prisma.libraryLocation.findMany({
    where: { ...conditions },
    ...pagination,
    include: includeChilds
      ? {
        library: true,
        city: true,
        state: true,
        country: true,
        facilities: true,
        users: true,
        bookings: true,
      }
      : undefined,
  });
};
