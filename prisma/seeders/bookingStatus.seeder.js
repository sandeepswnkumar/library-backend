import { prisma } from "./../../src/prismaClient.js"

export async function seedBookingStatus() {
    const bookingStatus = [
        { id: 21001, name: "Pending", color: "" },
        { id: 21002, name: "On Going", color: "" },
    ];

    for (const bs of bookingStatus) {
        await prisma.bookingStatus.upsert({
            where: { id: bs.id },
            update: {},
            create: bs,
        });
    }

    console.log("✅ Booking Status seeded");
}
