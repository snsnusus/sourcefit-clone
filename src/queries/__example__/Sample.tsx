import type { ReactElement } from 'react';

import { usePostsQuery, usePostsMutation } from '~/queries';

export const Sample = (): ReactElement => {
  const { data } = usePostsQuery('');
  const { mutate } = usePostsMutation();

  const handleAddPost = (): void => {
    const params = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    mutate(params, {
      onSuccess: (res) => console.log(res),
      onError: (err) => console.log(err),
    });
  };

  return (
    <>
      <button type="button" onClick={handleAddPost}>
        Mutate
      </button>
      <ul>
        {data && data.map((post: any) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </>
  );
};
