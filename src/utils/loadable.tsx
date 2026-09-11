import type { ComponentType, ReactElement } from 'react';
import { Box, LinearProgress } from '@mui/material';

import { lazy, Suspense } from 'react';

type ImportFunction = () => Promise<{ default: ComponentType<any> }>;

export const loadable = (importFunc: ImportFunction): ComponentType<any> => {
  const LazyComponent = lazy(importFunc);

  const LoadableComponent = (props: any): ReactElement => (
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

  return LoadableComponent;
};
