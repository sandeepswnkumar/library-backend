import { prisma } from "./../../src/prismaClient.js"

export async function seedUserType() {

    const userTypes = [
        { id: 1001, name: "Admin" },
        { id: 1002, name: "Library Owner" },
        { id: 1003, name: "User" },
        { id: 1004, name: "Library User" },
    ];

    for (const userType of userTypes) {
        await prisma.userType.upsert({
            where: { id: userType.id },
            update: {},
            create: userType,
        });
    }

    console.log("✅ User Type seeded");
}
