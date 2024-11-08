import type { ReactElement } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const TestQueryProviders = (props: PropsWithChildren): ReactElement => {
  const { children } = props;

  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
