import { useEffect, useState } from "react";
import capitalizeFirstLetters from "../utils/capitalizeFirstLetters";
import Draggable from "react-draggable";
import { TailSpin } from "react-loader-spinner";


export default function Card({ data, parentId, setSelectedPokemon }) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (data.length > 0) setLoading(false);
    }, [data]);

    return (
        <Draggable>
            <>
                {isLoading && <div className="w-full h-full flex justify-center items-center">
                    <TailSpin
                        visible={true}
                        height="32"
                        width="32"
                        color="#b6b6b8"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>}
                {data.length > 0 && (
                    <div
                        id={data[0].id}
                        className="w-36 h-40 bg-white border-[1px] border-zinc-100 hover:border-[1px] hover:border-blue-400 shadow-lg rounded-lg cursor-pointer flex flex-col justify-center items-center space-y-3"
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("application/json", JSON.stringify(data[0]));
                            e.dataTransfer.setData("parentId", parentId);
                        }}
                        onClick={() => setSelectedPokemon(data[0])}
                    >
                        <img draggable={false} className="w-24 text-xs text-center" src={data[0].artwork} alt={data[0].name} />
                        <p className="font-bold text-sm break-words text-center">{capitalizeFirstLetters(data[0].name)}</p>
                    </div>
                )}
            </>
        </Draggable>
    )
}
