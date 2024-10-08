import { useState } from "react";
import Card from "./Card";

export default function Deck1({ deck_1, setDeck1, setDeck2, resetStack, setSelectedPokemon }) {

    const [inputText, setInputText] = useState("Deck 1");

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const pokemonData = event.dataTransfer.getData("application/json");
        const parentId = event.dataTransfer.getData("parentId");
        const pokemon = JSON.parse(pokemonData);

        setDeck1((prev) => {
            if (!prev.some(item => item.id === pokemon.id)) {
                return [...prev, pokemon];
            }
            return prev;
        });
        if (parentId === "cardStack") {
            resetStack();
        } else if (parentId === "deck2") {
            setDeck2((prev) => {
                return prev.filter((item) => item.id !== pokemon.id);
            })
        }
    };

    return (
        <div onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop} id="deck1" className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-left">
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                placeholder="Untitled Deck"
                className="font-bold text-2xl caret-transparent focus:outline-none  "
                style={{ caretColor: 'transparent' }}
            />
            <div className="min-w-36 min-h-40 flex justify-center space-x-2">
                {deck_1.length > 0 && (
                    deck_1.map((pokemon) => (
                        <Card data={[pokemon]} parentId="deck1" setSelectedPokemon={setSelectedPokemon} />
                    ))
                )}
            </div>
        </div>
    )
}