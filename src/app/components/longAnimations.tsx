'use client'

import { Genres } from "./genres"
import { fetchAnimationByGenres, fetchTrendingAnimations } from "../lib/tmdb"
import { useGenreCategories } from "../hooks/useGenreCategories"
import { TMDB_TV_GENRES } from "../lib/constants"

const ANIMATION_CONFIGS = [
  { label: '🔥 Trending',      fetcher: () => fetchTrendingAnimations(1).then((d) => d.results) },
  { label: 'Action & Adventure', fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.ACTION_ADVENTURE).then((d) => d.results) },
  { label: 'Mystery',          fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.MYSTERY).then((d) => d.results) },
  { label: 'Family',           fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.FAMILY).then((d) => d.results) },
  { label: 'Kids',             fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.KIDS).then((d) => d.results) },
  { label: 'Science Fiction',  fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.SCIENCE_FICTION).then((d) => d.results) },
  { label: 'War',              fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.WAR).then((d) => d.results) },
  { label: 'Romance',          fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.ROMANCE).then((d) => d.results) },
  { label: 'Drama',            fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.DRAMA).then((d) => d.results) },
  { label: 'History',          fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.HISTORY).then((d) => d.results) },
  { label: 'Documentary',      fetcher: () => fetchAnimationByGenres(TMDB_TV_GENRES.DOCUMENTARY).then((d) => d.results) },
];

export const LongAnimations = () => {
  const { categories, isLoading, error } = useGenreCategories(ANIMATION_CONFIGS);

  return (
    <Genres
      sectionName="Animation"
      categories={categories}
      mediaType="animation"
      isLoading={isLoading}
      error={error}
    />
  );
}
