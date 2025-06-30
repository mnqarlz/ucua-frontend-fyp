import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  User, 
  Clock, 
  CheckCircle, 
  FileText, 
  Target, 
  Bot, 
  BarChart3,
  RefreshCw,
  Filter,
  TrendingUp,
  Shield,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

  // Chart.js configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Poppins',
            size: 12
          },
          color: '#061978'
        }
      },
      tooltip: {
        titleFont: {
          family: 'Poppins'
        },
        bodyFont: {
          family: 'Poppins'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 11
          },
          color: '#061978'
        }
      },
      y: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 11
          },
          color: '#061978'
        }
      }
    }
  };

  // Error handling component
  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8fafc',
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh'
      }}>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <AlertTriangle size={24} color="#dc2626" />
          <span style={{ color: '#dc2626', fontWeight: '500' }}>{error}</span>
        </div>
        <button 
          onClick={() => {
            setError(null);
            setDashboardData(getDefaultData());
          }}
          style={{
            backgroundColor: '#061978',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  const riskMetrics = calculateRiskMetrics();

  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#f8fafc',
      fontFamily: 'Poppins, sans-serif',
      minHeight: '100vh'
    }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#061978', 
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Shield size={36} color="#061978" />
          Welcome PSSD Officer!
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0,
          fontWeight: '400'
        }}>
          Monitor incident trends, assess workplace risks, and make data-informed safety decisions
        </p>
      </div>

      {/* Filter Controls */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 10px 25px -5px rgba(6, 25, 120, 0.1)',
        border: '1px solid rgba(6, 25, 120, 0.05)'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#061978', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Filter size={20} />
          Filter Dashboard Data
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#061978', 
              marginBottom: '8px' 
            }}>
              <FileText size={16} />
              Report Type
            </label>
            <select
              value={filters.reportType}
              onChange={(e) => handleFilterChange('reportType', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: 'white',
                fontFamily: 'Poppins, sans-serif',
                color: '#061978',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#061978'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="all">All Reports</option>
              <option value="uc">Unsafe Condition (UC)</option>
              <option value="ua">Unsafe Action (UA)</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#061978', 
              marginBottom: '8px' 
            }}>
              <Calendar size={16} />
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: 'white',
                fontFamily: 'Poppins, sans-serif',
                color: '#061978',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#061978'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#061978', 
              marginBottom: '8px' 
            }}>
              <MapPin size={16} />
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: 'white',
                fontFamily: 'Poppins, sans-serif',
                color: '#061978',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#061978'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                padding: '12px 16px',
                backgroundColor: '#061978',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0a1f85'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#061978'}
            >
              <RefreshCw size={16} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilters().length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
              Active filters:
            </span>
            {getActiveFilters().map((filter, index) => (
              <span key={index} style={{
                backgroundColor: 'rgba(6, 25, 120, 0.1)',
                color: '#061978',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid rgba(6, 25, 120, 0.2)'
              }}>
                {filter}
              </span>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            backgroundColor: 'rgba(6, 25, 120, 0.05)', 
            borderRadius: '10px',
            textAlign: 'center',
            color: '#061978',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <Activity size={20} className="animate-spin" />
            Loading dashboard data...
          </div>
        )}
      </div>

      {/* Risk Assessment Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #061978, #0a1f85, #1e40af)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        marginBottom: '32px',
        boxShadow: '0 20px 40px -10px rgba(6, 25, 120, 0.3)'
      }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Target size={28} />
          Risk Assessment Overview
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px' 
        }}>
          <RiskCard 
            value={`${riskMetrics.riskPercentage}%`}
            label="High/Critical Risk Reports"
            subtitle={`${riskMetrics.criticalAndHigh} out of ${dashboardData.stats.totalUC + dashboardData.stats.totalUA} reports`}
            icon={<AlertTriangle size={24} />}
          />
          <RiskCard 
            value={riskMetrics.avgRiskScore}
            label="Average Risk Score"
            subtitle="Based on recent trends"
            icon={<TrendingUp size={24} />}
          />
          <RiskCard 
            value={dashboardData.stats.aiRecommendations}
            label="AI Recommendations"
            subtitle="Pending safety actions"
            icon={<Bot size={24} />}
          />
          <RiskCard 
            value={dashboardData.stats.pending}
            label="Pending Reviews"
            subtitle="Require officer attention"
            icon={<Clock size={24} />}
          />
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        <StatCard 
          title="Total UC Reports" 
          value={dashboardData.stats.totalUC}
          subtitle="Unsafe Conditions"
          color="#dc2626"
          icon={<AlertTriangle size={24} />}
        />
        <StatCard 
          title="Total UA Reports" 
          value={dashboardData.stats.totalUA}
          subtitle="Unsafe Actions"
          color="#ea580c"
          icon={<User size={24} />}
        />
        <StatCard 
          title="Pending Review" 
          value={dashboardData.stats.pending}
          subtitle="Awaiting decision"
          color="#eab308"
          icon={<Clock size={24} />}
        />
        <StatCard 
          title="Approved Reports" 
          value={dashboardData.stats.approved}
          subtitle="Processed & approved"
          color="#16a34a"
          icon={<CheckCircle size={24} />}
        />
      </div>

      {/* Officer Actions */}
      {/* <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        <ActionButton 
          title="Review Pending Reports"
          subtitle="Process awaiting decisions"
          color="#eab308"
          icon={<FileText size={24} />}
          onClick={() => console.log('Navigate to pending reports')}
        />
        <ActionButton 
          title="Risk Assessment Tool"
          subtitle="Analyze safety risks"
          color="#7c3aed"
          icon={<Target size={24} />}
          onClick={() => console.log('Navigate to risk assessment')}
        />
        <ActionButton 
          title="AI Recommendations"
          subtitle="View safety suggestions"
          color="#059669"
          icon={<Bot size={24} />}
          onClick={() => console.log('Navigate to AI recommendations')}
        />
        <ActionButton 
          title="Generate Reports"
          subtitle="Create safety reports"
          color="#dc2626"
          icon={<BarChart3 size={24} />}
          onClick={() => console.log('Navigate to report generator')}
        />
      </div> */}

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Report Type Distribution */}
        <ChartCard title="Report Type Distribution" icon={<BarChart3 size={20} />}>
          <div style={{ height: '300px' }}>
            <Bar 
              data={{
                labels: dashboardData.reportTypes.map(item => item.name),
                datasets: [{
                  label: 'Reports',
                  data: dashboardData.reportTypes.map(item => item.value),
                  backgroundColor: dashboardData.reportTypes.map(item => item.color),
                  borderColor: dashboardData.reportTypes.map(item => item.color),
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false
                }]
              }}
              options={chartOptions}
            />
          </div>
        </ChartCard>

        {/* Risk Level Distribution */}
        <ChartCard title="Risk Level Distribution" icon={<AlertTriangle size={20} />}>
          <div style={{ height: '300px' }}>
            <Doughnut 
              data={{
                labels: dashboardData.riskLevels.map(item => item.name),
                datasets: [{
                  data: dashboardData.riskLevels.map(item => item.value),
                  backgroundColor: dashboardData.riskLevels.map(item => item.color),
                  borderColor: 'white',
                  borderWidth: 3
                }]
              }}
              options={{
                ...chartOptions,
                cutout: '60%',
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'right'
                  }
                }
              }}
            />
          </div>
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard title="Report Status Breakdown" icon={<CheckCircle size={20} />}>
          <div style={{ height: '300px' }}>
            <Bar 
              data={{
                labels: dashboardData.statusDistribution.map(item => item.name),
                datasets: [{
                  label: 'Count',
                  data: dashboardData.statusDistribution.map(item => item.value),
                  backgroundColor: dashboardData.statusDistribution.map(item => item.color),
                  borderColor: dashboardData.statusDistribution.map(item => item.color),
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false
                }]
              }}
              options={chartOptions}
            />
          </div>
        </ChartCard>

        {/* AI Recommendations */}
        <ChartCard title="AI-Recommended Safety Actions" icon={<Bot size={20} />}>
          <div style={{ height: '300px' }}>
            <Bar 
              data={{
                labels: dashboardData.aiRecommendations.map(item => item.name),
                datasets: [{
                  label: 'Actions',
                  data: dashboardData.aiRecommendations.map(item => item.value),
                  backgroundColor: dashboardData.aiRecommendations.map(item => item.color),
                  borderColor: dashboardData.aiRecommendations.map(item => item.color),
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false
                }]
              }}
              options={{
                ...chartOptions,
                indexAxis: 'y',
                scales: {
                  x: {
                    ticks: {
                      font: {
                        family: 'Poppins',
                        size: 11
                      },
                      color: '#061978'
                    }
                  },
                  y: {
                    ticks: {
                      font: {
                        family: 'Poppins',
                        size: 10
                      },
                      color: '#061978'
                    }
                  }
                }
              }}
            />
          </div>
        </ChartCard>
      </div>

      {/* Trends Chart with Risk Score */}
      <ChartCard title="Weekly Trends & Risk Assessment" icon={<TrendingUp size={20} />}>
        <div style={{ height: '400px' }}>
          <Line 
            data={{
              labels: dashboardData.trends.map(item => item.name),
              datasets: [
                {
                  label: 'Unsafe Conditions (UC)',
                  data: dashboardData.trends.map(item => item.UC),
                  borderColor: '#dc2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  borderWidth: 3,
                  fill: false,
                  tension: 0.4,
                  pointBackgroundColor: '#dc2626',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2,
                  pointRadius: 6
                },
                {
                  label: 'Unsafe Actions (UA)',
                  data: dashboardData.trends.map(item => item.UA),
                  borderColor: '#ea580c',
                  backgroundColor: 'rgba(234, 88, 12, 0.1)',
                  borderWidth: 3,
                  fill: false,
                  tension: 0.4,
                  pointBackgroundColor: '#ea580c',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2,
                  pointRadius: 6
                },
                {
                  label: 'Total Reports',
                  data: dashboardData.trends.map(item => item.total),
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: '#3b82f6',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2,
                  pointRadius: 6
                },
                {
                  label: 'Risk Score',
                  data: dashboardData.trends.map(item => item.riskScore),
                  borderColor: '#7c3aed',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  borderWidth: 3,
                  borderDash: [5, 5],
                  fill: false,
                  tension: 0.4,
                  pointBackgroundColor: '#7c3aed',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2,
                  pointRadius: 6,
                  yAxisID: 'y1'
                }
              ]
            }}
            options={{
              ...chartOptions,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Time Period',
                    font: {
                      family: 'Poppins',
                      size: 14,
                      weight: '600'
                    },
                    color: '#061978'
                  },
                  ticks: {
                    font: {
                      family: 'Poppins',
                      size: 12
                    },
                    color: '#061978'
                  }
                },
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Number of Reports',
                    font: {
                      family: 'Poppins',
                      size: 14,
                      weight: '600'
                    },
                    color: '#061978'
                  },
                  ticks: {
                    font: {
                      family: 'Poppins',
                      size: 12
                    },
                    color: '#061978'
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Risk Score',
                    font: {
                      family: 'Poppins',
                      size: 14,
                      weight: '600'
                    },
                    color: '#7c3aed'
                  },
                  ticks: {
                    font: {
                      family: 'Poppins',
                      size: 12
                    },
                    color: '#7c3aed'
                  },
                  grid: {
                    drawOnChartArea: false,
                  },
                }
              }
            }}
          />
        </div>
        
        {/* Trends Summary */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(6, 25, 120, 0.05)',
          borderRadius: '10px',
          border: '1px solid rgba(6, 25, 120, 0.1)'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#061978', 
            textAlign: 'center', 
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} />
              <span>Latest: {dashboardData.trends[dashboardData.trends.length - 1].total} reports</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={16} />
              <span>Current Risk: {dashboardData.trends[dashboardData.trends.length - 1].riskScore}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} />
              <span>Peak: {dashboardData.trends.reduce((max, item) => item.total > max.total ? item : max).name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={16} />
              <span>Avg Risk: {(dashboardData.trends.reduce((sum, item) => sum + item.riskScore, 0) / dashboardData.trends.length).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

// Enhanced Components for PSSD Officer
const StatCard = ({ title, value, subtitle, color, icon }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    borderLeft: `5px solid ${color}`,
    boxShadow: '0 10px 25px -5px rgba(6, 25, 120, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(6, 25, 120, 0.05)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(6, 25, 120, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(6, 25, 120, 0.1)';
  }}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <div style={{
        backgroundColor: color,
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
        color: 'white'
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '36px', fontWeight: '700', color, fontFamily: 'Poppins, sans-serif' }}>
          {value}
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '400' }}>
          {subtitle}
        </div>
      </div>
    </div>
    <div style={{ fontSize: '18px', fontWeight: '600', color: '#061978' }}>
      {title}
    </div>
  </div>
);

const ActionButton = ({ title, subtitle, color, icon, onClick }) => (
  <div style={{
    backgroundColor: color,
    borderRadius: '16px',
    padding: '28px',
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    border: 'none'
  }}
  onClick={onClick}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
  }}
  >
    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
      {title}
    </div>
    <div style={{ fontSize: '14px', opacity: 0.9, fontWeight: '400' }}>
      {subtitle}
    </div>
  </div>
);

const ChartCard = ({ title, children, icon }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 10px 25px -5px rgba(6, 25, 120, 0.1)',
    border: '1px solid rgba(6, 25, 120, 0.05)',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(6, 25, 120, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(6, 25, 120, 0.1)';
  }}
  >
    <h3 style={{ 
      fontSize: '20px', 
      fontWeight: '600', 
      marginBottom: '20px', 
      color: '#061978',
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const RiskCard = ({ value, label, subtitle, icon }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
      {value}
    </div>
    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
      {label}
    </div>
    <div style={{ fontSize: '12px', opacity: 0.8, fontWeight: '400' }}>
      {subtitle}
    </div>
  </div>
);

export default PSSDOfficerDashboard;