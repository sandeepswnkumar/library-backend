import { prisma } from "./../../src/prismaClient.js"

export async function seedUser() {
    const users = [
        {
            id: 1,
            email: "admin@example.com",
            password: "hashed_password_here",
            phone: "9999999999",
            isActive: true,
            userTypeId: 1,
            userDetails: {
                id: 1,
                userId: 1,
                firstName: "System",
                lastName: "User",
                fullName: "System User",
            }
        },
    ];

    for (const user of users) {
        const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (existingUser) {
            continue;
        }
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
                phone: user.phone,
                isActive: user.isActive,
                userTypeId: user.userTypeId,
                userDetails: {
                    create: { ...user.userDetails },
                },
            },
        });
    }

    console.log("✅ Users seeded");
}
