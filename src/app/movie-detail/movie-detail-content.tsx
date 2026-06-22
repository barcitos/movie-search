import { Alert, CircularProgress, Stack, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from './fetch-movie-detail';

export const MovieDetailContent = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { error, data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: fetchMovieDetail,
  });

  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;
  if (isLoading || !data)
    return (
      <CircularProgress
        sx={{ color: '#ff9800', display: 'block', mx: 'auto', mt: 4 }}
      />
    );

  const { overview, title, poster_path, release_date, genres } = data;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      sx={{
        color: '#fff',
        pb: 8,
      }}
    >
      {poster_path && (
        <Box
          component="img"
          alt={title}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '300px' },
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        />
      )}

      <Stack spacing={2} sx={{ width: '100%', minWidth: 0 }}>
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{
            letterSpacing: '1px',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color="grey">
          {release_date ? new Date(release_date).getFullYear() : 'TBA'}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#ff9800', fontWeight: 'bold' }}
        >
          {genres.map(({ name }) => name).join(', ')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            opacity: 0.9,
            wordWrap: 'break-word',
          }}
        >
          {overview || 'No description available for this movie.'}
        </Typography>
      </Stack>
    </Stack>
  );
};
