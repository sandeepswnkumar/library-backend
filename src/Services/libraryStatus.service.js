import { prisma } from "../prismaClient.js";

export const getLibraryStatus = async () => {
  return await prisma.libraryStatus.findMany();
};