import React from "react";
import {
  MapPin,
  FileText,
  Camera,
  Upload,
  Eye,
  Bot,
  AlertTriangle,
  Lightbulb,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  CreditCard,
  Building,
  Zap
} from "lucide-react";

const report = {
  reportNo: "UA0001",
  location: "ICT DEPARTMENT",
  offenseCode: "Not Following 5 Fundamentals",
  reportDescription: "Employee ignored safety warnings during machine operation.",
  images: [
    "https://via.placeholder.com/100x100/3b82f6/ffffff?text=IMG1",
    "https://via.placeholder.com/100x100/10b981/ffffff?text=IMG2", 
    "https://via.placeholder.com/100x100/f59e0b/ffffff?text=IMG3"
  ],
  immediateAction: "Stop Work",
  violatorName: "MUHAMMAD AIMAN HAIQAL",
  staffId: "B124856",
  icPassport: "030717-01-5031",
  dateTime: "03-01-2024 13:00",
  workCard: "https://via.placeholder.com/100x100/6366f1/ffffff?text=ID+CARD",
  status: "APPROVED",
  safetyOfficer: {
    name: "SAFETY DEPARTMENT OFFICER",
    designation: "SAFETY OFFICER",
    date: "03-01-2024",
  },
  remark: "Action has been taken and safety confirmed.",
  takeActionUpload: "https://via.placeholder.com/100x100/ef4444/ffffff?text=ACTION",
  followUp: [
    {
      time: "1 hour ago",
      message: "Issue has been solved and Safety Department Officer will now approve.",
      img: null
    },
    {
      time: "2 hours ago",
      message: "Action has been taken and can now confirm close issue.",
      img: "https://via.placeholder.com/200x100/16a34a/ffffff?text=EVIDENCE"
    }
  ],
  aiSuggestion: "Provide immediate safety training. Review safety protocols. Issue formal warning.",
  riskLevel: "HIGH",
  submittedBy: "Safety Inspector",
  submittedDate: "03-01-2024 12:30:00"
};

const ViewUA = () => {
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
    color: '#1f2937'
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
          UNSAFE ACTION REPORT [{report.reportNo}]
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
            {report.status === "APPROVED" && <CheckCircle size={14} />}
            {report.status === "NEED FEEDBACK" && <AlertTriangle size={14} />}
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
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <User size={16} color="#061978" />
            <span style={{fontSize: '14px', color: '#1f2937'}}>
              <strong style={{color: '#061978'}}>Submitted by:</strong> {report.submittedBy}
            </span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Calendar size={16} color="#061978" />
            <span style={{fontSize: '14px', color: '#1f2937'}}>
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

        {/* Offense Code */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={labelStyle}>
            <AlertTriangle size={16} color="#061978" />
            Offense Code:
          </label>
          <div style={{width: '100%', boxSizing: 'border-box'}}>
            <input
              type="text"
              value={report.offenseCode}
              disabled
              style={inputStyle}
            />
          </div>
        </div>

        {/* Report Description */}
        <div style={{...fieldStyle, width: '100%'}}>
          <label style={labelStyle}>
            <FileText size={16} color="#061978" />
            Report Description:
          </label>
          <div style={{width: '100%', boxSizing: 'border-box'}}>
            <textarea
              value={report.reportDescription}
              disabled
              style={{...textareaStyle, minHeight: '100px'}}
            />
          </div>
        </div>

        {/* AI Safety Suggestion */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
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
            AI Safety Recommendations:
          </div>
          <p style={{
            margin: 0,
            color: '#1f2937',
            lineHeight: '1.5'
          }}>
            {report.aiSuggestion}
          </p>
        </div>

        {/* Upload Action Pictures */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <Camera size={16} color="#061978" />
            Upload Action Pictures:
          </label>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '8px'
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
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: U-ACT */}
      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>
          <Zap size={20} />
          2. U-ACT
        </h2>

        {/* AI Generated Immediate Corrective Action */}
        <div style={{marginBottom: '24px'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#1f2937'
          }}>
            <Bot size={16} color="#061978" />
            AI Generated Immediate Corrective Action:
          </label>
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#14532d',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {report.immediateAction} - Provided safety training and reviewed protocols with violator
          </div>
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: '4px 0 0 0',
            fontStyle: 'italic'
          }}>
            ✨ This action was automatically generated based on the detected offense code
          </p>
        </div>

        {/* VIOLATOR Section */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            color: '#061978',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <User size={18} />
            VIOLATOR INFORMATION
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            width: '100%'
          }}>
            <div style={{...fieldStyle, width: '100%'}}>
              <label style={labelStyle}>
                <User size={16} color="#061978" />
                Violator Name:
              </label>
              <div style={{width: '100%', boxSizing: 'border-box'}}>
                <input
                  type="text"
                  value={report.violatorName}
                  disabled
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{...fieldStyle, width: '100%'}}>
              <label style={labelStyle}>
                <CreditCard size={16} color="#061978" />
                Staff ID:
              </label>
              <div style={{width: '100%', boxSizing: 'border-box'}}>
                <input
                  type="text"
                  value={report.staffId}
                  disabled
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{...fieldStyle, width: '100%'}}>
              <label style={labelStyle}>
                <CreditCard size={16} color="#061978" />
                IC/Passport:
              </label>
              <div style={{width: '100%', boxSizing: 'border-box'}}>
                <input
                  type="text"
                  value={report.icPassport}
                  disabled
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{...fieldStyle, width: '100%'}}>
              <label style={labelStyle}>
                <Calendar size={16} color="#061978" />
                Date & Time:
              </label>
              <div style={{width: '100%', boxSizing: 'border-box'}}>
                <input
                  type="text"
                  value={report.dateTime}
                  disabled
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Work Card */}
          <div style={{marginTop: '16px'}}>
            <label style={labelStyle}>
              <Building size={16} color="#061978" />
              Work Card:
            </label>
            <div style={{
              marginTop: '8px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #e2e8f0',
              display: 'inline-block'
            }}>
              <img 
                src={report.workCard} 
                alt="work card" 
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: FOLLOW-UP & STATUS */}
      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>
          <MessageSquare size={20} />
          3. FOLLOW-UP & STATUS
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
                <strong style={{color: '#061978'}}>Approved by:</strong> {report.safetyOfficer.name}
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
              value={report.remark}
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

        {/* Take Action Upload */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <Upload size={16} color="#061978" />
            Take Action Upload:
          </label>
          <div style={{
            marginTop: '8px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #e2e8f0',
            display: 'inline-block'
          }}>
            <img 
              src={report.takeActionUpload} 
              alt="action taken" 
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover'
              }}
            />
          </div>
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
                  color: '#1f2937',
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
                        maxWidth: '200px',
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

export default ViewUA;