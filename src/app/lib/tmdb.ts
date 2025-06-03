import axios from "axios";

const TMDB_BASE_URL =  'https://api.themoviedb.org/3';

export async function fetchMediaTypeByGenres(genreId: number , type: string){
     
    try{
        const response = await axios.get(`${TMDB_BASE_URL}/discover/${type}`,{
            params:{
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                with_genres: genreId,
            },
        });
        return response.data.results;
    }catch(error){
        console.error("TMDB Fetch Error: ",error);
        return [];
    }
}

export async function fetchTrendingMediaType(type: string) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/${type}`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      },
    });
    console.log('TRENDING:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('TMDB Trending Error: ', error);
    return [];
  }
}

export async function fetchSeriesDetails(id: number | string) {
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch TV details');
    return await response.json();
  } catch (error) {
    console.error('TMDB Series Detail Error:', error);
    return null;
  }
}

