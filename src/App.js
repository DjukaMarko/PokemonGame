import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';
import CardStack from './components/CardStack';
import Decks from './components/Decks';
import CardDetails from './components/CardDetails';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app',
  cache: new InMemoryCache(),
});

const GET_POKEMON_DETAILS = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      weight
      base_experience
      height
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
    }
  }
`;



// Main App component
const App = () => {
  const [deck_1, setDeck1] = useState([]);
  const [deck_2, setDeck2] = useState([]);
  const [pokemon, setPokemon] = useState([]); // Current pokemon in stack.

  const [selectedPokemon, setSelectedPokemon] = useState([]);


  const resetStack = () => setPokemon([]);
  return (
    <ApolloProvider client={client}>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className={`${deck_1.length + deck_2.length === 10 && 'pointer-events-none'}`}>
          <CardStack client={client} pokemon={pokemon} setPokemon={setPokemon} setSelectedPokemon={setSelectedPokemon} />
        </div>
        <Decks deck_1={deck_1} deck_2={deck_2} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
        <CardDetails selectedPokemon={selectedPokemon} GET_POKEMON_DETAILS={GET_POKEMON_DETAILS} />
      </div>
    </ApolloProvider>
  )
};

export default App;
