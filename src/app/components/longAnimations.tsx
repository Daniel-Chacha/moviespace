'use client'

import { Header } from "./header"
import { Genres } from "./genres"
import { fetchAnimationByGenres } from "../lib/tmdb"
import { Movie } from "./interfaces"
import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

interface StateProps{
    results: Movie[],
    page: number;
}

export const ShortAnimations = () =>{
    
    // const [popularContent, setPopularContent] = useState<Movie[]>([]);
    const [actionContent, setActionContent] = useState<StateProps | null>(null);
    const [mysteryContent, setMysteryContent] =useState<StateProps | null>(null);
    const [crimeContent, setCrimeContent] = useState<StateProps | null>(null);
    const [realityContent, setRealityContent] =useState<StateProps | null>(null);
    const [fictionContent, setFictionContent] =useState<StateProps | null>(null);
    const [comedyContent, setComedyContent] = useState<StateProps | null>(null);
    const [warContent, setWarContent] = useState<StateProps | null>(null);
    const [romanceContent, setRomanceContent] = useState<StateProps | null>(null);
    const [dramaContent, setDramaContent] = useState<StateProps | null>(null);
    const [historyContent, setHistoryContent] = useState<StateProps | null>(null);
    const [documentaryContent, setDocumentaryContent] =useState<StateProps | null>(null);

    const categories:[string, StateProps | null ][] = [[ "Action & Adventure ", actionContent], ["Mystery", mysteryContent],["Crime", crimeContent], ["Reality", realityContent], ["Science Fiction ", fictionContent], ["Comedy ", comedyContent], ["War ", warContent], ["Romance ", romanceContent],["Drama", dramaContent], ["History ", historyContent], ["Documentary", documentaryContent]];

    const setters : [number, Dispatch<SetStateAction<StateProps | null >>][] =[[10759 ,setActionContent], [9648,setMysteryContent],[ 80,setCrimeContent],[10764,setRealityContent], [10765,setFictionContent], [35,setComedyContent],[10768,setWarContent], [10749,setRomanceContent], [18,setDramaContent], [36,setHistoryContent], [99,setDocumentaryContent]]
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
                console.error("Errror loading data");
            }
        }

        LoadData();
    },[])

    return(
        
    )
}