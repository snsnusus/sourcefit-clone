import type { ReactElement, SyntheticEvent } from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import ReactCountryFlag from 'react-country-flag';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps): ReactElement => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number): { id: string; 'aria-controls': string } {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = (): ReactElement => {
  const [value, setValue] = useState(1);

  const handleChange = (_e: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Stack gap={2}>
      <Typography variant="h1" fontSize="3.5rem" fontWeight={700}>
        Profile
      </Typography>
      <Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Personal" {...a11yProps(1)} />
            <Tab label="Contact" {...a11yProps(2)} />
            <Tab label="Domain" {...a11yProps(3)} />
            <Tab label="Government" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={1.25}>
              <Avatar
                alt="User Picture"
                src="/assets/employee.jfif"
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Stack gap={2}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="First Name"
                      defaultValue="Pea Daphne"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Middle Name"
                      defaultValue="Valencerina"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Last Name"
                      defaultValue="Vargas"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      defaultValue="690 Mangga St., Napico, Manggahan, Pasig City"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Gender"
                      defaultValue="Female"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Birthdate"
                      defaultValue="February 20, 1998"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Birthplace"
                      defaultValue="Bulacan"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Nationality"
                      defaultValue="Filipino"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Marital Status"
                      defaultValue="Single"
                      variant="standard"
                    />
                  </Grid>
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Citizenship"
                      defaultValue="Filipino"
                      variant="standard"
                    />
                  </Grid> */}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Hobbies"
                      defaultValue="..."
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack gap={2}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  defaultValue="9365449043"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <ReactCountryFlag countryCode="PH" svg />
                        </InputAdornment>
                        <InputAdornment position="start">+63</InputAdornment>
                      </>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Email Address"
                  defaultValue="pvargas@gmail.com"
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Emergency Contact Person"
                  defaultValue="Ma. Lourdes Vargas"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Emergency Contact Number"
                  defaultValue="9198693717"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <ReactCountryFlag countryCode="PH" svg />
                        </InputAdornment>
                        <InputAdornment position="start">+63</InputAdornment>
                      </>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Stack>
    </Stack>
  );
};

export default Profile;
