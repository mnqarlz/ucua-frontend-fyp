import { useState } from 'react';
import {
  Activity,
  Brain,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  FileText,
  Target,
  RotateCcw,
  Filter,
  PieChart,
  Calendar,
  Database,
  CheckCircle,
  XCircle,
  Settings,
  Shield
} from 'lucide-react';

/* ─────────── Chart.js setup ─────────── */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  Title
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  Title
);

/* ─────────── Component ─────────── */
const ITAdminDashboard = () => {
  /* ---------------- state ---------------- */
  const [filters, setFilters] = useState({
    module: 'all',
    dateRange: '30days',
    dataSource: 'all'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(getBaseData());

  /* ---------------- handlers ---------------- */
  const handleFilterChange = (type, value) => {
    setLoading(true);
    const next = { ...filters, [type]: value };
    setFilters(next);

    setTimeout(() => {
      try {
        setData(applyFilters(next));
        setError(null);
      } catch {
        setError('Failed to load dashboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const resetFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setFilters({ module: 'all', dateRange: '30days', dataSource: 'all' });
      setData(getBaseData());
      setError(null);
      setLoading(false);
    }, 500);
  };

  /* ---------------- derived helpers ---------------- */
  const aiMetrics = (() => {
    const total = data.aiStats.ucProcessed + data.aiStats.uaProcessed;
    const successRate =
      total > 0 ? Math.round(((total - data.aiStats.aiFailures) / total) * 100) : 0;
    const avgAccuracy =
      data.accuracyRates.length > 0
        ? Math.round(
            data.accuracyRates.reduce((s, x) => s + x.value, 0) / data.accuracyRates.length
          )
        : 0;
    const overrideRate =
      total > 0 ? Math.round((data.aiStats.manualOverrides / total) * 100) : 0;
    return { successRate, avgAccuracy, overrideRate };
  })();

  /* ---------------- UI ---------------- */
  if (error) return <ErrorFallback msg={error} onRetry={resetFilters} />;

  return (
    <div
      style={{
        padding: 24,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: '100vh'
      }}
    >
      {/* header */}
      <Header />

      {/* filters */}
      <FilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onReset={resetFilters}
        loading={loading}
        activeFilters={summarizeFilters(filters)}
        noData={hasNoData(data)}
      />

      {/* KPIs */}
      <KPISection metrics={aiMetrics} stats={data.aiStats} />

      {/* Stat cards */}
      <StatGrid stats={data.aiStats} />

      {/* charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 32
        }}
      >
        <ChartCard title="AI Module Accuracy Rates" icon={<Target size={20} color="#061978" />}>
          <AccuracyChart data={data.accuracyRates} />
        </ChartCard>

        <ChartCard title="AI Module Usage Distribution" icon={<PieChart size={20} color="#061978" />}>
          <UsageChart data={data.aiModuleUsage} />
        </ChartCard>

        <ChartCard
          title="Processing Time Analysis"
          icon={<Clock size={20} color="#061978" />}
        >
          <ProcessingChart data={data.processingTimes} />
        </ChartCard>

        <ChartCard title="Risk Prediction Trends" icon={<Shield size={20} color="#061978" />}>
          <RiskTrendChart data={data.riskTrends} />
        </ChartCard>
      </div>

      <ChartCard title="AI Performance Trends - Monthly Analysis" icon={<TrendingUp size={20} color="#061978" />}>
        <TrendChart data={data.aiTrends} />
      </ChartCard>
    </div>
  );
};

/* ─────────── reusable pieces ─────────── */

const ErrorFallback = ({ msg, onRetry }) => (
  <div
    style={{
      padding: 40,
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: 24,
        padding: 48,
        boxShadow: '0 25px 50px -12px rgba(6, 25, 120, 0.25)',
        textAlign: 'center',
        maxWidth: 400
      }}
    >
      <XCircle size={64} color="#dc2626" style={{ marginBottom: 24 }} />
      <h3 style={{ color: '#dc2626', margin: '0 0 16px', fontWeight: 700, fontSize: 24 }}>
        Dashboard Failed to Load
      </h3>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16, lineHeight: 1.6 }}>{msg}</p>
      <button
        onClick={onRetry}
        style={{
          background: 'linear-gradient(135deg, #061978, #1e40af)',
          color: '#fff',
          border: 'none',
          padding: '16px 32px',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: '0 auto',
          boxShadow: '0 10px 25px -5px rgba(6, 25, 120, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 20px 35px -5px rgba(6, 25, 120, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 10px 25px -5px rgba(6, 25, 120, 0.3)';
        }}
      >
        <RotateCcw size={20} />
        Retry Dashboard
      </button>
    </div>
  </div>
);

const Header = () => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #061978, #1e40af)',
          padding: 12,
          borderRadius: 16,
          boxShadow: '0 10px 25px -5px rgba(6, 25, 120, 0.3)'
        }}
      >
        <Settings size={36} color="#fff" />
      </div>
      <div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#061978', margin: 0, letterSpacing: '-0.025em' }}>
          IT Admin Dashboard
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', margin: '8px 0 0', fontWeight: 500 }}>
          Monitor AI performance, track model effectiveness, and analyze report processing trends
        </p>
      </div>
    </div>
  </div>
);

/* ---------- Filter Panel ---------- */
const FilterPanel = ({ filters, onChange, onReset, loading, activeFilters, noData }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 20,
      padding: 32,
      boxShadow: '0 25px 50px -12px rgba(6, 25, 120, 0.15)',
      border: '1px solid rgba(6, 25, 120, 0.1)',
      marginBottom: 40
    }}
  >
    {/* title */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          padding: 12,
          borderRadius: 12
        }}
      >
        <Filter size={24} color="#061978" />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#061978', margin: 0 }}>
        Filter AI Performance Data
      </h2>
    </div>

    {/* controls */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24,
        alignItems: 'end'
      }}
    >
      <Select
        label="AI Module"
        icon={<Brain size={18} />}
        value={filters.module}
        onChange={(v) => onChange('module', v)}
        options={[
          ['all', 'All Modules'],
          ['offense', 'Offense Code Suggestion'],
          ['keyword', 'Keyword Tagging'],
          ['risk', 'Risk Prediction']
        ]}
      />

      <Select
        label="Date Range"
        icon={<Calendar size={18} />}
        value={filters.dateRange}
        onChange={(v) => onChange('dateRange', v)}
        options={[
          ['7days', 'Last 7 days'],
          ['30days', 'Last 30 days'],
          ['3months', 'Last 3 months']
        ]}
      />

      <Select
        label="Data Source"
        icon={<Database size={18} />}
        value={filters.dataSource}
        onChange={(v) => onChange('dataSource', v)}
        options={[
          ['all', 'UC + UA Reports'],
          ['uc', 'UC Reports Only'],
          ['ua', 'UA Reports Only']
        ]}
      />

      <button
        onClick={onReset}
        disabled={loading}
        style={{
          width: '100%',
          padding: 16,
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #061978, #1e40af)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: loading ? 'none' : '0 10px 25px -5px rgba(6, 25, 120, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        <RotateCcw size={18} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Resetting...' : 'Reset Filters'}
      </button>
    </div>

    {/* active filters */}
    {activeFilters.length > 0 && (
      <div
        style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}
      >
        <span style={{ fontSize: 16, color: '#374151', fontWeight: 600 }}>Active filters:</span>
        {activeFilters.map((f, i) => (
          <span
            key={i}
            style={{
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
              color: '#061978',
              padding: '8px 16px',
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 600,
              border: '1px solid rgba(6, 25, 120, 0.2)'
            }}
          >
            {f}
          </span>
        ))}
      </div>
    )}

    {/* feedback */}
    {loading && (
      <Feedback 
        msg="Loading AI performance data..." 
        icon={<Activity size={20} className="animate-spin" />} 
        bg="linear-gradient(135deg, #dbeafe, #bfdbfe)"
        color="#061978"
      />
    )}
    {noData && !loading && (
      <Feedback
        msg="No matching results found for the applied filters. Try adjusting your selection."
        icon={<AlertTriangle size={24} color="#f59e0b" />}
        bg="linear-gradient(135deg, #fef3c7, #fde68a)"
        color="#92400e"
      />
    )}
  </div>
);

