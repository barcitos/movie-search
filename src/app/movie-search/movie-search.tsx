import {
  Alert,
  Box,
  FormControl,
  Input,
  Typography,
  Stack,
} from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';
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
        return { page: '1', query };
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
    <Stack py={{ xs: 4, md: 8 }} px={4}>
      <Stack alignItems="center" spacing={1}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h2"
            fontWeight="900"
            sx={{
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'Swanky and Moo Moo, cursive',
            }}
          >
            Movie Night
          </Typography>
          <Stack component="span" fontSize="3rem">
            🍿
          </Stack>
        </Stack>

        <Typography
          variant="subtitle1"
          color="rgba(255, 255, 255, 0.5)"
          sx={{
            letterSpacing: '2px',
            fontFamily: 'Swanky and Moo Moo, cursive',
          }}
        >
          Just pick one
        </Typography>

        <FormControl
          variant="standard"
          sx={{
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Input
            name="movie"
            placeholder="Search movie"
            autoComplete="off"
            onChange={handleSearchChange}
            value={search}
            sx={{
              color: 'white',
              fontSize: { xs: '1.2rem', md: '2rem' },
              '&:after': { borderBottomColor: '#ff9800' },
              '& .MuiInput-input::placeholder': {
                fontSize: '15px',
              },
            }}
          />
        </FormControl>

        <Box sx={{ width: '80%' }}>
          <ErrorBoundary
            fallback={<Alert severity="error">Error loading movies.</Alert>}
          >
            <MoviesGrid
              page={Number(searchParams.get('page') ?? '1')}
              query={searchParams.get('query') ?? ''}
              setPage={setPage}
            />
          </ErrorBoundary>
        </Box>
      </Stack>
    </Stack>
  );
};
