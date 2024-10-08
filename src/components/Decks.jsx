import Deck1 from "./Deck1";
import Deck2 from "./Deck2";

const Decks = ({ deck_1, deck_2, setDeck1, setDeck2, resetStack, setSelectedPokemon }) => {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Deck1 deck_1={deck_1} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
            <Deck2 deck_2={deck_2} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
        </div>
    );
};

export default Decks;