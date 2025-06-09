
'use client'
import Image from "next/image"
import { fetchSeriesDetails } from "../lib/tmdb";
import { useState, useEffect } from "react";
import { TvShowDetails } from "./interfaces";
import { fetchSeasonEpisodes } from "../lib/tmdb";
// import { usePathname } from "next/navigation";
import { Episode } from "./interfaces";
import { Episodes } from "./episodes";
// import { fetchAnimeEpisodes } from "../lib/tmdb";

interface SeasonsProps{
    seriesId: number;
    onClose: () => void;
}

export const Seasons = ({seriesId ,onClose}: SeasonsProps) =>{
    const [seriesDetails, setSeriesDetails] = useState<TvShowDetails>();
    const [page, setPage] = useState<number>(1);
    const [seasonDetails, setSeasonDetails] = useState<Episode[]>([]);
    // const pathname = usePathname();

    // const isInSeriesPage = pathname.startsWith('/pages/series');
    
    useEffect(() =>{
        async function loadSeasonData(){
            setSeriesDetails(await fetchSeriesDetails(seriesId));
        }
        loadSeasonData()
        if (seriesDetails?.id !== undefined) {
            getEpisodes({ seriesId: seriesDetails.id }, { seasonId: 1 });
        }
    }, [seriesDetails?.id, seriesId])

    const handlePrev = () =>{
        if (page > 1){
            setPage(page-1)

            if (seriesDetails?.id !== undefined) {
                getEpisodes({ seriesId: seriesDetails.id }, { seasonId: page - 1 });
            }
        };
    };

    const handleNext = () =>{
        if(page < (seriesDetails?.number_of_seasons ?? 0)){
            setPage(page + 1)

            if (seriesDetails?.id !== undefined) {
                getEpisodes({ seriesId: seriesDetails.id }, { seasonId: page + 1 });
            }
        };
    }

    async function getEpisodes ({seriesId }: {seriesId:number}, {seasonId}: {seasonId: number}){
        setSeasonDetails(await fetchSeasonEpisodes(seriesId, seasonId));
    }
    // console.log("Series Data:", seriesDetails);
    // console.log("SeasonData:", seasonDetails);
    return(
        <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center cursor-default">
            <div className="bg-[#121212] text-white shadow-lg rounded-lg w-[90vw] relative h-[90vh] overflow-auto px-8">
                <svg className="absolute top-2 right-2" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#67E8F9" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                <div className="flex gap-4 mt-3 flex-wrap text-white">
                        {/* Image section */}
                        <div className="w-32 h-44 relative rounded-lg flex-shrink-0">
                            <Image className="object-cover rounded" src={ seriesDetails?.poster_path ? `https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}` : '/fallback.jpg' } 
                            fill alt={seriesDetails!.name} />
                        </div>

                        {/* Text section */}
                        <div className="flex-1 min-w-[200px]">
                            <h2 className="text-cyan-300 font-bold text-2xl">{seriesDetails?.name}</h2>
                            <p> <span className="text-cyan-300">First Release Date: </span> {seriesDetails?.first_air_date} </p> 
                            <p> <span className="text-cyan-300">Seasons: </span> {seriesDetails?.number_of_seasons} </p>
                            <p> <span className="text-cyan-300">Overview: </span> {seriesDetails?.overview} </p>
                        </div>
                </div>


                <div className="flex flex-row  justify-around mt-5">
                    {/* <h2 className="text-xl font-semibold text-cyan-300">SEASON</h2> */}
                    <div className="flex flex-row gap-5 justify-center items-center w-52">
                        <span className="text-xl text-cyan-300 ">SEASON</span>
                        <button type="button" onClick={() =>handlePrev()} className="text-cyan-300 text-xl cursor-pointer">&lt;</button>
                        <span className="bg-cyan-300 p-2 p-x-4 text-black rounded-md text-lg font-semibold">{page}</span>
                        <button type="button" onClick={() =>handleNext()} className="text-cyan-300 text-xl cursor-pointer">&gt;</button>
                    </div>
                </div>

                <div>
                    <h2 className=" text-center">Episodes</h2>
                    <div>
                        {seasonDetails?.map((episode) =>(
                            <div key={episode.episode_number}>
                                <Episodes episodeData={episode} />
                            </div>
                            
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}