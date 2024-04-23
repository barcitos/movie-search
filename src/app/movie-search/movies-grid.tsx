import { Alert, CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { fetchMovies } from './fetch-movies';

type Props = {
  page: number;
  query: string;
  setPage: (page: number) => void;
};
export const MoviesGrid = ({ page, query, setPage }: Props) => {
  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  const { error, data, isLoading } = useQuery({
    queryKey: ['movies', { page, query }],
    queryFn: fetchMovies,
  });

  if (error) {
    return (
      <Alert severity="error" data-testid="error-message">
        {(error as Error).message}
      </Alert>
    );
  }

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  const { results, total_pages } = data;

  return (
    <Container data-testid="movie-grid">
      <MoviesContainer>
        {results.length === 0 && query !== '' && (
          <EmptyState>No movies found</EmptyState>
        )}
        {results.map(({ id, poster_path, release_date, title }) => (
          <DetailLink to={`/movies/${id}`} key={id}>
            <Item>
              {poster_path ? (
                <MovieImage
                  alt={title}
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                />
              ) : (
                <ImagePlaceholder>No image available</ImagePlaceholder>
              )}
              <div>
                <MovieTitle title={title}>{title}</MovieTitle>
                <MovieDate>
                  {release_date ? new Date(release_date).getFullYear() : 'TBA'}
                </MovieDate>
              </div>
            </Item>
          </DetailLink>
        ))}
      </MoviesContainer>
      {total_pages > 1 && (
        <Pagination
          color="warning"
          count={total_pages}
          onChange={handlePageChange}
          page={page}
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const EmptyState = styled.div`
  color: white;
`;

const DetailLink = styled(Link)`
  text-decoration: none;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 30px;
`;

const MovieImage = styled.img`
  height: 350px;
  object-fit: contain;
  background-color: black;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    outline: 1px solid #ed6c02;
  }
`;

const ImagePlaceholder = styled.div`
  width: 250px;
  height: 370px;
  background-color: black;
  color: white;
  line-height: 350px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 10px;

  &:hover {
    outline: 1px solid #ed6c02;
  }
`;

const MovieTitle = styled.div`
  font-size: 12px;
  color: #fff;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MovieDate = styled.div`
  color: grey;
  text-align: center;
  margin-top: 10px;
`;
