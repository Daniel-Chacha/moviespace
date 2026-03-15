import { Movie, KitsuAnimeResponse, EpisodeResponse, SearchResult, Episode, TvShowDetails } from "../components/interfaces";
import { KITSU_BASE_URL } from "./constants";

// ---------------------------------------------------------------------------
// Internal helper — routes all TMDB requests through the secure /api/tmdb proxy
// so the API key is never exposed in client bundles.
// ---------------------------------------------------------------------------
async function tmdbProxy(endpoint: string, params: Record<string, string | number> = {}): Promise<Response> {
  const searchParams = new URLSearchParams({ endpoint });
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value));
  }
  return fetch(`/api/tmdb?${searchParams.toString()}`);
}

// ---------------------------------------------------------------------------
// TMDB — Movies & TV
// ---------------------------------------------------------------------------

export async function fetchMediaTypeByGenres(genreId: number, type: string): Promise<Movie[]> {
  try {
    const response = await tmdbProxy(`discover/${type}`, { with_genres: genreId });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('TMDB Fetch Error:', error);
    return [];
  }
}

export async function fetchTrendingMediaType(type: string): Promise<Movie[]> {
  try {
    const response = await tmdbProxy(type);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('TMDB Trending Error:', error);
    return [];
  }
}

export async function fetchSeriesDetail(id: number): Promise<TvShowDetails | null> {
  try {
    const response = await tmdbProxy(`tv/${id}`);
    if (!response.ok) throw new Error('Failed to fetch TV details');
    return await response.json();
  } catch (error) {
    console.error('TMDB Series Detail Error:', error);
    return null;
  }
}

export async function fetchSeasonEpisodes(tvId: number, seasonNumber: number): Promise<Episode[]> {
  try {
    const response = await tmdbProxy(`tv/${tvId}/season/${seasonNumber}`);
    if (!response.ok) throw new Error('Failed to fetch season episodes');
    const data = await response.json();
    return data.episodes;
  } catch (error) {
    console.error('Failed to fetch season episodes:', error);
    return [];
  }
}

