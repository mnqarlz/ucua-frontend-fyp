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
  IconButton,
  Modal,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  Tooltip,
  Snackbar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  User,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  UserRoundPlus,
  Info,
  X,
  Copy,
  Users,
  CheckCircle
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
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const credentials = [
    { 
      role: 'Staff', 
      email: 'staff@jpb.com', 
      password: '123', 
      description: 'General staff access',
      color: '#10b981' 
    },
    { 
      role: 'PSSD', 
      email: 'pssd@jpb.com', 
      password: '123', 
      description: 'PSSD department access',
      color: '#3b82f6' 
    },
    { 
      role: 'UCUA Admin', 
      email: 'ucuaadmin@jpb.com', 
      password: '123', 
      description: 'UCUA administrator access',
      color: '#8b5cf6' 
    },
    { 
      role: 'IT Admin', 
      email: 'itadmin@jpb.com', 
      password: '123', 
      description: 'IT administrator access',
      color: '#ef4444' 
    }
  ];

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

  const handleCopyCredentials = async (email, password) => {
    try {
      await navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`);
      setCopySuccess(true);
    } catch (err) {
      console.log('Copy failed');
    }
  };

  const handleUseCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
    setShowCredentialsModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: '70%' },
    maxWidth: 900,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 0,
    outline: 'none'
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

          {/* Demo Credentials Button */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Info size={18} />}
              onClick={() => setShowCredentialsModal(true)}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 500,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(6, 25, 120, 0.04)'
                }
              }}
            >
              View Demo Credentials
            </Button>
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

      {/* Credentials Modal */}
      <Modal
        open={showCredentialsModal}
        onClose={() => setShowCredentialsModal(false)}
        aria-labelledby="credentials-modal-title"
        aria-describedby="credentials-modal-description"
      >
        <Box sx={modalStyle}>
          {/* Simple Header */}
          <Box 
            sx={{ 
              backgroundColor: '#061978',
              color: 'white',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '12px 12px 0 0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Users size={24} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Demo Login Credentials
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '14px' }}>
                  For FYP Examiners & Testing
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={() => setShowCredentialsModal(false)}
              sx={{ 
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          {/* Simple Content */}
          <Box sx={{ p: 3, backgroundColor: 'white' }}>
            <Typography variant="body1" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
              Click any card below to auto-fill the login form
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              {credentials.map((cred, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: cred.color,
                        boxShadow: `0 4px 12px ${cred.color}20`
                      },
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleUseCredentials(cred.email, cred.password)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box 
                            sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%', 
                              backgroundColor: cred.color 
                            }} 
                          />
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                            {cred.role}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCredentials(cred.email, cred.password);
                          }}
                          sx={{ color: '#666' }}
                        >
                          <Copy size={16} />
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 500 }}>
                          EMAIL
                        </Typography>
                        <Typography 
                          sx={{ 
                            fontFamily: 'monospace', 
                            backgroundColor: '#f8f9fa',
                            color: '#333',
                            p: 1,
                            borderRadius: 1,
                            fontSize: '14px',
                            border: '1px solid #e9ecef'
                          }}
                        >
                          {cred.email}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 500 }}>
                          PASSWORD
                        </Typography>
                        <Typography 
                          sx={{ 
                            fontFamily: 'monospace', 
                            backgroundColor: '#f8f9fa',
                            color: '#333',
                            p: 1,
                            borderRadius: 1,
                            fontSize: '14px',
                            border: '1px solid #e9ecef'
                          }}
                        >
                          {cred.password}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
                        {cred.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ 
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
              p: 2,
              border: '1px solid #e9ecef'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#333' }}>
                Quick Tips:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                • Click any card to auto-fill login form<br/>
                • Copy button copies email and password<br/>
                • All accounts use password "123"<br/>
                • For testing purposes only
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setCopySuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<CheckCircle size={20} />}
        >
          Credentials copied to clipboard!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;