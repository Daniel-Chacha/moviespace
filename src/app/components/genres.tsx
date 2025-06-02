'use client'
import { useState, useEffect } from "react";
import { fetchMoviesByGenres, fetchTrendingMovies } from "../lib/tmdb";
import { Category } from "./category"
import { Movie } from "./interfaces";

export const Genres =({sectionName}:{sectionName: string}) =>{
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
            setTrendingContent(await fetchTrendingMovies());
            setActionContent(await fetchMoviesByGenres(28));
            setAdventureContent(await fetchMoviesByGenres(12));
            setMysteryContent(await fetchMoviesByGenres(9648));
            setCrimeContent(await fetchMoviesByGenres(80));
            setThrillerContent(await fetchMoviesByGenres(53));
            setFictionContent(await fetchMoviesByGenres(878));
            setComedyContent(await fetchMoviesByGenres(35));
            setWarContent(await fetchMoviesByGenres(10752));
            setRomanceContent(await fetchMoviesByGenres(10749));
            setDramaContent(await fetchMoviesByGenres(18));
            setHistoryContent(await fetchMoviesByGenres(36));
            setDocumentaryContent(await fetchMoviesByGenres(99));
            
        }

        LoadData();
    },[])
    return(
        <div>
            <div>
                {categories.map(([name, content], index) =>(
                    <div key={index}><Category category_name={`${name} ${sectionName}` } content={content}  /></div>
                ))}
                
            </div>
        </div>
    )
}