'use client'
import Image from "next/image"
import { Movie } from "./interfaces"
import { Btn } from "./btn"
import Link from "next/link"
import { useState } from "react"
import { Seasons } from "./season"
import { AnimeTypeTvEpisodes } from "./animeTypeTv"
import { MediaType } from "../lib/constants"

interface InfoProps {
  infoContent: Movie;
  onClose: () => void;
  isFromSearch?: boolean;
  mediaType?: MediaType;
}

export const Info = ({ infoContent, onClose, isFromSearch = false, mediaType }: InfoProps) => {
  const [toggleSeasonsModal, setToggleSeasonsModal] = useState<boolean>(false);
  const [toggleAnimeEpisodesModals, setToggleAnimeEpisodesModals] = useState<boolean>(false);

  // Derive media type from content when opened from search, otherwise use the explicit prop
  const resolvedMediaType: MediaType = isFromSearch
    ? infoContent.media_type === 'movie'
      ? 'movie'
      : infoContent.genre_ids?.includes(16)
        ? 'animation'
        : 'series'
    : (mediaType ?? 'movie');

  const isInMoviesPage = resolvedMediaType === 'movie';
  const isInSeriesPage = resolvedMediaType === 'series';
  const isInAnimePage = resolvedMediaType === 'anime';
  const isInAnimationsPage = resolvedMediaType === 'animation';

  const posterSrc = isInAnimePage
    ? infoContent.poster_path
    : `https://image.tmdb.org/t/p/w500${infoContent.poster_path}`;

  return (
    <div className="fixed inset-0 bg-[#00000090] z-50 flex items-center justify-center p-4 cursor-default">
      <div className="bg-[#121212] text-white rounded-lg shadow-lg max-md:w-[99vw] w-[60vw] relative">

        <div className="flex flex-row gap-4 justify-around">
          {/* Image Section */}
          <div className="relative w-40 h-40 rounded-t-lg overflow-hidden">
            <Image
              src={posterSrc}
              alt={infoContent.title || infoContent.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="m-auto">
            <p className="text-xl font-bold text-cyan-300 underline underline-offset-4 text-center">
              {infoContent.title || infoContent.name}
            </p>
            {infoContent.subType && (
              <p className="text-sm text-gray-300 mt-3">
                <strong>Sub Type:</strong> {infoContent.subType}
              </p>
            )}
            <p className="text-sm text-gray-300">
              <strong>Viewer Rating:</strong> {Math.round(infoContent.vote_average)}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Release Date:</strong> {infoContent.release_date || infoContent.first_air_date}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p className="text-sm text-gray-300">
            <strong className="text-cyan-300">Overview:</strong> {infoContent.overview}
          </p>
        </div>

        <div className="flex flex-row justify-around mb-3">
          <Btn label="Cancel" method={onClose} />

          {isInMoviesPage && (
            <Link href={`/movies/${String(infoContent.id)}`}>
              <Btn label="Watch" method={onClose} />
            </Link>
          )}

          {isInSeriesPage && (
            <Btn label="Watch" method={(e) => { e.stopPropagation(); setToggleSeasonsModal(true); }} />
          )}

          {isInAnimePage && (
            (infoContent.subType === 'movie' || infoContent.episodeCount === 1)
              ? (
                <Link href={`/anime/${String(infoContent.id)}`}>
                  <Btn label="Watch" method={onClose} />
                </Link>
              )
              : infoContent.vote_average
                ? (
                  <Btn
                    label="Watch"
                    method={(e) => { e.stopPropagation(); setToggleAnimeEpisodesModals(!toggleAnimeEpisodesModals); }}
                  />
                )
                : (
                  <span className="cursor-default font-semibold bg-[#120932] p-3 text-cyan-300 border-2 border-red-600">
                    To Be Released!
                  </span>
                )
          )}

          {isInAnimationsPage && (
            <Btn label="Watch" method={(e) => { e.stopPropagation(); setToggleSeasonsModal(true); }} />
          )}
        </div>

        {toggleSeasonsModal && (
          <Seasons seriesId={infoContent.id} onClose={() => setToggleSeasonsModal(false)} />
        )}

        {toggleAnimeEpisodesModals && (
          <AnimeTypeTvEpisodes
            id={infoContent.id}
            onClose={() => setToggleAnimeEpisodesModals(false)}
            anime_data={infoContent}
          />
        )}
      </div>
    </div>
  );
}
