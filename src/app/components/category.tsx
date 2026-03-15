'use client'
import { useRef, useState, useEffect, useCallback } from "react"
import { Item } from "./item"
import { Movie } from "./interfaces"
import { MediaType } from "../lib/constants"
import { CategorySkeleton } from "./skeleton"

type CategoryProps = {
  category_name: string;
  content: Movie[];
  mediaType: MediaType;
  isLoading?: boolean;
};

export const Category = ({ category_name, content, mediaType, isLoading = false }: CategoryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth);
  }, []);

  // Check on mount and whenever content changes
  useEffect(() => {
    updateScrollState();
  }, [content, isLoading, updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'right' ? 600 : -600,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mt-6 px-2">
      <p className="text-2xl mb-3 text-cyan-300 font-bold tracking-wide">{category_name}</p>

      <div className="relative group/row">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00ff00] border border-[#00ff00]/40 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 -translate-x-2 hover:scale-110 cursor-pointer
            ${canScrollLeft
              ? 'opacity-0 group-hover/row:opacity-100 hover:bg-[#00ff00]/80 hover:border-[#00ff00]'
              : 'opacity-0 pointer-events-none'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex flex-row gap-4 overflow-x-auto h-[220px] scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            <CategorySkeleton />
          ) : (
            content.map((item) => (
              <Item key={item.id} itemsContent={item} mediaType={mediaType} />
            ))
          )}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#00ff00] border border-[#00ff00]/40 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 translate-x-2 hover:scale-110 cursor-pointer
            ${canScrollRight
              ? 'opacity-0 group-hover/row:opacity-100 hover:bg-[#00ff00]/80 hover:border-[#00ff00]'
              : 'opacity-0 pointer-events-none'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
