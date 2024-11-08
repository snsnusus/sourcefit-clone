// import type { ReactNode } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

export type UseTableParams<TData> = TableProps<TData>;

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  getRowSelection?: (rowSelection: TData[]) => void;
}
