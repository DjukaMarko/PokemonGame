import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';
import CardStack from './components/CardStack';
import Decks from './components/Decks';
import CardDetails from './components/CardDetails';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app',
  cache: new InMemoryCache(),
});

// Query for Pokémon details with sprites
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

// Component to fetch and display details of a single Pokémon
const PokemonDetails = ({ name, artwork }) => {
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  if (loading) return <p>Loading details for {name}...</p>;
  if (error) return <p>Error loading details for {name}!</p>;

  const { pokemon } = data;

  return (
    <>
      <div className='border-2'>
        <h2>{pokemon.name}</h2>
        <img src={artwork} alt={`${pokemon.name} artwork`} />
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};


// Main App component
const App = () => {
  const [deck_1, setDeck1] = useState([]);
  const [deck_2, setDeck2] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  const resetStack = () => setPokemon([]);
  return (
  <ApolloProvider client={client}>
    <div className='w-full h-full flex justify-center items-center'>
      <CardStack client={client} pokemon={pokemon} setPokemon={setPokemon} />
      <Decks deck_1={deck_1} deck_2={deck_2} setDeck1={setDeck1} setDeck2={setDeck2} resetStack={resetStack} />
      <CardDetails />
    </div>
  </ApolloProvider>
)};

export default App;
