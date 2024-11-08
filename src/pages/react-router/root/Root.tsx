import type { ReactElement } from 'react';
import { Fragment, useEffect, useState } from 'react';

import type { User } from '~/apis/types';

import { v4 as uuidv4 } from 'uuid';
import { useLoaderData, Outlet, NavLink, Form } from 'react-router-dom';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomNavLink = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
});

const ReactRouter = (): ReactElement => {
  const { users, searchQuery } = useLoaderData() as {
    users: User[];
    searchQuery: string | null;
  };
  const [usersData, setUsersData] = useState<User[]>(users);
  const [query, setQuery] = useState<string | null>(searchQuery);

  useEffect(() => setQuery(searchQuery), [searchQuery]);

  useEffect(() => setUsersData(users), [users]);

  return (
    <Stack>
      <AppBar position="static" color="transparent" sx={{ px: 2, py: 1 }}>
        <Toolbar>
          <Typography variant="h4" fontWeight="bold">
            React Router: Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row">
        <Stack
          gap={2}
          p={2}
          sx={{
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Form id="search-form">
            <Stack direction="row" gap={1}>
              <TextField
                label="Search"
                size="small"
                name="search"
                value={query ?? ''}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                <SearchIcon />
              </Button>
            </Stack>
          </Form>
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={340}
            style={{ width: 245 }}
          >
            <List sx={{ paddingRight: '20px' }}>
              {usersData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((user) => (
                  <Fragment key={uuidv4()}>
                    <CustomNavLink to={`users/${user.id}`}>
                      {({ isActive }) => (
                        <ListItem disablePadding>
                          <ListItemButton selected={isActive}>
                            <ListItemText primary={user.name} />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </CustomNavLink>
                    <Divider />
                  </Fragment>
                ))}
            </List>
          </Scrollbars>
        </Stack>
        <Box flexGrow={1} p={2}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ReactRouter;
