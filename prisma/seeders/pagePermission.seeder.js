import { prisma } from "./../../src/prismaClient.js"
export async function seedUserPagePermission() {
    const userPagePermissions = [
        { id: 13001, userId: 1, pageId: 12001, permissionId: 11001 },
        { id: 13002, userId: 1, pageId: 12001, permissionId: 11002 },
        { id: 13003, userId: 1, pageId: 12001, permissionId: 11003 },
        { id: 13004, userId: 1, pageId: 12001, permissionId: 11004 },
    ];

    for (const userPagePermission of userPagePermissions) {
        await prisma.userPagePermission.upsert({
            where: { id: userPagePermission.id },
            update: {},
            create: userPagePermission,
        });
    }

    console.log("✅ User Page Permission seeded");
}
