'use client'
import Image from "next/image"
import { Episode } from "./interfaces"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { WarningText } from "./warningText";


export const Episodes =({episodeData}:{episodeData: Episode}) =>{
    const [route, setRoute] = useState<string>('');
    const [toggleWarningText, setToggleWarningText] = useState<boolean>(false);

    const pathname = usePathname();

    const isInSeriesPage = pathname.startsWith('/pages/series');
    const  isInAnimationsPage = pathname.startsWith('/pages/animations');
    const  isInAnimePage = pathname.startsWith('/pages/anime');

    const decideRoute = () =>{
        if(isInSeriesPage){
            setRoute(`/pages/series/${String(episodeData.show_id)}/${String(episodeData.season_number)}/${String(episodeData.episode_number)}`);
        }else if(isInAnimationsPage){
            setRoute(`/pages/animations/${String(episodeData.show_id)}/${String(episodeData.season_number)}/${String(episodeData.episode_number)}`);
        }
        // else if(isInAnimePage){
        //     setRoute(`/pages/anime/${episodeData.id}`);
        //     const linkElement = document.getElementById('linker');
        //     linkElement?.onclick(setToggleWarningText(true))
        // }
    }

    const checkPath = isInSeriesPage || isInAnimationsPage;

    if (isInAnimationsPage){
        if (episodeData.still_path == null ){
            episodeData.still_path = episodeData.seasonPath;
        } 
    }

    useEffect(() =>{
        decideRoute()
    }, [])

    const handleClick = (e: React.MouseEvent) =>{
        if(isInAnimePage){
            e.preventDefault()
            setToggleWarningText(true);
        }
    }


    // console.log("Still Path:", episodeData.still_path, episodeData.seasonPath)
    console.log('Episode Data', episodeData)
    return(
        <div>
            {isInAnimePage ? (
                <div onClick={handleClick} className="flex flex-row gap-4 border-t-[0.5px] border-t-cyan-300 py-5 cursor-pointer">
                    <span className="text-3xl">{episodeData.episode_number}</span>
                    <div className="w-32 h-32 relative rounded-t-lg flex-shrink-0">
                        <Image className="object-cover rounded" src={ checkPath? `https://image.tmdb.org/t/p/w500${episodeData.still_path}` :episodeData.still_path } 
                        fill alt={episodeData.name} />
                    </div>

                    <div>
                        <h3>{episodeData.name}</h3>
                        <p>{episodeData.overview}</p>
                    </div>
                </div>
            ):( 
                <Link id="linker" href={route}>
                    <div className="flex flex-row gap-4 border-t-[0.5px] border-t-cyan-300 py-5">
                        <span className="text-3xl">{episodeData.episode_number}</span>
                        <div className="w-32 h-32 relative rounded-t-lg flex-shrink-0">
                            <Image className="object-cover rounded" src={ checkPath? `https://image.tmdb.org/t/p/w500${episodeData.still_path}` :episodeData.still_path } 
                            fill alt={episodeData.name} />
                        </div>

                        <div>
                            <h3>{episodeData.name}</h3>
                            <p>{episodeData.overview}</p>
                        </div>
                    </div>
                </Link>
               )
            }

            {toggleWarningText &&(
                <WarningText msg={"The streaming functionality for Anime is yet to be released soon. Meanwhile stay on the look out. Sorry for any inconveniences caused and thank you for your patience."} func={() => setToggleWarningText(false)} />
            )}
        </div>


    )
}