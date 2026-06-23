import styles from './searchBar.module.css';
import {useState, SubmitEvent, useRef} from "react";
import {handleSearch} from '@/actions/search';
import {sportfield} from '../models/ui-models';

//const initialState = {city: "", sport: "", state: ""};

/*
interface ISportfield {
    id: number;
    name: string | null;
    rating: number;
    city: string;
    street: string | null;
    sports: string[] | null;
    images: string[];
}
*/

export default function SearchBar() {

    const [city, setCity] = useState("");
    const [sport, setSport] = useState("");
    const [searchResult, setSearchResult] = useState<ISportfield[] | null>(null);
    //const [res, setRes] = useState("");
    //const [state, formAction] = useFormState(search, initialState);

    // Event Handler
    // ChangeEvent versus 'onInput=' => Typ-Fehler bei onInput.
    //todo: city and sport is interesing for statistics, send it to the db directly.
    const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }

    const handleSport = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSport(e.target.value);
    }

    //Info: React.FormEvent is deprecated, newest: ChangeEvent, InputEvent, SubmitEvent, SyntethicEvent.
    //FormData schien auch nicht Typ-kompatibel, seitens onSubmit und den Eventtypen.
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        //event.currentTarget => form
        event.preventDefault();
        const formCity = event.currentTarget.city.value;
        const formSport = event.currentTarget.sports.value;
        try {
            if (formCity != null && formSport != null) {
                const serverResult = await handleSearch(formCity, formSport);
                setSearchResult(serverResult);
                console.log("LOG: 'searchBar.tsx ");
                console.log(serverResult);

                //if (searchResult) { setRes(searchResult); }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="search-field" className="relative">

                <form onSubmit={handleSubmit}
                      className="block content-start"
                >
                    <input onChange={handleLocation}
                           value={city}
                           name="city"
                           type="text"
                           placeholder="Stadt / Dorf eingeben.."
                           className="mt-2 mb-4 rounded-md bg-blue-100 outline-blue-500"
                           required
                    />
                    <fieldset className="mb-4">
                        <label className="pt-4">Sportarten auswählen</label>
                        <br></br>
                        <input onChange={handleSport}
                               type="radio"
                               name="sports"
                               value="Tischtennis"
                               required
                        />
                        <label htmlFor="tischtennis">
                            Tischtennis
                        </label>
                        <br/>
                        <input onChange={handleSport}
                               type="radio"
                               name="sports"
                               value="Basketball"
                               required
                        />
                        <label htmlFor="basketball">
                            Basketball
                        </label>
                        <br/>
                    </fieldset>
                    <button className={styles.button} type="submit">Suchen</button>
                </form>
            </div>
            <div>
                {city ? ( <h2 className="mt-8 text-2xl">Ergebnisse für &quot;{city}&quot; , &quot;{sport}&quot; : </h2>) : null}
                <div style={{ padding:10 }}>
                <ul >
                    { (searchResult) ?
                        (searchResult.map(res =>
                                <>
                                    <li key={res.city}>{res.city}</li>
                                    <li key={res.street}>{res.street}</li>
                                    <li key={res.id}>{res.name}</li>
                                    <li key={res.sports[0]}>{res.sports[0]}</li>
                                    <li key={res.rating}>{res.rating} Sterne</li>
                                    <li key={res.images}>{res.images}</li>
                                </>
                            )
                        ) : <p>Keine Einträge gefunden probiers nochmal!</p>
                    }
                </ul>
                </div>
            </div>
        </>
    )
}