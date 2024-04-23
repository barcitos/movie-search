import { QueryFunctionContext } from '@tanstack/query-core';
import axios from 'axios';

import { MoviesResponse } from './types';

export const fetchMovies = async ({
  queryKey: [, { query, page }],
}: QueryFunctionContext<[string, { query: string; page: number }]>) => {
  const { data } = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query,
        page,
      },
    }
  );

  return data;
};