export async function fetchTrendingAnimations(page: number = 1): Promise<{ results: Movie[]; nextPage: number | null }> {
  try {
    const response = await tmdbProxy('discover/tv', {
      with_genres: 16,
      sort_by: 'popularity.desc',
      page,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      results: data.results,
      nextPage: data.page < data.total_pages ? page + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching trending animations from TMDB:', error);
    return { results: [], nextPage: null };
  }
}

export async function fetchAnimationByGenres(secondaryGenreId: number, page: number = 1): Promise<{ results: Movie[]; nextPage: number | null }> {
  try {
    const response = await tmdbProxy('discover/tv', {
      with_genres: `16|${secondaryGenreId}`,
      page,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      results: data.results,
      nextPage: data.page < data.total_pages ? page + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching animation by genres from TMDB:', error);
    return { results: [], nextPage: null };
  }
}

export async function searchTmdb(query: string, page: number = 1): Promise<SearchResult> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return { results: [] };

  try {
    const response = await tmdbProxy('search/multi', { query: trimmed, page });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const formattedResults: Movie[] = data.results
      .filter((item: Movie) => ['movie', 'tv'].includes(item.media_type))
      .map((item: Movie) => ({
        adult: item.adult || false,
        backdrop_path: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
        genre_ids: item.genre_ids || [],
        id: item.id,
        original_language: item.original_language || '',
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

export async function getTrendingPosterPaths(): Promise<string[]> {
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w200';

  try {
    const [movieResponse, tvResponse] = await Promise.all([
      tmdbProxy('trending/movie/day'),
      tmdbProxy('trending/tv/day'),
    ]);
    if (!movieResponse.ok) throw new Error('Failed to fetch trending movies');
    if (!tvResponse.ok) throw new Error('Failed to fetch trending TV shows');

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    const moviePosterPaths: string[] = movieData.results
      .slice(0, 5)
      .map((item: Movie) => (item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : null))
      .filter((path: string | null): path is string => path !== null);

    const animationPosterPaths: string[] = tvData.results
      .filter((item: Movie) => item.genre_ids.includes(16))
      .slice(0, 3)
      .map((item: Movie) => (item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : null))
      .filter((path: string | null): path is string => path !== null);

    return [...moviePosterPaths, ...animationPosterPaths];
  } catch (error) {
    console.error('Error fetching trending poster paths:', error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Kitsu API — Anime (public API, no auth required — direct fetch is fine)
// ---------------------------------------------------------------------------

const KITSU_HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

function mapKitsuToMovie(anime: KitsuAnimeResponse): Movie {
  return {
    adult: anime.attributes.ageRating === 'R' || anime.attributes.ageRating === 'R18',
    backdrop_path: anime.attributes.coverImage?.original || '',
    genre_ids: [],
    id: parseInt(anime.id),
    original_language: 'ja',
    original_title:
      anime.attributes.titles?.en_jp ||
      anime.attributes.titles?.ja_jp ||
      anime.attributes.canonicalTitle,
    overview: anime.attributes.synopsis || '',
    popularity: anime.attributes.popularityRank || 0,
    poster_path:
      anime.attributes.posterImage?.large ||
      anime.attributes.posterImage?.original ||
      '',
    release_date: anime.attributes.startDate || '',
    first_air_date: anime.attributes.startDate || '',
    title:
      anime.attributes.canonicalTitle ||
      anime.attributes.titles?.en ||
      anime.attributes.titles?.en_jp ||
      '',
    name:
      anime.attributes.canonicalTitle ||
      anime.attributes.titles?.en ||
      anime.attributes.titles?.en_jp ||
      '',
    video: false,
    vote_average: anime.attributes.averageRating
      ? parseFloat(anime.attributes.averageRating) / 10
      : 0,
    vote_count: null,
    subType: anime.attributes.subtype,
    episodeCount: anime.attributes.episodeCount,
  };
}

export async function fetchTrendingAnime(): Promise<Movie[]> {
  try {
    const response = await fetch(`${KITSU_BASE_URL}/trending/anime?page[limit]=20`, {
      headers: KITSU_HEADERS,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.map(mapKitsuToMovie);
  } catch (error) {
    console.error('Error fetching trending anime from Kitsu API:', error);
    return [];
  }
}

export async function fetchPopularAnime(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/anime?sort=popularityRank&page[limit]=20`,
      { headers: KITSU_HEADERS }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.map(mapKitsuToMovie);
  } catch (error) {
    console.error('Error fetching popular anime from Kitsu API:', error);
    return [];
  }
}

export async function fetchUpcomingAnime(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/anime?filter[status]=upcoming&page[limit]=20`,
      { headers: KITSU_HEADERS }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.map(mapKitsuToMovie);
  } catch (error) {
    console.error('Error fetching upcoming anime from Kitsu API:', error);
    return [];
  }
}

export async function fetchAnimeByGenre(genre: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/anime?filter[categories]=${encodeURIComponent(genre)}&page[limit]=20`,
      { headers: KITSU_HEADERS }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.map(mapKitsuToMovie);
  } catch (error) {
    console.error('Error fetching anime from Kitsu API:', error);
    return [];
  }
}

interface KitsuEpisode {
  id: string;
  type: string;
  attributes: EpisodeAttributes;
}

interface EpisodeAttributes {
  airdate: string | null;
  number: number | null;
  titles: {
    en?: string;
    en_jp?: string;
    canonicalTitle?: string;
  };
  canonicalTitle?: string;
  synopsis: string | null;
  thumbnail: {
    original: string | null;
  } | null;
  productionCode: string | null;
  length: string | number | null;
  seasonNumber: number | null;
  averageRating: string | null;
}

export async function fetchAnimeEpisodes(animeId: number, page: number = 1): Promise<EpisodeResponse> {
  try {
    const limit = 20;
    const offset = (page - 1) * limit;
    const url = `${KITSU_BASE_URL}/episodes?filter[mediaId]=${animeId}&filter[mediaType]=Anime&sort=number&page[limit]=${limit}&page[offset]=${offset}`;

    const response = await fetch(url, { headers: KITSU_HEADERS });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const formattedEpisodes: Episode[] = data.data.map((episode: KitsuEpisode) => ({
      air_date: episode.attributes.airdate || '',
      episode_number: episode.attributes.number || 0,
      id: parseInt(episode.id),
      name:
        episode.attributes.titles?.en ||
        episode.attributes.titles?.en_jp ||
        episode.attributes.canonicalTitle ||
        '',
      overview: episode.attributes.synopsis || '',
      production_code: episode.attributes.productionCode || '',
      runtime: null,
      season_number: episode.attributes.seasonNumber || 1,
      show_id: animeId,
      still_path: episode.attributes.thumbnail?.original || null,
      vote_average: episode.attributes.averageRating
        ? parseFloat(episode.attributes.averageRating) / 10
        : 0,
      vote_count: null,
    }));

    const nextPage = data.links?.next ? page + 1 : null;
    return { episodes: formattedEpisodes, nextPage };
  } catch (error) {
    console.error(`Error fetching episodes for anime ID ${animeId} from Kitsu API:`, error);
    return { episodes: [], nextPage: null };
  }
}
