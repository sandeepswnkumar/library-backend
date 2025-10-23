import { prisma } from "../prismaClient.js";

export const createUser = async (userData, userDetailData) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    const userDetail = await tx.userDetails.create({
      data: {
        ...userDetailData,
        userId: user.id,
      },
    });

    return { ...user, userDetail };
  });
};

export const createOnlyUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const updateUserDetails = async (userId, userDetailData) => {
  return await prisma.userDetails.update({
    where: { userId: userId },
    data: { ...userDetailData },
  });
};

export const updateUser = async (userId, userData) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { ...userData },
  });
};
export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const UserExist = async (conditions) => {
  return await prisma.user.findUnique({ where: conditions });
};

export const getUser = async (userId) => {
  return await prisma.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      password: false,
      userDetails: {
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          address1: true,
        },
      },
    },
  });
};
export const getUsers = async (
  { conditions, pagination },
  includeUserDetails = false
) => {
  return await prisma.user.findMany({
    where: { ...conditions },
    ...pagination,
    select: {
      id: true,
      email: true,
      password: false,
      userDetails: {
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          address1: true,
        },
      },
    },
  });
};

export const createUserDetail = async (data) => {
  return await prisma.userDetails.create({ data });
};

export const buildFullName = ({ firstName, middleName, lastName }) => {
  return middleName
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
};
