import React, { useState } from 'react';
import { Filter, RefreshCw, AlertTriangle, MapPin, TrendingUp, Clock } from 'lucide-react';

const SafetyTrends = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#111827', 
              margin: 0 
            }}>
              Safety Pattern Analysis
            </h1>
            <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>
              Analyze recurring patterns and high-risk zones
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <RefreshCw style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Refresh
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#061978',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <Filter style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
            Advanced Filters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827' }}>
                Time Period
              </label>
              <select style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px' 
              }}>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827' }}>
                Zone
              </label>
              <select style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px' 
              }}>
                <option>All Zones</option>
                <option>Zone A</option>
                <option>Zone B</option>
                <option>Zone C</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827' }}>
                Severity
              </label>
              <select style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px' 
              }}>
                <option>All Levels</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>
                Total Incidents
              </p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>
                1,247
              </p>
              <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>
                +12% from last month
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#dbeafe', 
              padding: '12px', 
              borderRadius: '8px' 
            }}>
              <AlertTriangle style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>
                High Risk Zones
              </p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>
                8
              </p>
              <p style={{ color: '#16a34a', fontSize: '14px', margin: 0 }}>
                -2 from last month
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#dbeafe', 
              padding: '12px', 
              borderRadius: '8px' 
            }}>
              <MapPin style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>
                Resolution Rate
              </p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>
                94.2%
              </p>
              <p style={{ color: '#16a34a', fontSize: '14px', margin: 0 }}>
                +3.1% improvement
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#dbeafe', 
              padding: '12px', 
              borderRadius: '8px' 
            }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>
                Avg Response Time
              </p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>
                2.4 hrs
              </p>
              <p style={{ color: '#16a34a', fontSize: '14px', margin: 0 }}>
                -0.3 hrs faster
              </p>
            </div>
            <div style={{ 
              backgroundColor: '#dbeafe', 
              padding: '12px', 
              borderRadius: '8px' 
            }}>
              <Clock style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Zone Heatmap */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          Zone Risk Heatmap
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
          {[
            { zone: 'Zone A', reports: 45, risk: 'High', color: '#ea580c' },
            { zone: 'Zone B', reports: 32, risk: 'Medium', color: '#ca8a04' },
            { zone: 'Zone C', reports: 67, risk: 'Critical', color: '#dc2626' },
            { zone: 'Zone D', reports: 23, risk: 'Low', color: '#16a34a' },
            { zone: 'Zone E', reports: 41, risk: 'Medium', color: '#ca8a04' },
            { zone: 'Zone F', reports: 78, risk: 'Critical', color: '#dc2626' }
          ].map((zone, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                borderLeft: `4px solid ${zone.color}`,
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <h4 style={{ margin: 0, fontWeight: '500', color: '#111827' }}>{zone.zone}</h4>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: zone.color
                }}>
                  {zone.risk}
                </span>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111827' }}>
                {zone.reports}
              </p>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                Reports
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Offense Categories */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
            Offense Categories
          </h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'end', gap: '8px' }}>
            {[
              { category: 'Traffic', count: 245 },
              { category: 'Disturbance', count: 189 },
              { category: 'Property', count: 156 },
              { category: 'Safety', count: 134 },
              { category: 'Noise', count: 98 },
              { category: 'Access', count: 87 }
            ].map((item, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${(item.count / 245) * 250}px`,
                  backgroundColor: '#061978',
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '8px'
                }}></div>
                <span style={{ fontSize: '12px', textAlign: 'center', color: '#6b7280' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px', color: '#111827' }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
            Risk Distribution
          </h3>
          <div style={{ 
            height: '300px', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '12px'
          }}>
            {[
              { name: 'Critical', value: 35, color: '#dc2626' },
              { name: 'High', value: 28, color: '#ea580c' },
              { name: 'Medium', value: 22, color: '#ca8a04' },
              { name: 'Low', value: 15, color: '#16a34a' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: item.color,
                  borderRadius: '50%'
                }}></div>
                <span style={{ minWidth: '60px', fontSize: '14px', color: '#111827' }}>{item.name}</span>
                <div style={{
                  flex: 1,
                  height: '20px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.value}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '10px'
                  }}></div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', minWidth: '35px', color: '#111827' }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div style={{ 
        backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#111827'  }}>
          Key Insights & Recommendations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            padding: '16px', 
            backgroundColor: '#fef2f2', 
            borderRadius: '8px',
            borderLeft: '4px solid #dc2626'
          }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: '#dc2626', marginTop: '2px' }} />
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#7f1d1d' }}>
                Critical Alert
              </h4>
              <p style={{ color: '#991b1b', margin: 0, fontSize: '14px' }}>
                Zone C shows 45% increase in incidents. Immediate intervention recommended.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            padding: '16px', 
            backgroundColor: '#fffbeb', 
            borderRadius: '8px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <TrendingUp style={{ width: '20px', height: '20px', color: '#d97706', marginTop: '2px' }} />
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#92400e' }}>
                Trend Alert
              </h4>
              <p style={{ color: '#b45309', margin: 0, fontSize: '14px' }}>
                Property damage incidents increasing by 15% monthly. Consider preventive measures.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            padding: '16px', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '8px',
            borderLeft: '4px solid #16a34a'
          }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#16a34a',
              borderRadius: '50%',
              marginTop: '2px'
            }}></div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#14532d' }}>
                Positive Trend
              </h4>
              <p style={{ color: '#166534', margin: 0, fontSize: '14px' }}>
                Response time improved by 12% this month. Current strategies are effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTrends;