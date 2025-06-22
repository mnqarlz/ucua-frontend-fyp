import React, { useState, useEffect } from 'react';

const UCUAAdminDashboard = () => {
  const [filters, setFilters] = useState({
    userRole: 'all',
    dateRange: '30days',
    reportType: 'all'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    userStats: {
      totalUsers: 156,
      staffUsers: 98,
      pssdUsers: 24,
      ucuaAdmins: 8,
      itAdmins: 26
    },
    usersByRole: [
      { name: 'Staff', value: 98, color: '#3b82f6' },
      { name: 'IT Admin', value: 26, color: '#10b981' },
      { name: 'PSSD Officer', value: 24, color: '#8b5cf6' },
      { name: 'UCUA Admin', value: 8, color: '#f59e0b' }
    ],
    userActivity: [
      { name: 'Active Today', value: 45, color: '#16a34a' },
      { name: 'Last 7 Days', value: 78, color: '#3b82f6' },
      { name: 'Last 30 Days', value: 98, color: '#8b5cf6' },
      { name: 'Inactive >30 Days', value: 23, color: '#dc2626' }
    ],
    reportsByModule: [
      { name: 'Manufacturing', value: 34, color: '#dc2626' },
      { name: 'Warehouse', value: 28, color: '#ea580c' },
      { name: 'Quality Control', value: 15, color: '#3b82f6' },
      { name: 'Maintenance', value: 12, color: '#8b5cf6' }
    ],
    safetyTrends: [
      { name: 'Week 1', UC: 11, UA: 7, total: 18 },
      { name: 'Week 2', UC: 15, UA: 10, total: 25 },
      { name: 'Week 3', UC: 13, UA: 9, total: 22 },
      { name: 'Week 4', UC: 16, UA: 8, total: 24 }
    ]
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setLoading(true);
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    setTimeout(() => {
      try {
        const filteredData = applyFilters(newFilters);
        setData(filteredData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  // Apply filters to data
  const applyFilters = (currentFilters) => {
    const baseData = getBaseData();
    
    // Filter by user role
    if (currentFilters.userRole !== 'all') {
      const roleMap = {
        'staff': 'Staff',
        'pssd': 'PSSD Officer',
        'ucua': 'UCUA Admin',
        'it': 'IT Admin'
      };
      const selectedRole = roleMap[currentFilters.userRole];
      baseData.usersByRole = baseData.usersByRole.filter(item => item.name === selectedRole);
      if (baseData.usersByRole.length === 0) {
        baseData.usersByRole = [{ name: 'No Data', value: 0, color: '#6b7280' }];
      }
    }

    // Filter by report type
    if (currentFilters.reportType === 'uc') {
      baseData.safetyTrends = baseData.safetyTrends.map(item => ({
        ...item,
        UA: 0,
        total: item.UC
      }));
    } else if (currentFilters.reportType === 'ua') {
      baseData.safetyTrends = baseData.safetyTrends.map(item => ({
        ...item,
        UC: 0,
        total: item.UA
      }));
    }

    return baseData;
  };

  // Get base data
  const getBaseData = () => ({
    userStats: {
      totalUsers: 156,
      staffUsers: 98,
      pssdUsers: 24,
      ucuaAdmins: 8,
      itAdmins: 26
    },
    usersByRole: [
      { name: 'Staff', value: 98, color: '#3b82f6' },
      { name: 'IT Admin', value: 26, color: '#10b981' },
      { name: 'PSSD Officer', value: 24, color: '#8b5cf6' },
      { name: 'UCUA Admin', value: 8, color: '#f59e0b' }
    ],
    userActivity: [
      { name: 'Active Today', value: 45, color: '#16a34a' },
      { name: 'Last 7 Days', value: 78, color: '#3b82f6' },
      { name: 'Last 30 Days', value: 98, color: '#8b5cf6' },
      { name: 'Inactive >30 Days', value: 23, color: '#dc2626' }
    ],
    reportsByModule: [
      { name: 'Manufacturing', value: 34, color: '#dc2626' },
      { name: 'Warehouse', value: 28, color: '#ea580c' },
      { name: 'Quality Control', value: 15, color: '#3b82f6' },
      { name: 'Maintenance', value: 12, color: '#8b5cf6' }
    ],
    safetyTrends: [
      { name: 'Week 1', UC: 11, UA: 7, total: 18 },
      { name: 'Week 2', UC: 15, UA: 10, total: 25 },
      { name: 'Week 3', UC: 13, UA: 9, total: 22 },
      { name: 'Week 4', UC: 16, UA: 8, total: 24 }
    ]
  });

  // Reset filters
  const resetFilters = () => {
    setFilters({ userRole: 'all', dateRange: '30days', reportType: 'all' });
    setData(getBaseData());
  };

  // Get active filters
  const getActiveFilters = () => {
    const active = [];
    if (filters.userRole !== 'all') {
      const labels = { staff: 'Staff', pssd: 'PSSD Officer', ucua: 'UCUA Admin', it: 'IT Admin' };
      active.push(labels[filters.userRole]);
    }
    if (filters.reportType !== 'all') {
      active.push(filters.reportType === 'uc' ? 'UC Reports' : 'UA Reports');
    }
    if (filters.dateRange !== '30days') {
      const labels = { '7days': 'Last 7 days', '3months': 'Last 3 months' };
      active.push(labels[filters.dateRange] || filters.dateRange);
    }
    return active;
  };

  // Error handling
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
            setData(getBaseData());
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
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
          Welcome UCUA Admin!
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
          Monitor system usage, user activity, and safety performance trends
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
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
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
              User Role
            </label>
            <select
              value={filters.userRole}
              onChange={(e) => handleFilterChange('userRole', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Users</option>
              <option value="staff">Staff</option>
              <option value="pssd">PSSD Officer</option>
              <option value="ucua">UCUA Admin</option>
              <option value="it">IT Admin</option>
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
            <button
              onClick={resetFilters}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              🔄 Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {getActiveFilters().length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '8px' }}>
              Active filters:
            </span>
            {getActiveFilters().map((filter, index) => (
              <span key={index} style={{
                backgroundColor: '#d1fae5',
                color: '#059669',
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

        {/* Loading */}
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

      {/* Summary Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <StatCard 
          title="Total Users" 
          value={data.userStats.totalUsers}
          subtitle="Registered in system"
          color="#059669"
          icon="👥"
        />
        <StatCard 
          title="Staff Users" 
          value={data.userStats.staffUsers}
          subtitle="Active staff members"
          color="#3b82f6"
          icon="👤"
        />
        <StatCard 
          title="PSSD Officers" 
          value={data.userStats.pssdUsers}
          subtitle="Safety officers"
          color="#8b5cf6"
          icon="🛡️"
        />
        <StatCard 
          title="Admins" 
          value={data.userStats.ucuaAdmins + data.userStats.itAdmins}
          subtitle="UCUA + IT Admins"
          color="#f59e0b"
          icon="⚙️"
        />
      </div>

      {/* Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Users by Role */}
        <ChartCard title="Users by Role">
          <SimpleBarChart data={data.usersByRole} />
        </ChartCard>

        {/* User Activity */}
        <ChartCard title="User Activity Logs">
          <SimpleBarChart data={data.userActivity} />
        </ChartCard>

        {/* Reports by Module */}
        <ChartCard title="UC/UA Reports by Module">
          <SimpleBarChart data={data.reportsByModule} />
        </ChartCard>
      </div>

      {/* Safety Trends */}
      <ChartCard title="Safety Trends (Monthly/Weekly)">
        <TrendsChart data={data.safetyTrends} />
      </ChartCard>
    </div>
  );
};

// Simple Components
const StatCard = ({ title, value, subtitle, color, icon }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    borderLeft: `4px solid ${color}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
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
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                minWidth: '100px', 
                fontSize: '12px', 
                color: '#374151',
                fontWeight: '500'
              }}>
                {item.name}
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: '#e5e7eb', 
                borderRadius: '4px', 
                height: '20px',
                position: 'relative'
              }}>
                <div style={{
                  backgroundColor: item.color || '#059669',
                  height: '100%',
                  borderRadius: '4px',
                  width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                minWidth: '50px',
                color: '#1f2937',
                textAlign: 'right'
              }}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{
        backgroundColor: '#f3f4f6',
        padding: '8px',
        borderRadius: '4px',
        borderTop: '2px solid #059669'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center'
        }}>
          Total: {total}
        </div>
      </div>
    </div>
  );
};

const TrendsChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.UC, item.UA, item.total)));
  
  return (
    <div style={{ height: '300px', padding: '16px' }}>
      <div style={{ 
        height: '200px', 
        position: 'relative',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #e5e7eb',
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'end'
      }}>
        {data.map((item, index) => {
          const ucHeight = maxValue > 0 ? (item.UC / maxValue) * 160 : 0;
          const uaHeight = maxValue > 0 ? (item.UA / maxValue) * 160 : 0;
          const totalHeight = maxValue > 0 ? (item.total / maxValue) * 160 : 0;
          
          return (
            <div key={index} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'end', 
                gap: '2px', 
                marginBottom: '8px',
                justifyContent: 'center'
              }}>
                <div style={{
                  backgroundColor: '#dc2626',
                  width: '16px',
                  height: `${Math.max(ucHeight, 2)}px`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 'bold'
                }}>
                  {item.UC > 0 && ucHeight > 12 ? item.UC : ''}
                </div>
                <div style={{
                  backgroundColor: '#ea580c',
                  width: '16px',
                  height: `${Math.max(uaHeight, 2)}px`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '8px',
                  fontWeight: 'bold'
                }}>
                  {item.UA > 0 && uaHeight > 12 ? item.UA : ''}
                </div>
                <div style={{
                  backgroundColor: '#059669',
                  width: '16px',
                  height: `${Math.max(totalHeight, 2)}px`,
                  borderRadius: '2px',
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
              <div style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '16px', 
        marginTop: '16px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#dc2626', borderRadius: '2px' }} />
          <span>UC Reports ({data.reduce((sum, item) => sum + item.UC, 0)})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#ea580c', borderRadius: '2px' }} />
          <span>UA Reports ({data.reduce((sum, item) => sum + item.UA, 0)})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#059669', borderRadius: '2px' }} />
          <span>Total ({data.reduce((sum, item) => sum + item.total, 0)})</span>
        </div>
      </div>
    </div>
  );
};

export default UCUAAdminDashboard;