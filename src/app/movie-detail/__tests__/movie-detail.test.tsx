import React from 'react';

import { MemoryRouter, useNavigate } from 'react-router-dom';

import { act, render, screen, waitFor } from '@testing-library/react';

import { MovieDetail } from '../movie-detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', async () => {
  const actual = (await vi.importActual('@tanstack/react-query')) as any;

  return {
    ...actual,
    useQuery: vi.fn().mockReturnValue({
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

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...original,
    useNavigate: vi.fn(),
  };
});
describe('movie detail component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <MovieDetail />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  test('should render back button', () => {
    waitFor(() => {
      const button = screen.getByText('Back to results');

      expect(button).toBeInTheDocument();

      act(() => {
        button.click();
      });

      expect(useNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
