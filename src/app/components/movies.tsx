'use client'
import { Header } from "./header"
import { Genres } from "./genres"
import { useState, useEffect } from "react"
import { fetchMediaTypeByGenres, fetchTrendingMediaType } from "../lib/tmdb";
import { Movie } from "./interfaces";

export default function Movies(){
    const [trendingContent, setTrendingContent] = useState<Movie[]>([]);
    const [actionContent, setActionContent] = useState<Movie[]>([]);
    const [adventureContent, setAdventureContent] = useState<Movie[]>([]);
    const [mysteryContent, setMysteryContent] = useState<Movie[]>([]);
    const [crimeContent, setCrimeContent] = useState<Movie[]>([]);
    const [thrillerContent, setThrillerContent] = useState<Movie[]>([]);
    const [fictionContent, setFictionContent] = useState<Movie[]>([]);
    const [comedyContent, setComedyContent] = useState<Movie[]>([]);
    const [warContent, setWarContent] = useState<Movie[]>([]);
    const [romanceContent, setRomanceContent] = useState<Movie[]>([]);
    const [dramaContent, setDramaContent] = useState<Movie[]>([]);
    const [historyContent, setHistoryContent] = useState<Movie[]>([]);
    const [documentaryContent, setDocumentaryContent] = useState<Movie[]>([]);

    const categories:[string, Movie[]][] = [["Trending ", trendingContent],[ "Action  ", actionContent],["Adventure",  adventureContent], ["Mystery ", mysteryContent],["Crime", crimeContent], ["Thriller", thrillerContent], ["Science Fiction ", fictionContent], ["Comedy ", comedyContent], ["War ", warContent], ["Romance ", romanceContent],["Drama", dramaContent], ["History ", historyContent], ["Documentary", documentaryContent]]

    useEffect(() =>{
        async function LoadData(){
            setTrendingContent(await fetchTrendingMediaType("trending/movie/week"));
            setActionContent(await fetchMediaTypeByGenres(28, "movie"));
            setAdventureContent(await fetchMediaTypeByGenres(12, "movie"));
            setMysteryContent(await fetchMediaTypeByGenres(9648, "movie"));
            setCrimeContent(await fetchMediaTypeByGenres(80, "movie"));
            setThrillerContent(await fetchMediaTypeByGenres(53, "movie"));
            setFictionContent(await fetchMediaTypeByGenres(878, "movie"));
            setComedyContent(await fetchMediaTypeByGenres(35, "movie"));
            setWarContent(await fetchMediaTypeByGenres(10752, "movie"));
            setRomanceContent(await fetchMediaTypeByGenres(10749, "movie"));
            setDramaContent(await fetchMediaTypeByGenres(18, "movie"));
            setHistoryContent(await fetchMediaTypeByGenres(36, "movie"));
            setDocumentaryContent(await fetchMediaTypeByGenres(99, "movie"));
            
        }

        LoadData();
    },[])
    return(
        <div>
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                <Genres sectionName= "Movies" categories={categories}/>
            </div>
            
        </div>
    )
}