import { prisma } from "./../../src/prismaClient.js"

export async function seedRoles() {
    const roles = [
        { id: 10001, name: "Admin", description: "System administrator" },
        { id: 10002, name: "Library Admin", description: "Library Admin" },
        { id: 10003, name: "Library Manager", description: "Library Manager" },
        { id: 10004, name: "User", description: "User" },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {},
            create: role,
        });
    }

    console.log("✅ Roles seeded");
}
