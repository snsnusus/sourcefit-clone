import type { ReactElement } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ControlledTextField from '~/components/form/controlled/controlled-textfield';
import ControlledSelect from '~/components/form/controlled/controlled-select';
import ControlledDatePicker from '~/components/form/controlled/controlled-datepicker';
import ImageUploadCropper from '~/components/form/base/image-upload-cropper';

const PersonalInfo = (): ReactElement => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Typography variant="h6" fontWeight={600}>
        Personal Info
      </Typography>
      <Divider />
    </Stack>
    <Grid container spacing={2}>
      <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
        <ImageUploadCropper name="profileImage" label="Profile Image" />
      </Grid>
      <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
        <Stack gap={2}>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={6} md={12} sm={12} xs={12}>
              <ControlledTextField name="firstname" label="First Name *" />
            </Grid>
            <Grid item xl={3} lg={6} md={12} sm={12} xs={12}>
              <ControlledTextField name="middlename" label="Middle Name *" />
            </Grid>
            <Grid item xl={3} lg={6} md={12} sm={12} xs={12}>
              <ControlledTextField name="lastname" label="Last Name *" />
            </Grid>
            <Grid item xl={3} lg={6} md={12} sm={12} xs={12}>
              <ControlledTextField name="suffix" label="Suffix" />
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledSelect
                name="gender"
                label="Gender *"
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                  },
                  {
                    label: 'Female',
                    value: 'female',
                  },
                ]}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledDatePicker name="birthdate" label="Birthdate *" />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledTextField name="birthplace" label="Birth Place" />
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledTextField name="nationality" label="Nationality *" />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledSelect
                name="maritalStatus"
                label="Marital Status *"
                options={[
                  {
                    label: 'Single',
                    value: 'single',
                  },
                  {
                    label: 'Married',
                    value: 'married',
                  },
                  {
                    label: 'Widowed',
                    value: 'widowed',
                  },
                  {
                    label: 'Divorced',
                    value: 'divorced',
                  },
                  {
                    label: 'Separated',
                    value: 'separated',
                  },
                ]}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <ControlledTextField name="religion" label="Religion" />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  </Stack>
);

export default PersonalInfo;
