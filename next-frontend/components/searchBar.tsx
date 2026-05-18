import {useState} from "react";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [sport, setSport] = useState("");

    // Event Handler
    const handleLocation = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }

    const handleSport = (e) => {
        setSport(e.target.value);
        console.log(e.target.value);
    }

    return (
        <>
            <div id="search-field" className="block ">
                <input value={keyword}
                       onInput={handleLocation}
                       placeholder="Stadt Suche eingeben.."
                       className="mt-2 mb-4 rounded-md bg-blue-100 outline-blue-500"
                />

                <p className="">
                    Sportarten
                    <label className="pt-4 ">
                        <input type="radio"
                               name="myRadio"
                               value="Tischtennis"
                               onInput={handleSport}
                        />
                        Tischtennis
                    </label>
                    <label className="">
                        <input type="radio"
                               name="myRadio"
                               value="Basketball"
                               onInput={handleSport}
                        />
                        Basketball
                    </label>
                </p>
            </div>
            {keyword ? (
                <h2 className="text-2xl">Ergebnisse für &quot;{keyword}&quot; , &quot;{sport}&quot; : </h2>
            ) : null}
        </>
    )
}