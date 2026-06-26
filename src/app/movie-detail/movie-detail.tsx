import { Alert, Button, Stack, Box, Container } from '@mui/material';
import { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { MovieDetailContent } from './movie-detail-content';

export const MovieDetail = () => {
  const navigate = useNavigate();

  const handleGoBackButton = useCallback(() => {
    navigate('/movies');
  }, [navigate]);

  return (
    <Stack pt={{ xs: 4, md: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Box>
            <Button
              onClick={handleGoBackButton}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ed6c02',
                color: '#1a1a2e',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: '#ff8a29',
                },
              }}
            >
              Back to results
            </Button>
          </Box>

          <ErrorBoundary
            fallback={
              <Alert
                severity="error"
                sx={{ bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ff8a80' }}
              >
                We could not complete your request. Please try again.
              </Alert>
            }
          >
            <MovieDetailContent />
          </ErrorBoundary>
        </Stack>
      </Container>
    </Stack>
  );
};
