import { prisma } from "./../../src/prismaClient.js"

export async function seedRoles() {
    const roles = [
        { id: 10001, name: "Admin", description: "System administrator" },
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
