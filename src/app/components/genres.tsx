'use client'

import { Category } from "./category"
import { Movie } from "./interfaces";
import { MediaType } from "../lib/constants";

interface GenreProps {
  sectionName: string;
  categories: [string, Movie[]][];
  mediaType: MediaType;
  isLoading?: boolean;
  error?: string | null;
}

export const Genres = ({
  sectionName,
  categories,
  mediaType,
  isLoading = false,
  error = null,
}: GenreProps) => {
  if (error) {
    return (
      <div className="flex items-center justify-center p-10 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {categories.map(([name, content], index) => (
        <div key={index}>
          <Category
            category_name={`${name} ${sectionName}`}
            content={content}
            mediaType={mediaType}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
}
