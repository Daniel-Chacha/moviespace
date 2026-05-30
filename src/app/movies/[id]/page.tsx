import { Screen } from "@/src/app/components/screen";
import { movieEmbedUrl } from "@/src/app/lib/vidsrc";

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function ScreenPage({ params }: PageProps) {
    const resolvedParams = await params;
    const Id = parseInt(resolvedParams.id, 10);
    const url = movieEmbedUrl(Id);

    return (
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    );
}
