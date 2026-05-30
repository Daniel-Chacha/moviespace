'use client'

import { useRouter } from 'next/navigation';
import { Btn } from "./btn";
import { useEffect, useState, useRef } from 'react';

type DisplayProps = {
  url: string;
};

export const Screen = ({ url }: DisplayProps) => {
  const router = useRouter();
  const [overlayActive, setOverlayActive] = useState(true);
  // Bumped to force a fresh <iframe> mount. Reassigning `src` on an iframe that
  // failed to load (and is now showing Chrome's chrome-error:// page) triggers
  // "Unsafe attempt to load URL ... from frame with URL chrome-error://chromewebdata/".
  // A new key remounts a clean iframe instead of re-navigating the errored one.
  const [reloadKey, setReloadKey] = useState(0);
  // Tracks whether the overlay was just removed, meaning the next window blur
  // is the user's intended click landing on the iframe — not an ad popup
  const waitingForIframeClick = useRef(false);

  useEffect(() => {
    const originalOpen = window.open;
    window.open = () => null;

    const handleBlur = () => {
      // Always pull focus back to prevent tabs opening behind the page
      window.focus();

      if (waitingForIframeClick.current) {
        // The user's real click just reached the iframe — re-arm the overlay
        // so it intercepts the next ad-triggering click
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
    // Absorb this click (ad never fires), then step aside so the user's
    // next click reaches the player naturally
    waitingForIframeClick.current = true;
    setOverlayActive(false);
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center relative">
      <div className="w-full max-w-5xl aspect-video rounded overflow-hidden shadow-lg relative">
        <iframe
          key={`${url}-${reloadKey}`}
          title="movie"
          src={url}
          // Delegate the features the player needs. A cross-origin iframe denies
          // autoplay + Encrypted Media (Widevine/EME) by default, so the DRM/HLS
          // player renders a blank frame here even though it plays fine when the
          // same URL is opened as a top-level browser tab.
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
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

      <div className="absolute top-3 left-5">
        <Btn label="<" method={() => router.back()} />
      </div>

      {/* Recourse when the stream itself is down or blocked (adblock/DNS) */}
      <div className="absolute top-3 right-5 flex gap-2">
        <button
          onClick={() => setReloadKey(k => k + 1)}
          className="text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          ⟳ Reload player
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          Open ↗
        </a>
      </div>
    </div>
  );
};
