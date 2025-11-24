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
      users: true,
      bookings: true,
      roomTypes: true,
      libraryBookingUnit: true,
      libraryShifts: {
        include: {
          roomType: true,
          bookingUnit: true
        }
      },
      libraryFacilities: {
        include: {
          facility: true
        }
      }
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
        users: true,
        bookings: true
      }
      : undefined,
  });
};


export const createLibraryRoomType = async (libraryRoomTypeData) => {
  return await prisma.libraryRoomType.create({
    data: libraryRoomTypeData,
  });
};
export const deleteLibraryRoomType = async (conditions) => {
  return await prisma.libraryRoomType.delete({
    where: conditions,
  });
};

export const islibraryRoomTypeExist = async (conditions) => {
  return await prisma.libraryRoomType.findFirst({
    where: conditions
  });
};

export const libraryRoomType = async () => {
  return await prisma.libraryRoomType.findMany();
};

export const createLibraryBookingUnit = async (libraryRoomTypeData) => {
  return await prisma.libraryBookingUnit.create({
    data: libraryRoomTypeData,
  });
};

export const deleteLibraryBookingUnit = async (conditions) => {
  return await prisma.libraryBookingUnit.delete({
    where: conditions,
  });
};

export const islibraryBookingUnitExist = async (conditions) => {
  return await prisma.libraryBookingUnit.findFirst({
    where: conditions
  });
};

export const libraryBookingUnit = async () => {
  return await prisma.libraryBookingUnit.findMany();
};

