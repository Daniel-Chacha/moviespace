// app/api/anime-by-genre/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { genres, subtype } = await request.json();

  const query = `
    query ($type: MediaType, $format: MediaFormat, $genre_in: [String], $sort: [MediaSort], $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: $type, format: $format, genre_in: $genre_in, sort: $sort) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
          }
          startDate {
            year
            month
            day
          }
          genres
          averageScore
          popularity
          isAdult
          siteUrl
        }
      }
    }
  `;

  const variables = {
    type: 'ANIME',
    format: subtype || 'MOVIE',
    genre_in: genres || [],
    sort: ['POPULARITY_DESC'],
    page: 1,
    perPage: 10,
  };

  try {
    const response = await axios.post('https://graphql.anilist.co', {
      query,
      variables,
    });

    const mediaList = response.data.data.Page.media;

    const movies = mediaList.map((media: any) => ({
      adult: media.isAdult,
      backdrop_path: null,
      genre_ids: [],
      id: media.id,
      original_language: 'ja',
      original_title: media.title.native,
      overview: media.description,
      popularity: media.popularity,
      poster_path: media.coverImage.large,
      release_date: `${media.startDate.year}-${media.startDate.month}-${media.startDate.day}`,
      first_air_date: `${media.startDate.year}-${media.startDate.month}-${media.startDate.day}`,
      title: media.title.english || media.title.romaji,
      name: media.title.romaji,
      video: false,
      vote_average: media.averageScore / 10,
      vote_count: 0,
    }));

    return NextResponse.json(movies);
  } catch (error) {
    console.error('AniList API error:', error);
    return NextResponse.json({ error: 'Failed to fetch anime by genre' }, { status: 500 });
  }
}
