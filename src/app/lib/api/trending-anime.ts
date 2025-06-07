// pages/api/trending-anime.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subtype = 'MOVIE' } = req.query;

  const query = `
    query ($type: MediaType, $format: MediaFormat, $sort: [MediaSort], $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: $type, format: $format, sort: $sort) {
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
        }
      }
    }
  `;

  const variables = {
    type: 'ANIME',
    format: subtype,
    sort: ['TRENDING_DESC'],
    page: 1,
    perPage: 10,
  };

  try {
    const response = await axios.post(ANILIST_API_URL, {
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

    console.log("Trending from server:", movies);
    res.status(200).json(movies);
  } catch (error) {
    console.error('AniList API error:', error);
    res.status(500).json({ error: 'Failed to fetch trending anime' });
  }
}
