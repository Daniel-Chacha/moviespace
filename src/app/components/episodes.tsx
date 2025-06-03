import Image from "next/image"
import { Episode } from "./interfaces"
import Link from "next/link"
export const Episodes =({episodeData}:{episodeData: Episode}) =>{
    return(
        <Link href={`/pages/series/${episodeData.show_id}/${episodeData.season_number}/${episodeData.episode_number}`}>
            <div className="flex flex-row gap-4 border-t-[0.5px] border-t-cyan-300 py-5">
                <span className="text-3xl">{episodeData.episode_number}</span>
                <div className="w-32 h-32 relative rounded-t-lg flex-shrink-0">
                    <Image className="object-cover rounded" src={ episodeData.still_path ? `https://image.tmdb.org/t/p/w500${episodeData.still_path}` : '/fallback.jpg' } 
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