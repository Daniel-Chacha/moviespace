'use client'
export  type Movie = {
  adult: boolean;
  backdrop_path: string ;  
  genre_ids: number[];  
  id: number; 
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;  
  popularity: number;
  poster_path: string  ;  
  release_date: string;  
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;  
  vote_count: number | null;  
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
  backdrop_path: string  ;  
  created_by: CreatedBy[];
  episode_run_time: number[];  
  first_air_date: string;  
  genres: Genre[];
  homepage: string;  
  id: number; 
  in_production: boolean;
  languages: string[];  
  last_air_date: string;  
  last_episode_to_air: LastEpisodeToAir | null;  
  name: string;  
  next_episode_to_air: null; 
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
  format: 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL' | 'MUSIC'; 
  genres: string[];
  description: string | null;  
  coverImage: {
    large: string;
    medium?: string;  
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
  createdAt: string;  
  updatedAt: string;  
  slug: string;  
  synopsis: string;
  description: string;
  coverImageTopOffset: number; // e.g., 275
  titles: AnimeTitles;
  canonicalTitle: string;  
  abbreviatedTitles: string[];  
  averageRating: string;  
  ratingFrequencies: RatingFrequencies;
  userCount: number; 
  favoritesCount: number; 
  startDate: string;  
  endDate: string; 
  nextRelease: string | null;  
  popularityRank: number;  
  ratingRank: number;  
  ageRating: string;  
  ageRatingGuide: string; 
  subtype: AnimeSubtype; 
  status: string;  
  tba: string | null; 
  posterImage: ImageSet;
  coverImage: ImageSet | null; 
  episodeCount: number;  
  episodeLength: number;  
  totalLength: number;  
  youtubeVideoId: string | null;  
  showType: AnimeSubtype;  
  nsfw: boolean;  
}

export type AnimeSubtype = "movie" | "tv" | "ova" | "ona" | "special" | "music" | "tv_short";

export interface AnimeTitles {
  en?: string;  
  en_jp?: string;  
  en_us?: string;  
  ja_jp?: string;  
  // Kitsu API can have other language codes too, but these are common
  [key: string]: string | undefined;
}

export interface RatingFrequencies {
  // Keys are rating values (2, 3, ..., 20), values are counts
  [key: string]: string;  
}

export interface ImageSet {
  tiny: string;  
  large: string;  
  small: string;  
  medium: string; 
  original: string;  
  meta: ImageMeta;
}

export interface ImageMeta {
  dimensions: ImageDimensions;
}

export interface ImageDimensions {
  tiny: ImageSize;
  large: ImageSize;
  small: ImageSize;
  medium?: ImageSize;  
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
