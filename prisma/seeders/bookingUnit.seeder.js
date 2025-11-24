import { prisma } from "./../../src/prismaClient.js"

export async function seedBookingUnit() {
    const bookingUnit = [
        { id: 33001, name: "Monthly", rate: 0 },
        { id: 33002, name: "Weely", rate: 0 },
        { id: 33003, name: "Daily", rate: 0 },
        { id: 33004, name: "Hourly", rate: 0 },
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
