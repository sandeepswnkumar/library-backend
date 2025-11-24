import { prisma } from "./../../src/prismaClient.js"

export async function facilitiesSeeder() {
    const bookingUnit = [
        { id: 33031, name: "Wifi", imageUrl: 'wifi_icon.png' },
        { id: 33032, name: "Table Socket", imageUrl: 'table_socket.png' },
        { id: 33033, name: "Quiet Zones", imageUrl: 'quite_zone.jpg' },
        { id: 33034, name: "24/7 Open", imageUrl: '27x7.jpg' },
        { id: 33035, name: "Lockers available", imageUrl: 'locker.jpg' },
        { id: 33036, name: "Drinking Water", imageUrl: 'drink-water.png' },
        { id: 33037, name: "Power Backup", imageUrl: 'power-backup.png' },
        { id: 33038, name: "Individual Cabins", imageUrl: 'iv-cabin.jpg' },
        { id: 33039, name: "GD Room", imageUrl: 'gd-room.jpg' },
        { id: 33040, name: "AIR-Purifier", imageUrl: 'air-purifier.png' },
        { id: 33041, name: "Meeting Room", imageUrl: 'meeting-room.png' },
        { id: 33042, name: "Gaming Room", imageUrl: 'gaming-room.jpg' },
    ];

    for (const bs of bookingUnit) {
        await prisma.facilities.upsert({
            where: { id: bs.id },
            update: {},
            create: bs,
        });
    }

    console.log("✅ Facilities seeded");
}
