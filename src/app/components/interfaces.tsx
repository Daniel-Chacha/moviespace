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
  title: string;
  video: boolean;
  vote_average: number; // Average user rating
  vote_count: number; // Number of votes
}


