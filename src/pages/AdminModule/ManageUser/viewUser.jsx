import React from 'react';
import { User, Mail, Phone, Building, CreditCard, Lock, Users, Eye, ArrowLeft, Shield } from 'lucide-react';

const ViewUser = () => {
  // Dummy user data for display
  const userData = {
    fullName: "Im Nayeon",
    email: "nayeon@pb.com",
    designation: "Staff",
    department: "Port Safety and Security Department (PSSD)",
    password: "abc123",
    phone: "0123456789",
    staffId: "STF001",
    status: "Active",
  };

  const handleBack = () => {
    // Navigate back to user list
    console.log('Navigate back to user management');
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#ef4444';
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      backgroundColor: '#f5f5f5', 
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Form Container */}
      <div style={{ 
        padding: '20px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          flex: '1',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Form Header */}
          <div style={{ 
            padding: '30px 40px', 
            backgroundColor: '#061978',
            color: 'white',
            borderRadius: '8px 8px 0 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Eye size={28} style={{ marginRight: '15px' }} />
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600',
                  margin: '0 0 5px 0'
                }}>
                  View User Details
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'rgba(255,255,255,0.8)',
                  margin: '0'
                }}>
                  User information and account details
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div style={{ 
            padding: '20px 30px',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Full Name */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Full Name
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.fullName}
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Mail size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Email Address
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.email}
                </div>
              </div>

              {/* Designation */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Users size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Designation
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.designation}
                </div>
              </div>

              {/* Default Password */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Lock size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Default Password
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.password}
                </div>
              </div>

              {/* Department */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Building size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Department
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.department}
                </div>
              </div>

              {/* Staff ID */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <CreditCard size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Staff ID
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.staffId}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Phone Number
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: '#000000',
                  boxSizing: 'border-box'
                }}>
                  {userData.phone}
                </div>
              </div>

              {/* Account Status */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Shield size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Account Status
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: '#f9fafb',
                  color: getStatusColor(userData.status),
                  fontWeight: '600',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div 
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(userData.status),
                      marginRight: '8px'
                    }}
                  ></div>
                  {userData.status}
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div style={{ 
              marginTop: 'auto',
              display: 'flex', 
              justifyContent: 'flex-start', 
              paddingTop: '20px',
              borderTop: '1px solid #e5e5e5'
            }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#061978',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0a2499';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#061978';
                }}
              >
                <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                Back to User List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;