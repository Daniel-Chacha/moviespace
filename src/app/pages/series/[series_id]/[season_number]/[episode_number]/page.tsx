
import { Screen } from "@/src/app/components/screen";

type PageProps={
    params:Promise<{
        series_id: string;
        season_number: string;
        episode_number: string;
    }>
}
export default async function ScreenPage({params}: PageProps){
    const resolvedParams = await params
    const seriesId  = parseInt(resolvedParams.series_id);
    const seasonNumber = parseInt(resolvedParams.season_number, 10); 
    const episodeNumber = parseInt(resolvedParams.episode_number);

    const url= `https://vidsrc.xyz/embed/tv/${seriesId}/${seasonNumber}/${episodeNumber}`;

    return(
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    )
}