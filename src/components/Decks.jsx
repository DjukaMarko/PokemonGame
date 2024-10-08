import Deck_1 from "./Deck_1";
import Deck_2 from "./Deck_2";

const Decks = ({ deck_1, deck_2, setDeck1, setDeck2, resetStack }) => {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Deck_1 deck_1={deck_1} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} />
            <Deck_2 deck_2={deck_2} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} />
        </div>
    );
};

export default Decks;