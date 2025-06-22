import React from "react";
import { 
  FileDown, 
  MapPin, 
  AlertCircle, 
  Camera, 
  User, 
  Calendar, 
  Clock, 
  Bot,
  Shield,
  Eye,
  FileText,
  Tag,
  TrendingUp
} from "lucide-react";

const PSSDViewUC = () => {
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
      backgroundColor: '#fef3c7',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #fbbf24',
      marginBottom: '16px'
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    pendingBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: '#fef3c7',
      color: '#92400e',
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
    riskMedium: {
      padding: '4px 12px',
      backgroundColor: '#fef3c7',
      color: '#92400e',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Export Button */}
      <div style={styles.header}>
        <h1 style={styles.title}>Unsafe Condition Report</h1>
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
            UNSAFE CONDITION REPORT [UC0001]
          </h2>
        </div>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Submitted on 04-01-2024 at 15:00 | Status: 
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: '#dcfce7',
            color: '#166534',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            marginLeft: '8px'
          }}>APPROVED</span>
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
              <FileText size={18} color="#6b7280" />
              <label style={styles.label}>Condition Details</label>
            </div>
            <textarea
              value="AIR CONDITIONER WENT WRONG - Unit not cooling properly, making unusual noises, and appears to be leaking water onto the floor. This creates potential slip hazards and may affect equipment in the server room."
              disabled
              rows={4}
              style={styles.textarea}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Camera size={18} color="#6b7280" />
              <span style={{ ...styles.label, fontWeight: '600', color: '#061978' }}>
                Condition Pictures:
              </span>
            </div>
            <div style={styles.imageGrid}>
              {[
                "https://source.unsplash.com/80x80/?airconditioner",
                "https://source.unsplash.com/80x80/?hvac"
              ].map((src, i) => (
                <div key={i} style={styles.imageContainer}>
                  <img src={src} alt={`Condition Evidence ${i + 1}`} style={styles.image} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Tag size={18} color="#6b7280" />
              <span style={{ ...styles.label, fontWeight: '600', color: '#061978' }}>
                Auto-Tagged Keywords:
              </span>
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
            <input type="text" value="AHMAD IBRAHIM" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Staff ID</label>
            <input type="text" value="ICT2024001" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input type="text" value="ICT DEPARTMENT" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <Calendar size={18} color="#6b7280" />
              <label style={styles.label}>Report Date & Time</label>
            </div>
            <input type="text" value="04-01-2024 15:00" disabled style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Number</label>
            <input type="text" value="+60123456789" disabled style={styles.input} />
          </div>
        </div>
      </div>

      {/* SECTION 3: FOLLOW-UP & STATUS */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <Clock size={24} color="#061978" />
          <h3 style={styles.sectionTitle}>3. FOLLOW-UP ACTION & STATUS</h3>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #bfdbfe',
          marginBottom: '16px'
        }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: '#061978' }}>
            APPROVED BY (SAFETY DEPARTMENT OFFICER)
          </h4>
          <div style={styles.statusGrid}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Name:</p>
              <p style={{ fontWeight: '600', margin: 0, color: '#061978' }}>SAFETY OFFICER</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Designation:</p>
              <p style={{ fontWeight: '600', margin: 0, color: '#061978' }}>SAFETY DEPT OFFICER</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Date:</p>
              <p style={{ fontWeight: '600', margin: 0, color: '#061978' }}>2023-02-02 4:00</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px 0' }}>Status:</p>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>APPROVED</span>
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

      {/* SECTION 4: AI PREDICTION & ANALYSIS */}
      <div style={styles.aiCard}>
        <div style={styles.aiHeader}>
          <Bot size={28} color="#f59e0b" />
          <h3 style={styles.aiTitle}>4. AI PREDICTION & ANALYSIS</h3>
          <span style={styles.aiBadge}>AI POWERED</span>
        </div>

        <div style={styles.aiInfo}>
          <p style={{ margin: 0 }}>
            🤖 <strong>AI Analysis:</strong> This prediction was generated by our advanced AI model based on image analysis, condition details, and environmental factors. The system evaluates potential risks and suggests appropriate safety actions for PSSD officers.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.inputGroup}>
            <div style={styles.iconLabel}>
              <TrendingUp size={18} color="#6b7280" />
              <label style={styles.label}>AI Predicted Risk Level</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value="Medium Risk"
                disabled
                style={{ ...styles.input, backgroundColor: 'white', flex: 1 }}
              />
              <span style={styles.riskMedium}>MEDIUM</span>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Priority Level</label>
            <input
              type="text"
              value="High Priority - 24 Hour Response"
              disabled
              style={{ ...styles.input, backgroundColor: 'white' }}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>AI Suggested Safety Action</label>
          <textarea
            value="1. Schedule HVAC technician inspection within 24 hours
2. Implement temporary cooling solution for server room
3. Install warning signs and barriers around leak area
4. Monitor equipment temperature until repairs completed"
            disabled
            rows={4}
            style={{ ...styles.textarea, backgroundColor: 'white' }}
          />
        </div>

        <div style={styles.aiRecommendation}>
          <p style={{ fontWeight: '600', color: '#065f46', margin: '0 0 8px 0' }}>
            💡 AI Safety Recommendation:
          </p>
          <p style={{ color: '#047857', margin: 0 }}>
            Based on the location (server room) and equipment failure type, this condition poses risks to both personnel safety and critical infrastructure. Recommend immediate temporary measures while scheduling professional HVAC maintenance. Consider installing humidity monitors and backup cooling systems to prevent future incidents.
          </p>
        </div>

        <div style={{ ...styles.aiInfo, marginTop: '16px', marginBottom: 0 }}>
          <p style={{ margin: 0, fontSize: '13px' }}>
            ⚠️ <strong>Validation Required:</strong> Please validate AI predictions before making final decisions. This analysis is based on available data and should be combined with professional assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PSSDViewUC;