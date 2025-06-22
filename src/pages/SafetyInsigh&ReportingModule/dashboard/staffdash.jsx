import React, { useState, useEffect } from 'react';

// Dashboard component that can be integrated into your existing UCUA system
const StaffDashboard = () => {
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: '30days',
    location: 'all'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUC: 15,
      totalUA: 12,
      pending: 8,
      approved: 14,
      rejected: 5
    },
    reportTypes: [
      { name: 'Unsafe Condition', value: 15, color: '#dc2626' },
      { name: 'Unsafe Action', value: 12, color: '#ea580c' }
    ],
    statusDistribution: [
      { name: 'Approved', value: 14, color: '#16a34a' },
      { name: 'Pending', value: 8, color: '#eab308' },
      { name: 'Rejected', value: 5, color: '#dc2626' }
    ],
    riskLevels: [
      { name: 'High', value: 8 },
      { name: 'Medium', value: 12 },
      { name: 'Low', value: 7 }
    ],
    locationData: [
      { name: 'Factory Floor', value: 12 },
      { name: 'Warehouse', value: 8 },
      { name: 'Office', value: 4 },
      { name: 'Loading Dock', value: 3 }
    ],
    trends: [
      { name: 'Week 1', UC: 3, UA: 2, total: 5 },
      { name: 'Week 2', UC: 4, UA: 3, total: 7 },
      { name: 'Week 3', UC: 2, UA: 2, total: 4 },
      { name: 'Week 4', UC: 6, UA: 5, total: 11 }
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
      baseData.reportTypes = [{ name: 'Unsafe Condition', value: 15, color: '#dc2626' }];
      baseData.stats.totalUA = 0;
    } else if (currentFilters.reportType === 'ua') {
      baseData.reportTypes = [{ name: 'Unsafe Action', value: 12, color: '#ea580c' }];
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

    // Apply date range filter (simulate different data for different ranges)
    if (currentFilters.dateRange === '7days') {
      baseData.trends = [
        { name: 'Day 1', UC: 1, UA: 1, total: 2 },
        { name: 'Day 2', UC: 2, UA: 1, total: 3 },
        { name: 'Day 3', UC: 1, UA: 2, total: 3 },
        { name: 'Day 4', UC: 3, UA: 1, total: 4 }
      ];
    } else if (currentFilters.dateRange === '3months') {
      baseData.trends = [
        { name: 'Month 1', UC: 15, UA: 10, total: 25 },
        { name: 'Month 2', UC: 12, UA: 8, total: 20 },
        { name: 'Month 3', UC: 18, UA: 14, total: 32 }
      ];
    }

    return baseData;
  };

  // Get default data
  const getDefaultData = () => ({
    stats: {
      totalUC: 15,
      totalUA: 12,
      pending: 8,
      approved: 14,
      rejected: 5
    },
    reportTypes: [
      { name: 'Unsafe Condition', value: 15, color: '#dc2626' },
      { name: 'Unsafe Action', value: 12, color: '#ea580c' }
    ],
    statusDistribution: [
      { name: 'Approved', value: 14, color: '#16a34a' },
      { name: 'Pending', value: 8, color: '#eab308' },
      { name: 'Rejected', value: 5, color: '#dc2626' }
    ],
    riskLevels: [
      { name: 'High', value: 8 },
      { name: 'Medium', value: 12 },
      { name: 'Low', value: 7 }
    ],
    locationData: [
      { name: 'Factory Floor', value: 12 },
      { name: 'Warehouse', value: 8 },
      { name: 'Office', value: 4 },
      { name: 'Loading Dock', value: 3 }
    ],
    trends: [
      { name: 'Week 1', UC: 3, UA: 2, total: 5 },
      { name: 'Week 2', UC: 4, UA: 3, total: 7 },
      { name: 'Week 3', UC: 2, UA: 2, total: 4 },
      { name: 'Week 4', UC: 6, UA: 5, total: 11 }
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
          Welcome Staff!
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0
        }}>
          Monitor safety trends and analyze your workplace environment
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
          subtitle="Awaiting approval"
          color="#eab308"
          icon="⏳"
        />
        <StatCard 
          title="Approved Reports" 
          value={dashboardData.stats.approved}
          subtitle="Successfully processed"
          color="#16a34a"
          icon="✅"
        />
      </div>

      {/* Quick Action Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <ActionButton 
          title="Submit UC Report"
          subtitle="Report unsafe conditions"
          color="#dc2626"
          icon="📝"
          onClick={() => console.log('Navigate to UC form')}
        />
        <ActionButton 
          title="Submit UA Report"
          subtitle="Report unsafe actions"
          color="#ea580c"
          icon="📋"
          onClick={() => console.log('Navigate to UA form')}
        />
        <ActionButton 
          title="View My Reports"
          subtitle="Track submitted reports"
          color="#16a34a"
          icon="📊"
          onClick={() => console.log('Navigate to reports list')}
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Report Type Distribution */}
        <ChartCard title="Report Type Distribution">
          <SimpleBarChart data={dashboardData.reportTypes} />
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Report Status Distribution">
          <SimpleBarChart data={dashboardData.statusDistribution} />
        </ChartCard>

        {/* Risk Levels */}
        <ChartCard title="Risk Level Distribution">
          <SimpleBarChart data={dashboardData.riskLevels} />
        </ChartCard>

        {/* Location Frequency */}
        <ChartCard title="Most Frequent Locations">
          <SimpleBarChart data={dashboardData.locationData} />
        </ChartCard>
      </div>

      {/* Trends Chart */}
      <ChartCard title="Weekly Report Trends">
        <TrendsChart data={dashboardData.trends} />
      </ChartCard>

      {/* Summary Insights */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        borderRadius: '12px',
        padding: '30px',
        color: 'white',
        marginTop: '30px'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Safety Insights
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '20px' 
        }}>
          <InsightCard 
            value={`${Math.round((dashboardData.stats.approved / (dashboardData.stats.totalUC + dashboardData.stats.totalUA)) * 100)}%`}
            label="Approval Rate"
          />
          <InsightCard 
            value={dashboardData.locationData[0]?.name || 'Factory Floor'}
            label="Top Risk Location"
          />
          <InsightCard 
            value={dashboardData.trends.reduce((sum, week) => sum + week.total, 0)}
            label="Monthly Total"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Components
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

const SimpleBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div style={{ height: '240px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        {data.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                minWidth: '100px', 
                fontSize: '14px', 
                color: '#374151',
                fontWeight: '500'
              }}>
                {item.name}
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#e5e7eb', 
                borderRadius: '6px', 
                height: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  backgroundColor: item.color || '#3b82f6',
                  height: '100%',
                  borderRadius: '6px',
                  width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.value > 0 && `${item.value}`}
                </div>
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                minWidth: '60px',
                color: '#1f2937',
                textAlign: 'right'
              }}>
                {item.value} ({percentage}%)
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '12px',
        borderRadius: '6px',
        borderTop: '2px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center'
        }}>
          Total: {total} reports
        </div>
      </div>
    </div>
  );
};

const TrendsChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.UC, item.UA, item.total)));
  const chartHeight = 250;
  
  return (
    <div style={{ height: '350px', padding: '20px' }}>
      {/* Chart Area */}
      <div style={{ 
        height: `${chartHeight}px`, 
        position: 'relative',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e5e7eb'
      }}>
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '20px',
          height: `${chartHeight - 60}px`,
          width: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <div>{maxValue}</div>
          <div>{Math.round(maxValue * 0.75)}</div>
          <div>{Math.round(maxValue * 0.5)}</div>
          <div>{Math.round(maxValue * 0.25)}</div>
          <div>0</div>
        </div>

        {/* Chart bars */}
        <div style={{ 
          marginLeft: '50px',
          height: `${chartHeight - 60}px`,
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'end',
          borderBottom: '2px solid #d1d5db',
          borderLeft: '2px solid #d1d5db'
        }}>
          {data.map((item, index) => {
            const ucHeight = maxValue > 0 ? (item.UC / maxValue) * (chartHeight - 80) : 0;
            const uaHeight = maxValue > 0 ? (item.UA / maxValue) * (chartHeight - 80) : 0;
            const totalHeight = maxValue > 0 ? (item.total / maxValue) * (chartHeight - 80) : 0;
            
            return (
              <div key={index} style={{ 
                textAlign: 'center', 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
                {/* Bars container */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'end', 
                  gap: '4px', 
                  marginBottom: '10px',
                  height: `${chartHeight - 80}px`
                }}>
                  {/* UC Bar */}
                  <div style={{ 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      backgroundColor: '#dc2626',
                      width: '24px',
                      height: `${ucHeight}px`,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {item.UC > 0 && ucHeight > 20 && item.UC}
                    </div>
                    {ucHeight > 0 && ucHeight <= 20 && (
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#dc2626'
                      }}>
                        {item.UC}
                      </div>
                    )}
                  </div>

                  {/* UA Bar */}
                  <div style={{ 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      backgroundColor: '#ea580c',
                      width: '24px',
                      height: `${uaHeight}px`,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {item.UA > 0 && uaHeight > 20 && item.UA}
                    </div>
                    {uaHeight > 0 && uaHeight <= 20 && (
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#ea580c'
                      }}>
                        {item.UA}
                      </div>
                    )}
                  </div>

                  {/* Total Bar */}
                  <div style={{ 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      backgroundColor: '#3b82f6',
                      width: '24px',
                      height: `${totalHeight}px`,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {item.total > 0 && totalHeight > 20 && item.total}
                    </div>
                    {totalHeight > 0 && totalHeight <= 20 && (
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#3b82f6'
                      }}>
                        {item.total}
                      </div>
                    )}
                  </div>
                </div>

                {/* X-axis label */}
                <div style={{ 
                  fontSize: '12px', 
                  color: '#374151',
                  fontWeight: '500',
                  marginTop: '8px'
                }}>
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '24px', 
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#dc2626', 
            borderRadius: '4px',
            border: '1px solid #b91c1c'
          }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            UC Reports ({data.reduce((sum, item) => sum + item.UC, 0)} total)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#ea580c', 
            borderRadius: '4px',
            border: '1px solid #c2410c'
          }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            UA Reports ({data.reduce((sum, item) => sum + item.UA, 0)} total)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '4px',
            border: '1px solid #2563eb'
          }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            Total Reports ({data.reduce((sum, item) => sum + item.total, 0)} total)
          </span>
        </div>
      </div>

      {/* Chart Analysis */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #bfdbfe'
      }}>
        <div style={{ fontSize: '12px', color: '#1e40af', textAlign: 'center' }}>
          <strong>Trend Analysis:</strong> {data[data.length - 1].name} shows {data[data.length - 1].total} total reports 
          ({data[data.length - 1].UC} UC, {data[data.length - 1].UA} UA)
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ value, label }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '14px', opacity: 0.8 }}>{label}</div>
  </div>
);

export default StaffDashboard;