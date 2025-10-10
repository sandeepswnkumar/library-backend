import { prisma } from "../prismaClient.js";

export const createLibrary = async (libraryData) => {
  return await prisma.library.create({
    data: libraryData,
  });
};

export const updateLibrary = async (libraryId, libraryData) => {
  return await prisma.library.update({
    where: { id: libraryId },
    data: { ...libraryData },
  });
};

export const deleteLibrary = async (libraryId, libraryData) => {
  return await prisma.library.update({
    where: { id: libraryId },
    data: { ...libraryData },
  });
};

export const libraryExists = async (libraryId) => {
  return await prisma.library.findUnique({ where: { id: libraryId } });
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
