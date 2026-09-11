import { type FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/contexts/auth.context';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

import { Visibility, VisibilityOff, Google, GitHub } from '@mui/icons-material';

import companyLogo from '../../../assets/logo-long.png';
import backgroundGraphic from '../../../assets/sourcefit.png';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const destination = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return;

    console.log(
      username.trim(),
      password.trim(),
      'username.trim(), password.trim()'
    );

    try {
      const isSuccess = await login(username.trim(), password.trim());

      if (isSuccess) {
        navigate(destination, { replace: true });
      } else {
        console.error('Login failed: Invalid credentials matches.');
      }
    } catch (error) {
      console.error('Form handling connection submission exception:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[50],
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,

        position: 'relative',
        overflow: 'hidden', // Keeps the floating stripe safely clipped inside the screen
        backgroundImage: `url(${backgroundGraphic})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left bottom',
        backgroundSize: { xs: '150px', sm: '250px', md: '350px' },

        // '&::before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: 0,
        //   right: 0,
        //   width: '100%',
        //   height: '100%',
        //   pointerEvents: 'none',

        //   backgroundImage: (theme) => `
        //     linear-gradient(
        //       225deg,
        //       ${theme.palette.info.main} 0%,
        //       ${theme.palette.info.main} 8%,

        //       ${theme.palette.primary.main} 8.1%,
        //       ${theme.palette.primary.main} 16%,

        //       transparent 8.2%
        //     )
        //   `,
        //   backgroundRepeat: 'no-repeat',
        //   backgroundPosition: 'top right',
        // },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
            backgroundColor: 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={companyLogo}
              alt="Company Logo"
              sx={{
                width: 'auto',
                height: 48,
                mb: 2,
                filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please enter your details to access your workspace.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username or Email"
              name="username"
              autoComplete="username"
              autoFocus
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. CielDev"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    size="small"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ borderRadius: 1 }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
              />
              <Typography
                variant="body2"
                color="primary"
                fontWeight={500}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!username.trim() || !password.trim()}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
          <Divider sx={{ my: 4 }}>
            <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
              OR CONTINUE WITH
            </Typography>
          </Divider>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => setUsername('GoogleUser')}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'grey.300',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    borderColor: 'grey.400',
                  },
                }}
              >
                Google
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHub />}
                onClick={() => setUsername('GitHubUser')}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'grey.300',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    borderColor: 'grey.400',
                  },
                }}
              >
                GitHub
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
