import { useEffect, useState } from "react";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";
import Draggable from "react-draggable";


export default function Card({ data, parentId }) {
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        if (data.length > 0) setLoading(false);
    }, [data]);

    return (
        <Draggable>
            <>
                {isLoading && <p className="text-sm font-bold text-center">Loading...</p>}
                {data.length > 0 && (
                    <div
                        id={data[0].id}
                        className="w-36 h-40 border-[1px] border-zinc-100 hover:border-[1px] hover:border-blue-400 shadow-lg rounded-lg cursor-pointer flex flex-col justify-center items-center space-y-3"
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("application/json", JSON.stringify(data[0]));
                            e.dataTransfer.setData("parentId", parentId);
                        }}
                    >
                        <img draggable={false} className="w-24 text-xs text-center" src={data[0].artwork} alt={data[0].name} />
                        <p className="font-bold text-sm break-words text-center">{capitalizeFirstLetters(data[0].name)}</p>
                    </div>
                )}
            </>
        </Draggable>
    )
}


/*


  <div className="w-36 h-40 flex items-center justify-center border-[1px] border-zinc-100 hover:border-[1px] hover:border-blue-400 shadow-lg rounded-sm cursor-pointer">
            {isLoading && <p className="text-sm font-bold">Loading...</p>}
            {data && data.map((pokemon) => (
                <Draggable key={pokemon.id} onStop={choiceHandler}
                    position={dragPosition}>
                    <div
                        id={pokemon.id}
                        className={`w-full h-full flex flex-col justify-center items-center space-y-3 `}
                        draggable
                        onDragStart={(e) => {
                            // Serialize the Pokémon object as a string
                            e.dataTransfer.setData("application/json", JSON.stringify(pokemon));
                            e.dataTransfer.setData("parentId", parentId);
                        }}
                    >
                        <img draggable={false} className="w-24" src={pokemon.artwork} alt={pokemon.name} />
                        <p className="font-bold text-sm break-words text-center">{capitalizeFirstLetters(pokemon.name)}</p>
                    </div>
                </Draggable>
            ))}
        </div>


*/