import React from "react";
import { 
  FileDown, 
  MapPin, 
  AlertTriangle, 
  Camera, 
  User, 
  Calendar, 
  CheckCircle, 
  Bot,
  Shield,
  Eye,
  Activity
} from "lucide-react";

const PSSDViewUA = () => {
  const styles = {
    container: {
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
      color: '#061978'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#061978',
      margin: 0
    },
    exportBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      backgroundColor: '#061978',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#061978',
      margin: 0
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    inputGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: '#f9fafb',
      color: '#374151',
      fontSize: '14px'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: '#f9fafb',
      color: '#374151',
      fontSize: '14px',
      resize: 'none',
      fontFamily: 'Poppins, sans-serif'
    },
    imageGrid: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    imageContainer: {
      width: '80px',
      height: '80px',
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
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #bfdbfe',
      marginBottom: '16px'
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
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
    aiCard: {
      background: 'linear-gradient(to right, #fffbeb, #fef3c7)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '2px solid #fbbf24'
    },
    aiHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px'
    },
    aiTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#b45309',
      margin: 0
    },
    aiBadge: {
      padding: '4px 12px',
      backgroundColor: '#fbbf24',
      color: 'white',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    aiInfo: {
      backgroundColor: '#fef3c7',
      border: '1px solid #fbbf24',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      color: '#92400e',
      fontStyle: 'italic'
    },
    aiRecommendation: {
      backgroundColor: '#ecfdf5',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '16px'
    },
    iconLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Export Button */}
      <div style={styles.header}>
        <h1 style={styles.title}>Unsafe Action Report</h1>
        <button style={styles.exportBtn}>
          <FileDown size={20} />
          Export PDF
        </button>
      </div>

      {/* Report Header Card */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <Shield size={28} color="#061978" />
          <h2 style={{ ...styles.sectionTitle, fontSize: '1.5rem' }}>
            UNSAFE ACTION REPORT [UA0001]
          </h2>
        </div>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Submitted on 04-01-2024 at 15:00 | Status: 
          <span style={styles.badge}>APPROVED</span>
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
              <MapPin size={18} color="#6b7280" />
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
              <AlertTriangle size={18} color="#6b7280" />
              <label style={styles.label}>Offense Code</label>
            </div>
            <input
              type="text"
              value="Not Fastening a Restraint"
              disabled
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Camera size={18} color="#6b7280" />
              <span style={{ ...styles.label, fontWeight: '600', color: '#061978' }}>
                Action Pictures:
              </span>
            </div>
            <div style={styles.imageGrid}>
              {[
                "https://source.unsplash.com/80x80/?factory",
                "https://source.unsplash.com/80x80/?helmet", 
                "https://source.unsplash.com/80x80/?van,safety"
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
            <input type="text" value="Stop Work" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <User size={18} color="#6b7280" />
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
            <input type="text" value="823050016" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>IC/Passport</label>
            <input type="text" value="020727-01-0831" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Calendar size={18} color="#6b7280" />
              <label style={styles.label}>Date & Time</label>
            </div>
            <input type="text" value="04-01-2024 15:00" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, fontWeight: '600', color: '#061978' }}>
              Work Card:
            </label>
            <div style={styles.imageContainer}>
              <img
                src="https://source.unsplash.com/80x80/?idcard"
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
          <CheckCircle size={24} color="#061978" />
          <h3 style={styles.sectionTitle}>3. FOLLOW-UP & STATUS</h3>
        </div>

        <div style={styles.statusCard}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: '#061978' }}>
            APPROVED BY (SAFETY DEPARTMENT OFFICER)
          </h4>
          <div style={styles.statusGrid}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Name:</p>
              <p style={{ fontWeight: '600', margin: 0 }}>SAFETY OFFICER</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Designation:</p>
              <p style={{ fontWeight: '600', margin: 0 }}>SAFETY DEPT OFFICER</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Date:</p>
              <p style={{ fontWeight: '600', margin: 0 }}>2023-02-02 4:00</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Status:</p>
              <span style={styles.badge}>APPROVED</span>
            </div>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Remark</label>
          <textarea
            value="Issue has been solved and Safety Department Officer will now approve."
            disabled
            rows={3}
            style={styles.textarea}
          />
        </div>
      </div>

      {/* SECTION 4: AI PREDICTION */}
      <div style={styles.aiCard}>
        <div style={styles.aiHeader}>
          <Bot size={28} color="#f59e0b" />
          <h3 style={styles.aiTitle}>4. AI PREDICTION & ANALYSIS</h3>
          <span style={styles.aiBadge}>AI POWERED</span>
        </div>

        <div style={styles.aiInfo}>
          <p style={{ margin: 0 }}>
            🤖 <strong>AI Analysis:</strong> This prediction was generated by our advanced AI model based on image analysis, location data, and textual input from the U-SEE section. The AI system helps PSSD officers make more informed decisions by providing intelligent insights and recommendations.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>AI Predicted Offense Code</label>
            <input
              type="text"
              value="Not Wearing Safety Helmet"
              disabled
              style={{ ...styles.input, backgroundColor: 'white' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>AI Predicted Risk Level</label>
            <input
              type="text"
              value="High Risk"
              disabled
              style={{ ...styles.input, backgroundColor: 'white' }}
            />
          </div>
        </div>

        <div style={styles.aiRecommendation}>
          <p style={{ fontWeight: '600', color: '#065f46', margin: '0 0 8px 0' }}>
            💡 AI Safety Recommendation:
          </p>
          <p style={{ color: '#047857', margin: 0 }}>
            Immediate safety training required for proper PPE usage. Recommend refresher course on safety protocols and regular safety audits in the ICT Department area. Consider implementing automated safety monitoring systems to prevent similar incidents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PSSDViewUA;