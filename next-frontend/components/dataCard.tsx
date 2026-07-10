
'use client'

import styles from './dataCard.module.css';
import {ISportfield} from './searchBar';
import {SubmitEvent} from "react";
import {handleSearch} from "@/actions/search";

interface IHeader {
    id: number,
    key: keyof ISportfield;
    label: string
}

interface DataCardProps {
    data: ISportfield[];
}

export default function DataCard( {data} : DataCardProps) {

    const header : IHeader[] = [
        { id:1, key: "name", label: "Name"},
        { id:1, key: "city", label: "Stadt/Ort"},
        { id:1, key: "street", label: "Straße"},
        { id:1, key: "sports", label: "Sport"},
        { id:1, key: "rating", label: "Bewertung"},
    ];

    console.log("LOG 'dataCard.tsx' :");
    console.log(data);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    }

    return (
        <div className={styles.container}>
            {data.map(sportfield => (

                <dl key={sportfield.id} className="styles.card">

                    {header.map((title, index) => (
                        <div key={index} className="styles.row">

                            <dt className={styles.label}>
                                <b>{title.label}</b>
                            </dt>

                            <dd className={styles.value}>
                                {sportfield[title.key as keyof typeof sportfield] ?? "-"}
                            </dd>

                            <div className="mb-2"></div>

                        </div>
                    ))}
                    
                    <div className="styles.row">
                            <button className={styles.button} onClick={() => 
                                console.log(sportfield)}
                            >
                                Platz öffnen (extern)
                            </button>
                    </div>

                </dl>
            ))} 
        </div>
    );
}