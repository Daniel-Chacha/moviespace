'use client'
import Image from "next/image";
import { Movie } from "./interfaces" 
import {  useState } from "react";
import { Info } from "./info";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Seasons } from "./season";

export const Item = ({itemsContent}:{itemsContent:Movie}) =>{
    const [toggleInfoModal, setToggleInfoModal] = useState<boolean>(false);
    const [toggleSeasonsModal, setToggleSeasonsModal] = useState<boolean>(false);

    const pathname = usePathname();

    const isInMoviesPage = pathname.startsWith('/pages/movies');
    const isInSeriesPage = pathname.startsWith('/pages/series');

    const posterUrl = itemsContent.poster_path
    ? `https://image.tmdb.org/t/p/w500${itemsContent.poster_path}`
    : '/images/fallback.jpg';
    return(
       
        <div className="group relative w-[120px] h-[180px] flex-shrink-0 cursor-pointer" >
            {/* Image with dark hover overlay */}
            <div className="relative w-full h-full">
                <Image
                fill className="object-cover rounded transition duration-300 group-hover:brightness-50"
                src={posterUrl} alt={itemsContent.title  || itemsContent.name} />

                {/* Icons shown only on hover */}
                <div className="absolute bottom-7 left-0 right-0 flex justify-around opacity-0 group-hover:opacity-100 transition duration-300">
                    {isInMoviesPage && (
                        <Link href={`/pages/movies/${itemsContent.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" > <path  fill="#4DD0E1" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18M10.783 7.99l5.644 3.136a1 1 0 0 1 0 1.748l-5.644 3.136A1.2 1.2 0 0 1 9 14.96V9.04a1.2 1.2 0 0 1 1.783-1.05" clipRule="evenodd" /> </svg>
                        </Link>
                    )}
                    {isInSeriesPage &&(
                        <svg onClick={() => setToggleSeasonsModal(!toggleSeasonsModal)} xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" > <path  fill="#4DD0E1" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18M10.783 7.99l5.644 3.136a1 1 0 0 1 0 1.748l-5.644 3.136A1.2 1.2 0 0 1 9 14.96V9.04a1.2 1.2 0 0 1 1.783-1.05" clipRule="evenodd" /> </svg>
                    )}
                
                    <svg onClick={() => setToggleInfoModal(!toggleInfoModal)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" > <g fill="none" stroke="#4DD0E1" strokeWidth="2"> <circle cx="12" cy="12" r="10" /> <path strokeLinecap="round" d="M12 7h.01" /> <path strokeLinecap="round" strokeLinejoin="round" d="M10 11h2v5m-2 0h4" /> </g> </svg>
                </div>
            </div>

            {/* Title below the image */}
            <p className="text-[12px] w-[120px] overflow-hidden whitespace-nowrap text-ellipsis text-white mt-1">
                {itemsContent.title ||  itemsContent.name}
            </p>

            {toggleInfoModal && (
                <Info infoContent={itemsContent} onClose={() => setToggleInfoModal(false)} />
            )}

            {toggleSeasonsModal &&(
                <Seasons seasonId={itemsContent.id} onClose={() => setToggleSeasonsModal(false)}/>
            )
            }
        </div>

     



    )
}