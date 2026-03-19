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
          title="movie"
          src={url}
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
    </div>
  );
};