const Select = ({ label, icon, value, onChange, options }) => (
  <div>
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 16,
        fontWeight: 600,
        color: '#061978',
        marginBottom: 12
      }}
    >
      {icon}
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: 16,
        border: '2px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 16,
        color: '#374151',
        fontFamily: 'inherit',
        fontWeight: 500,
        background: '#fff',
        transition: 'all 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#061978';
        e.target.style.boxShadow = '0 0 0 3px rgba(6, 25, 120, 0.1)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#e5e7eb';
        e.target.style.boxShadow = 'none';
      }}
    >
      {options.map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
    </select>
  </div>
);

const Feedback = ({ msg, icon, bg = '#f3f4f6', color = '#6b7280' }) => (
  <div
    style={{
      marginTop: 24,
      padding: 20,
      background: bg,
      borderRadius: 16,
      textAlign: 'center',
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      fontSize: 16,
      fontWeight: 500
    }}
  >
    {icon}
    {msg}
  </div>
);

/* ---------- KPI Section ---------- */
const KPISection = ({ metrics, stats }) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #061978 0%, #1e40af 50%, #3b82f6 100%)',
      borderRadius: 24,
      padding: 40,
      color: '#fff',
      marginBottom: 40,
      boxShadow: '0 25px 50px -12px rgba(6, 25, 120, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, position: 'relative', zIndex: 1 }}>
      <Brain size={32} />
      <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>AI Performance Overview</h3>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        position: 'relative',
        zIndex: 1
      }}
    >
      <KPI icon={<CheckCircle size={24} />} label="AI Success Rate" value={`${metrics.successRate}%`}>
        {stats.aiFailures} failures out of {stats.totalProcessed} total
      </KPI>
      <KPI icon={<Target size={24} />} label="Average Accuracy" value={`${metrics.avgAccuracy}%`}>
        Across all AI modules
      </KPI>
      <KPI icon={<Clock size={24} />} label="Avg Processing Time" value={`${stats.avgProcessingTime}s`}>
        Per report analysis
      </KPI>
      <KPI
        icon={<AlertTriangle size={24} />}
        label="Manual Override Rate"
        value={`${metrics.overrideRate}%`}
      >
        {stats.manualOverrides} manual interventions
      </KPI>
    </div>
  </div>
);

