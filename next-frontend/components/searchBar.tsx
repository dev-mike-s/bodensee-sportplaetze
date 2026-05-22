import styles from './searchBar.module.css';
import {useState, SubmitEvent} from "react";
import {handleSearch} from '../lib/actions';

//const initialState = {city: "", sport: "", state: ""};

export default function SearchBar() {

    const [city, setCity] = useState("");
    const [sport, setSport] = useState("");
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
                const result = await handleSearch(formCity, formSport);
                console.log("angekommen");
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
            {city ? (
                <h2 className="mt-8 text-2xl">Ergebnisse für &quot;{city}&quot; , &quot;{sport}&quot; : </h2>
            ) : null}
        </>
    )
}