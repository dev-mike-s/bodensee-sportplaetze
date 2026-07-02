
'use client'

import styles from './dataTable.module.css';
import {ISportfield} from './searchBar';

interface IHeader {
    id: number,
    KEY: string,
    LABEL: string
}

interface DataTableProps {
    data: ISportfield[];
}

export default function DataTable( {data} : DataTableProps) {

    const header : IHeader[] = [
        { id:1, KEY: "NAME", LABEL: "Name"},
        { id:1, KEY: "CITY", LABEL: "City"},
        { id:1, KEY: "STREET", LABEL: "Street"},
        { id:1, KEY: "SPORTS", LABEL: "Sports"},
        { id:1, KEY: "RATING", LABEL: "Rating"}
    ];

    console.log("LOG 'dataTable.tsx' :");
    console.log(data);

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {header.map((headerItem) => (
                        <th key={headerItem.id} className={styles.th}>
                            <span>{headerItem.LABEL}</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map(sportfields => (
                
                <tr key={sportfields.id} className={styles.tr}>
                    <td className={styles.td}>
                        {sportfields.name ?? "—"}
                    </td>
                    <td className={styles.td}>
                        {sportfields.city ?? "—"}
                    </td>
                    <td className={styles.td}>
                        {sportfields.street ?? "—"}
                    </td>
                    <td className={styles.td}>
                        {sportfields.sports ?? "—"}
                    </td>
                    <td className={styles.td}>
                        {sportfields.rating ?? "—"}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}