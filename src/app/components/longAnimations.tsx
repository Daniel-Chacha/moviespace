'use client'

import { Genres } from "./genres"
import { fetchAnimationByGenres } from "../lib/tmdb"
import { Movie } from "./interfaces"
import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

interface StateProps{
    results: Movie[],
    page: number;
}

export const LongAnimations = () =>{
    
    const [trendingContent, setTrendingContent] = useState<StateProps | null>(null);
    const [actionContent, setActionContent] = useState<StateProps | null>(null);
    const [mysteryContent, setMysteryContent] =useState<StateProps | null>(null);
    const [familyContent, setFamilyContent] = useState<StateProps | null>(null);
    const [kidsContent, setKidsContent] =useState<StateProps | null>(null);
    const [fictionContent, setFictionContent] =useState<StateProps | null>(null);
    // const [comedyContent, setComedyContent] = useState<StateProps | null>(null);
    const [warContent, setWarContent] = useState<StateProps | null>(null);
    const [romanceContent, setRomanceContent] = useState<StateProps | null>(null);
    const [dramaContent, setDramaContent] = useState<StateProps | null>(null);
    const [historyContent, setHistoryContent] = useState<StateProps | null>(null);
    const [documentaryContent, setDocumentaryContent] =useState<StateProps | null>(null);

   
    const setters : [number, Dispatch<SetStateAction<StateProps | null >>][] =[[1, setTrendingContent],[10759 ,setActionContent], [9648,setMysteryContent],[ 10751,setFamilyContent],[10762,setKidsContent], [10765,setFictionContent],[10768,setWarContent], [10749,setRomanceContent], [18,setDramaContent], [36,setHistoryContent], [99,setDocumentaryContent]]
    useEffect(() =>{
        async function LoadData(){
            // setPopularContent(await fetchTrendingMediaType("tv/popular"));
            try{
                await Promise.all(
                    setters.map(async([genre_id, setter]) =>{
                        const data= await fetchAnimationByGenres(genre_id);
                        setter({
                            results: data.results,
                            page: data.nextPage ? data.nextPage -1 : 1
                        });
                    })
                )
            }catch(err){
                console.error("Errror loading data", err);
            }
        }

        LoadData();
    },[])

     const categories:[string, Movie[]][] = [["🔥 Trending", trendingContent?.results ?? []],["Action & Adventure ", actionContent?.results ?? []], ["Mystery", mysteryContent?.results ?? []],["Family", familyContent?.results ?? []], ["Kids", kidsContent?.results ?? []], ["Science Fiction ", fictionContent?.results ?? []],  ["War ", warContent?.results ?? []], ["Romance ", romanceContent?.results ?? []],["Drama", dramaContent?.results ?? []], ["History ", historyContent?.results ?? []], ["Documentary", documentaryContent?.results ?? []]];

    return(
        <Genres sectionName={"Animation"} categories={categories}/>
    )
}