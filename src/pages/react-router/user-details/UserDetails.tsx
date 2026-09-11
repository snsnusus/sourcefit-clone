import type { ReactElement } from 'react';

import type { User, Photo } from '~/models/placeholder.models';

import { useLoaderData, useNavigation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import LoadingScreen from './LoadingScreen';
import PersonalDetails from './Personal';
import CompanyDetails from './Company';

const UserDetails = (): ReactElement => {
  const [user, photo] = useLoaderData() as [User, Photo];
  const { state } = useNavigation();
  const { suite, street, city } = user.address;
  const userAddress = `${suite}, ${street}, ${city}`;

  return (
    <>
      {state === 'loading' ? (
        <LoadingScreen />
      ) : (
        <Fade in={state === 'idle'} timeout={1000}>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1,
                  gap: 2,
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src={photo.url}
                  sx={{ width: 80, height: 80 }}
                />
                <Stack
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h4">{user.name}</Typography>
                  <Typography
                    sx={{
                      color: '#6c757d',
                      fontSize: '1rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {user.username.toLowerCase()}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  direction: 'row',
                  gap: 0.5,
                }}
              >
                <IconButton color="warning">
                  <StarIcon />
                </IconButton>
                <IconButton color="info">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
            <Box>
              <PersonalDetails
                email={user.email.toLowerCase()}
                phone={user.phone}
                address={userAddress}
              />
              <CompanyDetails
                companyName={user.company.name}
                catchPhrase={user.company.catchPhrase}
                website={user.website}
              />
            </Box>
          </Stack>
        </Fade>
      )}
    </>
  );
};

export default UserDetails;
