import React, { useState } from "react";
import { Upload, FileEdit, CheckCircle2, XCircle, Shield, Eye, Activity, User, Calendar, MapPin, AlertTriangle, Camera } from "lucide-react";

const PSSDEditUA = () => {
  const [remark, setRemark] = useState("");
  const [actionFile, setActionFile] = useState(null);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

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
    select: {
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
    badge: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: '#dcfce7',
      color: '#166534',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
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
    uploadBtnHover: {
      borderColor: '#061978',
      color: '#061978'
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
    console.log('Report saved with remark:', remark);
    console.log('Action file:', actionFile);
  };

  const handleApprove = () => {
    setShowApproveConfirm(false);
    console.log('Report approved');
  };

  const handleReject = () => {
    setShowRejectConfirm(false);
    console.log('Report rejected');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          <Shield size={28} />
          UNSAFE ACTION REPORT [UA0001]
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
            <select style={styles.select} disabled>
              <option>ICT DEPARTMENT</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <AlertTriangle size={16} color="#061978" />
              <label style={styles.label}>Offense Code</label>
            </div>
            <select style={styles.select} disabled>
              <option>Not Fastening a Restraint</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Camera size={16} color="#061978" />
              <label style={styles.label}>Upload Action Pictures</label>
            </div>
            <div style={styles.imageGrid}>
              {[
                "https://source.unsplash.com/100x100/?factory",
                "https://source.unsplash.com/100x100/?helmet",
                "https://source.unsplash.com/100x100/?van,safety"
              ].map((src, i) => (
                <div key={i} style={styles.imageContainer}>
                  <img src={src} alt={`Evidence ${i + 1}`} style={styles.image} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: U-ACT */}
        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <Activity size={24} color="#061978" />
            <h3 style={styles.sectionTitle}>2. U-ACT</h3>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Immediate Corrective Action</label>
            <select style={styles.select} disabled>
              <option>Stop Work</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <User size={16} color="#061978" />
              <label style={styles.label}>Violator Name</label>
            </div>
            <input 
              type="text" 
              value="MUHAMMAD ADEE FAIRYT" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Staff ID</label>
            <input 
              type="text" 
              value="823050016" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>IC/Passport</label>
            <input 
              type="text" 
              value="020727-01-0831" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Calendar size={16} color="#061978" />
              <label style={styles.label}>Date & Time</label>
            </div>
            <input 
              type="text" 
              value="04-01-2024 15:00" 
              disabled 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Work Card Upload</label>
            <div style={styles.imageContainer}>
              <img 
                src="https://source.unsplash.com/100x100/?idcard" 
                alt="Work Card" 
                style={styles.image} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: FOLLOW-UP & STATUS */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <CheckCircle2 size={24} color="#061978" />
          <h3 style={styles.sectionTitle}>3. FOLLOW-UP & STATUS</h3>
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
              <div style={styles.statusValue}>SAFETY DEPARTMENT OFFICER</div>
            </div>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Date:</div>
              <div style={styles.statusValue}>2023-02-02 4:00</div>
            </div>
            <div style={styles.statusItem}>
              <div style={styles.statusLabel}>Status:</div>
              <span style={styles.badge}>APPROVED</span>
            </div>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>PSSD Officer Remark (Required for Validation)</label>
          <textarea
            style={styles.textarea}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your feedback, comments, or validation remarks here..."
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
            🤖 <strong>AI Analysis:</strong> This prediction was generated by our advanced AI model based on image analysis, location data, and textual input from the U-SEE section. The AI system helps PSSD officers make more informed decisions by providing intelligent insights and recommendations.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: '#92400e' }}>AI Predicted Offense Code</label>
            <input
              type="text"
              value="Not Wearing Safety Helmet"
              disabled
              style={{ ...styles.input, backgroundColor: 'white', border: '1px solid #fbbf24' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: '#92400e' }}>AI Predicted Risk Level</label>
            <input
              type="text"
              value="High Risk"
              disabled
              style={{ ...styles.input, backgroundColor: 'white', border: '1px solid #fbbf24' }}
            />
          </div>
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
            Immediate safety training required for proper PPE usage. Recommend refresher course on safety protocols and regular safety audits in the ICT Department area. Consider implementing automated safety monitoring systems to prevent similar incidents.
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
            ⚠️ <strong>Note:</strong> AI predictions are provided for reference only and should be validated by professional judgment before making final decisions.
          </p>
        </div>
      </div>

      {/* Warning Note */}
      <div style={styles.noteBox}>
        ⚠️ <strong>Important:</strong> Please provide your validation remarks before approving or rejecting this report. Your feedback will be recorded and shared with the reporter.
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button style={styles.saveBtn} onClick={handleSave}>
          <FileEdit size={20} />
          Save Changes
        </button>
        <button 
          style={styles.approveBtn} 
          onClick={() => setShowApproveConfirm(true)}
          disabled={!remark.trim()}
        >
          <CheckCircle2 size={20} />
          Approve Report
        </button>
        <button 
          style={styles.rejectBtn} 
          onClick={() => setShowRejectConfirm(true)}
          disabled={!remark.trim()}
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
            src="https://source.unsplash.com/40x40/?person"
            alt="Safety Officer"
            style={styles.avatar}
          />
          <div style={styles.updateContent}>
            <div style={styles.updateUser}>Safety Department Officer</div>
            <div style={styles.updateMessage}>
              Issue has been reviewed and documented. Report forwarded to PSSD Officer for final validation and approval.
            </div>
          </div>
        </div>
      </div>

      {/* Approval Confirmation Modal */}
      {showApproveConfirm && (
        <div style={styles.confirmModal}>
          <div style={styles.modalContent}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
            <h3 style={styles.modalTitle}>Approve this report?</h3>
            <p style={styles.modalText}>
              This action will mark the report as approved and notify the reporter. This action cannot be undone.
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
            <h3 style={styles.modalTitle}>Reject this report?</h3>
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
    </div>
  );
};

export default PSSDEditUA;