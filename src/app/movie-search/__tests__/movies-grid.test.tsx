import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MoviesGrid } from '../movies-grid';
import { MemoryRouter } from 'react-router-dom';

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
          results: [],
        },
        isLoading: false,
        error: undefined,
      })
      .mockReturnValueOnce({
        data: {
          results: [
            {
              id: '1',
              poster_path: '#',
              release_date: '2023-01-01',
              title: 'Title',
            },
          ],
          total_pages: 2,
        },
        isLoading: false,
        error: undefined,
      })
      .mockReturnValueOnce({
        data: {
          results: [
            {
              id: '1',
              poster_path: null,
              release_date: null,
              title: 'Title',
            },
          ],
          total_pages: 1,
        },
        isLoading: false,
        error: undefined,
      }),
  };
});

describe('movies grid component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <MoviesGrid page={1} query="" setPage={vi.fn()} />
        </QueryClientProvider>
      </MemoryRouter>
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

  test('should render empty state with no results', () => {
    waitFor(() => {
      const grid = screen.getByTestId('movie-grid');

      const { getByText } = within(grid);

      expect(grid).toBeInTheDocument();
      expect(getByText('No movies found')).toBeInTheDocument();
    });
  });

  test('should render data', () => {
    waitFor(() => {
      const grid = screen.getByTestId('movie-grid');

      const { getByAltText, getByLabelText, getByText } = within(grid);

      expect(grid).toBeInTheDocument();
      expect(grid.querySelector('a')).toHaveAttribute('href', '/movies/1');
      expect(getByAltText('Title')).toBeInTheDocument();
      expect(getByText('Title')).toBeInTheDocument();
      expect(getByText('2023')).toBeInTheDocument();
      expect(getByLabelText('pagination navigation')).toBeInTheDocument();
      expect(getByLabelText('page 1')).toBeInTheDocument();
      expect(getByLabelText('page 2')).toBeInTheDocument();
    });
  });

  test('should render placeholder with no poster, unknown release date', () => {
    waitFor(() => {
      expect(screen.getByText('No Image Available')).toBeInTheDocument();
      expect(screen.getByAltText('Title')).not.toBeInTheDocument();
      expect(screen.getByText('TBA')).toBeInTheDocument();
    });
  });
});
