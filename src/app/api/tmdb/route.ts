import { NextRequest, NextResponse } from 'next/server';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
  }

  // Support both the new TMDB_API_KEY (server-only) and the legacy NEXT_PUBLIC_TMDB_API_KEY
  const apiKey = process.env.TMDB_API_KEY ;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  // Forward all query params except 'endpoint', then inject the server-side API key
  const tmdbParams = new URLSearchParams(searchParams);
  tmdbParams.delete('endpoint');
  tmdbParams.set('api_key', apiKey);

  const url = `${TMDB_BASE_URL}/${endpoint}?${tmdbParams.toString()}`;

  try {
    // Cache responses for 1 hour to reduce redundant TMDB requests
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      return NextResponse.json({ error: 'TMDB request failed' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('TMDB proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
