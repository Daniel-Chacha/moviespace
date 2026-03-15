'use client'
import { Header } from "./header"
import { Genres } from "./genres"
import { Footer } from "./footer"
import Scroll from "./scroll"
import { useGenreCategories } from "../hooks/useGenreCategories"
import { fetchMediaTypeByGenres, fetchTrendingMediaType } from "../lib/tmdb"
import { TMDB_TV_GENRES } from "../lib/constants"

const SERIES_CONFIGS = [
  { label: '🔥 Trending',      fetcher: () => fetchTrendingMediaType('tv/popular') },
  { label: 'Action & Adventure', fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.ACTION_ADVENTURE, 'tv') },
  { label: 'Mystery',          fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.MYSTERY, 'tv') },
  { label: 'Crime',            fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.CRIME, 'tv') },
  { label: 'Reality',          fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.REALITY, 'tv') },
  { label: 'Science Fiction',  fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.SCIENCE_FICTION, 'tv') },
  { label: 'Comedy',           fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.COMEDY, 'tv') },
  { label: 'War',              fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.WAR, 'tv') },
  { label: 'Romance',          fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.ROMANCE, 'tv') },
  { label: 'Drama',            fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.DRAMA, 'tv') },
  { label: 'History',          fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.HISTORY, 'tv') },
  { label: 'Documentary',      fetcher: () => fetchMediaTypeByGenres(TMDB_TV_GENRES.DOCUMENTARY, 'tv') },
];

export const Series = () => {
  const { categories, isLoading, error } = useGenreCategories(SERIES_CONFIGS);

  return (
    <div className="relative">
      <Header showNavbar={true} />
      <div className="border-t-[1.5px] border-cyan-300">
        <Genres
          sectionName="Series"
          categories={categories}
          mediaType="series"
          isLoading={isLoading}
          error={error}
        />
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
