import { useState } from "react";
import Card from "./Card";

export default function Deck({ decks, deckName, deckId, setDecks, resetStack, setSelectedPokemon }) {
    const [inputText, setInputText] = useState(deckName);

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleDrop = (event, destinationId) => {
        event.preventDefault();
    
        const pokemonData = event.dataTransfer.getData("application/json");
        const parentId = event.dataTransfer.getData("parentId"); 
        const pokemon = JSON.parse(pokemonData);
    
        setDecks((prevDecks) => {
            const updatedDestinationDeck = prevDecks[destinationId].some(item => item.id === pokemon.id)
                ? prevDecks[destinationId]
                : [...prevDecks[destinationId], pokemon];
    
            const updatedSourceDeck = prevDecks[parentId]?.filter(item => item.id !== pokemon.id) || prevDecks[parentId];
    
            const updatedDecks = {
                ...prevDecks,
                [destinationId]: updatedDestinationDeck, // Update the destination deck
                [parentId]: updatedSourceDeck, // Update the source deck
            };
            if (parentId === "cardStack") {
                resetStack();
            }
    
            return updatedDecks;
        });
    };


    return (
        <div 
            onDragOver={(e) => e.preventDefault()} 
            onDrop={(e) => handleDrop(e, deckId)}
            id={deckId} 
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-left"
        >
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                placeholder="Untitled Deck"
                className="font-bold text-2xl caret-transparent focus:outline-none"
                style={{ caretColor: 'transparent' }}
            />
            <div className="min-w-36 min-h-40 flex justify-center space-x-2">
                {decks[deckId].length > 0 && (
                    decks[deckId].map((pokemon) => (
                        <Card 
                            key={pokemon.id}
                            data={[pokemon]} 
                            parentId={deckId} 
                            setSelectedPokemon={setSelectedPokemon} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}
