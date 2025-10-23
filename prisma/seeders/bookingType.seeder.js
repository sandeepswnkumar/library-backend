import { prisma } from "./../../src/prismaClient.js"

export async function seedBookingType() {
    const bookingType = [
        { id: 33301, name: "STUDY" },
        { id: 33301, name: "WORK" },
        { id: 33301, name: "EVENT"},
        { id: 33301, name: "MEETING" },
    ];

    for (const bs of bookingType) {
        await prisma.bookingType.upsert({
            where: { id: bs.id },
            update: {},
            create: bs,
        });
    }

    console.log("✅ Booking Type seeded");
}
