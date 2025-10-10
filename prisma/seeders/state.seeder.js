import { prisma } from "./../../src/prismaClient.js"

export async function seedState() {
    // let stateData = [
    //     "Maharashtra",
    //     "Andaman & Nicobar Islands",
    //     "Andhra Pradesh",
    //     "Arunachal Pradesh",
    //     "Assam",
    //     "Bihar",
    //     "Chhattisgarh",
    //     "Dadra & Nagar Haveli",
    //     "Daman & Diu",
    //     "Delhi",
    //     "Goa",
    //     "Gujarat",
    //     "Haryana",
    //     "Himachal Pradesh",
    //     "Jammu & Kashmir",
    //     "Jharkhand",
    //     "Karnataka",
    //     "Kerala",
    //     "Lakshadweep",
    //     "Madhya Pradesh",
    //     "Manipur",
    //     "Meghalaya",
    //     "Mizoram",
    //     "Nagaland",
    //     "Orissa",
    //     "Pondicherry",
    //     "Punjab",
    //     "Rajasthan",
    //     "Sikkim",
    //     "West Bengal",
    //     "Tamil Nadu",
    //     "Tripura",
    //     "Uttar Pradesh",
    //     "Uttarakhand"
    // ]
    const states = [
        { id: 60001, name: "Bihar", countryId: 80001 }
    ];

    for (const st of states) {
        await prisma.state.upsert({
            where: { id: st.id },
            update: {},
            create: st,
        });
    }

    console.log("✅ State seeded");
}
