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
  Lightbulb,
  User,
  CreditCard,
  Building
} from "lucide-react";

// AI offense code detection based on description keywords
const offenseCodes = [
  { 
    code: "PPE-001", 
    description: "Not wearing safety helmet",
    keywords: ["helmet", "hard hat", "head protection", "not wearing helmet"]
  },
  { 
    code: "PPE-002", 
    description: "Not wearing safety vest",
    keywords: ["vest", "high vis", "visibility", "reflective", "not wearing vest"]
  },
  { 
    code: "PPE-003", 
    description: "Not wearing safety shoes",
    keywords: ["shoes", "boots", "footwear", "steel toe", "not wearing shoes"]
  },
  { 
    code: "PPE-004", 
    description: "Not wearing safety gloves",
    keywords: ["gloves", "hand protection", "not wearing gloves"]
  },
  { 
    code: "BEH-001", 
    description: "Running in workplace",
    keywords: ["running", "rushing", "speeding", "fast walking"]
  },
  { 
    code: "BEH-002", 
    description: "Using mobile phone while operating machinery",
    keywords: ["mobile", "phone", "texting", "calling", "machinery", "equipment"]
  },
  { 
    code: "BEH-003", 
    description: "Smoking in restricted area",
    keywords: ["smoking", "cigarette", "vaping", "restricted", "no smoking"]
  },
  { 
    code: "BEH-004", 
    description: "Not following safety procedures",
    keywords: ["procedure", "protocol", "ignoring", "not following"]
  },
  { 
    code: "EQP-001", 
    description: "Improper use of equipment",
    keywords: ["improper", "wrong use", "misuse", "equipment", "tool"]
  },
  { 
    code: "EQP-002", 
    description: "Operating without authorization",
    keywords: ["unauthorized", "no permit", "without permission", "operating"]
  }
];

// Risk assessment keywords
const riskKeywords = {
  high: ["machinery", "equipment", "unauthorized", "smoking", "fire"],
  medium: ["running", "mobile", "improper", "not following"],
  low: ["helmet", "vest", "shoes", "gloves"]
};

