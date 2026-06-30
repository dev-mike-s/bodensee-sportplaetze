'use server'

import { prisma } from "@/lib/prisma";

export type RawSportfield = {
    id: number;
    name: string | null;
    rating: number;
    location: {
        street: string | null;
        name: string | null;
        id: number;
        locality_id: number;
        localities: {
            id: number;
            name: string;
            zipcode: number;
            type: string | null;
        };
    } | null;
    sportfield_sporttype: {
        sportfield_id: number;
        sporttype_id: number;
        sporttype: {
            id: number;
            name: string | null;
        }
    } [],
    sportfieldimage: {
        id: number;
        sportfield_id: number;
        url: string | null;
        sort_order: number | null;
    }  []
};

export async function handleSearch(city: string, sport: string) {

    let result: RawSportfield[] | null = null;

    console.log("LOG: Anfrage in actions angekommen!");

    if (!city && !sport) {
        return [];
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
                },
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
                },
                sportfieldimage: true,
            },

        });
        console.log("LOG: 'search.ts': ");
        console.log(result);

    } catch (error) {
        console.error("LOG: Fehler: " );
        console.error(error);
        return null;
    }

    return result!.map((r: RawSportfield) => ({
        id: r.id,
        name: r.name,
        rating: r.rating,
        city: r.location?.localities.name ?? "",
        street: r.location?.street ?? "",
        sports: r.sportfield_sporttype.map(s => s.sporttype.name ?? ""),
        images: r.sportfieldimage.map(i => i.url ?? ""),
    }));
}