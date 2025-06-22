import React, { useState } from 'react';
import { User, Mail, Phone, Building, CreditCard, Lock, Users, AlertCircle, CheckCircle, Eye, EyeOff, Edit, Shield } from 'lucide-react';

const EditUser = () => {
  // Pre-filled dummy user data (would normally come from API/props)
  const [formData, setFormData] = useState({
    fullName: 'Ahmad Zain',
    email: 'ahmadzain@example.com',
    designation: 'staff',
    defaultPassword: 'abc123',
    department: 'Safety',
    staffId: 'STF001',
    phoneNumber: '0123456789',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const designationOptions = [
    { value: '', label: 'Select Designation' },
    { value: 'staff', label: 'Staff' },
    { value: 'pssd_officer', label: 'PSSD Officer' },
    { value: 'ucua_admin', label: 'UCUA Admin' },
    { value: 'it_admin', label: 'IT Admin' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.defaultPassword.trim()) {
      newErrors.defaultPassword = 'Default password is required';
    } else if (formData.defaultPassword.length < 8) {
      newErrors.defaultPassword = 'Password must be at least 8 characters';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.staffId.trim()) newErrors.staffId = 'Staff ID is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number format is invalid';
    }
    if (!formData.status) newErrors.status = 'Account status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'existing@example.com') {
        setErrors({ email: 'Email is already registered.' });
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate back to user list
        console.log('Navigate back to user management');
      }, 3000);
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    // Navigate back to user list without saving
    console.log('Navigate back to user management');
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
              <Edit size={28} style={{ marginRight: '15px' }} />
              <div>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600',
                  margin: '0 0 5px 0'
                }}>
                  Edit User Details
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: 'rgba(255,255,255,0.8)',
                  margin: '0'
                }}>
                  Update user information and account settings
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
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.fullName ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.fullName) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.fullName) e.target.style.borderColor = '#d1d5db';
                  }}
                />
                {errors.fullName && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.fullName}
                  </p>
                )}
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
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.email ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.email) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.target.style.borderColor = '#d1d5db';
                  }}
                />
                {errors.email && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.email}
                  </p>
                )}
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
                  Designation *
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.designation ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.designation) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.designation) e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  {designationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.designation && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.designation}
                  </p>
                )}
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
                  Default Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="defaultPassword"
                    value={formData.defaultPassword}
                    onChange={handleInputChange}
                    placeholder="Enter default password"
                    style={{
                      width: '100%',
                      padding: '12px 45px 12px 16px',
                      border: errors.defaultPassword ? '2px solid #ef4444' : '2px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: '#000000',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      if (!errors.defaultPassword) e.target.style.borderColor = '#061978';
                    }}
                    onBlur={(e) => {
                      if (!errors.defaultPassword) e.target.style.borderColor = '#d1d5db';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280'
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.defaultPassword && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.defaultPassword}
                  </p>
                )}
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
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.department ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.department) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.department) e.target.style.borderColor = '#d1d5db';
                  }}
                />
                {errors.department && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.department}
                  </p>
                )}
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
                  Staff ID *
                </label>
                <input
                  type="text"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                  placeholder="Enter staff ID"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.staffId ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.staffId) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.staffId) e.target.style.borderColor = '#d1d5db';
                  }}
                />
                {errors.staffId && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.staffId}
                  </p>
                )}
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.phoneNumber ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.phoneNumber) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.phoneNumber) e.target.style.borderColor = '#d1d5db';
                  }}
                />
                {errors.phoneNumber && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.phoneNumber}
                  </p>
                )}
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
                  Account Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.status ? '2px solid #ef4444' : '2px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!errors.status) e.target.style.borderColor = '#061978';
                  }}
                  onBlur={(e) => {
                    if (!errors.status) e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#ef4444', 
                    margin: '5px 0 0 0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <AlertCircle size={14} style={{ marginRight: '4px' }} />
                    {errors.status}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ 
              marginTop: 'auto',
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '15px',
              paddingTop: '20px',
              borderTop: '1px solid #e5e5e5'
            }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '12px 30px',
                  border: '2px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#9ca3af';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = 'white';
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: isSubmitting ? '#9ca3af' : '#061978',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.target.style.backgroundColor = '#0a2499';
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.target.style.backgroundColor = '#061978';
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '10px'
                    }}></div>
                    Updating User...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <AlertCircle size={24} style={{ color: '#ef4444', marginRight: '15px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                Confirm Cancel
              </h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '30px', lineHeight: '1.5' }}>
              Are you sure you want to cancel? All unsaved changes will be lost.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button
                onClick={() => setShowCancelDialog(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                No, Continue Editing
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          border: '1px solid #d1fae5',
          zIndex: '1000',
          maxWidth: '350px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle size={24} style={{ color: '#10b981', marginRight: '15px' }} />
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', margin: '0 0 5px 0' }}>
                Success!
              </h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                User details updated successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EditUser;