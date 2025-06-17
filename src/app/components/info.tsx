'use client'
import Image from "next/image"
import { Movie } from "./interfaces"
import { Btn } from "./btn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Seasons } from "./season"
import { AnimeTypeTvEpisodes } from "./animeTypeTv"

interface InfoProps{
    infoContent:Movie ,
    onClose: () => void;
    isFromSearch?: boolean;
}

export const Info = ({infoContent, onClose, isFromSearch = false}: InfoProps ) =>{
    const [toggleSeasonsModal, setToggleSeasonsModal] = useState<boolean>(false);
    const [toggleAnimeEpisodesModals, setToggleAnimeEpisodesModals] = useState<boolean>(false);
    const [isInMoviesPage, setIsInMoviesPage] = useState<boolean>(false);
    const [isInSeriesPage, setIsInSeriesPage] = useState<boolean>(false);
    const [isInAnimationsPage, setIsInAnimationsPage] = useState<boolean>(false);
    const [isInAnimePage, setIsInAnimePage] = useState<boolean>(false);

    const pathname = usePathname();

    useEffect(() =>{
        if (isFromSearch){
            if(infoContent.media_type === 'movie' && !infoContent.genre_ids.includes(16)){
                setIsInMoviesPage(true);
              
            }else if(infoContent.media_type === 'tv' && !infoContent.genre_ids.includes(16)){
                setIsInSeriesPage(true);
               
            }else if (!infoContent.genre_ids.includes(16)){
                setIsInAnimationsPage(true);
                
            }
        }else{
        setIsInMoviesPage(pathname.startsWith('/pages/movies'));
        setIsInSeriesPage(pathname.startsWith('/pages/series'));
        setIsInAnimePage(pathname.startsWith('/pages/anime'));
        setIsInAnimationsPage(pathname.startsWith('/pages/animations'));
        }

    },[])

        // console.log("MediaType:", infoContent.media_type)
        // console.log("Paths", isInMoviesPage, isInSeriesPage, isInAnimePage, isInAnimationsPage);
        // console.log('INFO CONTENT:', infoContent);
        // useEffect(() =>{
        //     console.log("Paths", isInMoviesPage, isInSeriesPage, isInAnimePage, isInAnimationsPage);
        // },[])

    return( 
        <div className="fixed inset-0 bg-[#00000090] z-50 flex items-center justify-center p-4 cursor-default">
            <div className="bg-[#121212] text-white rounded-lg shadow-lg max-md:w-[99vw]  w-[60vw] relative">

                <div className="flex flex-row gap-4 justify-around">
                    {/* Image Section */}
                    <div className="relative w-40 h-40 rounded-t-lg overflow-hidden">
                        <Image
                            src={ isInAnimePage? infoContent.poster_path :`https://image.tmdb.org/t/p/w500${infoContent.poster_path}`}
                            alt={infoContent.title  || infoContent.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="m-auto">
                        <p className="text-xl font-bold  text-cyan-300 underline underline-offset-4 text-center">{infoContent.title || infoContent.name}</p>
                        {infoContent.subType && <p className="text-sm text-gray-300 mt-3"> <strong>Sub Type:</strong> {infoContent.subType}</p>}
                        <p className="text-sm text-gray-300">
                            <strong>Viewer Rating:</strong>   {Math.round(infoContent.vote_average) }
                        </p>
                        <p className="text-sm text-gray-300">
                            <strong>Release Date:</strong> {infoContent.release_date || infoContent.first_air_date}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-300">
                        <strong className="text-cyan-300">Overview:</strong> {infoContent.overview}
                    </p>
                </div>

                <div className="flex flex-row justify-around mb-3">
                    <Btn label={"Cancel"} method={onClose} />

                    {isInMoviesPage &&(
                        <Link href={`/pages/movies/${String(infoContent.id)}`}>
                            <Btn label={"Watch"} method={onClose} />
                        </Link>
                    )}

                    {isInSeriesPage &&(                      
                            <Btn  label={"Watch"} method={(e) => {e.stopPropagation(); setToggleAnimeEpisodesModals(true);}} />
                                                  
                    )}

                    {isInAnimePage && (
                        (infoContent.subType === 'movie' || infoContent.episodeCount === 1 ) ?
                            <Link href={`/pages/anime/${String(infoContent.id)}`}>
                                <Btn label={"Watch"} method={onClose} />
                            </Link>
                            // <span className="cursor-default font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-red-600 ">Streaming Capability to be Released Soon!</span>
                        :
                            infoContent.vote_average ?                           
                                <Btn  label={"Watch"} method={(e) =>{e.stopPropagation(); setToggleAnimeEpisodesModals(!toggleAnimeEpisodesModals);}} />                                                        
                            :
                                <span className="cursor-default font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-red-600 ">To Be Released!</span>
                     
                    )}

                    {isInAnimationsPage &&(
                        // <span onClick={handleWatchClick} >
                            <Btn  label={"Watch"} method={(e) =>{e.stopPropagation(); setToggleSeasonsModal(true);}} />
                        // </span>   
                    )}

                    
                </div>

                {toggleSeasonsModal &&(
                    <Seasons seriesId={infoContent.id} onClose={() => setToggleSeasonsModal(false)}/>
                )
                }

                {toggleAnimeEpisodesModals && (
                    <AnimeTypeTvEpisodes id={infoContent.id}  onClose={() => setToggleAnimeEpisodesModals(false)} anime_data={infoContent} />
                )}
    
            </div>
        </div>

    )
}