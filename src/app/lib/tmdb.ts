import axios from "axios";
import { Movie, KitsuAnimeResponse } from "../components/interfaces";

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


export async function fetchSeasonEpisodes(tvId: number, seasonNumber: number) {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      }
    );

    return response.data.episodes; // array of episodes
  } catch (error) {
    console.error('Failed to fetch season episodes:', error);
    return [];
  }
}




export async function fetchTrendingAnime(): Promise<Movie[]> {
  try {
    const url = 'https://kitsu.io/api/edge/trending/anime?page[limit]=20';
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const formattedAnime: Movie[] = data.data.map((anime: KitsuAnimeResponse) => ({
      adult: anime.attributes.ageRating === 'R' || anime.attributes.ageRating === 'R18',
      backdrop_path: anime.attributes.coverImage?.original || null,
      genre_ids: [], // Kitsu API doesn't provide genre IDs directly
      id: parseInt(anime.id),
      original_language:  'ja',
      original_title: anime.attributes.titles?.en_jp || anime.attributes.titles?.ja_jp || anime.attributes.canonicalTitle,
      overview: anime.attributes.synopsis || '',
      popularity: anime.attributes.popularityRank || 0,
      poster_path: anime.attributes.posterImage?.large || anime.attributes.posterImage?.original || '',
      release_date: anime.attributes.startDate || '',
      first_air_date: anime.attributes.startDate || '',
      title: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      name: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      video: false,
      vote_average: anime.attributes.averageRating ? parseFloat(anime.attributes.averageRating) / 10 : 0,
      vote_count: null,
      episodeCount: anime.attributes.episodeCount,
    }));

    console.log("Trending Anime:",formattedAnime)
    return formattedAnime;
  } catch (error) {
    console.error('Error fetching trending anime from Kitsu API:', error);
    return [];
  }
}



export async function fetchPopularAnime(): Promise<Movie[]> {
  try {
    const url = 'https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=20';
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const formattedAnime: Movie[] = data.data.map((anime: KitsuAnimeResponse) => ({
      adult: anime.attributes.ageRating === 'R' || anime.attributes.ageRating === 'R18',
      backdrop_path: anime.attributes.coverImage?.original || null,
      genre_ids: [], // Kitsu API doesn't provide genre IDs directly
      id: parseInt(anime.id),
      original_language: 'ja',
      original_title: anime.attributes.titles?.en_jp || anime.attributes.titles?.ja_jp || anime.attributes.canonicalTitle,
      overview: anime.attributes.synopsis || '',
      popularity: anime.attributes.popularityRank || 0,
      poster_path: anime.attributes.posterImage?.large || anime.attributes.posterImage?.original || '',
      release_date: anime.attributes.startDate || '',
      first_air_date: anime.attributes.startDate || '',
      title: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      name: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      video: false,
      vote_average: anime.attributes.averageRating ? parseFloat(anime.attributes.averageRating) / 10 : 0,
      vote_count: null,
      subType: anime.attributes.subtype,
      episodeCount: anime.attributes.episodeCount,
    }));

    console.log("Popular Data.Data", data.data)
    console.log("Popular Anime:", formattedAnime)
    return formattedAnime;
  } catch (error) {
    console.error('Error fetching popular anime from Kitsu API:', error);
    return [];
  }
}




export async function fetchUpcomingAnime(): Promise<Movie[]> {
  try {
    const url = 'https://kitsu.io/api/edge/anime?filter[status]=upcoming&page[limit]=20';
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const formattedAnime: Movie[] = data.data.map((anime: KitsuAnimeResponse) => ({
      adult: anime.attributes.ageRating === 'R' || anime.attributes.ageRating === 'R18',
      backdrop_path: anime.attributes.coverImage?.original || null,
      genre_ids: [], // Kitsu API doesn't provide genre IDs directly
      id: parseInt(anime.id),
      original_language: 'ja',
      original_title: anime.attributes.titles?.en_jp || anime.attributes.titles?.ja_jp || anime.attributes.canonicalTitle,
      overview: anime.attributes.synopsis || '',
      popularity: anime.attributes.popularityRank || 0,
      poster_path: anime.attributes.posterImage?.large || anime.attributes.posterImage?.original || '',
      release_date: anime.attributes.startDate || '',
      first_air_date: anime.attributes.startDate || '',
      title: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      name: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      video: false,
      vote_average: anime.attributes.averageRating ? parseFloat(anime.attributes.averageRating) / 10 : 0,
      vote_count: null,
      subType: anime.attributes.subtype,
      episodeCount: anime.attributes.episodeCount,
    }));

    return formattedAnime;
  } catch (error) {
    console.error('Error fetching upcoming anime from Kitsu API:', error);
    return [];
  }
}



export async function fetchAnimeByGenre(genre: string): Promise<Movie[]> {
  try {
    // Construct the Kitsu API URL with genre filter
    const url = `https://kitsu.io/api/edge/anime?filter[categories]=${encodeURIComponent(genre)}&page[limit]=20`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Map Kitsu API response to Movie type
    const formattedAnime: Movie[] = data.data.map((anime: KitsuAnimeResponse) => ({
      adult: anime.attributes.ageRating === 'R' || anime.attributes.ageRating === 'R18',
      backdrop_path: anime.attributes.coverImage?.original || null,
      genre_ids: [], // Kitsu API doesn't provide genre IDs directly; would need separate genre mapping
      id: parseInt(anime.id),
      original_language: 'ja',
      original_title: anime.attributes.titles?.en_jp || anime.attributes.titles?.ja_jp || anime.attributes.canonicalTitle,
      overview: anime.attributes.synopsis || '',
      popularity: anime.attributes.popularityRank || 0,
      poster_path: anime.attributes.posterImage?.large || anime.attributes.posterImage?.original || '',
      release_date: anime.attributes.startDate || '',
      first_air_date: anime.attributes.startDate || '',
      title: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      name: anime.attributes.canonicalTitle || anime.attributes.titles?.en || anime.attributes.titles?.en_jp || '',
      video: false, // Kitsu doesn't provide video info; assuming false for anime
      vote_average: anime.attributes.averageRating ? parseFloat(anime.attributes.averageRating) / 10 : 0, // Kitsu ratings are 0-100
      vote_count: null,
      subType: anime.attributes.subtype,
      episodeCount: anime.attributes.episodeCount,
    }));

    return formattedAnime;
  } catch (error) {
    console.error('Error fetching anime from Kitsu API:', error);
    return [];
  }
}