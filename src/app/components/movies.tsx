'use client'
import { Header } from "./header"
import { Genres } from "./genres"
import { Footer } from "./footer"
import Scroll from "./scroll"
import { useGenreCategories } from "../hooks/useGenreCategories"
import { fetchMediaTypeByGenres, fetchTrendingMediaType } from "../lib/tmdb"
import { TMDB_MOVIE_GENRES } from "../lib/constants"

const MOVIE_CONFIGS = [
  { label: '🔥 Trending',      fetcher: () => fetchTrendingMediaType('trending/movie/week') },
  { label: 'Action',           fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.ACTION, 'movie') },
  { label: 'Adventure',        fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.ADVENTURE, 'movie') },
  { label: 'Mystery',          fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.MYSTERY, 'movie') },
  { label: 'Crime',            fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.CRIME, 'movie') },
  { label: 'Thriller',         fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.THRILLER, 'movie') },
  { label: 'Science Fiction',  fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.SCIENCE_FICTION, 'movie') },
  { label: 'Comedy',           fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.COMEDY, 'movie') },
  { label: 'War',              fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.WAR, 'movie') },
  { label: 'Romance',          fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.ROMANCE, 'movie') },
  { label: 'Drama',            fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.DRAMA, 'movie') },
  { label: 'History',          fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.HISTORY, 'movie') },
  { label: 'Documentary',      fetcher: () => fetchMediaTypeByGenres(TMDB_MOVIE_GENRES.DOCUMENTARY, 'movie') },
];

export default function Movies() {
  const { categories, isLoading, error } = useGenreCategories(MOVIE_CONFIGS);

  return (
    <div>
      <Header showNavbar={true} />
      <div className="border-t-[1.5px] border-cyan-300">
        <Genres
          sectionName="Movies"
          categories={categories}
          mediaType="movie"
          isLoading={isLoading}
          error={error}
        />
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
