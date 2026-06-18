'use server'

import { prisma } from "@/lib/prisma";

export async function handleSearch(city: string, sport: string) {

    let result = null;

    console.log("LOG: Anfrage in actions angekommen!");

    if (!city && !sport) {
        return { error: 'City or Sport invalid/missing.' };
    }

    try {
        result = await prisma.sportfield.findMany({
            where: {
                sportfield_sporttype: {
                    some: {
                        sporttype: {
                            name: sport
                        }
                    }
                },
                location: {
                    localities: {
                        name: city
                    }
                }
            },
            include: {
                location: {
                    include: {
                        localities: true
                    }
                },
                sportfield_sporttype: {
                    include: {
                        sporttype: true
                    }
                }
            },
        });
        console.log(result);

    } catch (error) {
        console.error("LOG: Fehler: ", error);
        return { error: "DB error" };
    }

    return result;
}

/*
findMany({
    where: { ... },
    include: { ... },
    select: { ... },
    orderBy: { ... },
    take: 10,
    skip: 5,
})
*/
