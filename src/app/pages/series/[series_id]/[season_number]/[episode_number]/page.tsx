
import { Screen } from "@/src/app/components/screen";

type PageProps={
    params:{
        series_id: number;
        season_number: number;
        episode_number: number;
    }
}
export default  function ScreenPage({params}: PageProps){
    // const seriesId  = parseInt(params.series_id);
    // const seasonNumber = parseInt(params.season_number, 10); 
    // const episodeNumber = parseInt(params.episode_number);

    const url= `https://vidsrc.xyz/embed/tv/${params.series_id}/${params.season_number}/${params.episode_number}`;

    return(
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    )
}