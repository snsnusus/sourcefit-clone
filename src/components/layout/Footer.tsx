import type { ReactElement } from 'react';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const Footer = (): ReactElement => (
  <StyledAppBar position="fixed">
    <Toolbar>
      <Box flexGrow={1} />
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <StyledDivider orientation="vertical" flexItem />
        <Stack direction="row" gap={0.5}>
          Made with <FavoriteIcon />
        </Stack>
      </Stack>
    </Toolbar>
  </StyledAppBar>
);

export default Footer;
