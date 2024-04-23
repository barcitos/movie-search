import { Alert, Button } from '@mui/material';
import { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MovieDetailContent } from './movie-detail-content';

export const MovieDetail = () => {
  const navigate = useNavigate();

  const handleGoBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Container>
      <BackButton
        color="warning"
        onClick={handleGoBackButton}
        variant="contained"
      >
        Back to results
      </BackButton>
      <ErrorBoundary
        fallback={
          <Alert severity="error">
            We could not complete your request. Please try again.
          </Alert>
        }
      >
        <MovieDetailContent />
      </ErrorBoundary>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #263444;
`;

const BackButton = styled(Button)`
  width: 200px;
  margin-bottom: 20px;
`;
