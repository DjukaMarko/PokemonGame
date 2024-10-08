import Card from "./Card";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";


const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        artwork
      }
    }
  }
`;

const GET_POKEMON_COUNT = gql`
  query getPokemonCount {
    pokemons {
      count
    }
  }
`;

export default function CardStack({ client, pokemon, setPokemon, setSelectedPokemon }) {
    const { data: countData } = useQuery(GET_POKEMON_COUNT);

    useEffect(() => {
        if (countData && countData.pokemons && pokemon.length === 0) {
            const totalCount = countData.pokemons.count;
            const randomOffset = Math.floor(Math.random() * totalCount);

            client
                .query({
                    query: GET_POKEMONS,
                    variables: { limit: 1, offset: randomOffset },
                })
                .then((result) => {
                    setPokemon([result.data.pokemons.results[0]]);
                });
        }
    }, [countData, pokemon, client, setPokemon]);

    return (
        <div id="cardStack" className="absolute top-0 left-0 p-5 flex flex-col justify-center items-center bg-white rounded-br-md space-y-4">
            <p className="text-2xl font-bold">Card Stack</p>
            <div className="w-36 h-40">
                <Card data={pokemon} dropCard={setPokemon} parentId="cardStack" setSelectedPokemon={setSelectedPokemon} />
            </div>
        </div>
    )
}