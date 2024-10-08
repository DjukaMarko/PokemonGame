import { useState } from "react";
import Card from "./Card";

export default function Deck_1({ deck_1, setDeck1, setDeck2, resetStack }) {

    const [inputText, setInputText] = useState("Deck 1");

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleDrop = (event) => {
        // Prevent default behavior
        event.preventDefault();

        // Get the serialized Pokémon object
        const pokemonData = event.dataTransfer.getData("application/json");
        const parentId = event.dataTransfer.getData("parentId");
        // Parse the JSON string back to an object
        const pokemon = JSON.parse(pokemonData);

        // Add to the dropped Pokémon state
        setDeck1((prev) => {
            // Only add if the Pokémon with the same ID does not exist in the state
            if (!prev.some(item => item.id === pokemon.id)) {
                return [...prev, pokemon]; // Add Pokémon if it's not already in the deck
            }
            return prev; // Return the previous state if it's a duplicate
        });
        if (parentId === "cardStack") {
            resetStack();
        } else if (parentId === "deck2") {
            setDeck2((prev) => {
                // Filter out the dropped Pokémon by ID
                return prev.filter((item) => item.id !== pokemon.id);
            })
        }
    };

    return (
        <div onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
            onDrop={handleDrop} id="deck1" className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-left">
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                placeholder="Untitled Deck"
                className="font-bold text-2xl caret-transparent focus:outline-none  " // Hide the caret
                style={{ caretColor: 'transparent' }} // Hide the caret using style
            />
            <div className="min-w-36 min-h-40 flex justify-center space-x-2">
                {deck_1.length > 0 && (
                    deck_1.map((pokemon) => (
                        <Card data={[pokemon]} parentId="deck1" />
                    ))
                )}
            </div>
        </div>
    )
}