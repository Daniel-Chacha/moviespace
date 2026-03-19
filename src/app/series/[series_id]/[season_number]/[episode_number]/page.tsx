import { EpisodeScreen } from "@/src/app/components/episodeScreen";

type PageProps = {
    params: Promise<{
        series_id: string;
        season_number: string;
        episode_number: string;
    }>
}

export default async function ScreenPage({ params }: PageProps) {
    const resolvedParams = await params;
    const seriesId = parseInt(resolvedParams.series_id);
    const seasonNumber = parseInt(resolvedParams.season_number, 10);
    const episodeNumber = parseInt(resolvedParams.episode_number);

    return (
        <EpisodeScreen
            seriesId={seriesId}
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
            mediaSection="series"
        />
    );
}
