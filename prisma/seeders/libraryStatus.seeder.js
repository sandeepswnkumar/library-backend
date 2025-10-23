import { prisma } from "./../../src/prismaClient.js"

export async function seedLibraryStatus() {
    const libraryStatus = [
        { id: 20001, name: "Active", color: "" },
        { id: 20002, name: "Deactivate", color: "" },
        { id: 20003, name: "In Process", color: "" },
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
