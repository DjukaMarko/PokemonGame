import Deck from "./Deck";

const Decks = ({ decks, setDecks, resetStack, setSelectedPokemon }) => {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Deck decks={decks} deckName="Deck 1" deckId="deck1" setDecks={setDecks} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
            <Deck decks={decks} deckName="" deckId="deck2" setDecks={setDecks} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
        </div>
    );
};

export default Decks;