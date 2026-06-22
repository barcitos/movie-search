import { Box, Link, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import tmdbLogo from '../assets/logo.svg';

export const Layout = () => {
  const technologies = ['React', 'Material UI', 'TanStack Query'];

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 1.5,
          px: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Link
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
        >
          <img src={tmdbLogo} alt="TMDb Logo" width="80" />
        </Link>

        <Typography
          variant="caption"
          color="rgba(255, 255, 255, 0.2)"
          sx={{ maxWidth: '300px', textAlign: 'center' }}
        >
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </Typography>

        <Stack alignItems={{ xs: 'center', md: 'flex-end' }} spacing={0.5}>
          <Link
            href="https://github.com/barcitos"
            target="_blank"
            rel="noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: "'DotGothic16', monospace",
              fontSize: '11px',
              '&:hover': { color: '#ff9800' },
            }}
          >
            <GitHubIcon sx={{ fontSize: '14px' }} />
            Developed by Barca
          </Link>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              fontFamily: "'DotGothic16', monospace",
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {technologies.map((tech, index) => (
              <Stack key={tech} direction="row" alignItems="center" gap={1}>
                <span>{tech}</span>
                {index < technologies.length - 1 && (
                  <Box
                    component="span"
                    sx={{
                      width: '1px',
                      height: '8px',
                      backgroundColor: '#ff9800',
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
