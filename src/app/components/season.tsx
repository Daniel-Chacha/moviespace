
'use client'
import Image from "next/image"
import { Episodes } from "./episodes"
import { fetchSeriesDetails } from "../lib/tmdb";
import { useState, useEffect } from "react";
import { TvShowDetails } from "./interfaces";

interface SeasonsProps{
    seasonId: number;
    onClose: () => void;
}

export const Seasons = ({seasonId ,onClose}: SeasonsProps) =>{
    const [seasonDetails, setSeasonDetails] = useState<TvShowDetails>();
    const [page, setPage] = useState<number>(1);
    
    useEffect(() =>{
        async function loadSeasonData(){
            setSeasonDetails(await fetchSeriesDetails(seasonId));
        }
        loadSeasonData()
    })

    const handlePrev = () =>{
        if (page > 1){setPage(page-1)};
    };

    const handleNext = () =>{
        if(page < (seasonDetails?.number_of_seasons ?? 0)){
            setPage(page + 1)
        };
    }
    return(
        <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center">
            <div className="bg-[#121212] text-white shadow-lg rounded-lg w-[90vw] relative">
                <svg className="absolute top-2 right-2" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#67E8F9" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                <div className="flex flex-row justify-around mt-3">                   
                    <div className="w-[50px] h-[200px]">
                       <Image className="object-cover" src={seasonDetails?.poster_path ? `https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}` 
                            : '/fallback.jpg'} fill alt="Season Poster" />
                    </div>

                    <div>
                        <h2 className="text-cyan-300">{seasonDetails?.name} </h2>
                        <p><span className="text-cyan-300">First Release Date:{seasonDetails?.first_air_date}</span> </p>
                        <p><span className="text-cyan-300">Seasons:</span> {seasonDetails?.number_of_seasons} </p>
                        <p><span className="text-cyan-300">Overview:{seasonDetails?.overview}</span> </p>
                    </div>
                </div>

                <div>
                    <h2>Season</h2>
                    <div className="flex flex-row justify-around ">
                        <button type="button" onClick={() =>handlePrev()} className="text-cyan-300 text-xl">&lt;</button>
                        <span className="bg-cyan-300 text-black rounded-md text-lg font-semibold">{page}</span>
                        <button type="button" onClick={() =>handleNext()} className="text-cyan-300 text-xl">&gt;</button>
                    </div>
                </div>

                <div>
                    <h2 className="text-cyan-300 text-center">Episodes</h2>
                    <Episodes  />
                </div>
            </div>
        </div>
    )
}