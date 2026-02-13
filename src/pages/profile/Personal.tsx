import type { ReactElement } from 'react';

import { useFormContext } from 'react-hook-form';
import moment from 'moment';
import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import { useProfileStore } from '~/stores/profile';
import ControlledDatePicker from '~/components/form/controlled/controlled-datepicker';
import ControlledSelect from '~/components/form/controlled/controlled-select';
import ControlledTextField from '~/components/form/controlled/controlled-textfield';

const Label = styled(Typography)<TypographyProps>({
  fontSize: '.775rem',
  color: '#979797de',
});

const Personal = (): ReactElement => {
  const { getValues } = useFormContext();

  const {
    firstname,
    middlename,
    lastname,
    suffix,
    nickname,
    gender,
    birthdate,
    birthplace,
    nationality,
    maritalStatus,
    religion,
  } = getValues();

  const { canEdit } = useProfileStore((state) => ({
    canEdit: state.canEdit,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack gap={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="firstname"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  size="small"
                />
              ) : (
                <>
                  <Label variant="body2">First Name:</Label>
                  <Typography fontSize="1rem">{firstname}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="middlename"
                  label="Middle Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <>
                  <Label variant="body2">Middle Name:</Label>
                  <Typography fontSize="1rem">{middlename}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="lastname"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <>
                  <Label variant="body2">Last Name:</Label>
                  <Typography fontSize="1rem">{lastname}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="suffix"
                  label="Suffix"
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <>
                  <Label variant="body2">Suffix:</Label>
                  <Typography fontSize="1rem">{suffix ?? '-'}</Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="nickname"
                  label="Nickname"
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <>
                  <Label variant="body2">Preferred Nickname:</Label>
                  <Typography fontSize="1rem">{nickname}</Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledSelect
                  name="gender"
                  label="Gender"
                  options={[
                    {
                      label: 'Male',
                      value: 'Male',
                    },
                    {
                      label: 'Female',
                      value: 'Female',
                    },
                    {
                      label: 'I rather not say',
                      value: 'I rather not say',
                    },
                  ]}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <>
                  <Label variant="body2">Gender:</Label>
                  <Typography fontSize="1rem">{gender}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledDatePicker name="birthdate" label="Date of Birth" />
              ) : (
                <>
                  <Label variant="body2">Birthdate:</Label>
                  <Typography fontSize="1rem">
                    {moment(birthdate).format('MMMM DD, yyyy')}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="birthplace"
                  label="Place of Birth"
                  size="small"
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <LocationOnIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              ) : (
                <>
                  <Label variant="body2">Place of Birth:</Label>
                  <Typography fontSize="1rem">{birthplace}</Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="nationality"
                  size="small"
                  label="Nationality"
                />
              ) : (
                <>
                  <Label variant="body2">Nationality:</Label>
                  <Typography fontSize="1rem">{nationality}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="maritalStatus"
                  size="small"
                  label="Marital Status"
                />
              ) : (
                <>
                  <Label variant="body2">Marital Status:</Label>
                  <Typography fontSize="1rem">{maritalStatus}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              {canEdit ? (
                <ControlledTextField
                  name="religion"
                  size="small"
                  label="Religion"
                />
              ) : (
                <>
                  <Label variant="body2">Religion:</Label>
                  <Typography fontSize="1rem">{religion}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Personal;
