import {
  Alert,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchMovies } from './fetch-movies';
import { useCallback } from 'react';

type Props = { page: number; query: string; setPage: (page: number) => void };

export const MoviesGrid = ({ page, query, setPage }: Props) => {
  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['movies', { page, query }],
    queryFn: fetchMovies,
    enabled: !!query,
  });

  if (error) {
    return (
      <Stack alignItems="center" mt={4}>
        <Alert
          severity="error"
          sx={{
            width: '100%',
            maxWidth: '600px',
            bgcolor: 'rgba(211, 47, 47, 0.1)',
            color: '#ff8a80',
            alignItems: 'center',
          }}
          action={
            <Button
              size="small"
              onClick={() => refetch()}
              variant="contained"
              sx={{
                backgroundColor: '#ed6c02',
                color: '#1a1a2e',
                fontWeight: '700',
                textTransform: 'uppercase',
                borderRadius: '6px',
                '&:hover': { backgroundColor: '#ff8a29' },
              }}
            >
              Try Again
            </Button>
          }
        >
          {(error as Error).message}
        </Alert>
      </Stack>
    );
  }

  if (!query) {
    return null;
  }

  if (isLoading || !data)
    return (
      <CircularProgress
        sx={{ color: '#ff9800', display: 'block', mx: 'auto', mt: 4 }}
      />
    );

  const { results, total_pages } = data;

  return (
    <Stack
      alignItems="center"
      width="100%"
      spacing={4}
      data-testid="movie-grid"
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        width="100%"
        sx={{
          minHeight: '400px',
          alignItems: results.length === 0 ? 'center' : 'flex-start',
        }}
      >
        {results.length === 0 && query !== '' && (
          <Typography color="white" variant="h6">
            No movies found
          </Typography>
        )}

        {results.map(({ id, poster_path, release_date, title }) => (
          <Stack
            key={id}
            component={Link}
            to={`/movies/${id}`}
            sx={{
              textDecoration: 'none',
              mt: 3,
              width: { xs: '100%', sm: '45%', md: '30%', lg: '18%', xl: '15%' },
            }}
          >
            {poster_path ? (
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                sx={{
                  aspectRatio: '2/3',
                  objectFit: 'cover',
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ) : (
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: '100%',
                  aspectRatio: '2/3',
                  borderRadius: 2,
                  bgcolor: '#3a3a5a',
                  color: 'rgba(255, 255, 255, 0.5)',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Typography variant="body2">No image available</Typography>
              </Stack>
            )}
            <Typography
              variant="body2"
              sx={{
                color: '#fff',
                mt: 2,
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#888', textAlign: 'center' }}
            >
              {release_date ? new Date(release_date).getFullYear() : 'TBA'}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {total_pages > 1 && (
        <Pagination
          color="warning"
          count={total_pages}
          page={page}
          onChange={handlePageChange}
          sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
        />
      )}
    </Stack>
  );
};
