'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { fetchSeriesDetail, fetchSeasonEpisodes } from '../lib/tmdb';
import { TvShowDetails, Episode } from './interfaces';

type EpisodeScreenProps = {
  seriesId: number;
  seasonNumber: number;
  episodeNumber: number;
  mediaSection: 'series' | 'animations';
};

export const EpisodeScreen = ({
  seriesId,
  seasonNumber,
  episodeNumber,
  mediaSection,
}: EpisodeScreenProps) => {
  const router = useRouter();

  // Ad-blocking state
  const [overlayActive, setOverlayActive] = useState(true);
  const waitingForIframeClick = useRef(false);

  // Data state
  const [seriesDetails, setSeriesDetails] = useState<TvShowDetails | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentSeason, setCurrentSeason] = useState(seasonNumber);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);

  const basePath = mediaSection === 'series' ? '/series' : '/animations';
  const embedUrl = `https://vidsrc.xyz/embed/tv/${seriesId}/${currentSeason}/${episodeNumber}`;
  const totalSeasons = seriesDetails?.number_of_seasons ?? 1;

  // Sync season state when navigating between episodes via URL
  useEffect(() => {
    setCurrentSeason(seasonNumber);
  }, [seasonNumber]);

  // Re-arm overlay when the embed URL changes
  useEffect(() => {
    setOverlayActive(true);
  }, [embedUrl]);

  // Ad-blocking: override window.open and reclaim focus on blur
  useEffect(() => {
    const originalOpen = window.open;
    window.open = () => null;

    const handleBlur = () => {
      window.focus();
      if (waitingForIframeClick.current) {
        waitingForIframeClick.current = false;
        setOverlayActive(true);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => {
      window.open = originalOpen;
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleOverlayClick = () => {
    waitingForIframeClick.current = true;
    setOverlayActive(false);
  };

  // Fetch series details once on mount
  useEffect(() => {
    fetchSeriesDetail(seriesId).then(setSeriesDetails);
  }, [seriesId]);

  // Fetch episodes whenever the season changes
  const loadEpisodes = useCallback(
    async (seasonNum: number) => {
      setLoadingEpisodes(true);
      try {
        const results = await fetchSeasonEpisodes(seriesId, seasonNum);
        setEpisodes(results);
      } finally {
        setLoadingEpisodes(false);
      }
    },
    [seriesId]
  );

  useEffect(() => {
    loadEpisodes(currentSeason);
  }, [currentSeason, loadEpisodes]);

  // Derived values
  const currentEpisode = episodes.find(e => e.episode_number === episodeNumber) ?? null;
  const hasNextEpisode = !!(
    episodes.find(e => e.episode_number === episodeNumber + 1) ||
    currentSeason < totalSeasons
  );

  // Navigation handlers
  const handleSeasonPrev = () => {
    if (currentSeason > 1) {
      router.push(`${basePath}/${seriesId}/${currentSeason - 1}/1`);
    }
  };

  const handleSeasonNext = () => {
    if (currentSeason < totalSeasons) {
      router.push(`${basePath}/${seriesId}/${currentSeason + 1}/1`);
    }
  };

  const handleEpisodeSelect = (epNum: number) => {
    router.push(`${basePath}/${seriesId}/${currentSeason}/${epNum}`);
  };

  const handleNext = () => {
    const nextEp = episodes.find(e => e.episode_number === episodeNumber + 1);
    if (nextEp) {
      router.push(`${basePath}/${seriesId}/${currentSeason}/${nextEp.episode_number}`);
    } else if (currentSeason < totalSeasons) {
      router.push(`${basePath}/${seriesId}/${currentSeason + 1}/1`);
    }
  };

  // Compute episode thumbnail: prefer still_path, fall back to series poster for animations
  const getThumbnailSrc = (ep: Episode): string | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stillPath = (ep as any).still_path as string | null;
    if (stillPath) return `https://image.tmdb.org/t/p/w200${stillPath}`;
    if (mediaSection === 'animations' && seriesDetails?.poster_path) {
      return `https://image.tmdb.org/t/p/w200${seriesDetails.poster_path}`;
    }
    return null;
  };

  const renderStars = (rating: number) => {
    const filled = Math.round(rating / 2);
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < filled ? 'text-yellow-400' : 'text-gray-700'}>
            ★
          </span>
        ))}
        <span className="text-gray-400 text-xs ml-1">{rating.toFixed(1)}/10</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* Back button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Video player */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-3">
        <div className="aspect-video rounded-lg overflow-hidden relative bg-black shadow-2xl">
          <iframe
            title="episode"
            src={embedUrl}
            allowFullScreen
            className="w-full h-full"
          />
          {overlayActive && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={handleOverlayClick}
            />
          )}
        </div>
      </div>

      {/* Info panel + episode list */}
      <div className="max-w-5xl mx-auto px-4 mt-6 pb-14 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">

        {/* Left: current episode info */}
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
            {seriesDetails?.name ?? '\u00A0'}
          </p>

          {currentEpisode ? (
            <>
              <h1 className="text-xl font-bold leading-snug">
                {currentEpisode.name || `Episode ${episodeNumber}`}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="bg-gray-800 text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded">
                  S{currentSeason} · E{episodeNumber}
                </span>
                {currentEpisode.air_date && (
                  <span className="text-gray-500 text-xs">{currentEpisode.air_date}</span>
                )}
                {currentEpisode.runtime != null && (
                  <span className="text-gray-500 text-xs">{currentEpisode.runtime} min</span>
                )}
              </div>

              {currentEpisode.vote_average > 0 && (
                <div className="mt-2">{renderStars(currentEpisode.vote_average)}</div>
              )}

              {currentEpisode.overview ? (
                <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                  {currentEpisode.overview}
                </p>
              ) : (
                <p className="mt-4 text-gray-600 text-sm italic">No overview available.</p>
              )}

              {/* Episode still image */}
              {(currentEpisode as unknown as { still_path: string | null }).still_path && (
                <div className="mt-4 w-full max-w-xs aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${(currentEpisode as unknown as { still_path: string }).still_path}`}
                    alt={currentEpisode.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {hasNextEpisode && (
                <button
                  onClick={handleNext}
                  className="mt-5 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-black font-semibold rounded-lg text-sm transition-colors"
                >
                  Next Episode →
                </button>
              )}
            </>
          ) : loadingEpisodes ? (
            <div className="mt-3 space-y-3">
              <div className="h-6 w-60 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-36 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-4/5 bg-gray-800 rounded animate-pulse" />
            </div>
          ) : (
            <p className="mt-3 text-gray-500 text-sm">Episode info unavailable.</p>
          )}
        </div>

        {/* Right: season selector + episode list */}
        <div>
          {/* Season navigation */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-semibold text-xs uppercase tracking-widest">
              Season
            </span>
            <button
              onClick={handleSeasonPrev}
              disabled={currentSeason <= 1}
              className="text-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none transition-colors"
            >
              ‹
            </button>
            <span className="bg-cyan-400 text-black font-bold px-3 py-0.5 rounded text-sm min-w-[2rem] text-center">
              {currentSeason}
            </span>
            <button
              onClick={handleSeasonNext}
              disabled={currentSeason >= totalSeasons}
              className="text-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none transition-colors"
            >
              ›
            </button>
            {seriesDetails && (
              <span className="text-gray-600 text-xs">of {totalSeasons}</span>
            )}
          </div>

          {/* Episode list */}
          <div className="overflow-y-auto max-h-[480px] space-y-1 pr-1 scrollbar-hide">
            {loadingEpisodes
              ? Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="h-14 bg-gray-800 rounded-lg animate-pulse" />
                ))
              : episodes.map(ep => {
                  const isActive = ep.episode_number === episodeNumber;
                  const thumb = getThumbnailSrc(ep);
                  return (
                    <button
                      key={ep.episode_number}
                      onClick={() => handleEpisodeSelect(ep.episode_number)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-cyan-500/20 border border-cyan-500/40'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-9 relative rounded flex-shrink-0 bg-gray-800 overflow-hidden">
                        {thumb ? (
                          <Image src={thumb} alt={ep.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                            {ep.episode_number}
                          </div>
                        )}
                      </div>

                      {/* Title + rating */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-xs font-bold flex-shrink-0 ${
                              isActive ? 'text-cyan-400' : 'text-gray-600'
                            }`}
                          >
                            E{ep.episode_number}
                          </span>
                          <span
                            className={`text-sm truncate ${
                              isActive ? 'text-white font-medium' : 'text-gray-300'
                            }`}
                          >
                            {ep.name || `Episode ${ep.episode_number}`}
                          </span>
                        </div>
                        {ep.vote_average > 0 && (
                          <span className="text-xs text-yellow-400">
                            ★ {ep.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};
