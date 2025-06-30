import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  CssBaseline,
  Avatar,
  InputAdornment,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  User,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  UserRoundPlus
} from 'lucide-react';

// ------------------------------------------------------------
// Theme – Poppins + primary colour #061978
// ------------------------------------------------------------
const theme = createTheme({
  palette: {
    primary: { main: '#061978' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`,
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    let role = '';
    if (email === 'staff@jpb.com' && password === '123') role = 'staff';
    else if (email === 'pssd@jpb.com' && password === '123') role = 'pssd';
    else if (email === 'ucuaadmin@jpb.com' && password === '123') role = 'ucuaadmin';
    else if (email === 'itadmin@jpb.com' && password === '123') role = 'itadmin';
    else {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Full‑width gradient background */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f3f6ff 0%, #e8efff 100%)',
          p: { xs: 2, md: 110 },
        }}
      >
        {/* Central column */}
        <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Avatar
              src="/logo.png"
              alt="UCUA Logo"
              sx={{ width: 90, height: 90, mx: 'auto', mb: 2, bgcolor: 'primary.main', color: 'white' }}
            >
              UCUA
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: '#444' }}>
              Sign in to your UCUA account
            </Typography>
          </Box>

          {/* Slightly narrower card */}
          <Paper elevation={6} sx={{ width: { xs: '100%', sm: 520, md: 620 }, mx: 'auto', p: { xs: 4, md: 5 }, borderRadius: 4 }}>
            {error && (
              <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleLogin} noValidate>
              <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Email Address</Typography>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                margin="dense"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={18} strokeWidth={1.8} />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography sx={{ fontWeight: 500, mt: 2, mb: 0.5 }}>Password</Typography>
              <TextField
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="dense"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} strokeWidth={1.8} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" size="small">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: 14 }}>
                  Forgot your password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LogIn size={18} />}
                sx={{ mt: 3, fontWeight: 600, py: 1.4, borderRadius: 2 }}
              >
                Sign In
              </Button>

              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link href="#" underline="hover" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  <UserRoundPlus size={14} style={{ marginBottom: -2 }} /> Create Account
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
