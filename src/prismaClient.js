import { PrismaClient, Prisma } from '../generated/prisma/index.js';

export const PrismaClass = Prisma

export const prisma = new PrismaClient();

// prisma.$use(async (params, next) => {
//   if (params.model === 'User' && ['findUnique', 'findMany'].includes(params.action)) {
//     if (!params.select) {
//       params.select = {};
//     }

//     // Exclude the password field from the selection
//     if (params.select) {
//       delete params.select.password;
//     }

//     if (params.include && params.include.userDetail) {
//       delete params.include.userDetail.select?.password;
//     }
//   }

//   return next(params);
// });