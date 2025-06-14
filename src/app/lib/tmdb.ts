'use client'
import axios from "axios";
import { Movie, KitsuAnimeResponse, EpisodeResponse , SearchResult } from "../components/interfaces";
import { Episode, TvShowDetails } from "../components/interfaces";

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
    // console.log('TRENDING:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('TMDB Trending Error: ', error);
    return [];
  }
}

export async function fetchSeriesDetail(id: number ): Promise<TvShowDetails | null> {
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
    // console.log("Episodes:",  response.data.episodes)
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
      subType: anime.attributes.subtype,
      episodeCount: anime.attributes.episodeCount,
    }));

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




export async function fetchAnimeEpisodes(animeId: number, page: number = 1): Promise<EpisodeResponse> {
  try {
    const limit = 20;
    const offset = (page - 1) * limit;
    const url = `https://kitsu.io/api/edge/episodes?filter[mediaId]=${animeId}&filter[mediaType]=Anime&sort=number&page[limit]=${limit}&page[offset]=${offset}`;
    
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
    
    const formattedEpisodes: Episode[] = data.data.map((episode: any) => ({
      air_date: episode.attributes.airdate || '',
      episode_number: episode.attributes.number || 0,
      id: parseInt(episode.id),
      name: episode.attributes.titles?.en || episode.attributes.titles?.en_jp || episode.attributes.canonicalTitle || '',
      overview: episode.attributes.synopsis || '',
      production_code: episode.attributes.productionCode || '',
      runtime: episode.attributes.length ? parseInt(episode.attributes.length) : null,
      season_number: episode.attributes.seasonNumber || 1,
      show_id: animeId,
      still_path: episode.attributes.thumbnail?.original || null,
      vote_average: episode.attributes.averageRating ? parseFloat(episode.attributes.averageRating) / 10 : 0,
      vote_count: null
    }));

    const nextPage = data.links?.next ? page + 1 : null;
    console.log("Raw Episode Data:", data.data )
    console.log("Formatted Episodes:", formattedEpisodes);
    return { episodes: formattedEpisodes, nextPage };
  } catch (error) {
    console.error(`Error fetching episodes for anime ID ${animeId} from Kitsu API:`, error);
    return { episodes: [], nextPage: null };
  }
}




export async function fetchTrendingAnimations(page: number = 1): Promise<{ results: Movie[]; nextPage: number | null }> {
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const ANIMATION_GENRE_ID = 16; // Animation genre ID

  try {
    const url = `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${ANIMATION_GENRE_ID}&sort_by=popularity.desc&page=${page}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result= data.results;
    const nextPage = data.page < data.total_pages ? page + 1 : null;

    return { results: result, nextPage };
  } catch (error) {
    console.error('Error fetching trending animations from TMDB:', error);
    return { results: [], nextPage: null };
  }
}



export async function fetchAnimationByGenres(secondaryGenreId: number, page: number = 1 ): Promise<{ results: Movie[]; nextPage: number | null }> {
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const ANIMATION_GENRE_ID = 16; // Animation genre ID

  try {
    const url = `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${ANIMATION_GENRE_ID}|${secondaryGenreId}&page=${page}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result= data.results;
    const nextPage = data.page < data.total_pages ? page + 1 : null;

    return { results: result, nextPage };
  } catch (error) {
    console.error('Error fetching anime by genres from TMDB:', error);
    return { results: [], nextPage: null };
  }
}





export async function searchTmdb(query: string, page: number = 1): Promise<SearchResult> {
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const ANIMATION_GENRE_ID = 16;

  if (!query.trim()) {
    return { results: [] };
  }

  try {
    const url = `${TMDB_BASE_URL}/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const formattedResults: Movie[] = data.results
      .filter((item: Movie) => ['movie', 'tv'].includes(item.media_type)) // Exclude people
      .map((item: Movie) => ({
        adult: item.adult || false,
        backdrop_path: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
        genre_ids: item.genre_ids || [],
        id: item.id,
        original_language: item.original_language || (item.genre_ids?.includes(ANIMATION_GENRE_ID) ? 'ja' : ''),
        original_title: item.original_title || item.original_name || item.title || item.name || '',
        overview: item.overview || '',
        popularity: item.popularity || 0,
        poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : '',
        release_date: item.release_date || item.first_air_date || '',
        first_air_date: item.first_air_date || item.release_date || '',
        title: item.title || item.name || item.original_title || item.original_name || '',
        name: item.name || item.title || item.original_name || item.original_title || '',
        video: item.video || false,
        vote_average: item.vote_average || 0,
        vote_count: item.vote_count || 0,
        media_type: item.media_type as 'movie' | 'tv',
      }));

    return { results: formattedResults };
  } catch (error) {
    console.error('Error searching TMDB:', error);
    return { results: [] };
  }
}

