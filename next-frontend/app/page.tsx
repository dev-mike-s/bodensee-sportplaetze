
'use client'

import SearchBar from "../components/searchBar";

export default function HomePage() {

    return (
        <section className="mt-10">
            <div className="text-center">

                <h1 className="mt-10">
                    Willkommen!
                </h1>

                <br></br>

                <h3 className="mt-10">
                    Welchen Platz möchtest du finden?
                </h3>

                <SearchBar />

            </div>
        </section>
    )
}