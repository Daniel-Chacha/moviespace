'use client'
import { useState, useEffect } from "react"
import { Header } from "./header"
import { Genres } from "./genres"
import { fetchTrendingMediaType, fetchMediaTypeByGenres } from "../lib/tmdb"
import { Movie } from "./interfaces"
import { Footer } from "./footer"
import Scroll from "./scroll"

export const Series =() =>{
        const [popularContent, setPopularContent] = useState<Movie[]>([]);
        const [actionContent, setActionContent] = useState<Movie[]>([]);
        // const [adventureContent, setAdventureContent] = useState<Movie[]>([]);
        const [mysteryContent, setMysteryContent] = useState<Movie[]>([]);
        const [crimeContent, setCrimeContent] = useState<Movie[]>([]);
        const [realityContent, setRealityContent] = useState<Movie[]>([]);
        const [fictionContent, setFictionContent] = useState<Movie[]>([]);
        const [comedyContent, setComedyContent] = useState<Movie[]>([]);
        const [warContent, setWarContent] = useState<Movie[]>([]);
        const [romanceContent, setRomanceContent] = useState<Movie[]>([]);
        const [dramaContent, setDramaContent] = useState<Movie[]>([]);
        const [historyContent, setHistoryContent] = useState<Movie[]>([]);
        const [documentaryContent, setDocumentaryContent] = useState<Movie[]>([]);
    
        const categories:[string, Movie[]][] = [["🔥Trending ", popularContent],[ "Action & Adventure ", actionContent], ["Mystery", mysteryContent],["Crime", crimeContent], ["Reality", realityContent], ["Science Fiction ", fictionContent], ["Comedy ", comedyContent], ["War ", warContent], ["Romance ", romanceContent],["Drama", dramaContent], ["History ", historyContent], ["Documentary", documentaryContent]]
    
        useEffect(() =>{
            async function LoadData(){
                setPopularContent(await fetchTrendingMediaType("tv/popular"));
                setActionContent(await fetchMediaTypeByGenres(10759, "tv"));
                // setAdventureContent(await fetchMediaTypeByGenres(12, "tv"));
                setMysteryContent(await fetchMediaTypeByGenres(9648, "tv"));
                setCrimeContent(await fetchMediaTypeByGenres(80, "tv"));
                setRealityContent(await fetchMediaTypeByGenres(10764, "tv"));
                setFictionContent(await fetchMediaTypeByGenres(10765, "tv"));
                setComedyContent(await fetchMediaTypeByGenres(35, "tv"));
                setWarContent(await fetchMediaTypeByGenres(10768, "tv"));
                setRomanceContent(await fetchMediaTypeByGenres(10749, "tv"));
                setDramaContent(await fetchMediaTypeByGenres(18, "tv"));
                setHistoryContent(await fetchMediaTypeByGenres(36, "tv"));
                setDocumentaryContent(await fetchMediaTypeByGenres(99, "tv"));
                
            }
    
            LoadData();
        },[])
    return(
        <div className="relative">
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                <Genres sectionName= "Series" categories={categories}/>
            </div>

            <Scroll />
            <Footer />
        </div>
    )
}