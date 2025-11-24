import { prisma } from "../prismaClient.js";

export const getCities = async () => {
    return await prisma.city.findMany();
};

export const getState = async () => {
    return await prisma.state.findMany();
};

export const getCountry = async () => {
    return await prisma.country.findMany();
};

export const getRoomType = async () => {
    return await prisma.roomType.findMany();
};
export const getBookingUnit = async () => {
    return await prisma.bookingUnit.findMany();
};
export const getFacilities = async () => {
    return await prisma.facilities.findMany();
};