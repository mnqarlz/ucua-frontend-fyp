import React from "react";
import {
  MapPin,
  FileText,
  Camera,
  Upload,
  Eye,
  Bot,
  Tag,
  Lightbulb,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

const report = {
  reportNo: "UC0001",
  location: "ICT DEPARTMENT",
  conditionDetails: "AIR CONDITIONER WENT WRONG",
  images: [
    "https://images.unsplash.com/photo-1592878854152-0629e6f6db68",
    "https://images.unsplash.com/photo-1609132718480-cfdfdf9a050f"
  ],
  status: "NEED FEEDBACK",
  safetyOfficer: {
    name: "B. SAFETY OFFICER",
    designation: "SAFETY OFFICER",
    date: "2024-01-08 02:00:00",
  },
  followUp: [
    {
      time: "1 hour ago",
      message: "Issue has been solved and Safety Department Officer will now approve.",
      img: null
    },
    {
      time: "2 hours ago",
      message: "Action has been taken and can now confirm close issue.",
      img: "https://images.unsplash.com/photo-1581091215367-59ab6f9b95b3"
    }
  ],
  aiSuggestion: "Check ventilation around aircon. Ensure filter replaced. Secure wires.",
  autoTags: ["Air Conditioner", "Malfunction", "Electrical Hazard"],
  riskLevel: "MEDIUM",
  submittedBy: "John Doe",
  submittedDate: "2024-01-07 14:30:00"
};

const ViewUC = () => {
  const isEditable = report.status === "NEED FEEDBACK";

  const getStatusColor = (status) => {
    switch(status) {
      case "APPROVED": return "#16a34a";
      case "REJECTED": return "#dc2626";
      case "NEED FEEDBACK": return "#d97706";
      case "PENDING": return "#6b7280";
      default: return "#6b7280";
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case "HIGH": return "#dc2626";
      case "MEDIUM": return "#d97706";
      case "LOW": return "#16a34a";
      default: return "#6b7280";
    }
  };

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    padding: '32px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const sectionHeaderStyle = {
    color: '#061978',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const fieldStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    fontFamily: 'Poppins, sans-serif',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '80px',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    fontFamily: 'Poppins, sans-serif',
    resize: 'vertical',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const tagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    margin: '4px 8px 4px 0'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: isEditable ? '#061978' : '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: isEditable ? 'pointer' : 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <h1 style={{
          color: '#061978',
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Eye size={24} />
          UNSAFE CONDITION REPORT [{report.reportNo}]
        </h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            padding: '6px 16px',
            backgroundColor: getStatusColor(report.status),
            color: 'white',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {report.status === "NEED FEEDBACK" && <AlertTriangle size={14} />}
            {report.status === "APPROVED" && <CheckCircle size={14} />}
            STATUS: {report.status}
          </div>
          
          <div style={{
            padding: '6px 16px',
            backgroundColor: getRiskColor(report.riskLevel),
            color: 'white',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            RISK: {report.riskLevel}
          </div>
        </div>
      </div>

      {/* Report Metadata */}
      <div style={cardStyle}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <User size={16} color="#061978" />
            <span style={{
              fontSize: '14px',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <strong style={{color: '#061978'}}>Submitted by:</strong> {report.submittedBy}
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Calendar size={16} color="#061978" />
            <span style={{
              fontSize: '14px',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <strong style={{color: '#061978'}}>Date:</strong> {report.submittedDate}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: U-SEE */}
      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>
          <FileText size={20} />
          1. U-SEE
        </h2>

        {/* Location */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={labelStyle}>
            <MapPin size={16} color="#061978" />
            Location:
          </label>
          <div style={{width: '100%', boxSizing: 'border-box'}}>
            <input
              type="text"
              value={report.location}
              disabled
              style={inputStyle}
            />
          </div>
        </div>

        {/* Condition Details */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={labelStyle}>
            <FileText size={16} color="#061978" />
            Condition Details:
          </label>
          <div style={{width: '100%', boxSizing: 'border-box'}}>
            <textarea
              value={report.conditionDetails}
              disabled
              style={{...textareaStyle, minHeight: '100px'}}
            />
          </div>
        </div>

        {/* Upload Pictures */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={labelStyle}>
            <Camera size={16} color="#061978" />
            Upload Condition Picture:
          </label>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '8px',
            width: '100%'
          }}>
            {report.images.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #e2e8f0'
              }}>
                <img 
                  src={img} 
                  alt={`uploaded-${idx}`} 
                  style={{
                    width: '150px',
                    height: '120px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* AI Auto-Tagging */}
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            color: '#061978',
            fontWeight: '600'
          }}>
            <Tag size={16} />
            AI Auto-Tagging:
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {report.autoTags.map((tag, i) => (
              <span key={i} style={tagStyle}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI Safety Suggestion */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            color: '#061978',
            fontWeight: '600'
          }}>
            <Bot size={16} />
            AI Safety Suggestion:
          </div>
          <p style={{
            margin: 0,
            color: '#374151',
            lineHeight: '1.5'
          }}>
            {report.aiSuggestion}
          </p>
        </div>
      </div>

      {/* SECTION 2: FOLLOW-UP ACTION & STATUS */}
      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>
          <MessageSquare size={20} />
          2. FOLLOW-UP ACTION & STATUS
        </h2>

        {/* Officer Information */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <User size={16} color="#061978" />
              <span style={{
                fontSize: '14px',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <strong style={{color: '#061978'}}>Approved By:</strong> {report.safetyOfficer.name}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FileText size={16} color="#061978" />
              <span style={{
                fontSize: '14px',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <strong style={{color: '#061978'}}>Designation:</strong> {report.safetyOfficer.designation}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Calendar size={16} color="#061978" />
              <span style={{
                fontSize: '14px',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <strong style={{color: '#061978'}}>Date:</strong> {report.safetyOfficer.date}
              </span>
            </div>
          </div>
        </div>

        {/* Remark */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontWeight: '600',
            fontSize: '16px',
            color: '#1f2937'
          }}>
            <MessageSquare size={16} color="#061978" />
            Remark:
          </label>
          <div style={{width: '100%', boxSizing: 'border-box'}}>
            <textarea
              placeholder="Enter your remark here"
              disabled={!isEditable}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '16px',
                border: isEditable ? '2px solid #061978' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: isEditable ? 'white' : '#f9fafb',
                color: '#1f2937',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Upload Button */}
        <div style={{marginTop: '20px'}}>
          <button 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: isEditable ? '#061978' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif',
              cursor: isEditable ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease'
            }} 
            disabled={!isEditable}
          >
            <Upload size={16} />
            {isEditable ? "Upload File" : "Upload Disabled"}
          </button>
          <input type="file" style={{display: 'none'}} />
        </div>
      </div>

      {/* FOLLOW-UP UPDATE */}
      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>
          <Clock size={20} />
          Follow-Up Update
        </h2>

        <div style={{position: 'relative'}}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '19px',
            top: '0',
            bottom: '0',
            width: '2px',
            backgroundColor: '#e2e8f0'
          }}></div>

          {report.followUp.map((item, idx) => (
            <div key={idx} style={{
              position: 'relative',
              marginBottom: idx < report.followUp.length - 1 ? '32px' : '0',
              paddingLeft: '60px'
            }}>
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '8px',
                width: '40px',
                height: '40px',
                backgroundColor: '#061978',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                border: '3px solid white',
                boxShadow: '0 0 0 2px #e2e8f0'
              }}>
                SD
              </div>

              {/* Content */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontWeight: '600',
                    color: '#061978'
                  }}>
                    Safety Department
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={12} />
                    {item.time}
                  </span>
                </div>
                
                <p style={{
                  margin: '0 0 12px 0',
                  color: '#374151',
                  lineHeight: '1.5'
                }}>
                  {item.message}
                </p>
                
                {item.img && (
                  <div style={{
                    marginTop: '12px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                  }}>
                    <img 
                      src={item.img} 
                      alt="evidence" 
                      style={{
                        width: '100%',
                        maxWidth: '350px',
                        height: 'auto'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewUC;