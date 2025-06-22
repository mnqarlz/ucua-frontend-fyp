import React, { useState, useEffect } from 'react';

// PSSD Officer Dashboard component with advanced analytics
const PSSDOfficerDashboard = () => {
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: '30days',
    location: 'all'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUC: 23,
      totalUA: 18,
      pending: 12,
      approved: 21,
      rejected: 8,
      aiRecommendations: 15
    },
    reportTypes: [
      { name: 'Unsafe Condition', value: 23, color: '#dc2626' },
      { name: 'Unsafe Action', value: 18, color: '#ea580c' }
    ],
    statusDistribution: [
      { name: 'Approved', value: 21, color: '#16a34a' },
      { name: 'Pending', value: 12, color: '#eab308' },
      { name: 'Rejected', value: 8, color: '#dc2626' }
    ],
    riskLevels: [
      { name: 'Critical', value: 5, color: '#7f1d1d' },
      { name: 'High', value: 12, color: '#dc2626' },
      { name: 'Medium', value: 16, color: '#ea580c' },
      { name: 'Low', value: 8, color: '#16a34a' }
    ],
    aiRecommendations: [
      { name: 'Immediate Action Required', value: 5, color: '#7f1d1d' },
      { name: 'Schedule Maintenance', value: 7, color: '#dc2626' },
      { name: 'Training Needed', value: 8, color: '#ea580c' },
      { name: 'Monitor Situation', value: 6, color: '#eab308' }
    ],
    locationData: [
      { name: 'Factory Floor', value: 18 },
      { name: 'Warehouse', value: 12 },
      { name: 'Loading Dock', value: 7 },
      { name: 'Office', value: 4 }
    ],
    trends: [
      { name: 'Week 1', UC: 4, UA: 3, total: 7, riskScore: 6.2 },
      { name: 'Week 2', UC: 6, UA: 5, total: 11, riskScore: 7.1 },
      { name: 'Week 3', UC: 3, UA: 4, total: 7, riskScore: 5.8 },
      { name: 'Week 4', UC: 10, UA: 6, total: 16, riskScore: 8.3 }
    ]
  });

  // Handle filter changes and update dashboard data
  const handleFilterChange = (filterType, value) => {
    setLoading(true);
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Simulate API call and data filtering
    setTimeout(() => {
      try {
        const filteredData = filterDashboardData(newFilters);
        setDashboardData(filteredData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  // Reset all filters to default
  const resetFilters = () => {
    const defaultFilters = {
      reportType: 'all',
      dateRange: '30days',
      location: 'all'
    };
    setFilters(defaultFilters);
    setDashboardData(getDefaultData());
  };

  // Filter dashboard data based on current filters
  const filterDashboardData = (currentFilters) => {
    const baseData = getDefaultData();
    
    // Apply report type filter
    if (currentFilters.reportType === 'uc') {
      baseData.reportTypes = [{ name: 'Unsafe Condition', value: 23, color: '#dc2626' }];
      baseData.stats.totalUA = 0;
    } else if (currentFilters.reportType === 'ua') {
      baseData.reportTypes = [{ name: 'Unsafe Action', value: 18, color: '#ea580c' }];
      baseData.stats.totalUC = 0;
    }

    // Apply location filter
    if (currentFilters.location !== 'all') {
      const locationMap = {
        'factory': 'Factory Floor',
        'warehouse': 'Warehouse',
        'office': 'Office',
        'loading': 'Loading Dock'
      };
      const selectedLocation = locationMap[currentFilters.location];
      baseData.locationData = baseData.locationData.filter(item => 
        item.name === selectedLocation
      );
      if (baseData.locationData.length === 0) {
        baseData.locationData = [{ name: 'No Data', value: 0 }];
      }
    }

    // Apply date range filter
    if (currentFilters.dateRange === '7days') {
      baseData.trends = [
        { name: 'Day 1', UC: 2, UA: 1, total: 3, riskScore: 5.5 },
        { name: 'Day 2', UC: 3, UA: 2, total: 5, riskScore: 6.2 },
        { name: 'Day 3', UC: 1, UA: 3, total: 4, riskScore: 4.8 },
        { name: 'Day 4', UC: 4, UA: 2, total: 6, riskScore: 7.1 }
      ];
    } else if (currentFilters.dateRange === '3months') {
      baseData.trends = [
        { name: 'Month 1', UC: 25, UA: 18, total: 43, riskScore: 6.8 },
        { name: 'Month 2', UC: 20, UA: 15, total: 35, riskScore: 6.2 },
        { name: 'Month 3', UC: 28, UA: 22, total: 50, riskScore: 7.5 }
      ];
    }

    return baseData;
  };

  // Get default data
  const getDefaultData = () => ({
    stats: {
      totalUC: 23,
      totalUA: 18,
      pending: 12,
      approved: 21,
      rejected: 8,
      aiRecommendations: 15
    },
    reportTypes: [
      { name: 'Unsafe Condition', value: 23, color: '#dc2626' },
      { name: 'Unsafe Action', value: 18, color: '#ea580c' }
    ],
    statusDistribution: [
      { name: 'Approved', value: 21, color: '#16a34a' },
      { name: 'Pending', value: 12, color: '#eab308' },
      { name: 'Rejected', value: 8, color: '#dc2626' }
    ],
    riskLevels: [
      { name: 'Critical', value: 5, color: '#7f1d1d' },
      { name: 'High', value: 12, color: '#dc2626' },
      { name: 'Medium', value: 16, color: '#ea580c' },
      { name: 'Low', value: 8, color: '#16a34a' }
    ],
    aiRecommendations: [
      { name: 'Immediate Action Required', value: 5, color: '#7f1d1d' },
      { name: 'Schedule Maintenance', value: 7, color: '#dc2626' },
      { name: 'Training Needed', value: 8, color: '#ea580c' },
      { name: 'Monitor Situation', value: 6, color: '#eab308' }
    ],
    locationData: [
      { name: 'Factory Floor', value: 18 },
      { name: 'Warehouse', value: 12 },
      { name: 'Loading Dock', value: 7 },
      { name: 'Office', value: 4 }
    ],
    trends: [
      { name: 'Week 1', UC: 4, UA: 3, total: 7, riskScore: 6.2 },
      { name: 'Week 2', UC: 6, UA: 5, total: 11, riskScore: 7.1 },
      { name: 'Week 3', UC: 3, UA: 4, total: 7, riskScore: 5.8 },
      { name: 'Week 4', UC: 10, UA: 6, total: 16, riskScore: 8.3 }
    ]
  });

  // Get active filters for display
  const getActiveFilters = () => {
    const activeFilters = [];
    if (filters.reportType !== 'all') {
      activeFilters.push(filters.reportType === 'uc' ? 'Unsafe Conditions' : 'Unsafe Actions');
    }
    if (filters.dateRange !== '30days') {
      const dateLabels = {
        '7days': 'Last 7 days',
        '3months': 'Last 3 months',
        '6months': 'Last 6 months'
      };
      activeFilters.push(dateLabels[filters.dateRange] || filters.dateRange);
    }
    if (filters.location !== 'all') {
      const locationLabels = {
        'factory': 'Factory Floor',
        'warehouse': 'Warehouse',
        'office': 'Office',
        'loading': 'Loading Dock'
      };
      activeFilters.push(locationLabels[filters.location] || filters.location);
    }
    return activeFilters;
  };

  // Calculate risk assessment metrics
  const calculateRiskMetrics = () => {
    const totalReports = dashboardData.stats.totalUC + dashboardData.stats.totalUA;
    const criticalAndHigh = dashboardData.riskLevels
      .filter(level => level.name === 'Critical' || level.name === 'High')
      .reduce((sum, level) => sum + level.value, 0);
    
    const riskPercentage = totalReports > 0 ? Math.round((criticalAndHigh / totalReports) * 100) : 0;
    const avgRiskScore = dashboardData.trends.length > 0 
      ? (dashboardData.trends.reduce((sum, week) => sum + week.riskScore, 0) / dashboardData.trends.length).toFixed(1)
      : '0.0';
    
    return { riskPercentage, avgRiskScore, criticalAndHigh };
  };

  // Error handling component
  if (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#dc2626' }}>
            <span style={{ marginRight: '12px', fontSize: '20px' }}>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setError(null);
            setDashboardData(getDefaultData());
          }}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const riskMetrics = calculateRiskMetrics();

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '8px' 
        }}>
          Welcome PSSD Officer!
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0
        }}>
          Monitor incident trends, assess workplace risks, and make data-informed safety decisions
        </p>
      </div>

      {/* Filter Controls */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '16px' 
        }}>
          Filter Dashboard Data
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          alignItems: 'end'
        }}>
          <div>
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
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Reports</option>
              <option value="uc">Unsafe Condition (UC)</option>
              <option value="ua">Unsafe Action (UA)</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Locations</option>
              <option value="factory">Factory Floor</option>
              <option value="warehouse">Warehouse</option>
              <option value="office">Office</option>
              <option value="loading">Loading Dock</option>
            </select>
          </div>

          <div>
            <button
              onClick={resetFilters}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              🔄 Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilters().length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '8px' }}>
              Active filters:
            </span>
            {getActiveFilters().map((filter, index) => (
              <span key={index} style={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {filter}
              </span>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            Loading dashboard data...
          </div>
        )}
      </div>

      {/* Risk Assessment Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
        borderRadius: '12px',
        padding: '24px',
        color: 'white',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          🎯 Risk Assessment Overview
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          <RiskCard 
            value={`${riskMetrics.riskPercentage}%`}
            label="High/Critical Risk Reports"
            subtitle={`${riskMetrics.criticalAndHigh} out of ${dashboardData.stats.totalUC + dashboardData.stats.totalUA} reports`}
          />
          <RiskCard 
            value={riskMetrics.avgRiskScore}
            label="Average Risk Score"
            subtitle="Based on recent trends"
          />
          <RiskCard 
            value={dashboardData.stats.aiRecommendations}
            label="AI Recommendations"
            subtitle="Pending safety actions"
          />
          <RiskCard 
            value={dashboardData.stats.pending}
            label="Pending Reviews"
            subtitle="Require officer attention"
          />
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <StatCard 
          title="Total UC Reports" 
          value={dashboardData.stats.totalUC}
          subtitle="Unsafe Conditions"
          color="#dc2626"
          icon="⚠️"
        />
        <StatCard 
          title="Total UA Reports" 
          value={dashboardData.stats.totalUA}
          subtitle="Unsafe Actions"
          color="#ea580c"
          icon="👤"
        />
        <StatCard 
          title="Pending Review" 
          value={dashboardData.stats.pending}
          subtitle="Awaiting decision"
          color="#eab308"
          icon="⏳"
        />
        <StatCard 
          title="Approved Reports" 
          value={dashboardData.stats.approved}
          subtitle="Processed & approved"
          color="#16a34a"
          icon="✅"
        />
      </div>

      {/* Officer Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <ActionButton 
          title="Review Pending Reports"
          subtitle="Process awaiting decisions"
          color="#eab308"
          icon="📋"
          onClick={() => console.log('Navigate to pending reports')}
        />
        <ActionButton 
          title="Risk Assessment Tool"
          subtitle="Analyze safety risks"
          color="#7c3aed"
          icon="🎯"
          onClick={() => console.log('Navigate to risk assessment')}
        />
        <ActionButton 
          title="AI Recommendations"
          subtitle="View safety suggestions"
          color="#059669"
          icon="🤖"
          onClick={() => console.log('Navigate to AI recommendations')}
        />
        <ActionButton 
          title="Generate Reports"
          subtitle="Create safety reports"
          color="#dc2626"
          icon="📊"
          onClick={() => console.log('Navigate to report generator')}
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Report Type Distribution */}
        <ChartCard title="Report Type Distribution">
          <EnhancedBarChart data={dashboardData.reportTypes} />
        </ChartCard>

        {/* Risk Level Distribution */}
        <ChartCard title="Predicted Risk Level Distribution">
          <EnhancedBarChart data={dashboardData.riskLevels} />
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Report Status Breakdown">
          <EnhancedBarChart data={dashboardData.statusDistribution} />
        </ChartCard>

        {/* AI Recommendations */}
        <ChartCard title="AI-Recommended Safety Actions">
          <EnhancedBarChart data={dashboardData.aiRecommendations} />
        </ChartCard>
      </div>

      {/* Trends Chart with Risk Score */}
      <ChartCard title="Weekly Trends & Risk Assessment">
        <AdvancedTrendsChart data={dashboardData.trends} />
      </ChartCard>
    </div>
  );
};

