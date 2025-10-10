import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedLibraryStatus() {
    const libraryStatus = [
        { id: 20001, name: "", color: "" }
    ];

    for (const ls of libraryStatus) {
        await prisma.libraryStatus.upsert({
            where: { id: ls.id },
            update: {},
            create: ls,
        });
    }

    console.log("✅ Library Status seeded");
}
