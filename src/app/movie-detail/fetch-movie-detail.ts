import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/query-core';

import { MovieDetailItem } from './types';

export const fetchMovieDetail = async ({
  queryKey: [, id],
}: QueryFunctionContext<[string, string | undefined]>) => {
  if (!id) {
    return;
  }

  const { data } = await axios.get<MovieDetailItem>(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    }
  );

  return data;
};
