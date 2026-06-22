import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { MoviesGrid } from '../movies-grid';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<any>('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe('movies grid component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </MemoryRouter>
    );
  };

  test('should render error message', async () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Something failed'),
    } as any);

    renderWithProviders(<MoviesGrid page={1} query="" setPage={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  test('should render loading state', async () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as any);

    renderWithProviders(
      <MoviesGrid page={1} query="batman" setPage={vi.fn()} />
    );

    await waitFor(() => {
      const loader = screen.getByRole('progressbar');
      expect(loader).toBeInTheDocument();
    });
  });

  test('should render empty state with no results', async () => {
    vi.mocked(useQuery).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: undefined,
    } as any);

    renderWithProviders(
      <MoviesGrid page={1} query="some-search-term" setPage={vi.fn()} />
    );

    await waitFor(() => {
      const grid = screen.getByTestId('movie-grid');
      expect(within(grid).getByText('No movies found')).toBeInTheDocument();
    });
  });

  test('should render data', async () => {
    vi.mocked(useQuery).mockReturnValue({
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
    } as any);

    renderWithProviders(
      <MoviesGrid page={1} query="batman" setPage={vi.fn()} />
    );

    await waitFor(() => {
      const grid = screen.getByTestId('movie-grid');
      expect(grid).toBeInTheDocument(); // Ensure the grid exists
      expect(grid.querySelector('a')).toHaveAttribute('href', '/movies/1');
      expect(within(grid).getByText('Title')).toBeInTheDocument();
      expect(within(grid).getByText('2023')).toBeInTheDocument();
    });
  });

  test('should render placeholder with no poster, unknown release date', async () => {
    vi.mocked(useQuery).mockReturnValue({
      data: {
        results: [
          { id: '1', poster_path: null, release_date: null, title: 'Title' },
        ],
        total_pages: 1,
      },
      isLoading: false,
      error: undefined,
    } as any);

    renderWithProviders(
      <MoviesGrid page={1} query="batman" setPage={vi.fn()} />
    );

    await waitFor(() => {
      expect(screen.getByText('No image available')).toBeInTheDocument();
      expect(screen.getByText('TBA')).toBeInTheDocument();
    });
  });
});
