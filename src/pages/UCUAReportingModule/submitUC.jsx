import React, { useState, useEffect } from "react";
import { 
  FileText, 
  ChevronDown,
  MapPin,
  Camera,
  Upload,
  RotateCcw,
  Send,
  AlertTriangle,
  CheckCircle,
  Bot,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";

// Enhanced AI keyword detection list for UC reports
const unsafeKeywords = [
  "slippery", "wet", "broken", "cracked", "leaking", "blocked",
  "dark", "hazard", "smoke", "fire", "loose", "damaged", "unsafe",
  "spill", "obstruction", "faulty", "exposed", "missing", "sharp",
  "overheating", "corroded", "unstable", "debris", "flickering",
  "malfunctioning", "contaminated", "rusted", "torn", "collapsed"
];

// AI risk level prediction based on keywords
const riskKeywords = {
  high: ["fire", "smoke", "exposed", "collapsed", "overheating", "contaminated"],
  medium: ["broken", "cracked", "leaking", "faulty", "unstable", "damaged"],
  low: ["dark", "loose", "debris", "flickering", "torn", "rusted"]
};

const SubmitUC = () => {
  const [form, setForm] = useState({
    location: "",
    details: "",
    picture: null
  });

  const [taggedKeywords, setTaggedKeywords] = useState([]);
  const [aiRiskLevel, setAiRiskLevel] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [aiProcessing, setAiProcessing] = useState(false);
  const [ucuaFormOpen, setUcuaFormOpen] = useState(true);

  // AI analysis effect
  useEffect(() => {
    if (form.details.trim().length > 0) {
      setAiProcessing(true);
      const aiTimeout = setTimeout(() => {
        const detected = unsafeKeywords.filter(keyword =>
          form.details.toLowerCase().includes(keyword)
        );
        setTaggedKeywords(detected);

        let riskLevel = "low";
        let riskScore = 0;

        detected.forEach(keyword => {
          if (riskKeywords.high.includes(keyword)) {
            riskScore += 3;
          } else if (riskKeywords.medium.includes(keyword)) {
            riskScore += 2;
          } else if (riskKeywords.low.includes(keyword)) {
            riskScore += 1;
          }
        });

        if (riskScore >= 6) riskLevel = "high";
        else if (riskScore >= 3) riskLevel = "medium";

        setAiRiskLevel(riskLevel);

        const suggestions = [];
        if (detected.includes("slippery") || detected.includes("wet")) {
          suggestions.push("Place wet floor warning signs immediately");
          suggestions.push("Contact maintenance to dry the area");
        }
        if (detected.includes("broken") || detected.includes("damaged")) {
          suggestions.push("Cordon off the area to prevent access");
          suggestions.push("Report to maintenance for immediate repair");
        }
        if (detected.includes("fire") || detected.includes("smoke")) {
          suggestions.push("Evacuate the area immediately");
          suggestions.push("Contact emergency services");
        }
        if (detected.includes("exposed") || detected.includes("sharp")) {
          suggestions.push("Install protective barriers");
          suggestions.push("Provide safety equipment to workers");
        }

        setAiSuggestions(suggestions);
        setAiProcessing(false);
      }, 1500);

      return () => clearTimeout(aiTimeout);
    } else {
      setTaggedKeywords([]);
      setAiRiskLevel(null);
      setAiSuggestions([]);
    }
  }, [form.details]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
    
    if (name === "picture") {
      setForm(prev => ({ ...prev, picture: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!form.location.trim()) {
      errors.location = true;
    }
    if (!form.details.trim()) {
      errors.details = true;
    }
    if (!form.picture) {
      errors.picture = true;
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setForm({ location: "", details: "", picture: null });
    setTaggedKeywords([]);
    setAiRiskLevel(null);
    setAiSuggestions([]);
    setFieldErrors({});
    setErrorMessage("");
    setShowCancelDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage("Please fill in all mandatory fields");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = new FormData();
      data.append("location", form.location);
      data.append("details", form.details);
      data.append("picture", form.picture);
      data.append("tags", JSON.stringify(taggedKeywords));
      data.append("riskLevel", aiRiskLevel || "low");
      data.append("aiSuggestions", JSON.stringify(aiSuggestions));
      data.append("status", "Pending");

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (Math.random() < 0.1) {
        throw new Error("Network error occurred");
      }

      console.log("UC Report Submitted Successfully:", {
        ...form,
        tags: taggedKeywords,
        riskLevel: aiRiskLevel,
        suggestions: aiSuggestions,
        status: "Pending",
        submittedAt: new Date().toISOString()
      });

      setSuccessMessage(true);
      
      setTimeout(() => {
        setForm({ location: "", details: "", picture: null });
        setTaggedKeywords([]);
        setAiRiskLevel(null);
        setAiSuggestions([]);
        setFieldErrors({});
        setSuccessMessage(false);
      }, 3000);
      
    } catch (error) {
      setErrorMessage("Form failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case "high": return "#dc2626";
      case "medium": return "#d97706"; 
      case "low": return "#16a34a";
      default: return "#6b7280";
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Poppins, sans-serif',
      padding: '32px'
    }}>
          {/* Form Header */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '24px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #061978 0%, #4338ca 100%)',
            color: 'white'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '600',
              letterSpacing: '2px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              UNSAFE CONDITION FORM
            </h1>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#dc2626'
            }}>
              <AlertTriangle size={20} />
              <strong>Error:</strong> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#16a34a'
            }}>
              <CheckCircle size={20} />
              <strong>Success:</strong> UC Report Submitted Successfully! Status: Pending Review
            </div>
          )}

          {/* Main Form Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#061978',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <FileText size={20} />
              1. U-SEE
            </div>

            {/* Location Field */}
            <div style={{marginBottom: '24px'}}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <MapPin size={16} color="#061978" />
                Location: <span style={{color: '#dc2626'}}>*</span>
              </label>
              <div style={{position: 'relative'}}>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: fieldErrors.location ? '2px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    appearance: 'none',
                    fontFamily: 'Poppins, sans-serif',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Choose Location</option>
                  <option value="Factory Floor">Factory Floor</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Loading Dock">Loading Dock</option>
                  <option value="Container Yard">Container Yard</option>
                  <option value="Office Building">Office Building</option>
                  <option value="Equipment Storage">Equipment Storage</option>
                  <option value="Maintenance Area">Maintenance Area</option>
                </select>
                <ChevronDown size={20} style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#061978',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>

            {/* Condition Details */}
            <div style={{marginBottom: '24px'}}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <FileText size={16} color="#061978" />
                Condition Details: <span style={{color: '#dc2626'}}>*</span>
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Describe the unsafe condition in detail..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px 16px',
                  border: fieldErrors.details ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: 'white',
                  color: '#1f2937',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* AI Processing */}
            {aiProcessing && form.details.length > 0 && (
              <div style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#061978',
                  marginBottom: '8px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  <Bot size={20} />
                  AI is analyzing your report...
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#e0e7ff',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    width: '100%',
                    animation: 'progress 1.5s infinite'
                  }}></div>
                </div>
              </div>
            )}

            {/* AI Keywords */}
            {taggedKeywords.length > 0 && !aiProcessing && (
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#061978',
                  marginBottom: '12px',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  <Zap size={20} />
                  AI Auto-Detected Unsafe Keywords:
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                  {taggedKeywords.map((tag, index) => (
                    <span key={index} style={{
                      backgroundColor: '#dbeafe',
                      color: '#061978',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'Poppins, sans-serif'
                    }}>
                      <AlertTriangle size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Risk Level */}
            {aiRiskLevel && !aiProcessing && (
              <div style={{
                backgroundColor: aiRiskLevel === 'high' ? '#fef2f2' : aiRiskLevel === 'medium' ? '#fffbeb' : '#f0fdf4',
                border: `1px solid ${aiRiskLevel === 'high' ? '#fecaca' : aiRiskLevel === 'medium' ? '#fed7aa' : '#bbf7d0'}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: getRiskColor(aiRiskLevel),
                  fontWeight: '600'
                }}>
                  <Target size={20} />
                  AI Predicted Risk Level: {aiRiskLevel.toUpperCase()}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && !aiProcessing && (
              <div style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#061978',
                  marginBottom: '12px',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  <Lightbulb size={20} />
                  AI Recommended Safety Actions:
                </div>
                <ul style={{margin: '0', paddingLeft: '20px', color: '#1f2937', fontFamily: 'Poppins, sans-serif'}}>
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} style={{marginBottom: '6px'}}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Section */}
            <div style={{marginBottom: '32px'}}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#1f2937',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <Camera size={16} color="#061978" />
                Upload Condition Picture: <span style={{color: '#dc2626'}}>*</span>
              </label>
              
              <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px'}}>
                <label style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: '#061978',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  <Upload size={16} />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    name="picture"
                    onChange={handleChange}
                    style={{display: 'none'}}
                  />
                </label>
                <span style={{fontSize: '14px', color: '#6b7280', fontFamily: 'Poppins, sans-serif'}}>
                  {form.picture ? form.picture.name : 'No file chosen'}
                </span>
              </div>

              {/* Preview Boxes */}
              <div style={{display: 'flex', gap: '16px'}}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{
                    width: '120px',
                    height: '80px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    border: '2px dashed #d1d5db'
                  }}></div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center'
            }}>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.5 : 1,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <RotateCcw size={16} />
                Reset
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#061978',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.8 : 1,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <Send size={16} />
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
        </div>
      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#dc2626'
            }}>
              <AlertTriangle size={20} />
              Cancel Report Submission
            </h3>
            <p style={{margin: '0 0 24px 0', color: '#6b7280', fontFamily: 'Poppins, sans-serif'}}>
              Do you want to cancel? All entered information will be lost.
            </p>
            <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => setShowCancelDialog(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#061978',
                  border: '2px solid #061978',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Continue Editing
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #061978 !important;
          box-shadow: 0 0 0 3px rgba(6, 25, 120, 0.1);
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default SubmitUC;