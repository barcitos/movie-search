import { Alert, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchMovieDetail } from './fetch-movie-detail';

export const MovieDetailContent = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { error, data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: fetchMovieDetail,
  });

  if (error) {
    return <Alert severity="error">{(error as Error).message}</Alert>;
  }

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  const { overview, title, poster_path, release_date, genres } = data;
  return (
    <Container data-testid="movie-detail">
      {poster_path && (
        <Image
          alt={title}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        />
      )}
      <Description>
        <Title>{title}</Title>
        <ReleaseDate>
          {release_date ? new Date(release_date).getFullYear() : 'TBA'}
        </ReleaseDate>
        <Genres>{genres.map(({ name }) => name).join(', ')}</Genres>
        <div>{overview}</div>
      </Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: '300px';
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  line-height: 30px;
`;

const Title = styled.div`
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
`;

const ReleaseDate = styled.div`
  color: grey;
`;

const Genres = styled.div`
  margin-bottom: 20px;
`;
