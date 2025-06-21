import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  CssBaseline,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `,
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Dummy role logic (you can replace with real API later)
    let role = '';
    if (email === 'staff@jpb.com' && password === '123') role = 'staff';
    else if (email === 'pssd@jpb.com' && password === '123') role = 'pssd';
    else if (email === 'ucuaadmin@jpb.com' && password === '123') role = 'ucuaadmin';
    else if (email === 'itadmin@jpb.com' && password === '123') role = 'itadmin';
    else {
      setError('Invalid email or password');
      return;
    }

    // Save role and login state
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)',
          p: 0,
          m: 0,
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 0,
              textAlign: 'center',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            {/* Logo added here */}
            <Avatar
              src="/logo.png" // Replace with your actual logo path
              alt="UCUA Logo"
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                bgcolor: 'primary.main'
              }}
            >
              UCUA
            </Avatar>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 4,
                color: '#333'
              }}
            >
              UCUA Login
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1 }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link
                  href="#"
                  variant="body2"
                  underline="hover"
                  sx={{ color: '#666' }}
                >
                  Forgot Username / Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd1 0%, #6a4099 100%)'
                  }
                }}
              >
                LOGIN
              </Button>

              <Typography variant="body2" sx={{ color: '#666' }}>
                Don't have an account?{' '}
                <Link
                  href="#"
                  underline="hover"
                  sx={{ fontWeight: 600, color: '#764ba2' }}
                >
                  Create your Account
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;