import { prisma } from "../prismaClient.js";

export const createShiftAndPrice = async (data) => {
  return await prisma.libraryShiftAndPrice.create({
    data,
  });
};

export const updateShiftAndPrice = async (id, data) => {
  return await prisma.libraryShiftAndPrice.update({
    where: { id },
    data,
  });
};

export const deleteShiftAndPrice = async (id, data) => {
  return await prisma.libraryShiftAndPrice.delete({
    where: { id }
  });
};

export const shiftAndPriceExists = async (conditions) => {
  return await prisma.libraryShiftAndPrice.findFirst({
    where: conditions,
  });
};

export const getShiftAndPriceById = async (id) => {
  return await prisma.libraryShiftAndPrice.findFirst({
    where: { id },
    include: {
      locations: true,
      roomType: true,
      bookingUnit: true,
    },
  });
};

export const getShiftAndPrices = async ({ conditions, pagination }) => {
  return await prisma.libraryShiftAndPrice.findMany({
    where: conditions,
    ...pagination,
    include: {
      locations: true,
      roomType: true,
      bookingUnit: true,
    }
  });
};
