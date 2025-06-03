'use client'
export  type Movie = {
  adult: boolean;
  backdrop_path: string | null; // Path to the movie's backdrop image
  genre_ids: number[]; // Array of genre IDs
  id: number; // Unique ID of the movie
  original_language: string;
  original_title: string;
  overview: string; // A brief summary of the movie
  popularity: number;
  poster_path: string  ; // Path to the movie's poster image
  release_date: string; // Format: YYYY-MM-DD
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number; // Average user rating
  vote_count: number; // Number of votes
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
  still_path: string | null;
  vote_average: number;
  vote_count: number;
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
