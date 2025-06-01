'use client'
import { useState, useEffect } from "react";
import { fetchMoviesByGenres, fetchTrendingMovies } from "../lib/tmdb";
import { Category } from "./category"
import { Movie } from "./interfaces";

export const Genres =({sectionName}:{sectionName: string}) =>{
    const [trendingContent, setTrendingContent] = useState<Movie[]>([]);
    const [actionContent, setActionContent] = useState<Movie[]>([]);
    const [mysteryContent, setMysteryContent] = useState<Movie[]>([]);
    const [thrillerContent, setThrillerContent] = useState<Movie[]>([]);
    const [fictionContent, setFictionContent] = useState<Movie[]>([]);
    const [comedyContent, setComedyContent] = useState<Movie[]>([]);
    const [warContent, setWarContent] = useState<Movie[]>([]);
    const [romanceContent, setRomanceContent] = useState<Movie[]>([]);
    const [historyContent, setHistoryContent] = useState<Movie[]>([]);
    const [documentaryContent, setDocumentaryContent] = useState<Movie[]>([]);

    const categories:[string, Movie[]][] = [["Trending ", trendingContent],[ "Action  ", actionContent], ["Mystery ", mysteryContent], ["Thriller", thrillerContent], ["Fiction ", fictionContent], ["Comedy ", comedyContent], ["War ", warContent], ["Romance ", romanceContent], ["History ", historyContent], ["Documentary", documentaryContent]]

    useEffect(() =>{
        async function LoadData(){
            setTrendingContent(await fetchTrendingMovies());
            setActionContent(await fetchMoviesByGenres(28));
            setMysteryContent(await fetchMoviesByGenres(9648));
            setThrillerContent(await fetchMoviesByGenres(53));
            setFictionContent(await fetchMoviesByGenres(878));
            setComedyContent(await fetchMoviesByGenres(35));
            setWarContent(await fetchMoviesByGenres(10752));
            setRomanceContent(await fetchMoviesByGenres(10749));
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