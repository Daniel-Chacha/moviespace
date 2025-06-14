// // 'use client'
// import { Screen } from "@/src/app/components/screen";

// type PageProps={
//     params:{
//         series_id: string;
//         season_number: string;
//         episode_number: string;
//     }
// }
// export default  function ScreenPage({params}: PageProps){
//     const seriesId  = parseInt(params.series_id);
//     const seasonNumber = parseInt(params.season_number, 10); 
//     const episodeNumber = parseInt(params.episode_number);

//     const url= `https://vidsrc.xyz/embed/tv/${seriesId}/${seasonNumber}/${episodeNumber}`;

//     return(
//         <div className="bg-black min-h-screen relative">
//             <Screen url={url} />
//         </div>
//     )
// }


'use client';
import { Screen } from "@/src/app/components/screen";

export default function ScreenPage({
  params,
}: {
  params: {
    series_id: string;
    season_number: string;
    episode_number: string;
  };
}) {
  const seriesId = parseInt(params.series_id);
  const seasonNumber = parseInt(params.season_number, 10);
  const episodeNumber = parseInt(params.episode_number);

  // Fix URL syntax (replace placeholder with actual endpoint)
  const url =`https://vidsrc.xyz/embed/tv/${seriesId}/${seasonNumber}/${episodeNumber}`; // Replace with your API URL

  return (
    <div className="bg-black min-h-screen relative">
      <Screen url={url} />
    </div>
  );
}