const SubmitUA = () => {
  const [form, setForm] = useState({
    location: "",
    reportDescription: "",
    offenseCode: "",
    actionPicture: null,
    immediateAction: "",
    violatorName: "",
    staffId: "",
    icPassport: "",
    workCard: null
  });

  const [suggestedOffense, setSuggestedOffense] = useState(null);
  const [aiRiskLevel, setAiRiskLevel] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [aiProcessing, setAiProcessing] = useState(false);

  // AI Offense Code Suggestion (AF1: Suggest offence code)
  useEffect(() => {
    if (form.reportDescription.trim().length > 2) {
      setAiProcessing(true);
      
      const aiTimeout = setTimeout(() => {
        // Find matching offense code based on report description
        const suggestion = offenseCodes.find(offense => 
          offense.keywords.some(keyword => 
            form.reportDescription.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        
        if (suggestion) {
          setSuggestedOffense(suggestion);
          setForm(prev => ({ ...prev, offenseCode: suggestion.code }));
        } else {
          setSuggestedOffense(null);
        }

        // AI Risk Level Prediction
        let riskLevel = "low";
        let riskScore = 0;
        
        Object.entries(riskKeywords).forEach(([level, keywords]) => {
          keywords.forEach(keyword => {
            if (form.reportDescription.toLowerCase().includes(keyword.toLowerCase())) {
              if (level === 'high') riskScore += 3;
              else if (level === 'medium') riskScore += 2;
              else riskScore += 1;
            }
          });
        });

        if (riskScore >= 6) riskLevel = "high";
        else if (riskScore >= 3) riskLevel = "medium";
        
        setAiRiskLevel(riskLevel);

        // AI Safety Suggestions based on offense code
        const suggestions = [];
        let autoAction = "";
        
        if (suggestion) {
          // Auto-generate immediate corrective action based on offense code
          switch(suggestion.code) {
            case "PPE-001":
              autoAction = "Provided safety helmet to violator immediately and conducted briefing on head protection requirements";
              break;
            case "PPE-002":
              autoAction = "Ensured violator wears high-visibility vest and verified it meets safety standards";
              break;
            case "PPE-003":
              autoAction = "Provided appropriate safety footwear and explained steel toe requirements";
              break;
            case "PPE-004":
              autoAction = "Supplied safety gloves and demonstrated proper hand protection procedures";
              break;
            case "BEH-001":
              autoAction = "Stopped violator and reminded about walking speed limits in workplace";
              break;
            case "BEH-002":
              autoAction = "Confiscated mobile device and reviewed mobile phone policy with violator";
              break;
            case "BEH-003":
              autoAction = "Escorted violator to designated smoking area and issued formal fire safety warning";
              break;
            case "BEH-004":
              autoAction = "Halted activity and conducted immediate safety procedure training";
              break;
            case "EQP-001":
              autoAction = "Stopped equipment operation and provided proper usage training";
              break;
            case "EQP-002":
              autoAction = "Immediately stopped operation and verified authorization documentation";
              break;
            default:
              autoAction = "Applied appropriate corrective measures based on safety protocols";
          }
          
          setForm(prev => ({ ...prev, immediateAction: autoAction }));
        }

        if (form.reportDescription.toLowerCase().includes("helmet")) {
          suggestions.push("Provide safety helmet to violator immediately");
          suggestions.push("Conduct safety briefing on head protection");
        }
        if (form.reportDescription.toLowerCase().includes("vest")) {
          suggestions.push("Ensure violator wears high-visibility vest");
          suggestions.push("Check if vest meets safety standards");
        }
        if (form.reportDescription.toLowerCase().includes("running")) {
          suggestions.push("Remind violator about walking speed limits");
          suggestions.push("Review workplace safety protocols");
        }
        if (form.reportDescription.toLowerCase().includes("smoking")) {
          suggestions.push("Escort violator to designated smoking area");
          suggestions.push("Issue formal warning about fire safety");
        }
        if (form.reportDescription.toLowerCase().includes("equipment")) {
          suggestions.push("Stop equipment operation immediately");
          suggestions.push("Verify operator authorization and training");
        }
        if (form.reportDescription.toLowerCase().includes("phone") || form.reportDescription.toLowerCase().includes("mobile")) {
          suggestions.push("Confiscate mobile device during work hours");
          suggestions.push("Remind about mobile phone policy");
        }
        
        setAiSuggestions(suggestions);
        setAiProcessing(false);
      }, 1000);

      return () => clearTimeout(aiTimeout);
    } else {
      setSuggestedOffense(null);
      setAiRiskLevel(null);
      setAiSuggestions([]);
      setAiProcessing(false);
    }
  }, [form.reportDescription]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
    
    if (name === "actionPicture" || name === "workCard") {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!form.location.trim()) errors.location = true;
    if (!form.reportDescription.trim()) errors.reportDescription = true;
    if (!form.offenseCode.trim()) errors.offenseCode = true;
    if (!form.actionPicture) errors.actionPicture = true;
    if (!form.violatorName.trim()) errors.violatorName = true;
    if (!form.staffId.trim()) errors.staffId = true;
    if (!form.icPassport.trim()) errors.icPassport = true;
    if (!form.workCard) errors.workCard = true;
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setForm({
      location: "",
      reportDescription: "",
      offenseCode: "",
      actionPicture: null,
      immediateAction: "",
      violatorName: "",
      staffId: "",
      icPassport: "",
      workCard: null
    });
    setSuggestedOffense(null);
    setAiRiskLevel(null);
    setAiSuggestions([]);
    setFieldErrors({});
    setErrorMessage("");
    setShowCancelDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // EF2: Missing mandatory fields validation
    if (!validateForm()) {
      setErrorMessage("Please fill in all mandatory fields");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = new FormData();
      data.append("location", form.location);
      data.append("reportDescription", form.reportDescription);
      data.append("offenseCode", form.offenseCode);
      data.append("actionPicture", form.actionPicture);
      data.append("immediateAction", form.immediateAction);
      data.append("violatorName", form.violatorName);
      data.append("staffId", form.staffId);
      data.append("icPassport", form.icPassport);
      data.append("workCard", form.workCard);
      data.append("suggestedOffense", JSON.stringify(suggestedOffense));
      data.append("riskLevel", aiRiskLevel || "low");
      data.append("aiSuggestions", JSON.stringify(aiSuggestions));
      data.append("status", "Pending");

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // EF1: System Failure to Save Report (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Network error occurred");
      }

      console.log("UA Report Submitted Successfully:", {
        ...form,
        suggestedOffense,
        riskLevel: aiRiskLevel,
        suggestions: aiSuggestions,
        status: "Pending",
        submittedAt: new Date().toISOString()
      });

      // NF7: Confirmation message "UA Report Submitted" is shown
      setSuccessMessage(true);
      
      setTimeout(() => {
        confirmCancel(); // Reset form
        setSuccessMessage(false);
      }, 3000);
      
    } catch (error) {
      // EF1: System Failure to Save Report
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
          UNSAFE ACTION FORM
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
          <strong>Success:</strong> UA Report Submitted Successfully! Status: Pending Review
        </div>
      )}

      {/* Main Form Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Section 1: U-SEE */}
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

        {/* Report Description Field */}
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
            Report Description: <span style={{color: '#dc2626'}}>*</span>
          </label>
          <textarea
            name="reportDescription"
            value={form.reportDescription}
            onChange={handleChange}
            placeholder="Describe the unsafe action you observed..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px 16px',
              border: fieldErrors.reportDescription ? '2px solid #dc2626' : '1px solid #d1d5db',
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
        {aiProcessing && form.reportDescription.length > 0 && (
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
              color: '#0284c7',
              marginBottom: '8px'
            }}>
              <Bot size={20} />
              AI is analyzing offense code...
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

        {/* AI Suggested Offense Code */}
        {suggestedOffense && !aiProcessing && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
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
              AI Suggested Offense Code:
            </div>
            <div style={{
              backgroundColor: '#dbeafe',
              color: '#061978',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {suggestedOffense.code} - {suggestedOffense.description}
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
              color: '#0284c7',
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              <Lightbulb size={20} />
              AI Recommended Actions:
            </div>
            <ul style={{margin: '0', paddingLeft: '20px', color: '#374151'}}>
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} style={{marginBottom: '6px'}}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Offense Code Field */}
        <div style={{marginBottom: '24px'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#374151'
          }}>
            <AlertTriangle size={16} />
            Offense Code: <span style={{color: '#dc2626'}}>*</span>
          </label>
          <div style={{position: 'relative'}}>
            <select
              name="offenseCode"
              value={form.offenseCode}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: fieldErrors.offenseCode ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                color: '#374151',
                appearance: 'none'
              }}
            >
              <option value="">Choose Offense Code</option>
              {offenseCodes.map((offense) => (
                <option key={offense.code} value={offense.code}>
                  {offense.code} - {offense.description}
                </option>
              ))}
            </select>
            <ChevronDown size={20} style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Upload Action Picture */}
        <div style={{marginBottom: '32px'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#374151'
          }}>
            <Camera size={16} />
            Upload Action Picture: <span style={{color: '#dc2626'}}>*</span>
          </label>
          
          <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px'}}>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <Upload size={16} />
              Choose File
              <input
                type="file"
                accept="image/*"
                name="actionPicture"
                onChange={handleChange}
                style={{display: 'none'}}
              />
            </label>
            <span style={{fontSize: '14px', color: '#6b7280'}}>
              {form.actionPicture ? form.actionPicture.name : 'No file chosen'}
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

        {/* Section 2: U-ACT */}
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
          <Zap size={20} />
          2. U-ACT
        </div>

        {/* AI Auto-Generated Immediate Corrective Action */}
        {form.immediateAction && (
          <div style={{marginBottom: '24px'}}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              <Bot size={16} />
              AI Generated Immediate Corrective Action:
            </label>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#14532d'
            }}>
              {form.immediateAction}
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
        )}

        {/* VIOLATOR Section */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          fontWeight: '600',
          color: '#061978',
          fontFamily: 'Poppins, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <User size={20} />
          VIOLATOR
        </div>

        {/* Violator Name */}
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
            <User size={16} color="#061978" />
            Violator Name: <span style={{color: '#dc2626'}}>*</span>
          </label>
          <input
            type="text"
            name="violatorName"
            value={form.violatorName}
            onChange={handleChange}
            placeholder="Name"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: fieldErrors.violatorName ? '2px solid #dc2626' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Staff ID */}
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
            <CreditCard size={16} color="#061978" />
            Staff ID: <span style={{color: '#dc2626'}}>*</span>
          </label>
          <input
            type="text"
            name="staffId"
            value={form.staffId}
            onChange={handleChange}
            placeholder="Staff ID"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: fieldErrors.staffId ? '2px solid #dc2626' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* IC/Passport */}
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
            <CreditCard size={16} color="#061978" />
            IC/Passport: <span style={{color: '#dc2626'}}>*</span>
          </label>
          <input
            type="text"
            name="icPassport"
            value={form.icPassport}
            onChange={handleChange}
            placeholder="IC/Passport"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: fieldErrors.icPassport ? '2px solid #dc2626' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#1f2937',
              fontFamily: 'Poppins, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Work Card */}
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
            <Building size={16} color="#061978" />
            Work Card: <span style={{color: '#dc2626'}}>*</span>
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
                name="workCard"
                onChange={handleChange}
                style={{display: 'none'}}
              />
            </label>
            <span style={{fontSize: '14px', color: '#6b7280', fontFamily: 'Poppins, sans-serif'}}>
              {form.workCard ? form.workCard.name : 'No file chosen'}
            </span>
          </div>

          {/* Work Card Preview */}
          <div style={{
            width: '120px',
            height: '80px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            border: '2px dashed #d1d5db'
          }}></div>
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

      {/* Cancel Dialog (AF2: Cancel Operation) */}
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
            <p style={{margin: '0 0 24px 0', color: '#6b7280'}}>
              Do you want to cancel? All entered information will be lost.
            </p>
            <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => setShowCancelDialog(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  border: '2px solid #3b82f6',
                  borderRadius: '6px',
                  cursor: 'pointer'
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
                  cursor: 'pointer'
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
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

export default SubmitUA;