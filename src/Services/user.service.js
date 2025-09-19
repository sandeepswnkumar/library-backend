import { prisma } from "../primaClient.js";

export const createUser = async (userData, userDetailData) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData
    });

    const userDetail = await tx.userDetails.create({
      data: {
        ...userDetailData,
        user: {
          connect: { id: user.id } // ✅ now you have user.id
        }
      }
    });

    return { ...user, userDetail };
  });
};


export const updateUserDetails = async (email, userDetailData) => {
  return await prisma.userDetails.update({
    where: { email },
    data: { ...userDetailData }
  });
}

export const updateUser = async (email, userData) => {
  return await prisma.user.update({
    where: { email },
    data: { ...userData }
  });
}


export const UserExist = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};


export const getUser = async (email) => {
  return await prisma.user.findUnique({ where: { email }, include: { userDetail: true } });
};

export const createUserDetail = async (data) => {
  return await prisma.userDetails.create({ data });
};


export const buildFullName = ({ firstName, middleName, lastName }) => {
  return middleName
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
};
