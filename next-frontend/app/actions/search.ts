'use server'

import {prisma} from "@/lib/prisma";

export async function handleSearch(city: string, sport: string) {

    console.log("angekommen");
    try {
        await prisma.$connect();
        console.log("connecting... erfolgreich");
    } catch (err) {
        console.error("Fehler:", err);
    }

    if (!city && !sport) {
        return {error: 'City or Sport invalid/missing.'}
    }

    //try catch
    const entries = await prisma.sportfield.findMany();

    //try catch
    const test = await prisma.localities.findMany();

    console.log(entries);
    console.log(test);

    return test;
}
