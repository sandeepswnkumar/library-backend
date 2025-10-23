import { prisma } from "./../../src/prismaClient.js"

export async function seedLibraryType() {
    const libraryType = [
        { id: 30001, name: "Goverment", color: "" },
        { id: 30002, name: "Private", color: "" }
    ];

    for (const ls of libraryType) {
        await prisma.libraryType.upsert({
            where: { id: ls.id },
            update: {},
            create: ls,
        });
    }

    console.log("✅ Library Type seeded");
}
