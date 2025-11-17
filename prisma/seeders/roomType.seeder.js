import { prisma } from "./../../src/prismaClient.js"

export async function seedRoomType() {
    const roomTypes = [
        { id: 201, name: "AC" },
        { id: 202, name: "Non-AC" }
    ];

    for (const roomType of roomTypes) {
        await prisma.roomType.upsert({
            where: { id: roomType.id },
            update: {},
            create: roomType,
        });
    }

    console.log("✅ Room Type seeded");
}
