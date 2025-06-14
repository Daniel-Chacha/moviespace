'use client'
import { Header } from "./header"
import { useState, useEffect } from "react"
import { Genres } from "./genres"
import { Movie } from "./interfaces"
//  import { KitsuAnime } from "./interfaces"
//  import { AnimeData } from "./interfaces"
import { fetchTrendingAnime ,fetchAnimeByGenre, fetchPopularAnime, fetchUpcomingAnime} from "../lib/tmdb"
import type { Dispatch, SetStateAction } from 'react';
import { Footer } from "./footer"
import Scroll from "./scroll"

export const Anime = () =>{
    const [trendingAnime, setTrendingAnime] = useState<Movie[]>([]);
    const [popularAnime, setPopularAnime] = useState<Movie[]>([]);
    const [upcomingAnime, setUpComingAnime] = useState<Movie[]>([]);
    const [actionAnime, setActionAnime] = useState<Movie[]>([]);
    const [adventureAnime, setAdventureAnime] = useState<Movie[]>([]);
    const [comedyAnime, setComedyAnime] = useState<Movie[]>([]);
    const [dramaAnime, setDramaAnime] = useState<Movie[]>([]);
    const [fantasyAnime, setFantasyAnime] = useState<Movie[]>([]);
    const [scifiAnime, setScifiAnime] = useState<Movie[]>([]);
    const [mysteryAnime, setMysteryAnime] = useState<Movie[]>([]);
    const [romanceAnime, setRomanceAnime] = useState<Movie[]>([]);
    const [supernaturalAnime, setSuperNaturalAnime] = useState<Movie[]>([]);
    const [psychologicalAnime, setPsychologicalAnime] = useState<Movie[]>([]);
    const [thrillerAnime, setThrillerAnime] = useState<Movie[]>([]);
    const [sportsAnime, setSportsAnime] = useState<Movie[]>([]);
    const [musicAnime, setMusicAnime] = useState<Movie[]>([]);
    const [historicalAnime, setHistoricalAnime] = useState<Movie[]>([]);
    const [mechaAnime, setMechaAnime] = useState<Movie[]>([]);
    const [martialArtsAnime, setMartialArtsAnime] = useState<Movie[]>([]);
    const [magicAnime, setMagicAnime] = useState<Movie[]>([]);
    const [sliceOfLifeAnime, setSliceOfLifeAnime] = useState<Movie[]>([]);
    const [militaryAnime, setMilitaryAnime] = useState<Movie[]>([]);
    const [earthAnime, setEarthAnime] = useState<Movie[]>([]);
    const [schoolLifeAnime, setSchoolLifeAnime] = useState<Movie[]>([]);
    const [kidsAnime, setKidsAnime] = useState<Movie[]>([]);
    const [haremAnime, setHaremAnime] = useState<Movie[]>([]);
    const [isekaiAnime, setIsekaiAnime] = useState<Movie[]>([]);
    const [ecchiAnime, setEchiAnime] = useState<Movie[]>([]);
    const [yaoiAnime, setYaoiAnime] = useState<Movie[]>([]);
    const [yuriAnime, setYuriAnime] = useState<Movie[]>([]);
    const [shonenAnime, setShonenAnime] = useState<Movie[]>([]);
    const [shoujoAnime, setShoujoAnime] = useState<Movie[]>([]);
    const [seinenAnime, setSeinenAnime] = useState<Movie[]>([]);
    const [joseiAnime, setJoseiAnime] = useState<Movie[]>([]);
    const [superPowerAnime, setSuperPowerAnime] = useState<Movie[]>([]);
   
    // async function getAnimeData({type}:{type:string}){
    //     try{
    //         const res = await fetch('/api/anime-by-genre', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             genres: [type],
    //             subtype: 'MOVIE',
    //         }),
    //         });
    //         console.log(type, "Retquest Ok");
    //         const data = await res.json();
    //         return data;
    //     }catch(error){
    //         console.error("Error connecting to the server route:", error);
    //     }

    // }

    useEffect(() =>{
        async function LoadAnimeData(){
            
        setTrendingAnime(await fetchTrendingAnime());
        setPopularAnime(await fetchPopularAnime());
        setUpComingAnime(await fetchUpcomingAnime());
        const genresGroups: [string, Dispatch<SetStateAction<Movie[]>>][] = [
        ['action', setActionAnime], ['adventure', setAdventureAnime],[ 'comedy', setComedyAnime],[ 'drama',setDramaAnime], ['fantasy', setFantasyAnime], ['science-fiction', setScifiAnime], ['mystery', setMysteryAnime], ['romance', setRomanceAnime],[ 'supernatural', setSuperNaturalAnime],
        ['psychological', setPsychologicalAnime], ['thriller', setThrillerAnime], ['sports', setSportsAnime], ['historical', setHistoricalAnime], ['mecha', setMechaAnime], ['martial-arts',setMartialArtsAnime], ['magic', setMagicAnime], ['slice-of-life', setSliceOfLifeAnime],['military', setMilitaryAnime], ['earth', setEarthAnime], ['school-life',setSchoolLifeAnime],
        ['kids',setKidsAnime], ['harem', setHaremAnime], ['isekai', setIsekaiAnime], ['ecchi', setEchiAnime], ['yaoi', setYaoiAnime], ['yuri', setYuriAnime], ['shounen', setShonenAnime], ['shoujo', setShoujoAnime], ['seinen', setSeinenAnime], ['josei',setJoseiAnime], ['super-power', setSuperPowerAnime], ["music", setMusicAnime]]
        ;

        for (const [type, setFunc] of genresGroups) {
            const data = await fetchAnimeByGenre(type);
            setFunc(data);
        }
        }

        LoadAnimeData();
    },[])
    const animeCategories :[string, Movie[]][]= [["🔥Trending", trendingAnime], ["Popular", popularAnime],["Top Upcoming ", upcomingAnime], ["Action", actionAnime], ["Adventure", adventureAnime], ["Comedy", comedyAnime], ["Drama", dramaAnime], ["Fantasy", fantasyAnime], ["Science Fiction", scifiAnime], ["Mystery", mysteryAnime], ["Romance", romanceAnime], ["Super Natural", supernaturalAnime], ["Psychological", psychologicalAnime], ["Thriller", thrillerAnime], ["Sports", sportsAnime], ["Historical", historicalAnime], ["Mecha", mechaAnime], ["Martial Arts", martialArtsAnime], ["Magic", magicAnime], ["Slice Of Life", sliceOfLifeAnime], ["Military", militaryAnime],["Earth", earthAnime], ["School Life", schoolLifeAnime], ["Kids", kidsAnime], ["Harem", haremAnime], ["Isekai", isekaiAnime], ["Ecchi", ecchiAnime], ["Yaoi", yaoiAnime], ["Yuri", yuriAnime], ["Shounen", shonenAnime], ["Shoujo", shoujoAnime], ["Seinen", seinenAnime], ["Josei", joseiAnime] , ["Superpower", superPowerAnime] , ["Music", musicAnime]];
    

    return(
        <div>
            <Header showNavbar={true} />

            <div className="border-t-[1.5px] border-cyan-300">
                <Genres sectionName= "Anime" categories={animeCategories}/>
            </div>
            <Scroll />
            <Footer />
        </div>
    )
}