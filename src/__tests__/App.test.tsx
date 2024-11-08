import { renderHook, waitFor } from '@testing-library/react';
// render, screen,
import { describe, it } from 'vitest';

// import App from '~/App';
import { usePostsQuery } from '~/queries';
import { TestQueryProviders } from '~/test/providers';

// describe('APP', () => {
//   it('SHOULD RENDER THE TEXT IN THE APP', () => {
//     render(<App />);

//     expect(screen.getByRole('table')).toBeInTheDocument();
//   });
// });

describe('HOOKS', () => {
  it('TESTING CUSTOM REACT-QUERY HOOK', async () => {
    const wrapper = TestQueryProviders;

    const { result } = renderHook(() => usePostsQuery(''), { wrapper });

    await waitFor(() => result.current.data);

    expect(result.current.data).toEqual(undefined);
  });
});
