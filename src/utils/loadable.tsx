import type { ComponentType, ReactElement } from 'react';
import { lazy } from 'react';

// import { ProgressBar } from '~/components' Suspense;

type ImportFunction = () => Promise<{ default: ComponentType<any> }>;

export const loadable = (importFunc: ImportFunction): (() => ReactElement) => {
  const LazyComponent = lazy(importFunc);

  return () => (
    // <Suspense fallback={<ProgressBar />}>
    <LazyComponent />
    // </Suspense>
  );
};
