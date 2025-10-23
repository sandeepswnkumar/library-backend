import { prisma } from "./../../src/prismaClient.js"

export async function seedBookingUnit() {
    const bookingUnit = [
        { id: 33001, name: "HOUR" },
        { id: 33001, name: "DAY" },
        { id: 33001, name: "WEEK"},
        { id: 33001, name: "MONTH" },
    ];

    for (const bs of bookingUnit) {
        await prisma.bookingUnit.upsert({
            where: { id: bs.id },
            update: {},
            create: bs,
        });
    }

    console.log("✅ Booking Unit seeded");
}
