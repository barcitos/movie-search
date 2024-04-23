export type MovieListItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: Array<MovieListItem>;
  total_pages: number;
  total_results: number;
};
