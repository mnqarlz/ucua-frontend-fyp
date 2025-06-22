import React, { useState } from "react";
import { Upload, FileEdit, CheckCircle2, XCircle, Shield, Eye, Clock, User, Calendar, MapPin, FileText, Camera, Tag, TrendingUp, MessageSquare } from "lucide-react";

const PSSDEditUC = () => {
  const [remark, setRemark] = useState("");
  const [followUpAction, setFollowUpAction] = useState("");
  const [actionFile, setActionFile] = useState(null);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  
  // Button hover states
  const [saveHovered, setSaveHovered] = useState(false);
  const [approveHovered, setApproveHovered] = useState(false);
  const [rejectHovered, setRejectHovered] = useState(false);
  const [feedbackHovered, setFeedbackHovered] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);

  const styles = {
    container: {
      padding: '32px',
      fontFamily: 'Poppins, sans-serif',
      color: '#061978',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#061978',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      marginBottom: '32px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: '2px solid #e2e8f0'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#061978',
      margin: 0
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#061978',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      color: '#374151',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#374151',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      resize: 'vertical',
      minHeight: '100px',
      boxSizing: 'border-box'
    },
    textareaLarge: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#374151',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box'
    },
    imageGrid: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '8px'
    },
    imageContainer: {
      width: '100px',
      height: '100px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '2px solid #e5e7eb',
      cursor: 'pointer'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    statusCard: {
      backgroundColor: '#eff6ff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #bfdbfe',
      marginBottom: '20px'
    },
    statusTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#061978',
      marginBottom: '16px'
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    statusItem: {
      marginBottom: '8px'
    },
    statusLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500'
    },
    statusValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#061978'
    },
    approvedBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: '#dcfce7',
      color: '#166534',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    tagContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginTop: '8px'
    },
    tag: {
      padding: '4px 8px',
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    uploadBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#6b7280',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '8px',
      transition: 'all 0.2s'
    },
    actionButtons: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    saveBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.2s'
    },
    approveBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.2s'
    },
    rejectBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.2s'
    },
    feedbackModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    feedbackModalContent: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    feedbackTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#061978',
      marginBottom: '8px',
      textAlign: 'center'
    },
    feedbackSubtitle: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '24px',
      textAlign: 'center'
    },
    feedbackTextarea: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#374151',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
      marginBottom: '16px'
    },
    feedbackTextareaError: {
      borderColor: '#dc2626'
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '13px',
      marginBottom: '16px'
    },
    feedbackButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    sendBtn: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#f59e0b',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    sendBtnHover: {
      backgroundColor: '#d97706',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
    },
    cancelBtn: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#6b7280',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    cancelBtnHover: {
      backgroundColor: '#f9fafb',
      borderColor: '#9ca3af',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    noteBox: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      marginTop: '24px',
      border: '1px solid #fca5a5'
    },
    footerUpdate: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
    },
    updateHeader: {
      fontWeight: '600',
      marginBottom: '16px',
      color: '#061978',
      fontSize: '16px'
    },
    updateContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #e2e8f0'
    },
    updateContent: {
      flex: 1
    },
    updateUser: {
      fontWeight: '600',
      fontSize: '14px',
      color: '#061978',
      marginBottom: '4px'
    },
    updateMessage: {
      fontSize: '13px',
      color: '#6b7280',
      lineHeight: '1.4'
    },
    confirmModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#061978',
      marginBottom: '8px'
    },
    modalText: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '24px'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    modalBtnPrimary: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif'
    },
    modalBtnSecondary: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#6b7280',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif'
    },
    iconLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '6px'
    }
  };

  const handleSave = () => {
    console.log('UC Report saved with remark:', remark);
    console.log('Follow-up action:', followUpAction);
    console.log('Action file:', actionFile);
  };

  const handleApprove = () => {
    setShowApproveConfirm(false);
    console.log('UC Report approved');
  };

  const handleReject = () => {
    setShowRejectConfirm(false);
    console.log('UC Report rejected');
  };

  const handleRequestFeedback = () => {
    setShowFeedbackModal(true);
    setFeedbackMessage("");
    setFeedbackError("");
  };

  const handleSendFeedback = () => {
    if (!feedbackMessage.trim()) {
      setFeedbackError("Please enter your feedback!");
      return;
    }
    
    // Send feedback request
    console.log('Feedback request sent:', feedbackMessage);
    setShowFeedbackModal(false);
    setFeedbackMessage("");
    setFeedbackError("");
    
    // Here you would typically:
    // 1. Update report status to "Need Feedback"
    // 2. Notify the original reporter
    // 3. Log the action
    // 4. Redirect to UC report list
    alert('Feedback request sent successfully! The reporter will be notified.');
  };

  const handleCancelFeedback = () => {
    setShowFeedbackModal(false);
    setFeedbackMessage("");
    setFeedbackError("");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          <Shield size={28} />
          UNSAFE CONDITION REPORT [UC0001]
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Submitted on 04-01-2024 at 15:00 | Status: PENDING REVIEW
        </p>
      </div>

      <div style={styles.gridContainer}>
        {/* SECTION 1: U-SEE */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <Eye size={24} color="#061978" />
            <h3 style={styles.sectionTitle}>1. U-SEE</h3>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <MapPin size={16} color="#061978" />
              <label style={styles.label}>Location</label>
            </div>
            <input 
              type="text" 
              value="ICT DEPARTMENT" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <FileText size={16} color="#061978" />
              <label style={styles.label}>Condition Details</label>
            </div>
            <textarea
              value="AIR CONDITIONER WENT WRONG - Unit not cooling properly, making unusual noises, and appears to be leaking water onto the floor. This creates potential slip hazards and may affect equipment in the server room."
              disabled
              style={styles.textareaLarge}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Camera size={16} color="#061978" />
              <label style={styles.label}>Upload Condition Pictures</label>
            </div>
            <div style={styles.imageGrid}>
              {[
                "https://source.unsplash.com/100x100/?airconditioner",
                "https://source.unsplash.com/100x100/?hvac",
                "https://source.unsplash.com/100x100/?waterleak"
              ].map((src, i) => (
                <div key={i} style={styles.imageContainer}>
                  <img src={src} alt={`Condition Evidence ${i + 1}`} style={styles.image} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Tag size={16} color="#061978" />
              <label style={styles.label}>Auto-Tagged Keywords</label>
            </div>
            <div style={styles.tagContainer}>
              <span style={styles.tag}>HVAC</span>
              <span style={styles.tag}>Equipment Failure</span>
              <span style={styles.tag}>Water Leak</span>
              <span style={styles.tag}>Slip Hazard</span>
              <span style={styles.tag}>Server Room</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: REPORTER INFO */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <User size={24} color="#061978" />
            <h3 style={styles.sectionTitle}>2. REPORTER INFO</h3>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Reporter Name</label>
            <input 
              type="text" 
              value="AHMAD IBRAHIM" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Staff ID</label>
            <input 
              type="text" 
              value="ICT2024001" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input 
              type="text" 
              value="ICT DEPARTMENT" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Calendar size={16} color="#061978" />
              <label style={styles.label}>Report Date & Time</label>
            </div>
            <input 
              type="text" 
              value="04-01-2024 15:00" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Number</label>
            <input 
              type="text" 
              value="+60123456789" 
              disabled 
              style={styles.input} 
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: FOLLOW-UP ACTION & STATUS */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <Clock size={24} color="#061978" />
          <h3 style={styles.sectionTitle}>3. FOLLOW-UP ACTION & STATUS</h3>
        </div>

        <div style={styles.statusCard}>
          <div style={styles.statusTitle}>APPROVED BY (SAFETY DEPARTMENT OFFICER)</div>
          <div style={styles.statusGrid}>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Name:</div>
              <div style={styles.statusValue}>SAFETY OFFICER</div>
            </div>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Designation:</div>
              <div style={styles.statusValue}>SAFETY DEPT OFFICER</div>
            </div>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Date:</div>
              <div style={styles.statusValue}>2023-02-02 4:00</div>
            </div>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Status:</div>
              <span style={styles.approvedBadge}>APPROVED</span>
            </div>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>PSSD Officer Remark (Required for Validation)</label>
          <textarea
            style={styles.textarea}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your validation remarks, assessment, and recommendations..."
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Take Action Upload (Optional)</label>
          <div
            style={styles.uploadBtn}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <Upload size={16} />
            Choose File
          </div>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => setActionFile(e.target.files[0])}
          />
          {actionFile && (
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              Selected: {actionFile.name}
            </p>
          )}
        </div>
      </div>

      {/* SECTION 4: AI PREDICTION & ANALYSIS */}
      <div style={{
        backgroundColor: '#fffbeb',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '2px solid #fbbf24',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={styles.sectionHeader}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>🤖</div>
          <h3 style={{ ...styles.sectionTitle, color: '#f59e0b' }}>4. AI PREDICTION & ANALYSIS</h3>
          <span style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>AI POWERED</span>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: '#92400e',
            fontStyle: 'italic'
          }}>
            🤖 <strong>AI Analysis:</strong> This prediction was generated by our advanced AI model based on condition details, environmental factors, and image analysis. The system evaluates potential risks and suggests appropriate safety actions for PSSD officers.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <TrendingUp size={16} color="#92400e" />
              <label style={{ ...styles.label, color: '#92400e' }}>AI Predicted Risk Level</label>
            </div>
            <input
              type="text"
              value="Medium Risk"
              disabled
              style={{ ...styles.input, backgroundColor: 'white', border: '1px solid #fbbf24' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: '#92400e' }}>Priority Level</label>
            <input
              type="text"
              value="High Priority - 24 Hour Response"
              disabled
              style={{ ...styles.input, backgroundColor: 'white', border: '1px solid #fbbf24' }}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={{ ...styles.label, color: '#92400e' }}>AI Suggested Safety Action</label>
          <textarea
            value="1. Schedule HVAC technician inspection within 24 hours&#10;2. Implement temporary cooling solution for server room&#10;3. Install warning signs and barriers around leak area&#10;4. Monitor equipment temperature until repairs completed"
            disabled
            style={{ ...styles.textarea, backgroundColor: 'white', border: '1px solid #fbbf24' }}
          />
        </div>

        <div style={{
          backgroundColor: '#ecfdf5',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px'
        }}>
          <p style={{ 
            fontWeight: '600', 
            color: '#065f46', 
            margin: '0 0 8px 0',
            fontSize: '14px'
          }}>
            💡 AI Safety Recommendation:
          </p>
          <p style={{ 
            color: '#047857', 
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Based on the location (server room) and equipment failure type, this condition poses risks to both personnel safety and critical infrastructure. Recommend immediate temporary measures while scheduling professional HVAC maintenance. Consider installing humidity monitors and backup cooling systems to prevent future incidents.
          </p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '16px'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '13px', 
            color: '#92400e'
          }}>
            ⚠️ <strong>Validation Required:</strong> Please validate AI predictions before making final decisions. This analysis is based on available data and should be combined with professional assessment.
          </p>
        </div>
      </div>

      {/* Warning Note */}
      <div style={styles.noteBox}>
        ⚠️ <strong>Important:</strong> Please provide validation remarks before approving or rejecting this UC report. Your assessment will be recorded and shared with relevant stakeholders.
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button 
          style={{
            ...styles.saveBtn,
            ...(saveHovered ? styles.saveBtnHover : {})
          }}
          onClick={handleSave}
          onMouseEnter={() => setSaveHovered(true)}
          onMouseLeave={() => setSaveHovered(false)}
          onMouseDown={(e) => e.target.style.transform = 'translateY(0)'}
          onMouseUp={(e) => e.target.style.transform = saveHovered ? 'translateY(-2px)' : 'translateY(0)'}
        >
          <FileEdit size={20} />
          Save Changes
        </button>
        <button 
          style={{
            ...styles.requestFeedbackBtn,
            ...(feedbackHovered ? styles.requestFeedbackBtnHover : {})
          }}
          onClick={handleRequestFeedback}
          onMouseEnter={() => setFeedbackHovered(true)}
          onMouseLeave={() => setFeedbackHovered(false)}
          onMouseDown={(e) => e.target.style.transform = 'translateY(0)'}
          onMouseUp={(e) => e.target.style.transform = feedbackHovered ? 'translateY(-2px)' : 'translateY(0)'}
        >
          <MessageSquare size={20} />
          Request Feedback
        </button>
        <button 
          style={{
            ...styles.approveBtn,
            ...(approveHovered && remark.trim() ? styles.approveBtnHover : {}),
            ...(!remark.trim() ? styles.approveBtnDisabled : {})
          }}
          onClick={() => setShowApproveConfirm(true)}
          disabled={!remark.trim()}
          onMouseEnter={() => setApproveHovered(true)}
          onMouseLeave={() => setApproveHovered(false)}
          onMouseDown={(e) => remark.trim() && (e.target.style.transform = 'translateY(0)')}
          onMouseUp={(e) => remark.trim() && (e.target.style.transform = approveHovered ? 'translateY(-2px)' : 'translateY(0)')}
        >
          <CheckCircle2 size={20} />
          Approve Report
        </button>
        <button 
          style={{
            ...styles.rejectBtn,
            ...(rejectHovered && remark.trim() ? styles.rejectBtnHover : {}),
            ...(!remark.trim() ? styles.rejectBtnDisabled : {})
          }}
          onClick={() => setShowRejectConfirm(true)}
          disabled={!remark.trim()}
          onMouseEnter={() => setRejectHovered(true)}
          onMouseLeave={() => setRejectHovered(false)}
          onMouseDown={(e) => remark.trim() && (e.target.style.transform = 'translateY(0)')}
          onMouseUp={(e) => remark.trim() && (e.target.style.transform = rejectHovered ? 'translateY(-2px)' : 'translateY(0)')}
        >
          <XCircle size={20} />
          Reject Report
        </button>
      </div>

      {/* Follow-Up Update */}
      <div style={styles.footerUpdate}>
        <div style={styles.updateHeader}>Follow-Up Update History</div>
        <div style={styles.updateContainer}>
          <img
            src="https://source.unsplash.com/40x40/?technician"
            alt="Reporter"
            style={styles.avatar}
          />
          <div style={styles.updateContent}>
            <div style={styles.updateUser}>Ahmad Ibrahim (Reporter)</div>
            <div style={styles.updateMessage}>
              Condition reported - Air conditioning unit malfunction causing water leakage and potential equipment damage. Immediate attention required for server room safety.
            </div>
          </div>
        </div>
      </div>

      {/* Approval Confirmation Modal */}
      {showApproveConfirm && (
        <div style={styles.confirmModal}>
          <div style={styles.modalContent}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
            <h3 style={styles.modalTitle}>Approve this UC report?</h3>
            <p style={styles.modalText}>
              This action will mark the report as approved and notify relevant stakeholders. The follow-up action plan will be implemented.
            </p>
            <div style={styles.modalButtons}>
              <button 
                style={{ ...styles.modalBtnPrimary, backgroundColor: '#16a34a', color: 'white' }}
                onClick={handleApprove}
              >
                Yes, Approve
              </button>
              <button 
                style={styles.modalBtnSecondary}
                onClick={() => setShowApproveConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Confirmation Modal */}
      {showRejectConfirm && (
        <div style={styles.confirmModal}>
          <div style={styles.modalContent}>
            <XCircle size={48} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            <h3 style={styles.modalTitle}>Reject this UC report?</h3>
            <p style={styles.modalText}>
              This action will mark the report as rejected and notify the reporter. Please ensure your remarks explain the reason for rejection.
            </p>
            <div style={styles.modalButtons}>
              <button 
                style={{ ...styles.modalBtnPrimary, backgroundColor: '#dc2626', color: 'white' }}
                onClick={handleReject}
              >
                Yes, Reject
              </button>
              <button 
                style={styles.modalBtnSecondary}
                onClick={() => setShowRejectConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Request Modal */}
      {showFeedbackModal && (
        <div style={styles.feedbackModal}>
          <div style={styles.feedbackModalContent}>
            <MessageSquare size={48} color="#f59e0b" style={{ margin: '0 auto 16px', display: 'block' }} />
            <h3 style={styles.feedbackTitle}>Request Feedback from Reporter</h3>
            <p style={styles.feedbackSubtitle}>
              Send a clarification request to the original reporter for missing or unclear information.
            </p>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#061978', 
                marginBottom: '8px' 
              }}>
                Clarification Message <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea
                value={feedbackMessage}
                onChange={(e) => {
                  setFeedbackMessage(e.target.value);
                  if (feedbackError) setFeedbackError("");
                }}
                placeholder="Please provide specific details about what information is missing or needs clarification..."
                style={{
                  ...styles.feedbackTextarea,
                  ...(feedbackError ? styles.feedbackTextareaError : {})
                }}
              />
              {feedbackError && (
                <p style={styles.errorMessage}>{feedbackError}</p>
              )}
            </div>

            <div style={styles.feedbackButtons}>
              <button 
                style={{
                  ...styles.sendBtn,
                  ...(sendHovered ? styles.sendBtnHover : {})
                }}
                onClick={handleSendFeedback}
                onMouseEnter={() => setSendHovered(true)}
                onMouseLeave={() => setSendHovered(false)}
                onMouseDown={(e) => e.target.style.transform = 'translateY(0)'}
                onMouseUp={(e) => e.target.style.transform = sendHovered ? 'translateY(-1px)' : 'translateY(0)'}
              >
                Send Request
              </button>
              <button 
                style={{
                  ...styles.cancelBtn,
                  ...(cancelHovered ? styles.cancelBtnHover : {})
                }}
                onClick={handleCancelFeedback}
                onMouseEnter={() => setCancelHovered(true)}
                onMouseLeave={() => setCancelHovered(false)}
                onMouseDown={(e) => e.target.style.transform = 'translateY(0)'}
                onMouseUp={(e) => e.target.style.transform = cancelHovered ? 'translateY(-1px)' : 'translateY(0)'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PSSDEditUC;