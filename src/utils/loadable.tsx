import { Box, LinearProgress } from '@mui/material';
import type { ComponentType } from 'react';

import { lazy, Suspense } from 'react';

type ImportFunction = () => Promise<{ default: ComponentType<any> }>;

export const loadable = (importFunc: ImportFunction) => {
  const LazyComponent = lazy(importFunc);

  const LoadableComponent = (props: any) => {
    return (
      <Suspense
        fallback={
          <Box
            sx={{
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1201,
            }}
          >
            <LinearProgress color="warning" />
          </Box>
        }
      >
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return LoadableComponent;
};
