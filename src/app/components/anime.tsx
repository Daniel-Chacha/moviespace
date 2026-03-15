'use client'
import { Header } from "./header"
import { Genres } from "./genres"
import { Footer } from "./footer"
import Scroll from "./scroll"
import { useAnimeCategories } from "../hooks/useAnimeCategories"

export const Anime = () => {
  const { categories, isLoading, error } = useAnimeCategories();

  return (
    <div>
      <Header showNavbar={true} />
      <div className="border-t-[1.5px] border-cyan-300">
        <Genres
          sectionName="Anime"
          categories={categories}
          mediaType="anime"
          isLoading={isLoading}
          error={error}
        />
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
