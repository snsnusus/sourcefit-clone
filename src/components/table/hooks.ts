import { useMemo, useState } from 'react';

import type {
  Table,
  SortingState,
  RowSelectionState,
  ExpandedState,
} from '@tanstack/react-table';
import type { UseTableParams } from './types';

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';

export const useTable = <TData extends object>(
  params: UseTableParams<TData>
): Table<TData> => {
  const { data, columns, enableRowSelection, enableColumnResizing } = params;

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<TData>({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting,
      rowSelection,
      columnVisibility: { select: Boolean(enableRowSelection) },
      expanded,
    },
    enableColumnResizing: enableColumnResizing,
    enableSortingRemoval: true,
    enableRowSelection: enableRowSelection,
    enableExpanding: true,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return table;
};
