import type { ReactElement } from 'react';

import { styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const Breadcrumb = (): ReactElement => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Stack gap={1}>
      <Breadcrumbs>
        <CustomLink to="/">Dashboard</CustomLink>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const decodedValue = decodeURIComponent(value);
          const displayName =
            decodedValue.charAt(0).toUpperCase() + decodedValue.slice(1);

          return (
            <Box key={displayName}>
              {isLast ? (
                <Typography sx={{ color: 'text.primary' }}>
                  {displayName}
                </Typography>
              ) : (
                <CustomLink to={to}>{displayName}</CustomLink>
              )}
            </Box>
          );
        })}
      </Breadcrumbs>
      <Divider />
    </Stack>
  );
};

export default Breadcrumb;
