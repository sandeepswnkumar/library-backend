import { prisma } from "../prismaClient.js";


export const getLibraryShiftAndPrice = async (condition) => {
    return await prisma.libraryShiftAndPrice.findFirst({
        where: condition,
        include : {
            roomType : true,
            bookingUnit : true
        }
    });
};