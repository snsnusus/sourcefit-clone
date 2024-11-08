import type { ReactElement } from 'react';

import type { Header } from '@tanstack/react-table';

import { flexRender } from '@tanstack/react-table';

interface ActionColumnProps<TData> {
  header: Header<TData, unknown>;
}

const ActionColumn = <TData extends object>(
  props: ActionColumnProps<TData>
): ReactElement => (
  <>
    {flexRender(
      props.header.column.columnDef.header,
      props.header.getContext()
    )}
  </>
);

export default ActionColumn;
