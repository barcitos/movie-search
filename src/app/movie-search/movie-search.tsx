import { Alert, FormControl, Input, InputLabel } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { MoviesGrid } from './movies-grid';
export const MovieSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') ?? '');

  const handleSearchChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearch(value);
    },
    []
  );

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((params) => ({
        page: `${page}`,
        query: params.get('query') ?? '',
      }));
    },
    [setSearchParams]
  );

  const setQuery = useCallback((query: string) => {
    setSearchParams((params) => {
      if (params.get('query') !== query) {
        return {
          page: '1',
          query,
        };
      }

      return params;
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, setQuery]);

  return (
    <Container>
      <FormControl variant="standard" color="warning" sx={{ width: '70%' }}>
        <InputLabel sx={{ color: 'white' }}>Search movies</InputLabel>
        <Input
          name="movie"
          onChange={handleSearchChange}
          value={search}
          sx={{ color: 'white' }}
        />
      </FormControl>
      <ErrorBoundary
        fallback={
          <Alert severity="error">
            We could not complete your request. Please try again.
          </Alert>
        }
      >
        <MoviesGrid
          page={Number(searchParams.get('page') ?? '1')}
          query={searchParams.get('query') ?? ''}
          setPage={setPage}
        />
      </ErrorBoundary>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
