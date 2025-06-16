'use client'
import { useState, useEffect, useCallback } from "react"
import { debounce } from "lodash";
import { Movie } from "./interfaces";
import { searchTmdb } from "../lib/tmdb";
import Image from "next/image";
import { Info } from "./info";

export const SearchTmDb =() =>{
    const [query, setQuery] = useState<string>('');
    const [results, setResults] =useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toggleInfoModal , setToggleInfoModal] = useState<boolean>(false);
    const [selectedContent, setSelectedContent] = useState<Movie | null>(null);
    // let selectedContent:Movie;

    //Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (searchQuery: string) =>{
            setIsLoading(true);
            const response = await searchTmdb(searchQuery);
            setResults(response.results);
            setIsLoading(false);
        }, 500),
        []
    )

    useEffect(() =>{
        debouncedSearch(query)
        return() => debouncedSearch.cancel()    //clean up debounce on unmount
    }, [query, debouncedSearch])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value);
    }
    

    const handleSelectedSearchOption = (itemInfo: Movie) => {
    setSelectedContent(itemInfo); // Set the clicked item
    setToggleInfoModal(true);    // Open the modal
  };


    return(
        <div className="relative ">
            <input className="border-[1px]  border-cyan-300 pl-3 rounded-md max-sm:w-[90%] w-full bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-cyan-300" type="search" name="Search" id="Search" placeholder="Search ..." value={query} onChange={handleInputChange} />

            {isLoading &&(
                <div className="absolute top-full left-0 w-fit bg-[#121212] text-white rounded-md shadow-lg mt-2 p-2">Loading...
                </div>
            )}

            {results.length > 0 && !isLoading &&(
                <div className="absolute top-full left-[-50px] w-[340px] bg-[#121212] text-white rounded-md shadow-lg mt-2 mr-5 max-h-96 overflow-y-auto z-50">
                    {results.map((item) =>(
                        <div onClick={() => handleSelectedSearchOption(item)} key={item.id} className="flex gap-2 p-2 hover:bg-cyan-900 cursor-pointer ">
                            <div className="relative w-12 h-18">
                                <Image
                                    src={item.poster_path || item.backdrop_path || '/images/fallbackPik.png'}
                                    alt={item.title ||item.name }
                                    fill                                     
                                    className="rounded object-cover" // Other styles
                                />
                            </div>

                            <div>
                                <p className="text-cyan-300">{item.title}</p>
                                <p className="text-sm">
                                    {item.genre_ids.includes(16) ? 'Animation' : item.media_type === 'movie' ? 'Movie' : 'Series'} •{' '}
                                    {item.release_date || item.first_air_date}
                                </p>
                            </div>

                            {/* {toggleInfoModal &&(
                                <Info infoContent={item} onClose={()=>setToggleInfoModal(false)}  isFromSearch={true }/>
                            )} */}
                                            
                        </div>
                        
                    ))}
                </div>
            )}

            {isLoading && query && results.length === 0 &&(
                <div className="absolute top-full left-0 w-fit bg-[#121212] text-white rounded-md shadow-lg mt-2 p-2">
                    No Results Found.
                </div>
            )}

            {toggleInfoModal && selectedContent && (
                <Info infoContent={selectedContent} onClose={() => setToggleInfoModal(false)} isFromSearch={true} />
            )}
        </div>
    )
}