const KPI = ({ icon, value, label, children }) => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 20,
      padding: 28,
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
    }}
  >
    <div style={{ marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{value}</div>
    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.4 }}>{children}</div>
  </div>
);

/* ---------- Stat Cards ---------- */
const StatGrid = ({ stats }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 24,
      marginBottom: 40
    }}
  >
    <StatCard
      title="Total Processed"
      value={stats.totalProcessed}
      subtitle="Reports using AI"
      color="#061978"
      icon={<FileText size={28} />}
    />
    <StatCard
      title="UC Reports"
      value={stats.ucProcessed}
      subtitle="Processed by AI"
      color="#059669"
      icon={<AlertTriangle size={28} />}
    />
    <StatCard
      title="UA Reports"
      value={stats.uaProcessed}
      subtitle="Processed by AI"
      color="#dc2626"
      icon={<Users size={28} />}
    />
    <StatCard
      title="AI Failures"
      value={stats.aiFailures}
      subtitle="Require manual review"
      color="#f59e0b"
      icon={<XCircle size={28} />}
    />
  </div>
);

const StatCard = ({ title, value, subtitle, color, icon }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 20,
      padding: 28,
      borderLeft: `6px solid ${color}`,
      boxShadow: '0 25px 50px -12px rgba(6, 25, 120, 0.15)',
      border: '1px solid rgba(6, 25, 120, 0.1)',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(6, 25, 120, 0.25)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(6, 25, 120, 0.15)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          width: 64,
          height: 64,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          color: '#fff',
          boxShadow: `0 10px 25px -5px ${color}40`
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 36, fontWeight: 800, color, letterSpacing: '-0.025em' }}>{value}</div>
        <div style={{ fontSize: 16, color: '#6b7280', fontWeight: 500 }}>{subtitle}</div>
      </div>
    </div>
    <div style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>{title}</div>
  </div>
);

/* ---------- Chart Cards ---------- */
const ChartCard = ({ title, icon, children }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 20,
      padding: 28,
      boxShadow: '0 25px 50px -12px rgba(6, 25, 120, 0.15)',
      border: '1px solid rgba(6, 25, 120, 0.1)',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(6, 25, 120, 0.25)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(6, 25, 120, 0.15)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          padding: 12,
          borderRadius: 12
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#061978' }}>{title}</h3>
    </div>
    {children}
  </div>
);

