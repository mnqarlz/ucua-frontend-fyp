import React, { useState, useEffect } from 'react';

const ITAdminDashboard = () => {
  const [filters, setFilters] = useState({
    module: 'all',
    dateRange: '30days',
    dataSource: 'all'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    aiStats: {
      totalProcessed: 847,
      ucProcessed: 523,
      uaProcessed: 324,
      aiFailures: 23,
      manualOverrides: 45,
      avgProcessingTime: 2.8
    },
    accuracyRates: [
      { name: 'Offense Code Suggestion', value: 87, color: '#059669' },
      { name: 'Keyword Tagging', value: 92, color: '#3b82f6' },
      { name: 'Risk Prediction', value: 84, color: '#8b5cf6' }
    ],
    aiModuleUsage: [
      { name: 'Offense Code', value: 456, color: '#059669' },
      { name: 'Keyword Tagging', value: 512, color: '#3b82f6' },
      { name: 'Risk Prediction', value: 389, color: '#8b5cf6' },
      { name: 'Manual Processing', value: 78, color: '#dc2626' }
    ],
    processingTimes: [
      { name: 'Offense Code', value: 1.2, unit: 's', color: '#059669' },
      { name: 'Keyword Tagging', value: 0.8, unit: 's', color: '#3b82f6' },
      { name: 'Risk Prediction', value: 3.5, unit: 's', color: '#8b5cf6' },
      { name: 'Overall Average', value: 2.8, unit: 's', color: '#f59e0b' }
    ],
    aiTrends: [
      { 
        name: 'Week 1', 
        processed: 156, 
        accuracy: 85, 
        failures: 8, 
        avgTime: 2.9,
        offenseCode: 67,
        keywordTag: 78,
        riskPred: 62
      },
      { 
        name: 'Week 2', 
        processed: 189, 
        accuracy: 88, 
        failures: 6, 
        avgTime: 2.7,
        offenseCode: 82,
        keywordTag: 95,
        riskPred: 71
      },
      { 
        name: 'Week 3', 
        processed: 203, 
        accuracy: 89, 
        failures: 4, 
        avgTime: 2.6,
        offenseCode: 89,
        keywordTag: 98,
        riskPred: 76
      },
      { 
        name: 'Week 4', 
        processed: 234, 
        accuracy: 91, 
        failures: 5, 
        avgTime: 2.4,
        offenseCode: 95,
        keywordTag: 102,
        riskPred: 83
      }
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
    
    // Filter by AI module
    if (currentFilters.module !== 'all') {
      const moduleMap = {
        'offense': 'Offense Code',
        'keyword': 'Keyword Tagging',
        'risk': 'Risk Prediction'
      };
      const selectedModule = moduleMap[currentFilters.module];
      baseData.accuracyRates = baseData.accuracyRates.filter(item => item.name.includes(selectedModule.split(' ')[0]));
      baseData.aiModuleUsage = baseData.aiModuleUsage.filter(item => item.name.includes(selectedModule.split(' ')[0]));
      baseData.processingTimes = baseData.processingTimes.filter(item => item.name.includes(selectedModule.split(' ')[0]));
      
      if (baseData.accuracyRates.length === 0) {
        baseData.accuracyRates = [{ name: 'No Data', value: 0, color: '#6b7280' }];
        baseData.aiModuleUsage = [{ name: 'No Data', value: 0, color: '#6b7280' }];
        baseData.processingTimes = [{ name: 'No Data', value: 0, unit: 's', color: '#6b7280' }];
      }
    }

    // Filter by data source
    if (currentFilters.dataSource === 'uc') {
      baseData.aiStats.uaProcessed = 0;
    } else if (currentFilters.dataSource === 'ua') {
      baseData.aiStats.ucProcessed = 0;
    }

    // Filter by date range
    if (currentFilters.dateRange === '7days') {
      baseData.aiTrends = [
        { name: 'Day 1', processed: 45, accuracy: 87, failures: 2, avgTime: 2.8, offenseCode: 18, keywordTag: 22, riskPred: 15 },
        { name: 'Day 2', processed: 52, accuracy: 89, failures: 1, avgTime: 2.6, offenseCode: 21, keywordTag: 25, riskPred: 18 },
        { name: 'Day 3', processed: 48, accuracy: 85, failures: 3, avgTime: 2.9, offenseCode: 19, keywordTag: 23, riskPred: 16 },
        { name: 'Day 4', processed: 56, accuracy: 91, failures: 1, avgTime: 2.4, offenseCode: 23, keywordTag: 27, riskPred: 20 }
      ];
    } else if (currentFilters.dateRange === '3months') {
      baseData.aiTrends = [
        { name: 'Month 1', processed: 2340, accuracy: 84, failures: 89, avgTime: 3.2, offenseCode: 987, keywordTag: 1156, riskPred: 834 },
        { name: 'Month 2', processed: 2456, accuracy: 87, failures: 76, avgTime: 2.9, offenseCode: 1045, keywordTag: 1234, riskPred: 891 },
        { name: 'Month 3', processed: 2598, accuracy: 90, failures: 62, avgTime: 2.6, offenseCode: 1123, keywordTag: 1298, riskPred: 945 }
      ];
    }

    return baseData;
  };

  // Get base data
  const getBaseData = () => ({
    aiStats: {
      totalProcessed: 847,
      ucProcessed: 523,
      uaProcessed: 324,
      aiFailures: 23,
      manualOverrides: 45,
      avgProcessingTime: 2.8
    },
    accuracyRates: [
      { name: 'Offense Code Suggestion', value: 87, color: '#059669' },
      { name: 'Keyword Tagging', value: 92, color: '#3b82f6' },
      { name: 'Risk Prediction', value: 84, color: '#8b5cf6' }
    ],
    aiModuleUsage: [
      { name: 'Offense Code', value: 456, color: '#059669' },
      { name: 'Keyword Tagging', value: 512, color: '#3b82f6' },
      { name: 'Risk Prediction', value: 389, color: '#8b5cf6' },
      { name: 'Manual Processing', value: 78, color: '#dc2626' }
    ],
    processingTimes: [
      { name: 'Offense Code', value: 1.2, unit: 's', color: '#059669' },
      { name: 'Keyword Tagging', value: 0.8, unit: 's', color: '#3b82f6' },
      { name: 'Risk Prediction', value: 3.5, unit: 's', color: '#8b5cf6' },
      { name: 'Overall Average', value: 2.8, unit: 's', color: '#f59e0b' }
    ],
    aiTrends: [
      { name: 'Week 1', processed: 156, accuracy: 85, failures: 8, avgTime: 2.9, offenseCode: 67, keywordTag: 78, riskPred: 62 },
      { name: 'Week 2', processed: 189, accuracy: 88, failures: 6, avgTime: 2.7, offenseCode: 82, keywordTag: 95, riskPred: 71 },
      { name: 'Week 3', processed: 203, accuracy: 89, failures: 4, avgTime: 2.6, offenseCode: 89, keywordTag: 98, riskPred: 76 },
      { name: 'Week 4', processed: 234, accuracy: 91, failures: 5, avgTime: 2.4, offenseCode: 95, keywordTag: 102, riskPred: 83 }
    ]
  });

  // Reset filters
  const resetFilters = () => {
    setFilters({ module: 'all', dateRange: '30days', dataSource: 'all' });
    setData(getBaseData());
  };

  // Get active filters
  const getActiveFilters = () => {
    const active = [];
    if (filters.module !== 'all') {
      const labels = { 
        offense: 'Offense Code', 
        keyword: 'Keyword Tagging', 
        risk: 'Risk Prediction' 
      };
      active.push(labels[filters.module]);
    }
    if (filters.dataSource !== 'all') {
      active.push(filters.dataSource === 'uc' ? 'UC Reports' : 'UA Reports');
    }
    if (filters.dateRange !== '30days') {
      const labels = { '7days': 'Last 7 days', '3months': 'Last 3 months' };
      active.push(labels[filters.dateRange] || filters.dateRange);
    }
    return active;
  };

  // Calculate AI performance metrics
  const calculateAIMetrics = () => {
    const totalReports = data.aiStats.ucProcessed + data.aiStats.uaProcessed;
    const successRate = totalReports > 0 ? Math.round(((totalReports - data.aiStats.aiFailures) / totalReports) * 100) : 0;
    const avgAccuracy = data.accuracyRates.length > 0 
      ? Math.round(data.accuracyRates.reduce((sum, item) => sum + item.value, 0) / data.accuracyRates.length) 
      : 0;
    const overrideRate = totalReports > 0 ? Math.round((data.aiStats.manualOverrides / totalReports) * 100) : 0;
    
    return { successRate, avgAccuracy, overrideRate };
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

  const aiMetrics = calculateAIMetrics();

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
          Welcome IT Admin!
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
          Monitor AI performance, track model effectiveness, and analyze report processing trends
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
          Filter AI Performance Data
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
              AI Module
            </label>
            <select
              value={filters.module}
              onChange={(e) => handleFilterChange('module', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Modules</option>
              <option value="offense">Offense Code Suggestion</option>
              <option value="keyword">Keyword Tagging</option>
              <option value="risk">Risk Prediction</option>
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
              Data Source
            </label>
            <select
              value={filters.dataSource}
              onChange={(e) => handleFilterChange('dataSource', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">UC + UA Reports</option>
              <option value="uc">UC Reports Only</option>
              <option value="ua">UA Reports Only</option>
            </select>
          </div>

          <div>
            <button
              onClick={resetFilters}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#6366f1',
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
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
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
            Loading AI performance data...
          </div>
        )}
      </div>

      {/* AI Performance Overview */}
      <div style={{
        background: 'linear-gradient(135deg, #4338ca, #6366f1)',
        borderRadius: '12px',
        padding: '24px',
        color: 'white',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          🤖 AI Performance Overview
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          <PerformanceCard 
            value={`${aiMetrics.successRate}%`}
            label="AI Success Rate"
            subtitle={`${data.aiStats.aiFailures} failures out of ${data.aiStats.totalProcessed}`}
          />
          <PerformanceCard 
            value={`${aiMetrics.avgAccuracy}%`}
            label="Average Accuracy"
            subtitle="Across all AI modules"
          />
          <PerformanceCard 
            value={`${data.aiStats.avgProcessingTime}s`}
            label="Avg Processing Time"
            subtitle="Per report analysis"
          />
          <PerformanceCard 
            value={`${aiMetrics.overrideRate}%`}
            label="Manual Override Rate"
            subtitle={`${data.aiStats.manualOverrides} manual interventions`}
          />
        </div>
      </div>

      {/* AI Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <StatCard 
          title="Total Processed" 
          value={data.aiStats.totalProcessed}
          subtitle="Reports using AI"
          color="#6366f1"
          icon="🤖"
        />
        <StatCard 
          title="UC Reports" 
          value={data.aiStats.ucProcessed}
          subtitle="Processed by AI"
          color="#059669"
          icon="⚠️"
        />
        <StatCard 
          title="UA Reports" 
          value={data.aiStats.uaProcessed}
          subtitle="Processed by AI"
          color="#dc2626"
          icon="👤"
        />
        <StatCard 
          title="AI Failures" 
          value={data.aiStats.aiFailures}
          subtitle="Require manual review"
          color="#f59e0b"
          icon="⚡"
        />
      </div>

      {/* Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Accuracy Rates */}
        <ChartCard title="AI Module Accuracy Rates">
          <AccuracyChart data={data.accuracyRates} />
        </ChartCard>

        {/* Module Usage */}
        <ChartCard title="AI Module Usage">
          <SimpleBarChart data={data.aiModuleUsage} />
        </ChartCard>

        {/* Processing Times */}
        <ChartCard title="Processing Time Analysis">
          <ProcessingTimeChart data={data.processingTimes} />
        </ChartCard>
      </div>

      {/* AI Trends */}
      <ChartCard title="AI Performance Trends">
        <AITrendsChart data={data.aiTrends} />
      </ChartCard>
    </div>
  );
};

// Components
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

const PerformanceCard = ({ value, label, subtitle }) => (
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
                  backgroundColor: item.color || '#6366f1',
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
        borderTop: '2px solid #6366f1'
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

const AccuracyChart = ({ data }) => {
  return (
    <div style={{ height: '240px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              minWidth: '120px', 
              fontSize: '12px', 
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
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: item.color || '#6366f1',
                height: '100%',
                borderRadius: '6px',
                width: `${item.value}%`,
                transition: 'width 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                {item.value}%
              </div>
            </div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              minWidth: '50px',
              color: item.value >= 90 ? '#16a34a' : item.value >= 80 ? '#f59e0b' : '#dc2626',
              textAlign: 'right'
            }}>
              {item.value >= 90 ? '🟢' : item.value >= 80 ? '🟡' : '🔴'}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        backgroundColor: '#eff6ff',
        padding: '8px',
        borderRadius: '4px',
        borderTop: '2px solid #3b82f6'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#1e40af',
          textAlign: 'center'
        }}>
          🎯 Target Accuracy: ≥85% | 🟢 Excellent ≥90% | 🟡 Good ≥80% | 🔴 Needs Improvement &lt;80%
        </div>
      </div>
    </div>
  );
};

const ProcessingTimeChart = ({ data }) => {
  const maxTime = Math.max(...data.map(item => item.value));
  
  return (
    <div style={{ height: '240px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {data.map((item, index) => (
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
                backgroundColor: item.color || '#6366f1',
                height: '100%',
                borderRadius: '4px',
                width: `${maxTime > 0 ? (item.value / maxTime) * 100 : 0}%`,
                transition: 'width 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {item.value}{item.unit}
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              minWidth: '50px',
              color: '#1f2937',
              textAlign: 'right'
            }}>
              {item.value}{item.unit}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        backgroundColor: '#fef3c7',
        padding: '8px',
        borderRadius: '4px',
        borderTop: '2px solid #f59e0b'
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#92400e',
          textAlign: 'center'
        }}>
          ⚡ Target: &lt;3.0s | Fastest: {Math.min(...data.map(item => item.value)).toFixed(1)}s
        </div>
      </div>
    </div>
  );
};

const AITrendsChart = ({ data }) => {
  const maxProcessed = Math.max(...data.map(item => item.processed));
  const maxAccuracy = 100; // Accuracy is percentage
  
  return (
    <div style={{ height: '350px', padding: '16px' }}>
      {/* Chart Container */}
      <div style={{ 
        height: '250px', 
        position: 'relative',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {/* Y-axis labels for processed reports (left) */}
        <div style={{
          position: 'absolute',
          left: '8px',
          top: '12px',
          height: '180px',
          width: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#6b7280',
          fontWeight: '500'
        }}>
          <div>{maxProcessed}</div>
          <div>{Math.round(maxProcessed * 0.5)}</div>
          <div>0</div>
        </div>

        {/* Y-axis labels for accuracy (right) */}
        <div style={{
          position: 'absolute',
          right: '8px',
          top: '12px',
          height: '180px',
          width: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#059669',
          fontWeight: '600',
          textAlign: 'right'
        }}>
          <div>100%</div>
          <div>50%</div>
          <div>0%</div>
        </div>

        {/* Chart area */}
        <div style={{ 
          marginLeft: '45px',
          marginRight: '45px',
          height: '180px',
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'end',
          borderBottom: '2px solid #d1d5db',
          borderLeft: '2px solid #d1d5db',
          position: 'relative',
          paddingTop: '10px'
        }}>
          {/* Accuracy line overlay */}
          <svg style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray="3,3"
              points={data.map((item, index) => {
                const x = (index + 0.5) * (100 / data.length);
                const y = 100 - (item.accuracy / maxAccuracy) * 90;
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            {data.map((item, index) => {
              const x = (index + 0.5) * (100 / data.length);
              const y = 100 - (item.accuracy / maxAccuracy) * 90;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill="#059669"
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {data.map((item, index) => {
            const processedHeight = maxProcessed > 0 ? (item.processed / maxProcessed) * 160 : 0;
            const failuresHeight = maxProcessed > 0 ? (item.failures / maxProcessed) * 160 : 0;
            
            return (
              <div key={index} style={{ 
                textAlign: 'center', 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '80px'
              }}>
                {/* Bars container */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'end', 
                  gap: '2px',
                  height: '160px',
                  marginBottom: '8px'
                }}>
                  {/* Processed Reports Bar */}
                  <div style={{
                    backgroundColor: '#6366f1',
                    width: '20px',
                    height: `${Math.max(processedHeight, 2)}px`,
                    borderRadius: '2px 2px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    {item.processed > 0 && processedHeight > 15 ? item.processed : ''}
                  </div>

                  {/* Failures Bar */}
                  <div style={{
                    backgroundColor: '#dc2626',
                    width: '12px',
                    height: `${Math.max(failuresHeight * 10, 2)}px`, // Scale failures for visibility
                    borderRadius: '2px 2px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    {item.failures > 0 && failuresHeight > 1 ? item.failures : ''}
                  </div>
                </div>

                {/* X-axis labels */}
                <div style={{ 
                  fontSize: '10px', 
                  color: '#374151',
                  fontWeight: '500',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  maxWidth: '70px'
                }}>
                  <div style={{ marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ color: '#059669', fontSize: '9px' }}>
                    {item.accuracy}% acc
                  </div>
                  <div style={{ color: '#6366f1', fontSize: '9px' }}>
                    {item.avgTime}s avg
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
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
            backgroundColor: '#6366f1', 
            borderRadius: '2px'
          }} />
          <span style={{ fontWeight: '600', color: '#374151' }}>
            Processed ({data.reduce((sum, item) => sum + item.processed, 0)})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#dc2626', 
            borderRadius: '2px'
          }} />
          <span style={{ fontWeight: '600', color: '#374151' }}>
            Failures ({data.reduce((sum, item) => sum + item.failures, 0)})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '2px', 
            backgroundColor: '#059669', 
            borderRadius: '1px'
          }} />
          <span style={{ fontWeight: '600', color: '#059669' }}>
            Accuracy (Avg: {(data.reduce((sum, item) => sum + item.accuracy, 0) / data.length).toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Performance Summary */}
      <div style={{
        marginTop: '12px',
        padding: '12px',
        backgroundColor: '#f0f9ff',
        borderRadius: '6px',
        border: '1px solid #7dd3fc'
      }}>
        <div style={{ fontSize: '12px', color: '#0369a1', textAlign: 'center', fontWeight: '600' }}>
          <div style={{ marginBottom: '6px' }}>
            🤖 <strong>AI Performance:</strong> {data[data.length - 1].processed} reports processed, {data[data.length - 1].accuracy}% accuracy, {data[data.length - 1].avgTime}s avg time
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '11px' }}>
            <span>Best Week: {data.reduce((max, item) => item.accuracy > max.accuracy ? item : max).name}</span>
            <span>Peak Load: {Math.max(...data.map(item => item.processed))} reports</span>
            <span>Trend: {data[data.length - 1].accuracy > data[0].accuracy ? '📈 Improving' : '📉 Declining'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITAdminDashboard;