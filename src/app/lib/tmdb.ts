import axios from "axios";

const TMDB_BASE_URL =  'https://api.themoviedb.org/3';

export async function fetchMoviesByGenres(genreId: number){
    try{
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`,{
            params:{
                api_key: process.env.TMDB_API_KEY,
                with_genres: genreId,
            },
        });
        return response.data.results;
    }catch(error){
        console.error("TMDB Fetch Error: ",error);
        return [];
    }
}


//function to fetch trending movies
export async function fetchTrendingMovies() {
    try{
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movies/week`,{
            params:{
                api_key: process.env.TMDB_API_KEY,
            },
        });
        return response.data.results;
    }catch(error){
        console.error('TMDB Trending Error: ', error);
        return [];
    }
}