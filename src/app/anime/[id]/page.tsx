import { Screen } from '@/src/app/components/screen';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ScreenPage({ params }: PageProps) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const url = `https://api.consumet.org/anime/gogoanime/${id}?page=1`;

    return (
        <div className="bg-black min-h-screen relative">
            <Screen url={url} />
        </div>
    );
}
