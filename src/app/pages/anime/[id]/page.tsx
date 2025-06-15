// 'use client';
// import axios from 'axios';
import { Screen } from '@/src/app/components/screen';
// import { useState, useEffect } from 'react';

// interface WatchData {
//   id: string;
//   title: string;
//   url: string;
//   // Add other fields as per Consumet API response
// }

interface PageProps {
  params:Promise<{
    id: string; // Changed to string since Next.js params are strings
  }>;
}

export default async function ScreenPage({ params }: PageProps) {
//   const [watchData, setWatchData] = useState<WatchData | null>(null);
//   const [error, setError] = useState<string | null>(null);
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10); // Convert string to number
  const url = `https://api.consumet.org/anime/gogoanime/${id}?page=1`;



  // async function getWatchPlay(animeId: number) {
    //  const url = `https://consumentapi.vercel.app/anime/gogoanime/${animeId}?page=1`;
  //   const url = `https://api.consumet.org/anime/gogoanime/${animeId}?page=1`;
  //   // const url = `https://api-anime-rouge.vercel.app/aniwatch/info?id=${animeId}`;
  //   try {

  //     const { data } = await axios.get(url);
  //     console.log('DATA STREAM DATA:', data.results);
  //     setWatchData(data.results);
  //     setError(null);
  //   } catch (err) {
  //     console.error('Error fetching watch data:', err);
  //     setError('Failed to load streaming data. Please try again later.');
  //   }
  // }

  // useEffect(() => {
  //   if (id) {
  //     getWatchPlay(id);
  //   }
  // }, [id]);

  // console.log('Anime ID:', id);

  return (
    <div className="bg-black min-h-screen relative">
      {/* {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <Screen url={url} />
      )} */}
      <Screen url={url} />
    </div>
  );
}