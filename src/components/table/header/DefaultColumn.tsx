import type { ReactElement } from 'react';

import type { SortDirection, Header, TableState } from '@tanstack/react-table';

import { styled } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import Stack from '@mui/material/Stack';
import TableSortLabel from '@mui/material/TableSortLabel';
import Divider from '@mui/material/Divider';

interface DefaultColumnProps<TData> {
  header: Header<TData, unknown>;
  getState: () => TableState;
}

const ColumnWrapper = styled(Stack)({
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
});

const ResizerWrapper = styled(Stack)(({ theme }) => ({
  cursor: 'col-resize',
  marginRight: theme.spacing(-2),
  position: 'absolute',
  right: theme.spacing(0.5),
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
}));

const Resizer = styled(Divider)(({ theme }) => ({
  borderRadius: '2px',
  borderWidth: '2px',
  height: theme.spacing(3),
  touchAction: 'none',
  userSelect: 'none',
}));

const DefaultColumn = <TData extends object>(
  props: DefaultColumnProps<TData>
): ReactElement => (
  <ColumnWrapper>
    {flexRender(
      props.header.column.columnDef.header,
      props.header.getContext()
    )}
    {props.header.column.getCanSort() && (
      <TableSortLabel
        active={props.getState().sorting[0]?.id === props.header.id}
        direction={
          props.header.column.getIsSorted()
            ? (props.header.column.getIsSorted() as SortDirection)
            : undefined
        }
        onClick={props.header.column.getToggleSortingHandler()}
      />
    )}
    {props.header.column.columnDef.enableResizing && (
      <ResizerWrapper
        {...{
          onMouseDown: props.header.getResizeHandler(),
          onTouchStart: props.header.getResizeHandler(),
        }}
      >
        <Resizer />
      </ResizerWrapper>
    )}
  </ColumnWrapper>
);

export default DefaultColumn;
