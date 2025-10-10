import { prisma } from "./../../src/prismaClient.js"

export async function seedCountry() {
    const Countries = [
        { id: 80001, name: "India", phonecode: "+91", iso3: "IND", iso2: "IN" }
    ];

    for (const country of Countries) {
        await prisma.country.upsert({
            where: { id: country.id },
            update: {},
            create: country,
        });
    }

    console.log("✅ Country seeded");
}
