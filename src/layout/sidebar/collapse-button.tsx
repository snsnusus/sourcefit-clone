import type { ReactElement } from 'react';

import type { ButtonProps } from '@mui/material/Button';

import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: theme.spacing(4),
  right: theme.spacing(-2.5),
  minWidth: theme.spacing(4),
  minHeight: theme.spacing(4),
  border: 0,
  borderRadius: '50%',
  boxShadow: '0px 2px 10px #BFBEBE96',
  backgroundColor: 'white',
  marginTop: theme.mixins.toolbar.minHeight,
  cursor: 'pointer',
  zIndex: theme.zIndex.drawer + 1,
  ['&.MuiButton-root:hover']: {
    background: 'white',
    transform: 'translateY(-5px)',
    boxShadow: '0px 5px 20px 2px rgba(0, 0, 0, 0.25)',
  },
}));

const CollapseButton = ({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}): ReactElement => (
  <StyledButton onClick={handleClick}>
    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </StyledButton>
);

export default CollapseButton;
