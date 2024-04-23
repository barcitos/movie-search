import axios from 'axios';

import { fetchMovieDetail } from '../fetch-movie-detail';

vi.mock('axios');
describe('fetch movie detail fn', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should make a request', () => {
    vi.mocked(axios.get).mockResolvedValue({ data: {} });

    fetchMovieDetail({
      meta: undefined,
      queryKey: ['a', 'b'],
      signal: new AbortController().signal,
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/b',
      { params: { api_key: '' } }
    );
  });

  test('should not make a request without an id', () => {
    fetchMovieDetail({
      meta: undefined,
      queryKey: ['a', undefined],
      signal: new AbortController().signal,
    });

    expect(axios.get).not.toHaveBeenCalled();
  });
});
