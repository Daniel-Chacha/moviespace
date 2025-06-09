'use client'
import { fetchAnimeEpisodes } from "../lib/tmdb";
import { Episode, Movie } from "./interfaces";
import { Episodes } from "./episodes";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Btn } from "./btn";
// import Link from "next/link";


interface AnimeTypeTvProps{
    id: number;
    onClose: () => void;
    anime_data: Movie;
}

export const AnimeTypeTvEpisodes = ({id, onClose, anime_data}:AnimeTypeTvProps ) =>{
    const [animeEpisodesData, setAnimeEpisodesData] = useState<Episode[]>([]);
    const [nextPage, setNextPage] = useState<number | null>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadEpisodes = async (page: number) =>{
        setIsLoading(true);
        const response = await fetchAnimeEpisodes(id, page);
        if (page === 1) {
        setAnimeEpisodesData(response.episodes); // Reset for first page
        } else {
        setAnimeEpisodesData((prev) => [...prev, ...response.episodes]); // Append for subsequent pages
        }
        setNextPage(response.nextPage);
        setIsLoading(false)
    }

    useEffect(() =>{
            if(nextPage){
                setAnimeEpisodesData([]); // Clear episodes on animeId change
                setNextPage(1); // Reset to first page
                loadEpisodes(1); // Load first page
            }
    }, [id])

    const handleMore =() =>{
        if (nextPage && !isLoading){
            loadEpisodes(nextPage)
        }
    }
    return(
        <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center cursor-default">
            <div className="bg-[#121212] text-white shadow-lg rounded-lg w-[90vw] relative h-[90vh] overflow-auto px-8">
                <svg className="absolute top-2 right-2" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#67E8F9" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>

                <div className="flex gap-4 mt-3 flex-row flex-wrap justify-center items-center text-white">
                    <div className="w-32 h-32 relative rounded-t-lg flex-shrink-0">
                        <Image className="object-cover rounded" src={ anime_data.poster_path } fill alt={anime_data.title} />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <h2 className="text-cyan-300 font-bold text-2xl text-center">{anime_data.title}</h2>
                        <p className=" text-center"><span className="text-cyan-300 ">First Release Date:</span> {anime_data.first_air_date}</p>
                        <p className=" text-center"><span className="text-cyan-300">Episode Count:</span> {anime_data.episodeCount} </p>
                        <p><span className="text-cyan-300">Overview:</span> {anime_data.overview}</p>
                    </div>
                </div>
                
            <div className="relative">
                <h2 className=" text-center text-cyan-300 font-semibold mt-3">EPISODES</h2>
                <div>
                    
                    {animeEpisodesData?.map((episode) =>(
                        <div  key={episode.id}>                           
                            <Episodes episodeData={episode} />                                              
                        </div>


                        
                    ))}
                </div>
                {nextPage &&(
                    <div className="flex flex-col items-end mb-3">
                        <Btn label={isLoading ? "Loading..." : "More"} method={handleMore} />
                    </div>
                )}
                
            </div>
            </div>

        </div>
    )
}