// Enhanced Components for PSSD Officer
const StatCard = ({ title, value, subtitle, color, icon }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    borderLeft: `4px solid ${color}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <div style={{
        backgroundColor: color,
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '16px',
        fontSize: '20px'
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</div>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>{subtitle}</div>
      </div>
    </div>
    <div style={{ fontSize: '16px', fontWeight: '600' }}>{title}</div>
  </div>
);

const ActionButton = ({ title, subtitle, color, icon, onClick }) => (
  <div style={{
    backgroundColor: color,
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}
  onClick={onClick}
  onMouseEnter={(e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 8px 15px -3px rgba(0, 0, 0, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  }}
  >
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</div>
    <div style={{ fontSize: '14px', opacity: 0.9 }}>{subtitle}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
      {title}
    </h3>
    {children}
  </div>
);

const RiskCard = ({ value, label, subtitle }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{value}</div>
    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>{subtitle}</div>
  </div>
);

const EnhancedBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div style={{ height: '260px', overflow: 'hidden' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        marginBottom: '12px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {data.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              minHeight: '32px'
            }}>
              <div style={{ 
                minWidth: '90px', 
                maxWidth: '90px',
                fontSize: '12px', 
                color: '#374151',
                fontWeight: '500',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.name}
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#e5e7eb', 
                borderRadius: '4px', 
                height: '20px',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '60px'
              }}>
                <div style={{
                  backgroundColor: item.color || '#3b82f6',
                  height: '100%',
                  borderRadius: '4px',
                  width: `${maxValue > 0 ? Math.min((item.value / maxValue) * 100, 100) : 0}%`,
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: item.value > 0 && (item.value / maxValue) * 100 > 25 ? 'center' : 'flex-end',
                  paddingRight: item.value > 0 && (item.value / maxValue) * 100 <= 25 ? '4px' : '0',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {item.value > 0 && `${item.value}`}
                </div>
              </div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                minWidth: '55px',
                maxWidth: '55px',
                color: '#1f2937',
                textAlign: 'right',
                overflow: 'hidden'
              }}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Compact Summary */}
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '8px',
        borderRadius: '4px',
        borderTop: '2px solid #6366f1'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center'
        }}>
          Total: {total} • Top: {data.reduce((max, item) => item.value > max.value ? item : max, data[0] || {name: 'N/A', value: 0}).name}
        </div>
      </div>
    </div>
  );
const EnhancedBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div style={{ height: '260px', overflow: 'hidden' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        marginBottom: '12px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {data.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '6px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              minHeight: '32px'
            }}>
              <div style={{ 
                minWidth: '90px', 
                maxWidth: '90px',
                fontSize: '12px', 
                color: '#374151',
                fontWeight: '500',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.name}
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#e5e7eb', 
                borderRadius: '4px', 
                height: '20px',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '60px'
              }}>
                <div style={{
                  backgroundColor: item.color || '#3b82f6',
                  height: '100%',
                  borderRadius: '4px',
                  width: `${maxValue > 0 ? Math.min((item.value / maxValue) * 100, 100) : 0}%`,
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: item.value > 0 && (item.value / maxValue) * 100 > 25 ? 'center' : 'flex-end',
                  paddingRight: item.value > 0 && (item.value / maxValue) * 100 <= 25 ? '4px' : '0',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {item.value > 0 && `${item.value}`}
                </div>
              </div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                minWidth: '55px',
                maxWidth: '55px',
                color: '#1f2937',
                textAlign: 'right',
                overflow: 'hidden'
              }}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Compact Summary */}
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '8px',
        borderRadius: '4px',
        borderTop: '2px solid #6366f1'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center'
        }}>
          Total: {total} • Top: {data.reduce((max, item) => item.value > max.value ? item : max, data[0] || {name: 'N/A', value: 0}).name}
        </div>
      </div>
    </div>
  );
};
};

const AdvancedTrendsChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.UC, item.UA, item.total)));
  const maxRisk = Math.max(...data.map(item => item.riskScore));
  const chartHeight = 200;
  const barHeight = chartHeight - 60;
  
  return (
    <div style={{ height: 'auto', padding: '16px', overflow: 'hidden' }}>
      {/* Chart Container */}
      <div style={{ 
        height: `${chartHeight}px`, 
        position: 'relative',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {/* Y-axis labels for reports (left) */}
        <div style={{
          position: 'absolute',
          left: '8px',
          top: '12px',
          height: `${barHeight}px`,
          width: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#6b7280',
          fontWeight: '500'
        }}>
          <div>{maxValue}</div>
          <div>{Math.round(maxValue * 0.5)}</div>
          <div>0</div>
        </div>

        {/* Y-axis labels for risk score (right) */}
        <div style={{
          position: 'absolute',
          right: '8px',
          top: '12px',
          height: `${barHeight}px`,
          width: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#7c3aed',
          fontWeight: '600',
          textAlign: 'right'
        }}>
          <div>{maxRisk.toFixed(1)}</div>
          <div>{(maxRisk * 0.5).toFixed(1)}</div>
          <div>0.0</div>
        </div>

        {/* Chart area with proper margins */}
        <div style={{ 
          marginLeft: '45px',
          marginRight: '45px',
          height: `${barHeight}px`,
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'end',
          borderBottom: '2px solid #d1d5db',
          borderLeft: '2px solid #d1d5db',
          position: 'relative',
          paddingTop: '10px'
        }}>
          {/* Risk score line - properly contained */}
          <svg style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible'
          }}>
            <polyline
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeDasharray="3,3"
              points={data.map((item, index) => {
                const x = (index + 0.5) * (100 / data.length);
                const y = 100 - (item.riskScore / maxRisk) * 90; // Leave 10% margin
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            {data.map((item, index) => {
              const x = (index + 0.5) * (100 / data.length);
              const y = 100 - (item.riskScore / maxRisk) * 90;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill="#7c3aed"
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {data.map((item, index) => {
            const ucHeight = maxValue > 0 ? (item.UC / maxValue) * (barHeight - 40) : 0;
            const uaHeight = maxValue > 0 ? (item.UA / maxValue) * (barHeight - 40) : 0;
            const totalHeight = maxValue > 0 ? (item.total / maxValue) * (barHeight - 40) : 0;
            
            return (
              <div key={index} style={{ 
                textAlign: 'center', 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '80px'
              }}>
                {/* Bars container with fixed height */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'end', 
                  gap: '2px',
                  height: `${barHeight - 40}px`,
                  marginBottom: '8px'
                }}>
                  {/* UC Bar */}
                  <div style={{
                    backgroundColor: '#dc2626',
                    width: '14px',
                    height: `${Math.max(ucHeight, 2)}px`,
                    borderRadius: '2px 2px 0 0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    {item.UC > 0 && ucHeight > 12 ? item.UC : ''}
                  </div>

                  {/* UA Bar */}
                  <div style={{
                    backgroundColor: '#ea580c',
                    width: '14px',
                    height: `${Math.max(uaHeight, 2)}px`,
                    borderRadius: '2px 2px 0 0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    {item.UA > 0 && uaHeight > 12 ? item.UA : ''}
                  </div>

                  {/* Total Bar */}
                  <div style={{
                    backgroundColor: '#3b82f6',
                    width: '14px',
                    height: `${Math.max(totalHeight, 2)}px`,
                    borderRadius: '2px 2px 0 0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    {item.total > 0 && totalHeight > 12 ? item.total : ''}
                  </div>
                </div>

                {/* X-axis labels - properly contained */}
                <div style={{ 
                  fontSize: '10px', 
                  color: '#374151',
                  fontWeight: '500',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  maxWidth: '70px'
                }}>
                  <div style={{ marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ color: '#7c3aed', fontSize: '9px' }}>
                    Risk: {item.riskScore}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compact Legend */}
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px', 
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f3f4f6',
        borderRadius: '6px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#dc2626', 
            borderRadius: '2px'
          }} />
          <span style={{ fontWeight: '600', color: '#374151' }}>
            UC ({data.reduce((sum, item) => sum + item.UC, 0)})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#ea580c', 
            borderRadius: '2px'
          }} />
          <span style={{ fontWeight: '600', color: '#374151' }}>
            UA ({data.reduce((sum, item) => sum + item.UA, 0)})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '2px'
          }} />
          <span style={{ fontWeight: '600', color: '#374151' }}>
            Total ({data.reduce((sum, item) => sum + item.total, 0)})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '2px', 
            backgroundColor: '#7c3aed', 
            borderRadius: '1px'
          }} />
          <span style={{ fontWeight: '600', color: '#7c3aed' }}>
            Risk Score (Avg: {(data.reduce((sum, item) => sum + item.riskScore, 0) / data.length).toFixed(1)})
          </span>
        </div>
      </div>

      {/* Compact Analytics */}
      <div style={{
        marginTop: '12px',
        padding: '12px',
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #bfdbfe'
      }}>
        <div style={{ fontSize: '12px', color: '#1e40af', textAlign: 'center', fontWeight: '600' }}>
          <div style={{ marginBottom: '6px' }}>
            📊 <strong>Latest:</strong> {data[data.length - 1].total} reports (Risk: {data[data.length - 1].riskScore})
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '11px' }}>
            <span>Peak: {data.reduce((max, item) => item.total > max.total ? item : max).name}</span>
            <span>Max Risk: {Math.max(...data.map(item => item.riskScore))}</span>
            <span>Trend: {data[data.length - 1].total > data[0].total ? '📈' : '📉'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSSDOfficerDashboard;