import React from 'react';
import { Box, CircularProgress, Typography, Fade, Portal } from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  open,
  message = 'Processing...',
}) => (
  <Portal>
    <Fade in={open} unmountOnExit timeout={250}>
      <Box
        aria-live="polite"
        aria-busy={open}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: (theme) => theme.zIndex.modal + 1,
          pointerEvents: 'all',
          // Dimmed backdrop with slight blur
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          p: 4,
        }}
      >
        {/* Blended Text + Spinner (No Card Container) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'common.white',
            // Text shadow ensures readability against light background elements underneath
            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))',
          }}
        >
          <CircularProgress size={22} thickness={4} color="inherit" />

          <Box>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                opacity: 0.75,
                fontSize: '0.7rem',
                lineHeight: 1.2,
              }}
            >
              Please wait
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {message}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  </Portal>
);
