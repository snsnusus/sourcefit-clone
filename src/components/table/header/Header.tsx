import type { ReactElement } from 'react';

import type { HeaderGroup, TableState } from '@tanstack/react-table';

import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';

import ActionColumn from './ActionColumn';
import DefaultColumn from './DefaultColumn';

interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
  getState: () => TableState;
}

const CustomTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop != 'isActionColumn',
})<TableCellProps & { isActionColumn: boolean }>(({ isActionColumn }) => ({
  width: isActionColumn ? '5%' : undefined,
}));

const TableHeader = <TData extends object>(
  props: TableHeaderProps<TData>
): ReactElement => (
  <TableHead>
    {props.headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const isActionColumn =
            header.id === 'select' || header.id === 'expand';
          return (
            <CustomTableCell
              key={header.id}
              isActionColumn={isActionColumn}
              padding={isActionColumn ? 'none' : undefined}
              size="small"
              width={header.column.getSize()}
            >
              {isActionColumn ? (
                <ActionColumn header={header} />
              ) : (
                <DefaultColumn header={header} getState={props.getState} />
              )}
            </CustomTableCell>
          );
        })}
      </TableRow>
    ))}
  </TableHead>
);

export default TableHeader;
