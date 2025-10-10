import { prisma } from "./../../src/prismaClient.js"

export async function seedPermissions() {
    const permissions = [
        { id: 11001, name: "VIEW", description: "View" },
        { id: 11002, name: "CREATE", description: "Create" },
        { id: 11003, name: "UPDATE", description: "Update" },
        { id: 11004, name: "DELETE", description: "Delete" },
    ];

    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { id: permission.id },
            update: {},
            create: permission,
        });
    }

    console.log("✅ Permission seeded");
}
