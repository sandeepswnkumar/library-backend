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

export const deleteLibrary = async (libraryId, libraryData) => {
  return await prisma.libraryLocation.update({
    where: { id: libraryId },
    data: { ...libraryData },
  });
};

export const libraryExists = async (libraryId) => {
  return await prisma.libraryLocation.findUnique({ where: { id: libraryId } });
};

export const getLibrary = async (libraryId) => {
  return await prisma.library.findFirst({
    where: { id: libraryId },
    include: {
      type: true,
      status: true,
      locations: true,
      facilities: true,
    },
  });
};
export const getLibraries = async (
  { conditions, pagination },
  includeChilds = false
) => {
  return await prisma.library.findMany({
    where: { ...conditions },
    ...pagination,
  });
};
