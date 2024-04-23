import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MovieDetailContent } from '../movie-detail-content';

vi.mock('@tanstack/react-query', async () => {
  const actual = (await vi.importActual('@tanstack/react-query')) as any;

  return {
    ...actual,
    useQuery: vi
      .fn()
      .mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        error: new Error('Something failed'),
      })
      .mockReturnValueOnce({
        data: undefined,
        isLoading: true,
        error: undefined,
      })
      .mockReturnValueOnce({
        data: {
          overview: 'Overview',
          title: 'Title',
          poster_path: '#',
          release_date: '2023-01-01',
          genres: [{ name: 'Genre' }],
        },
        isLoading: false,
        error: undefined,
      }),
  };
});

describe('movie detail content component', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MovieDetailContent />
      </QueryClientProvider>
    );
  });

  test('should render error message', () => {
    waitFor(() => {
      const error = screen.getByRole('alert');

      expect(error).toBeInTheDocument();
    });
  });

  test('should render loading state', () => {
    waitFor(() => {
      const loader = screen.getByRole('progressbar');

      expect(loader).toBeInTheDocument();
    });
  });

  test('should render data', () => {
    waitFor(() => {
      const detail = screen.getByTestId('movie-detail');
      const { getByAltText, getByText } = within(detail);

      expect(detail).toBeInTheDocument();
      expect(getByText('Overview')).toBeInTheDocument();
      expect(getByText('Title')).toBeInTheDocument();
      expect(getByText('2023')).toBeInTheDocument();
      expect(getByText('Genre')).toBeInTheDocument();
      expect(getByAltText('Title')).toHaveAttribute(
        'src',
        'https://image.tmdb.org/t/p/w500#'
      );
    });
  });
});
