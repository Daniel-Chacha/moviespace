'use client'
import { useState, useEffect, useRef } from 'react';
import { Movie } from '../components/interfaces';

export interface GenreCategoryConfig {
  label: string;
  fetcher: () => Promise<Movie[]>;
}

type CategoryEntry = [string, Movie[]];

export function useGenreCategories(configs: GenreCategoryConfig[]) {
  // Use a ref so the effect runs only once without stale-closure issues
  const configsRef = useRef(configs);

  const [categories, setCategories] = useState<CategoryEntry[]>(() =>
    configs.map(({ label }) => [label, []] as CategoryEntry)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        // Fetch all categories in parallel
        const results = await Promise.all(
          configsRef.current.map(({ fetcher }) => fetcher())
        );
        if (!cancelled) {
          setCategories(
            configsRef.current.map(({ label }, i) => [label, results[i]] as CategoryEntry)
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load content. Please try again.');
          console.error('Error loading genre categories:', err);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []); // intentionally runs once on mount

  return { categories, isLoading, error };
}
