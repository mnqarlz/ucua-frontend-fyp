import React, { useState } from 'react';
import { Search, Filter, Download, FileText, AlertCircle, CheckCircle, RefreshCw, Calendar, MapPin } from 'lucide-react';

const UCUASafetyReports = () => {
  const [filters, setFilters] = useState({
    reportType: '',
    dateStart: '',
    dateEnd: '',
    location: ''
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [selectedReports, setSelectedReports] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Mock data for existing reports
  const existingReports = [
    { id: 1, type: 'UC', date: '2025-06-15', location: 'Building A', riskLevel: 'High', status: 'Completed' },
    { id: 2, type: 'UA', date: '2025-06-10', location: 'Building B', riskLevel: 'Medium', status: 'Completed' },
    { id: 3, type: 'UC', date: '2025-06-05', location: 'Building C', riskLevel: 'Low', status: 'Completed' },
    { id: 4, type: 'UA', date: '2025-05-28', location: 'Building A', riskLevel: 'High', status: 'Completed' },
    { id: 5, type: 'UC', date: '2025-05-20', location: 'Building B', riskLevel: 'Medium', status: 'Completed' },
  ];

  const templates = [
    { id: 1, name: 'Monthly Safety Review', filters: { reportType: 'UC', location: 'All' } },
    { id: 2, name: 'High-Risk Incidents', filters: { reportType: 'Both', location: 'Building A' } },
    { id: 3, name: 'Quarterly Summary', filters: { reportType: 'Both', location: 'All' } }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId));
    if (template) {
      setSelectedTemplate(templateId);
      setFilters({
        reportType: template.filters.reportType,
        dateStart: '',
        dateEnd: '',
        location: template.filters.location
      });
    } else {
      setSelectedTemplate('');
    }
  };

  const resetFilters = () => {
    setFilters({
      reportType: '',
      dateStart: '',
      dateEnd: '',
      location: ''
    });
    setSelectedTemplate('');
    setErrorMessage('');
    setSuccessMessage('');
    setShowResults(false);
  };

  const generateReport = async () => {
    setIsGenerating(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Simulate API call
    setTimeout(() => {
      // Check if filters would return data
      const hasData = getFilteredReports().length > 0;

      if (!hasData) {
        setErrorMessage('No report data found for the selected period/location.');
        setShowResults(false);
      } else {
        setSuccessMessage('Report generated successfully!');
        setShowResults(true);
      }
      
      setIsGenerating(false);
    }, 1500);
  };

  const exportReport = async () => {
    if (!exportFormat) {
      setErrorMessage('Please select export format.');
      return;
    }

    if (selectedReports.length === 0) {
      setErrorMessage('Please select at least one report to export.');
      return;
    }

    setIsExporting(true);
    setErrorMessage('');

    // Simulate export process
    setTimeout(() => {
      setSuccessMessage(`Report exported successfully as ${exportFormat.toUpperCase()}!`);
      setIsExporting(false);
      // In real implementation, this would trigger file download
    }, 1500);
  };

  const toggleReportSelection = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const toggleSelectAll = () => {
    const filteredReports = getFilteredReports();
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(r => r.id));
    }
  };

  const getFilteredReports = () => {
    return existingReports.filter(report => {
      const matchesType = !filters.reportType || filters.reportType === 'Both' || report.type === filters.reportType;
      const matchesLocation = !filters.location || filters.location === 'All' || report.location === filters.location;
      
      let matchesDate = true;
      if (filters.dateStart && filters.dateEnd) {
        const reportDate = new Date(report.date);
        const startDate = new Date(filters.dateStart);
        const endDate = new Date(filters.dateEnd);
        matchesDate = reportDate >= startDate && reportDate <= endDate;
      }
      
      return matchesType && matchesLocation && matchesDate;
    });
  };

  const filteredReports = getFilteredReports();

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#1a202c',
              margin: '0 0 8px 0'
            }}>
              Generate Safety Reports
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: '#718096',
              margin: 0
            }}>
              Generate and export compiled UC and UA safety reports
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#eff6ff',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <FileText size={20} style={{ color: '#061978' }} />
            <span style={{ 
              marginLeft: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#061978' 
            }}>
              UCUA Admin
            </span>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <AlertCircle style={{ color: '#dc2626', marginRight: '12px' }} size={20} />
          <span style={{ color: '#7f1d1d' }}>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <CheckCircle style={{ color: '#059669', marginRight: '12px' }} size={20} />
          <span style={{ color: '#065f46' }}>{successMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Filter Panel */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Filter size={24} style={{ color: '#061978' }} />
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1a202c',
                margin: '0 0 0 12px'
              }}>
                Report Filters
              </h2>
            </div>

            {/* Template Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Pre-defined Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#374151',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select a template...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>

            {/* Report Type */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Report Type
              </label>
              <select
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#374151',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Types</option>
                <option value="UC">UC Reports</option>
                <option value="UA">UA Reports</option>
                <option value="Both">Both UC & UA</option>
              </select>
            </div>

            {/* Date Range */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <Calendar size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Date Range
              </label>
              <div style={{ display: 'grid', gap: '10px' }}>
                <input
                  type="date"
                  value={filters.dateStart}
                  onChange={(e) => handleFilterChange('dateStart', e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    padding: '10px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    color: '#374151',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="date"
                  value={filters.dateEnd}
                  onChange={(e) => handleFilterChange('dateEnd', e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    padding: '10px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    color: '#374151',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Location */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#374151',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Locations</option>
                <option value="Building A">Building A</option>
                <option value="Building B">Building B</option>
                <option value="Building C">Building C</option>
                <option value="All">All Buildings</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gap: '10px' }}>
              <button
                onClick={generateReport}
                disabled={isGenerating}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '12px 16px',
                  backgroundColor: isGenerating ? '#9ca3af' : '#061978',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText size={16} style={{ marginRight: '8px' }} />
                    Generate Report
                  </>
                )}
              </button>

              <button
                onClick={resetFilters}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <RefreshCw size={16} style={{ marginRight: '8px' }} />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '24px' 
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1a202c',
                margin: 0
              }}>
                UCUA Safety Reports
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    color: '#374151',
                    maxWidth: '140px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Export Format</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>

                <button
                  onClick={exportReport}
                  disabled={isExporting || selectedReports.length === 0}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: (isExporting || selectedReports.length === 0) ? '#9ca3af' : '#061978',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (isExporting || selectedReports.length === 0) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {isExporting ? (
                    <>
                      <RefreshCw size={14} style={{ marginRight: '6px', animation: 'spin 1s linear infinite' }} />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download size={14} style={{ marginRight: '6px' }} />
                      Export Selected
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reports Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                        style={{ borderRadius: '4px' }}
                      />
                    </th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Report ID</th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Type</th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Date</th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Location</th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Risk Level</th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '16px 12px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} style={{ 
                      borderBottom: '1px solid #f3f4f6',
                      backgroundColor: selectedReports.includes(report.id) ? '#f8fafc' : 'white'
                    }}>
                      <td style={{ padding: '16px 12px' }}>
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => toggleReportSelection(report.id)}
                          style={{ borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ 
                        padding: '16px 12px',
                        fontWeight: '500',
                        color: '#1a202c'
                      }}>
                        #{String(report.id).padStart(4, '0')}
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: report.type === 'UC' ? '#dbeafe' : '#e0e7ff',
                          color: report.type === 'UC' ? '#1e40af' : '#5b21b6'
                        }}>
                          {report.type}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '16px 12px',
                        color: '#6b7280'
                      }}>
                        {report.date}
                      </td>
                      <td style={{ 
                        padding: '16px 12px',
                        color: '#6b7280'
                      }}>
                        {report.location}
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: 
                            report.riskLevel === 'High' ? '#fee2e2' :
                            report.riskLevel === 'Medium' ? '#fef3c7' : '#dcfce7',
                          color: 
                            report.riskLevel === 'High' ? '#dc2626' :
                            report.riskLevel === 'Medium' ? '#d97706' : '#16a34a'
                        }}>
                          {report.riskLevel}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: '#dcfce7',
                          color: '#16a34a'
                        }}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredReports.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  color: '#6b7280'
                }}>
                  <FileText size={48} style={{ 
                    margin: '0 auto 16px auto',
                    color: '#d1d5db'
                  }} />
                  <h3 style={{ 
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1a202c',
                    margin: '0 0 8px 0'
                  }}>
                    No Reports Found
                  </h3>
                  <p style={{ margin: 0 }}>
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>

            {filteredReports.length > 0 && (
              <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <span>Showing {filteredReports.length} of {existingReports.length} reports</span>
                <span>{selectedReports.length} selected for export</span>
              </div>
            )}
          </div>

          {/* Generated Report Summary */}
          {showResults && (
            <div style={{
              marginTop: '32px',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a202c',
                margin: '0 0 16px 0'
              }}>
                Report Summary
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '24px' 
              }}>
                <div style={{
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ 
                    fontWeight: '500',
                    color: '#1e40af',
                    margin: '0 0 8px 0'
                  }}>
                    Total Reports
                  </h4>
                  <p style={{ 
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#2563eb',
                    margin: 0
                  }}>
                    {filteredReports.length}
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#fef2f2',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ 
                    fontWeight: '500',
                    color: '#7f1d1d',
                    margin: '0 0 8px 0'
                  }}>
                    High Risk
                  </h4>
                  <p style={{ 
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#dc2626',
                    margin: 0
                  }}>
                    {filteredReports.filter(r => r.riskLevel === 'High').length}
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ 
                    fontWeight: '500',
                    color: '#14532d',
                    margin: '0 0 8px 0'
                  }}>
                    Completed
                  </h4>
                  <p style={{ 
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#16a34a',
                    margin: 0
                  }}>
                    {filteredReports.filter(r => r.status === 'Completed').length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          button:hover {
            opacity: 0.9;
          }
          
          tr:hover {
            background-color: #f9fafb !important;
          }
          
          select:focus, input:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default UCUASafetyReports;