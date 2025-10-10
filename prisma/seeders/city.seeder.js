import { prisma } from "./../../src/prismaClient.js"

export async function seedCity() {
    const Cities = [
        { id: 700001, name: "Siwan", stateId: 60001 }
    ]
    for (const ct of Cities) {
        await prisma.city.upsert({
            where: { id: ct.id },
            update: {},
            create: ct,
        });
    }

    console.log("✅ City seeded");
}
