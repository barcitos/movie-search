import { Alert, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import { MovieDetail } from './movie-detail';
import { MovieSearch } from './movie-search';

const queryClient = new QueryClient();
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles
      styles={{
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#263444',
        },
        html: {
          scrollbarWidth: 'none',
          fontFamily: 'sans-serif',
        },
      }}
    />
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="movies" />} />
        <Route
          path="movies"
          element={
            <ErrorBoundary
              fallback={
                <Alert severity="error">
                  Something went wrong while loading the application. Please try
                  again.
                </Alert>
              }
            >
              <Outlet />
            </ErrorBoundary>
          }
        >
          <Route index element={<MovieSearch />} />
          <Route path=":id" element={<MovieDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
