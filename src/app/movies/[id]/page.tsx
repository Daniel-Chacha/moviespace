import { Screen } from "@/src/app/components/screen";

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function ScreenPage({ params }: PageProps) {
    const resolvedParams = await params;
    const Id = parseInt(resolvedParams.id, 10);
    const url = `https://vidsrc.xyz/embed/movie/${Id}/`;

    return (
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    );
}
