import type { ReactElement } from 'react';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useProfileStore } from '~/stores/profile';
import Form from '~/components/form/Form';
import Tab from '~/components/tab';

import Contact from './contact';
import Domain from './Domain';
import Government from './Government';
import Personal from './Personal';

interface User {
  firstname: string;
  middlename: string;
  lastname: string;
  suffix?: string;
  nickname?: string;
  gender: string;
  birthdate: Date;
  birthplace: string;
  nationality: string;
  maritalStatus: string;
  religion?: string;
}

const Profile = (): ReactElement => {
  const form = useForm<User>({
    defaultValues: {
      firstname: 'Pea Daphne',
      middlename: 'Valencerina',
      lastname: 'Vargas',
      nickname: 'Pey',
      gender: 'Female',
      birthdate: new Date('02/20/1998'),
      birthplace: 'Bulacan',
      nationality: 'Filipino',
      maritalStatus: 'Single',
      religion: 'Iglesia Ni Cristo',
    },
  });

  const { canEdit, setCanEdit } = useProfileStore((state) => ({
    canEdit: state.canEdit,
    setCanEdit: state.setCanEdit,
  }));

  const handleSubmit: SubmitHandler<User> = (data) => {
    console.log(data);

    setCanEdit(false);
  };

  return (
    <Form<User> {...form} onSubmit={handleSubmit}>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={6} alignItems="center">
            <Avatar
              src="/assets/employee.jfif"
              variant="circular"
              sx={{
                width: 100,
                height: 100,
              }}
            />
            <Stack gap={0.3}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h5" fontWeight="bold">
                  Pey Vargas
                </Typography>
                <CheckCircleIcon fontSize="medium" color="primary" />
                <Typography variant="h5" color="#979797de">
                  M-20-457
                </Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Typography variant="body1">Senior Specialist</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body1" color="#979797de">
                  Information Technology
                </Typography>
              </Stack>
              <Stack direction="row" gap={3}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AlternateEmailIcon
                    fontSize="small"
                    sx={{
                      color: '#979797de',
                    }}
                  />
                  <Typography variant="body2" color="#979797de">
                    peyvargas@sourcefit.net
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CallIcon
                    fontSize="small"
                    sx={{
                      color: '#979797de',
                    }}
                  />
                  <Typography variant="body2" color="#979797de">
                    (+63) 936 544 9043
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack gap={2} justifyContent="flex-start" alignItems="flex-start">
              <Tooltip title="Joined: September 30, 2020" placement="top">
                <Stack direction="row" gap={1} alignItems="center">
                  <HandshakeIcon
                    fontSize="medium"
                    sx={{
                      color: '#979797de',
                    }}
                  />
                  <Typography variant="body2" color="#979797de">
                    10/30/2020
                  </Typography>
                </Stack>
              </Tooltip>
              <Stack direction="row" gap={0.5} alignItems="center">
                <AvatarGroup max={5} total={18}>
                  <Tooltip title="Ralph Bondoc" placement="top">
                    <Avatar alt="Ralph Bondoc" />
                  </Tooltip>
                  <Tooltip title="Jazztine Barredo" placement="top">
                    <Avatar alt="Jazztine Barredo" />
                  </Tooltip>
                  <Tooltip title="Austine Marie Rivera" placement="top">
                    <Avatar alt="Austine Marie Rivera" />
                  </Tooltip>
                  <Tooltip title="Neirven Manzano" placement="top">
                    <Avatar alt="Neirven Manzano" />
                  </Tooltip>
                  <Tooltip title="Ria Marie Toledo" placement="top">
                    <Avatar alt="Ria Marie Toledo" />
                  </Tooltip>
                </AvatarGroup>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" gap={1.5}>
              {canEdit ? (
                <>
                  <Button type="submit" variant="contained" size="small">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    size="small"
                    onClick={() => setCanEdit(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();

                    setCanEdit(true);
                  }}
                >
                  Request Edit
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Tab
          tabs={[
            {
              label: 'Personal',
              content: <Personal />,
            },
            {
              label: 'Contact',
              content: <Contact />,
            },
            {
              label: 'Domain',
              content: <Domain />,
            },
            {
              label: 'Government',
              content: <Government />,
            },
          ]}
        />
      </Stack>
    </Form>
  );
};

export default Profile;
