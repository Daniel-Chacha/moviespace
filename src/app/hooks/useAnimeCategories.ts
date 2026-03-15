'use client'
import { useState, useEffect } from 'react';
import { Movie } from '../components/interfaces';
import {
  fetchTrendingAnime,
  fetchPopularAnime,
  fetchUpcomingAnime,
  fetchAnimeByGenre,
} from '../lib/tmdb';
import { ANIME_GENRE_LIST } from '../lib/constants';

type CategoryEntry = [string, Movie[]];

const INITIAL_CATEGORIES: CategoryEntry[] = [
  ['🔥 Trending', []],
  ['Popular', []],
  ['Top Upcoming', []],
  ...ANIME_GENRE_LIST.map(({ label }) => [label, []] as CategoryEntry),
];

export function useAnimeCategories() {
  const [categories, setCategories] = useState<CategoryEntry[]>(INITIAL_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        // Load the three featured rows in parallel
        const [trending, popular, upcoming] = await Promise.all([
          fetchTrendingAnime(),
          fetchPopularAnime(),
          fetchUpcomingAnime(),
        ]);

        if (cancelled) return;

        setCategories((prev) => {
          const next = [...prev];
          next[0] = ['🔥 Trending', trending];
          next[1] = ['Popular', popular];
          next[2] = ['Top Upcoming', upcoming];
          return next;
        });

        // Fetch genres sequentially to avoid rate-limiting the Kitsu API
        for (let i = 0; i < ANIME_GENRE_LIST.length; i++) {
          if (cancelled) break;
          const { key, label } = ANIME_GENRE_LIST[i];
          const data = await fetchAnimeByGenre(key);
          if (!cancelled) {
            setCategories((prev) => {
              const next = [...prev];
              next[3 + i] = [label, data];
              return next;
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load anime. Please try again.');
          console.error('Error loading anime categories:', err);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, isLoading, error };
}
