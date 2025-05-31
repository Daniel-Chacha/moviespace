import { useState, useEffect } from "react";
import { fetchMoviesByGenres, fetchTrendingMovies } from "../lib/tmdb";
import { Category } from "./category"

export const Genres =({sectionName}:{sectionName: string}) =>{
    const [trendingContent, setTrendingContent] = useState([]);
    const [actionContent, setActionContent] = useState([]);
    const [mysteryContent, setMysteryContent] = useState([]);
    const [thrillerContent, setThrillerContent] = useState([]);
    const [fictionContent, setFictionContent] = useState([]);
    const [comedyContent, setComedyContent] = useState([]);
    const [warContent, setWarContent] = useState([]);
    const [romanceContent, setRomanceContent] = useState([]);
    const [historyContent, setHistoryContent] = useState([]);
    const [documentaryContent, setDocumentaryContent] = useState([]);

    const categories = [["Trending ", "trendingContent"],[ "Action  ", "actionContent"], ["Mystery ", "mysteryContent"], ["Thriller", "thrillerContent"], ["Fiction ", "fictionContent"], ["Comedy ", "comedyContent"], ["War ", "warContent"], ["Romance ", "romanceContent"], ["History ", "historyContent"], ["Documentary", "documentaryContent"]]

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
                {categories.map((category, index) =>(
                    <div key={index}><Category category_name={category[0]  + sectionName } content={categories[1]}  /></div>
                ))}
                
            </div>
        </div>
    )
}