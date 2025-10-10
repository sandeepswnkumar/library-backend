import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedLibraryType() {
    const libraryType = [
        { id: 30001, name: "", color: "" }
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
