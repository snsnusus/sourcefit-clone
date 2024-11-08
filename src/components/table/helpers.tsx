import type { ReactElement } from 'react';

import type {
  ColumnDef,
  Row,
  Cell,
  Table,
  Header,
  Column,
} from '@tanstack/react-table';

import { createColumnHelper } from '@tanstack/react-table';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Columns<TData> {
  id?: string;
  accessor?: any;
  header:
    | string
    | ((props: {
        table: Table<TData>;
        header: Header<TData, any>;
        column: Column<TData>;
      }) => unknown);
  cell?: (props: {
    table: Table<TData>;
    row: Row<TData>;
    column: Column<TData>;
    cell: Cell<TData, any>;
    getValue: () => any;
    renderValue: () => any;
  }) => unknown;
  enableSorting?: boolean;
  enableResizing?: boolean;
  minSize?: number;
  maxSize?: number;
  size?: number;
}

const ActionContainer = ({ children }: PropsWithChildren): ReactElement => (
  <Stack display="flex" alignItems="center" justifyContent="center">
    {children}
  </Stack>
);

export const createColumn = <TData extends object>(
  columns: Columns<TData>[]
): ColumnDef<TData, any>[] => {
  const columnHelper = createColumnHelper<TData>();

  const dynamicColumns = columns.map((column) =>
    columnHelper.accessor(column.accessor, {
      id: column.id,
      header: column.header,
      cell: (props) => (column.cell ? column.cell?.(props) : props.getValue()),
      enableSorting: column.enableSorting,
      enableResizing: column.enableResizing,
      size: column.size,
      minSize: column.minSize,
      maxSize: column.maxSize,
    })
  );

  return [
    columnHelper.display({
      id: 'expand',
      header: ({ table }) => (
        <ActionContainer>
          <IconButton onClick={table.getToggleAllRowsExpandedHandler()}>
            {table.getIsAllRowsExpanded() ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        </ActionContainer>
      ),
      cell: ({ row }) => (
        <ActionContainer>
          <IconButton onClick={() => row.toggleExpanded()}>
            {row.getIsExpanded() ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        </ActionContainer>
      ),
      minSize: 5,
      maxSize: 10,
      size: 5,
      enableSorting: false,
      enableResizing: false,
    }),
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <ActionContainer>
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </ActionContainer>
      ),
      cell: ({ row }) => (
        <ActionContainer>
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </ActionContainer>
      ),
      minSize: 5,
      maxSize: 10,
      size: 5,
      enableSorting: false,
      enableResizing: false,
    }),
    ...dynamicColumns,
  ];
};
