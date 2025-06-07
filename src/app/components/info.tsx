'use client'
import Image from "next/image"
import { Movie } from "./interfaces"
import { Btn } from "./btn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Seasons } from "./season"

interface InfoProps{
    infoContent:Movie,
    onClose: () => void;
}

export const Info = ({infoContent, onClose}: InfoProps ) =>{
    const [toggleSeasonsModal, setToggleSeasonsModal] = useState<boolean>(false);
    const pathname = usePathname();

    const isInMoviesPage = pathname.startsWith('/pages/movies');
    const isInSeriesPage = pathname.startsWith('/pages/series');
    const  isInAnimePage = pathname.startsWith('/pages/anime');
    return(
        <div className="fixed inset-0 bg-[#00000090] z-50 flex items-center justify-center p-4 cursor-default">
            <div className="bg-[#121212] text-white rounded-lg shadow-lg  w-[50vw] relative">

                <div className="flex flex-row gap-4 justify-around">
                    {/* Image Section */}
                    <div className="relative w-40 h-40 rounded-t-lg overflow-hidden">
                        <Image
                            src={ isInAnimePage? infoContent.poster_path :`https://image.tmdb.org/t/p/w500${infoContent.poster_path}`}
                            alt={infoContent.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="m-auto">
                        <p className="text-xl font-bold  text-cyan-300 underline underline-offset-4 text-center">{infoContent.title}</p>
                        <p className="text-sm text-gray-300">
                            <strong>Viewer Rating:</strong>  {infoContent.vote_average}
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
                        <Link href={`/pages/movies/${infoContent.id}`}>
                            <Btn label={"Watch"} method={onClose} />
                        </Link>
                    )}

                    {isInSeriesPage &&(
                        <span onClick={() => setToggleSeasonsModal(!toggleSeasonsModal)}>
                            <Btn  label={"Watch"} method={onClose} />
                        </span>                                 
                    )}

                    
                </div>

                {toggleSeasonsModal &&(
                    <Seasons seriesId={infoContent.id} onClose={() => setToggleSeasonsModal(false)}/>
                )
                }
    
            </div>
        </div>

    )
}