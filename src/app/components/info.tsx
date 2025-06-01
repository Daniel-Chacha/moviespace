import Image from "next/image"
import { Movie } from "./interfaces"

interface InfoProps{
    infoContent:Movie,
    onClose: () => void;
}

export const Info = ({infoContent, onClose}: InfoProps ) =>{
    return(
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-4">
        <div className="bg-[#121212] text-white rounded-lg shadow-lg max-w-md w-full relative">
            
            {/* Close Button */}
            <button
            className="absolute top-3 right-3 bg-red-600 text-gray-400 hover:text-white text-2xl"
            onClick={onClose} // You can pass this as a prop
            >
            &times;
            </button>

            <div className="flex flex-row gap-4 justify-around">
                {/* Image Section */}
                <div className="relative w-40 h-40 rounded-t-lg overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${infoContent.poster_path}`}
                        alt={infoContent.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="m-auto">
                    <h2 className="text-xl font-bold">{infoContent.title}</h2>
                    <p className="text-sm text-gray-300">
                        <strong>Viewer Rating:</strong> {infoContent.vote_average}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Release Date:</strong> {infoContent.release_date}
                    </p>
                    <p className="text-sm text-gray-300">
                        <strong>Genres:</strong> {infoContent.genre_ids.join(', ')} {/* Consider mapping to genre names */}
                    </p>
                </div>
            </div>



            {/* Content */}
            <div className="p-4 space-y-2">
                <p className="text-sm text-gray-300">
                    <strong>Overview:</strong> {infoContent.overview}
                </p>
            </div>

            <button className="cursor-pointer font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-cyan-300" onClick={onClose} type="button">OK</button>
        </div>
        </div>

    )
}