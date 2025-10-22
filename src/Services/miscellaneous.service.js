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