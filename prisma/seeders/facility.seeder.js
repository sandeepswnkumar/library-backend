import { prisma } from "./../../src/prismaClient.js"

export async function seedFacility() {
    const facilities = [
        { id: 701, name: "Wifi",  },
        { id: 702, name: "Table Socket", },
        { id: 703, name: "Quiet Zones", },
        { id: 704, name: "24/7 Open", },
        { id: 705, name: "Lockers available", },
        { id: 706, name: "RO Drinking Water", },
        { id: 707, name: "Power Backup", },
        { id: 708, name: "Individual Cabins", },
    ]
    for (const ct of facilities) {
        await prisma.facility.upsert({
            where: { id: ct.id },
            update: {},
            create: ct,
        });
    }

    console.log("✅ Facility seeded");
}
