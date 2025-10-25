import { prisma } from "./../../src/prismaClient.js"

export async function seedPage() {
    const pages = [
        { id: 12001, name: "ALL", path : "/" },
        { id: 12001, name: "Library", path : "/" },
        { id: 12001, name: "Library Location", path : "/" },
        { id: 12001, name: "Bookings", path : "/" },
        { id: 12001, name: "User", path : "/" },
        { id: 12001, name: "Profile", path : "/" },
    ];

    for (const pg of pages) {
        await prisma.page.upsert({
            where: { id: pg.id },
            update: {},
            create: pg,
        });
    }

    console.log("✅ Page seeded");
}
