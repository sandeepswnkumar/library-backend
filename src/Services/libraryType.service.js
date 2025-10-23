import { prisma } from "../prismaClient.js";

export const getLibraryType = async () => {
  return await prisma.libraryType.findMany();
};