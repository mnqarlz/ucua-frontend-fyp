import React, { useState } from 'react';
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
  Users
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);

  const credentials = [
    { role: 'Staff', email: 'staff@jpb.com', password: '123', description: 'General staff access' },
    { role: 'PSSD', email: 'pssd@jpb.com', password: '123', description: 'PSSD department access' },
    { role: 'UCUA Admin', email: 'ucuaadmin@jpb.com', password: '123', description: 'UCUA administrator access' },
    { role: 'IT Admin', email: 'itadmin@jpb.com', password: '123', description: 'IT administrator access' }
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

    setError('');
    alert(`Login successful! Role: ${role}`);
  };

  const handleCopyCredentials = (email, password) => {
    navigator.clipboard.writeText(`${email} / ${password}`);
  };

  const handleUseCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
    setShowCredentialsModal(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f3f6ff 0%, #e8efff 100%)',
      padding: '16px',
      fontFamily: 'Poppins, sans-serif'
    },
    mainBox: {
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    avatar: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      backgroundColor: '#061978',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
      fontSize: '24px',
      fontWeight: '700'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#061978',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#444',
      margin: '0'
    },
    credentialsButton: {
      backgroundColor: 'transparent',
      border: '2px solid #061978',
      color: '#061978',
      padding: '12px 24px',
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '0 auto 24px',
      transition: 'all 0.2s ease',
      fontSize: '14px'
    },
    paper: {
      width: '100%',
      maxWidth: '620px',
      margin: '0 auto',
      padding: '40px',
      borderRadius: '16px',
      backgroundColor: 'white',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    },
    form: {
      width: '100%'
    },
    label: {
      fontWeight: '500',
      marginBottom: '4px',
      display: 'block',
      color: '#333'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '16px'
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Poppins, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666'
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#666'
    },
    forgotPassword: {
      textAlign: 'right',
      marginTop: '8px'
    },
    link: {
      color: '#061978',
      textDecoration: 'none',
      fontSize: '14px'
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#061978',
      color: 'white',
      border: 'none',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'background-color 0.2s ease'
    },
    signupText: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#666'
    },
    error: {
      color: '#d32f2f',
      textAlign: 'center',
      marginBottom: '16px',
      fontSize: '14px'
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '80vh',
      overflowY: 'auto',
      fontFamily: 'Poppins, sans-serif'
    },
    modalHeader: {
      padding: '32px 32px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e0e0e0'
    },
    modalHeaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    modalIcon: {
      backgroundColor: '#061978',
      borderRadius: '50%',
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#061978',
      margin: '0'
    },
    modalSubtitle: {
      fontSize: '14px',
      color: '#666',
      marginTop: '4px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#666',
      padding: '8px'
    },
    modalBody: {
      padding: '32px'
    },
    chip: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      fontSize: '12px',
      fontWeight: '500',
      padding: '4px 12px',
      borderRadius: '16px',
      display: 'inline-block',
      marginBottom: '16px'
    },
    description: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '24px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '24px'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      fontWeight: '600',
      color: '#061978',
      padding: '16px',
      textAlign: 'left',
      borderBottom: '1px solid #e0e0e0'
    },
    tableRow: {
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid #f0f0f0'
    },
    roleCell: {
      fontWeight: '500',
      color: '#061978'
    },
    monospace: {
      fontFamily: 'monospace',
      fontSize: '14px'
    },
    copyButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#061978',
      padding: '4px'
    },
    tips: {
      padding: '24px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    tipsTitle: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#061978'
    },
    tipsContent: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
      margin: '0'
    }
  };

  return (
    <div>
      <link 
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      <div style={styles.container}>
        <div style={styles.mainBox}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.avatar}>
              UCUA
            </div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your UCUA account</p>
          </div>

          {/* Demo Credentials Button */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              style={styles.credentialsButton}
              onClick={() => setShowCredentialsModal(true)}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(6, 25, 120, 0.04)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Info size={18} />
              View Demo Credentials
            </button>
          </div>

          {/* Login Card */}
          <div style={styles.paper}>
            {error && (
              <div style={styles.error}>
                {error}
              </div>
            )}

            <form style={styles.form} onSubmit={handleLogin}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}>
                  <User size={18} strokeWidth={1.8} />
                </div>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#061978'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}>
                  <Lock size={18} strokeWidth={1.8} />
                </div>
                <input
                  style={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#061978'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div style={styles.forgotPassword}>
                <a href="#" style={styles.link}>
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                style={styles.submitButton}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0a1d6b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#061978'}
              >
                <LogIn size={18} />
                Sign In
              </button>

              <div style={styles.signupText}>
                Don't have an account?{' '}
                <a href="#" style={{ ...styles.link, fontWeight: '600' }}>
                  <UserRoundPlus size={14} style={{ marginBottom: '-2px' }} /> Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Credentials Modal */}
      {showCredentialsModal && (
        <div style={styles.modal} onClick={() => setShowCredentialsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div style={styles.modalHeaderContent}>
                <div style={styles.modalIcon}>
                  <Users size={24} color="white" />
                </div>
                <div>
                  <h2 style={styles.modalTitle}>Demo Login Credentials</h2>
                  <div style={styles.modalSubtitle}>
                    For FYP Examiners & Testing Purposes
                  </div>
                </div>
              </div>
              <button 
                style={styles.closeButton}
                onClick={() => setShowCredentialsModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={styles.modalBody}>
              <div style={styles.chip}>
                Demo Environment
              </div>
              <div style={styles.description}>
                The following credentials are provided for demonstration and testing purposes. 
                Click on any row to auto-fill the login form, or use the copy button to copy credentials.
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Role</th>
                    <th style={styles.tableHeader}>Email</th>
                    <th style={styles.tableHeader}>Password</th>
                    <th style={styles.tableHeader}>Description</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials.map((cred, index) => (
                    <tr 
                      key={index}
                      style={styles.tableRow}
                      onClick={() => handleUseCredentials(cred.email, cred.password)}
                      onMouseOver={(e) => e.target.parentElement.style.backgroundColor = '#f8fafc'}
                      onMouseOut={(e) => e.target.parentElement.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ ...styles.tableCell, ...styles.roleCell }}>
                        {cred.role}
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.monospace }}>
                        {cred.email}
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.monospace }}>
                        {cred.password}
                      </td>
                      <td style={styles.tableCell}>
                        {cred.description}
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          style={styles.copyButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCredentials(cred.email, cred.password);
                          }}
                        >
                          <Copy size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.tips}>
                <div style={styles.tipsTitle}>
                  💡 Quick Tips:
                </div>
                <div style={styles.tipsContent}>
                  • Click on any credential row to automatically fill the login form<br/>
                  • Use the copy button to copy email/password combinations<br/>
                  • All roles use the same password (123) for demo simplicity<br/>
                  • These credentials are for testing and evaluation purposes only
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;