import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
    const roles = [
        { id: 1, name: "Admin", description: "System administrator" },
    ];

    for (const role of roles) {
        const isRoleExist = await prisma.role.findUnique({
            where: {
                id: role.id
            }
        })
        console.log("isRoleExist", isRoleExist)
        // await prisma.role.upsert({
        //     where: { name: role.name },
        //     update: {},
        //     create: role,
        // });
    }

    console.log("✅ Roles seeded");
}
