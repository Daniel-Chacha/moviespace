'use client'
export  type Movie = {
  adult: boolean;
  backdrop_path: string ; // Path to the movie's backdrop image
  genre_ids: number[]; // Array of genre IDs
  id: number; // Unique ID of the movie
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string; // A brief summary of the movie
  popularity: number;
  poster_path: string  ; // Path to the movie's poster image
  release_date: string; // Format: YYYY-MM-DD
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number; // Average user rating
  vote_count: number | null; // Number of votes
  subType: string;
  episodeCount: number;
  media_type: 'movie' | 'tv' | 'person';
}



// interfaces/TvShowDetails.ts

export interface Genre {
  id: number;
  name: string;
}

export interface CreatedBy {
  // Assuming 'created_by' might contain basic person info
  // The provided JSON has an empty array, but usually it'd be like:
  id: number;
  credit_id: string;
  name: string;
  gender: number; // 0: Not specified, 1: Female, 2: Male, 3: Non-binary
  profile_path: string | null;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string; // "YYYY-MM-DD"
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number; // Duration in minutes
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCompany {
  // Assuming 'production_companies' might contain basic company info
  // The provided JSON has an empty array, but usually it'd be like:
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string; // e.g., "US"
  name: string;      // e.g., "United States of America"
}

export interface Season {
  air_date: string | null; // Can be null for upcoming seasons
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string ;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string; // e.g., "en"
  name: string;
}

export interface TvShowDetails {
  adult: boolean;
  backdrop_path: string | null; // path to the backdrop image
  created_by: CreatedBy[];
  episode_run_time: number[]; // Array of runtimes in minutes
  first_air_date: string; // "YYYY-MM-DD"
  genres: Genre[];
  homepage: string; // URL
  id: number; // TMDb ID for the TV show
  in_production: boolean;
  languages: string[]; // Array of ISO 639-1 language codes (e.g., ["en"])
  last_air_date: string; // "YYYY-MM-DD"
  last_episode_to_air: LastEpisodeToAir | null; // Can be null if no episodes aired yet
  name: string; // Original name
  next_episode_to_air: null; // Could be LastEpisodeToAir type if not null, but example shows null
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[]; // Array of ISO 3166-1 country codes (e.g., ["US"])
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string ; // path to the poster image
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string; // e.g., "Ended", "Returning Series", "Canceled"
  tagline: string;
  type: string; // e.g., "Scripted", "Talk Show", "Documentary"
  vote_average: number;
  vote_count: number;
}


export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string ;
  vote_average: number;
  vote_count: number;
  seasonPath: string,
}

export interface SeasonDetails {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
}
 
export interface AnimeData {
  id: number;
  title: {
    romaji: string;
    english: string | null; // English title might not always be present
  };
  format: 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL' | 'MUSIC'; // Using specific literal types
  genres: string[];
  description: string | null; // Description might be null for some entries
  coverImage: {
    large: string;
    medium?: string; // Kitsu often has a 'medium' size too, making it optional
  };
 
}









// --- Core Kitsu API Structure ---

export interface KitsuApiResponse<T> {
  data: KitsuData<T>;
}

export interface KitsuData<T> {
  id: string;
  type: string; // "anime" in this case
  links: {
    self: string;
  };
  attributes: T; // T will be AnimeAttributes in this case
  relationships: KitsuRelationships;
}

// --- Specific Anime Attributes ---

export interface AnimeAttributes {
  createdAt: string; // Date-time string, e.g., "2015-12-10T23:03:02.734Z"
  updatedAt: string; // Date-time string, e.g., "2025-06-07T06:23:23.187Z"
  slug: string; // e.g., "kimi-no-na-wa"
  synopsis: string;
  description: string;
  coverImageTopOffset: number; // e.g., 275
  titles: AnimeTitles;
  canonicalTitle: string; // e.g., "Kimi no Na wa."
  abbreviatedTitles: string[]; // e.g., []
  averageRating: string; // e.g., "83.31"
  ratingFrequencies: RatingFrequencies;
  userCount: number; // e.g., 406934
  favoritesCount: number; // e.g., 4161
  startDate: string; // Date string, e.g., "2016-08-26"
  endDate: string; // Date string, e.g., "2016-08-26"
  nextRelease: string | null; // Date-time string or null
  popularityRank: number; // e.g., 8
  ratingRank: number; // e.g., 55
  ageRating: string; // e.g., "PG"
  ageRatingGuide: string; // e.g., "Teens 13 or older"
  subtype: AnimeSubtype; // "movie", "tv", "ova", "ona", "special", "music", "tv_short"
  status: string; // e.g., "finished"
  tba: string | null; // "To Be Announced", can be null
  posterImage: ImageSet;
  coverImage: ImageSet | null; // Can be null for some entries
  episodeCount: number; // e.g., 1
  episodeLength: number; // in minutes, e.g., 106
  totalLength: number; // in minutes, e.g., 106
  youtubeVideoId: string | null; // YouTube video ID, e.g., "3KR8_igDs1Y" or null
  showType: AnimeSubtype; // Same as subtype, "movie", "tv", etc.
  nsfw: boolean; // Not Safe For Work, e.g., false
}

export type AnimeSubtype = "movie" | "tv" | "ova" | "ona" | "special" | "music" | "tv_short";

export interface AnimeTitles {
  en?: string; // Optional English title, e.g., "Your Name."
  en_jp?: string; // Optional Romaji English title, e.g., "Kimi no Na wa."
  en_us?: string; // Optional US English title, e.g., "Your Name."
  ja_jp?: string; // Optional Japanese title, e.g., "君の名は。"
  // Kitsu API can have other language codes too, but these are common
  [key: string]: string | undefined;
}

export interface RatingFrequencies {
  // Keys are rating values (2, 3, ..., 20), values are counts
  [key: string]: string; // Using string for count as per your data "11519"
}

export interface ImageSet {
  tiny: string; // URL to tiny image
  large: string; // URL to large image
  small: string; // URL to small image
  medium: string; // URL to medium image
  original: string; // URL to original image
  meta: ImageMeta;
}

export interface ImageMeta {
  dimensions: ImageDimensions;
}

export interface ImageDimensions {
  tiny: ImageSize;
  large: ImageSize;
  small: ImageSize;
  medium?: ImageSize; // 'medium' might not always be present for coverImage
}

export interface ImageSize {
  width: number;
  height: number;
}

// --- Relationships ---

export interface KitsuRelationships {
  genres: RelationshipLinks;
  categories: RelationshipLinks;
  castings: RelationshipLinks;
  installments: RelationshipLinks;
  mappings: RelationshipLinks;
  reviews: RelationshipLinks;
  mediaRelationships: RelationshipLinks;
  characters: RelationshipLinks;
  staff: RelationshipLinks;
  productions: RelationshipLinks;
  quotes: RelationshipLinks;
  episodes: RelationshipLinks;
  streamingLinks: RelationshipLinks;
  animeProductions: RelationshipLinks;
  animeCharacters: RelationshipLinks;
  animeStaff: RelationshipLinks;
  // ... potentially more relationships
}

export interface RelationshipLinks {
  links: {
    self: string;
    related: string;
  };
}

// --- Full Interface for the provided data ---

export type KitsuAnimeResponse ={
  // data: {
    id: string;
    type: "anime";
    links: {
      self: string;
    };
    attributes: AnimeAttributes;
    relationships: KitsuRelationships;
  // };
}


export interface EpisodeResponse {
  episodes: Episode[];
  nextPage: number | null;
}



export interface SearchResult {
  results: Movie[];
}
