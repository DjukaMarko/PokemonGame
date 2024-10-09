import { useQuery } from '@apollo/client';
import { TailSpin } from 'react-loader-spinner';
import capitalizeFirstLetters from '../utils/capitalizeFirstLetters';
import { useEffect, useState } from 'react';

export default function CardDetails({ selectedPokemon, GET_POKEMON_DETAILS }) {
    const [pokemonDetails, setPokemonDetails] = useState({});

    const { loading, data } = useQuery(GET_POKEMON_DETAILS, {
        variables: { name: selectedPokemon?.name || '' }, // Provide a default value if selectedPokemon is empty
        skip: !selectedPokemon, // Prevent the query from executing if selectedPokemon is not defined
    });

    useEffect(() => {
        if (data?.pokemon && data.pokemon.abilities) {
            const { pokemon } = data;
            const filteredAbilities = pokemon.abilities.filter((_, index) => index < 2);
    
            setPokemonDetails({
                ...pokemon,
                abilities: filteredAbilities,
            });
        }
    }, [data]);
    
    if(selectedPokemon.length === 0) return null;
    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center mb-64">
                <TailSpin
                    visible={true}
                    height="32"
                    width="32"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }

    return (
        <div className='bg-white rounded-lg flex flex-col items-center justify-center p-4 mb-64'>
            <img src={selectedPokemon.artwork} alt={`${pokemonDetails.name} artwork`} />
            <div className='w-full h-full flex items-end'>
                <div className='w-full'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex items-center'>
                            <p className='text-xl font-bold mr-3'>{capitalizeFirstLetters(pokemonDetails.name)}</p>
                            {pokemonDetails.abilities && pokemonDetails.abilities.map((ability) => (
                                <div className='py-1 px-3 text-center bg-white border-[1px] border-zinc-100 shadow-lg rounded-full text-[0.65rem] font-bold' key={ability.ability.name}>{capitalizeFirstLetters(ability.ability.name)}</div>
                            ))}
                        </div>
                        <p className='text-zinc-400 text-xl font-extrabold ml-8'><span className='text-sm'>#</span>{pokemonDetails.base_experience}</p>
                    </div>
                    <div className='w-full flex justify-start space-x-6 text-zinc-400 text-xl font-extrabold'>
                        <p>{pokemonDetails.weight}<span className='text-sm'>KG</span></p>
                        <p>{pokemonDetails.height}<span className='text-sm'>CM</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
