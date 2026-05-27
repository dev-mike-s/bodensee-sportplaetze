
'use client'

import SearchBar from "../components/searchBar";

export default function HomePage() {

    return (
        <section className="mt-10">
            <div className="text-center">
                <h2 className="text-3xl">Willkommen auf Bodensee Sportplätze
                </h2>
                <h3 className="mt-10">
                    Welchen Platz möchtest du finden?
                </h3>

                <SearchBar />

            </div>
        </section>
    )
}