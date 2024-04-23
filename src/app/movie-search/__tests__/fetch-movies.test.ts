import axios from 'axios';

import { fetchMovies } from '../fetch-movies';

vi.mock('axios');
describe('fetch movies search fn', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should make a request', () => {
    vi.mocked(axios.get).mockResolvedValue({ data: {} });

    fetchMovies({
      meta: undefined,
      queryKey: ['a', { query: 'query', page: 2 }],
      signal: new AbortController().signal,
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/movie',
      { params: { api_key: '', query: 'query', page: 2 } }
    );
  });
});