/* ─────────── Chart implementations ─────────── */

const AccuracyChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No accuracy data available" icon={<Target size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Accuracy (%)',
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color || '#061978'),
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };
  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        callbacks: { label: (ctx) => `${ctx.raw}% accuracy` },
        backgroundColor: '#fff',
        titleColor: '#061978',
        bodyColor: '#061978',
        borderColor: '#061978',
        borderWidth: 1
      } 
    },
    scales: { 
      y: { 
        beginAtZero: true, 
        max: 100,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      }
    }
  };
  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={opts} />
    </div>
  );
};

const UsageChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No usage data available" icon={<PieChart size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color || '#061978'),
        borderWidth: 0,
        hoverBorderWidth: 4,
        hoverBorderColor: '#fff'
      }
    ]
  };
  const opts = { 
    responsive: true, 
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#374151',
          font: { family: 'Poppins', weight: '500' }
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#061978',
        bodyColor: '#061978',
        borderColor: '#061978',
        borderWidth: 1
      }
    } 
  };
  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={chartData} options={opts} />
    </div>
  );
};

const ProcessingChart = ({ data }) => {
  if (isNoData(data))
    return <NoData msg="No processing time data" icon={<Clock size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Processing Time (seconds)',
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color || '#061978'),
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };
  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.raw}s processing time` },
        backgroundColor: '#fff',
        titleColor: '#061978',
        bodyColor: '#061978',
        borderColor: '#061978',
        borderWidth: 1
      }
    },
    scales: { 
      y: { 
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      }
    }
  };
  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={opts} />
    </div>
  );
};

const RiskTrendChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.period),
    datasets: [
      {
        label: 'Risk Predictions',
        data: data.map((d) => d.predictions),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true
      }
    ]
  };
  
  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#061978',
        bodyColor: '#061978',
        borderColor: '#061978',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      }
    }
  };
  
  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={opts} />
    </div>
  );
};

const TrendChart = ({ data }) => {
  if (!data || data.length === 0) return <NoData msg="No trend data available" icon={<TrendingUp size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        type: 'bar',
        label: 'Reports Processed',
        data: data.map((d) => d.processed),
        backgroundColor: '#061978',
        yAxisID: 'y',
        borderRadius: 6,
        borderSkipped: false
      },
      {
        type: 'bar',
        label: 'AI Failures',
        data: data.map((d) => d.failures),
        backgroundColor: '#dc2626',
        yAxisID: 'y',
        borderRadius: 6,
        borderSkipped: false
      },
      {
        type: 'line',
        label: 'Accuracy Rate (%)',
        data: data.map((d) => d.accuracy),
        borderColor: '#059669',
        backgroundColor: '#059669',
        yAxisID: 'y1',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3
      }
    ]
  };

  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            family: 'Poppins',
            weight: '600',
            size: 14
          },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        bodyColor: '#374151',
        titleColor: '#061978',
        backgroundColor: '#fff',
        borderColor: '#061978',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { family: 'Poppins', weight: '600' },
        bodyFont: { family: 'Poppins' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        position: 'left',
        title: {
          display: true,
          text: 'Number of Reports',
          color: '#374151',
          font: { family: 'Poppins', weight: '600' }
        },
        ticks: {
          color: '#6b7280',
          font: { family: 'Poppins' }
        },
        grid: {
          color: '#f3f4f6'
        }
      },
      y1: {
        beginAtZero: true,
        max: 100,
        position: 'right',
        title: {
          display: true,
          text: 'Accuracy (%)',
          color: '#374151',
          font: { family: 'Poppins', weight: '600' }
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#6b7280',
          font: { family: 'Poppins' }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
          color: '#374151',
          font: { family: 'Poppins', weight: '600' }
        },
        ticks: {
          color: '#6b7280',
          font: { family: 'Poppins' }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px' }}>
      <Bar data={chartData} options={opts} />
    </div>
  );
};

/* ---------- helpers ---------- */
const isNoData = (arr) => !arr || arr.length === 0 || (arr.length === 1 && arr[0].name === 'No Data');

const NoData = ({ msg, icon }) => (
  <div
    style={{
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#9ca3af',
      background: '#f9fafb',
      borderRadius: 16,
      border: '2px dashed #d1d5db'
    }}
  >
    {icon}
    <p style={{ marginTop: 16, fontSize: 16, fontWeight: 500 }}>{msg}</p>
  </div>
);

const summarizeFilters = (f) => {
  const active = [];
  if (f.module !== 'all') {
    const moduleNames = { 
      offense: 'Offense Code Suggestion', 
      keyword: 'Keyword Tagging', 
      risk: 'Risk Prediction' 
    };
    active.push(moduleNames[f.module]);
  }
  if (f.dataSource !== 'all') {
    active.push(f.dataSource === 'uc' ? 'UC Reports Only' : 'UA Reports Only');
  }
  if (f.dateRange !== '30days') {
    const rangeNames = { 
      '7days': 'Last 7 days', 
      '3months': 'Last 3 months' 
    };
    active.push(rangeNames[f.dateRange]);
  }
  return active;
};

const hasNoData = (d) => isNoData(d.accuracyRates) || isNoData(d.aiModuleUsage);

/* ---------- data helpers ---------- */
function getBaseData() {
  return {
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
      { name: 'Offense Code', value: 1.2, color: '#059669' },
      { name: 'Keyword Tagging', value: 0.8, color: '#3b82f6' },
      { name: 'Risk Prediction', value: 3.5, color: '#8b5cf6' },
      { name: 'Overall Average', value: 2.8, color: '#f59e0b' }
    ],
    riskTrends: [
      { period: 'Week 1', predictions: 45 },
      { period: 'Week 2', predictions: 52 },
      { period: 'Week 3', predictions: 48 },
      { period: 'Week 4', predictions: 61 },
      { period: 'Week 5', predictions: 58 }
    ],
    aiTrends: [
      { name: 'January', processed: 156, accuracy: 85, failures: 8, avgTime: 2.9 },
      { name: 'February', processed: 189, accuracy: 88, failures: 6, avgTime: 2.7 },
      { name: 'March', processed: 203, accuracy: 89, failures: 4, avgTime: 2.6 },
      { name: 'April', processed: 234, accuracy: 91, failures: 5, avgTime: 2.4 },
      { name: 'May', processed: 265, accuracy: 93, failures: 3, avgTime: 2.2 },
      { name: 'June', processed: 298, accuracy: 94, failures: 2, avgTime: 2.1 }
    ]
  };
}

function applyFilters(filters) {
  const base = getBaseData();
  
  // Simulate filtering effects
  if (filters.module === 'offense') {
    base.aiStats.totalProcessed = Math.floor(base.aiStats.totalProcessed * 0.6);
    base.aiStats.ucProcessed = Math.floor(base.aiStats.ucProcessed * 0.7);
    base.aiStats.uaProcessed = Math.floor(base.aiStats.uaProcessed * 0.5);
    base.accuracyRates = base.accuracyRates.filter(item => item.name === 'Offense Code Suggestion');
  } else if (filters.module === 'keyword') {
    base.aiStats.totalProcessed = Math.floor(base.aiStats.totalProcessed * 0.7);
    base.accuracyRates = base.accuracyRates.filter(item => item.name === 'Keyword Tagging');
  } else if (filters.module === 'risk') {
    base.aiStats.totalProcessed = Math.floor(base.aiStats.totalProcessed * 0.5);
    base.accuracyRates = base.accuracyRates.filter(item => item.name === 'Risk Prediction');
  }
  
  if (filters.dataSource === 'uc') {
    base.aiStats.totalProcessed = base.aiStats.ucProcessed;
    base.aiStats.uaProcessed = 0;
  } else if (filters.dataSource === 'ua') {
    base.aiStats.totalProcessed = base.aiStats.uaProcessed;
    base.aiStats.ucProcessed = 0;
  }
  
  if (filters.dateRange === '7days') {
    base.aiStats.totalProcessed = Math.floor(base.aiStats.totalProcessed * 0.3);
    base.aiTrends = base.aiTrends.slice(-2);
  } else if (filters.dateRange === '3months') {
    base.aiTrends = base.aiTrends.slice(-3);
  }
  
  // Check for no data scenarios
  if (base.aiStats.totalProcessed === 0 || base.accuracyRates.length === 0) {
    base.accuracyRates = [{ name: 'No Data', value: 0, color: '#9ca3af' }];
    base.aiModuleUsage = [{ name: 'No Data', value: 0, color: '#9ca3af' }];
  }
  
  return base;
}

export default ITAdminDashboard;