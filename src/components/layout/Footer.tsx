import type { ReactElement } from 'react';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  padding: theme.spacing(2, 6),
  color: theme.palette.common.white,
  backgroundColor: 'primary',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const Footer = (): ReactElement => (
  <StyledAppBar position="fixed">
    <Stack direction="row" gap={1} justifyContent="flex-end">
      <StyledDivider orientation="vertical" flexItem />
      <Stack direction="row" gap={0.5}>
        Made with <FavoriteIcon />
      </Stack>
    </Stack>
  </StyledAppBar>
);

export default Footer;
