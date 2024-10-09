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



const App = () => {
  const [decks, setDecks] = useState({
    deck1: [],
    deck2: [],
    cardStack: [],
    // Add other decks here as needed
  });

  const [pokemon, setPokemon] = useState([]); // Current pokemon in stack.

  const [selectedPokemon, setSelectedPokemon] = useState([]);


  const resetStack = () => setPokemon([]);
  return (
    <ApolloProvider client={client}>
      <div className='w-screen h-screen flex justify-center items-center'>
        <CardStack client={client} pokemon={pokemon} setPokemon={setPokemon} setSelectedPokemon={setSelectedPokemon} />
        <Decks decks={decks} setDecks={setDecks} resetStack={resetStack} setSelectedPokemon={setSelectedPokemon} />
        <CardDetails selectedPokemon={selectedPokemon} GET_POKEMON_DETAILS={GET_POKEMON_DETAILS} />
      </div>
    </ApolloProvider>
  )
};

export default App;
