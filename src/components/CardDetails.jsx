import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import capitalizeFirstLetters from '../utils/capitalizeFirstLetters';

export default function CardDetails({ selectedPokemon, GET_POKEMON_DETAILS }) {
    const { name, artwork } = selectedPokemon;
    const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
        variables: { name },
    });

    /*useEffect(() => {
        if (selectedPokemon) {


            const { pokemon } = data;
        }
    }, [selectedPokemon]);*/

    if (data) {
        const { pokemon } = data;
        const filteredAbilities = pokemon.abilities.filter((_, index) => index < 2);

        return (
            <div className='bg-white rounded-lg flex flex-col items-center justify-center p-4 mb-64'>
                {loading && <div className="w-full h-full flex justify-center items-center">
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
                </div>}
                <img src={artwork} alt={`${pokemon.name} artwork`} />
                <div className='w-full h-full flex items-end'>
                    <div className='w-full'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex items-center'>
                                <p className='text-xl font-bold mr-3'>{capitalizeFirstLetters(pokemon.name)}</p>
                                {filteredAbilities.map((ability) => (
                                    <div className='py-1 px-3 text-center bg-white border-[1px] border-zinc-100 shadow-lg rounded-full text-[0.65rem] font-bold' key={ability.ability.name}>{capitalizeFirstLetters(ability.ability.name)}</div>
                                ))}
                            </div>
                            <p className='text-zinc-400 text-xl font-extrabold ml-8'><span className='text-sm'>#</span>{pokemon.base_experience}</p>
                        </div>
                        <div className='w-full flex justify-start space-x-6 text-zinc-400 text-xl font-extrabold'>
                            <p>{pokemon.weight}<span className='text-sm'>KG</span></p>
                            <p>{pokemon.height}<span className='text-sm'>CM</span></p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

/*
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

*/