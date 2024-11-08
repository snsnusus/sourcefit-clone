import '@testing-library/jest-dom/extend-expect';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import matchers from '@testing-library/jest-dom/matchers';
import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import { server } from '~/mocks/server';

const queryCache = new QueryCache();
const queryClient = new QueryClient();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

afterEach(() => {
  queryCache.clear();
});

afterEach(async () => {
  await waitFor(() => expect(queryClient.isFetching()).toBe(0));
});

expect.extend(matchers);
