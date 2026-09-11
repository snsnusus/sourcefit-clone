import type { Post } from '~/models/placeholder.models';

import type { ReactElement } from 'react';

import Table, { createColumn } from '~/components/table';
import { usePostsQuery } from '~/queries';

const Users = (): ReactElement => {
  const { data } = usePostsQuery('');
  const columns = createColumn<Post>([
    {
      id: 'userId',
      accessor: 'userId',
      header: 'USER ID',
      size: 100,
      enableResizing: true,
    },
    {
      id: 'title',
      accessor: 'title',
      header: 'TITLE',
      size: 200,
      enableResizing: true,
    },
    {
      id: 'body',
      accessor: 'body',
      header: 'BODY',
      size: 400,
      enableResizing: true,
    },
  ]);

  return (
    <Table<Post>
      data={data ?? []}
      columns={columns}
      enableRowSelection
      enableColumnResizing
      getRowSelection={(rows) => console.log(rows)}
    />
  );
};

export default Users;
