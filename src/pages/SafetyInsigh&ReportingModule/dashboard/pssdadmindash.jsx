import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Calendar,
  MapPin,
  TrendingUp,
  FileText,
  Clock,
  Users,
  RotateCcw,
  Filter,
  PieChart,
  BarChart3,
  CheckCircle,
  XCircle,
  Shield,
  Target,
  Bot,
  Eye,
  AlertOctagon,
  User,
  RefreshCw
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
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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
const PSSDOfficerDashboard = () => {
  /* ---------------- state ---------------- */
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: '30days',
    location: 'all'
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
    }, 500);
  };

  const resetFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setFilters({ reportType: 'all', dateRange: '30days', location: 'all' });
      setData(getBaseData());
      setError(null);
      setLoading(false);
    }, 300);
  };

  /* ---------------- derived helpers ---------------- */
  const riskMetrics = (() => {
    const totalReports = data.stats.totalUC + data.stats.totalUA;
    const criticalAndHigh = data.riskLevels
      .filter(level => level.name === 'Critical' || level.name === 'High')
      .reduce((sum, level) => sum + level.value, 0);
    const riskPercentage = totalReports > 0 ? Math.round((criticalAndHigh / totalReports) * 100) : 0;
    const avgRiskScore = data.trends.length > 0 
      ? (data.trends.reduce((sum, week) => sum + week.riskScore, 0) / data.trends.length).toFixed(1)
      : '0.0';
    const approvalRate = totalReports > 0 ? Math.round((data.stats.approved / totalReports) * 100) : 0;
    
    return { totalReports, riskPercentage, avgRiskScore, criticalAndHigh, approvalRate };
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

      {/* Risk Assessment Overview */}
      <RiskOverviewSection metrics={riskMetrics} stats={data.stats} />

      {/* Officer Actions */}
      {/* <OfficerActions /> */}

      {/* Stat cards */}
      <StatGrid stats={data.stats} />

      {/* charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 32
        }}
      >
        <ChartCard title="Report Type Distribution" icon={<BarChart3 size={20} color="#061978" />}>
          <ReportTypeChart data={data.reportTypes} />
        </ChartCard>

        <ChartCard title="Report Status Overview" icon={<PieChart size={20} color="#061978" />}>
          <StatusChart data={data.statusDistribution} />
        </ChartCard>

        <ChartCard title="Risk Level Analysis" icon={<Shield size={20} color="#061978" />}>
          <RiskChart data={data.riskLevels} />
        </ChartCard>

        <ChartCard title="AI Recommendations" icon={<Bot size={20} color="#061978" />}>
          <AIRecommendationsChart data={data.aiRecommendations} />
        </ChartCard>
      </div>

      <ChartCard title="Weekly Trends & Risk Assessment" icon={<TrendingUp size={20} color="#061978" />}>
        <TrendChart data={data.trends} />
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
        <Shield size={36} color="#fff" />
      </div>
      <div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#061978', margin: 0, letterSpacing: '-0.025em' }}>
          Welcome PSSD Officer!
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', margin: '8px 0 0', fontWeight: 500 }}>
          Monitor incident trends, assess workplace risks, and make data-informed safety decisions
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
        Filter Dashboard Data
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
        label="Report Type"
        icon={<FileText size={18} />}
        value={filters.reportType}
        onChange={(v) => onChange('reportType', v)}
        options={[
          ['all', 'All Reports'],
          ['uc', 'Unsafe Condition (UC)'],
          ['ua', 'Unsafe Action (UA)']
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
          ['3months', 'Last 3 months'],
          ['6months', 'Last 6 months']
        ]}
      />

      <Select
        label="Location"
        icon={<MapPin size={18} />}
        value={filters.location}
        onChange={(v) => onChange('location', v)}
        options={[
          ['all', 'All Locations'],
          ['factory', 'Factory Floor'],
          ['warehouse', 'Warehouse'],
          ['office', 'Office'],
          ['loading', 'Loading Dock']
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
        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
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
        msg="Loading dashboard data..." 
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

/* ---------- Risk Overview Section ---------- */
const RiskOverviewSection = ({ metrics, stats }) => (
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
      <Target size={32} />
      <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Risk Assessment Overview</h3>
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
      <KPI icon={<AlertTriangle size={24} />} label="High/Critical Risk Reports" value={`${metrics.riskPercentage}%`}>
        {metrics.criticalAndHigh} out of {metrics.totalReports} reports
      </KPI>
      <KPI icon={<TrendingUp size={24} />} label="Average Risk Score" value={metrics.avgRiskScore}>
        Based on recent trends
      </KPI>
      <KPI icon={<Bot size={24} />} label="AI Recommendations" value={stats.aiRecommendations}>
        Pending safety actions
      </KPI>
      <KPI icon={<Clock size={24} />} label="Pending Reviews" value={stats.pending}>
        Require officer attention
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

/* ---------- Officer Actions ---------- */
const OfficerActions = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 24,
      marginBottom: 40
    }}
  >
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
  </div>
);

const ActionButton = ({ title, subtitle, color, icon, onClick }) => (
  <div
    style={{
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      borderRadius: 20,
      padding: 28,
      textAlign: 'center',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 20px 40px -10px ${color}40`,
      border: `1px solid ${color}20`
    }}
    onClick={onClick}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = `0 30px 50px -10px ${color}60`;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `0 20px 40px -10px ${color}40`;
    }}
  >
    <div style={{ marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 16, opacity: 0.95, fontWeight: 500 }}>{subtitle}</div>
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
      title="Total UC Reports"
      value={stats.totalUC}
      subtitle="Unsafe Conditions"
      color="#dc2626"
      icon={<AlertTriangle size={28} />}
    />
    <StatCard
      title="Total UA Reports"
      value={stats.totalUA}
      subtitle="Unsafe Actions"
      color="#ea580c"
      icon={<User size={28} />}
    />
    <StatCard
      title="Pending Review"
      value={stats.pending}
      subtitle="Awaiting decision"
      color="#eab308"
      icon={<Clock size={28} />}
    />
    <StatCard
      title="Approved Reports"
      value={stats.approved}
      subtitle="Processed & approved"
      color="#16a34a"
      icon={<CheckCircle size={28} />}
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

const ReportTypeChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No report type data available" icon={<BarChart3 size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Reports',
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
        callbacks: { label: (ctx) => `${ctx.raw} reports` },
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

const StatusChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No status data available" icon={<PieChart size={48} />} />;

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

const RiskChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No risk data available" icon={<Shield size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Risk Level',
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
        callbacks: { label: (ctx) => `${ctx.raw} reports` },
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

const AIRecommendationsChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No AI recommendations available" icon={<Bot size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Actions',
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
    indexAxis: 'y',
    plugins: { 
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.raw} actions` },
        backgroundColor: '#fff',
        titleColor: '#061978',
        bodyColor: '#061978',
        borderColor: '#061978',
        borderWidth: 1
      }
    },
    scales: { 
      x: { 
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { family: 'Poppins' } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Poppins', size: 10 } }
      }
    }
  };
  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={opts} />
    </div>
  );
};

const TrendChart = ({ data }) => {
  if (!data || data.length === 0) return <NoData msg="No trend data available" icon={<TrendingUp size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'UC Reports',
        data: data.map((d) => d.UC),
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
        label: 'UA Reports',
        data: data.map((d) => d.UA),
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
        data: data.map((d) => d.total),
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
        data: data.map((d) => d.riskScore),
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
  };

  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
        position: 'right',
        title: {
          display: true,
          text: 'Risk Score',
          color: '#374151',
          font: { family: 'Poppins', weight: '600' }
        },
        grid: {
          drawOnChartArea: false,
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
    <div style={{ height: '400px' }}>
      <Line data={chartData} options={opts} />
      
      {/* Trends Summary */}
      {/* <div style={{
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
            <span>Latest: {data[data.length - 1].total} reports</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={16} />
            <span>Current Risk: {data[data.length - 1].riskScore}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} />
            <span>Peak: {data.reduce((max, item) => item.total > max.total ? item : max).name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={16} />
            <span>Avg Risk: {(data.reduce((sum, item) => sum + item.riskScore, 0) / data.length).toFixed(1)}</span>
          </div>
        </div>
      </div> */}
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
  if (f.reportType !== 'all') {
    active.push(f.reportType === 'uc' ? 'Unsafe Conditions' : 'Unsafe Actions');
  }
  if (f.dateRange !== '30days') {
    const rangeNames = { 
      '7days': 'Last 7 days', 
      '3months': 'Last 3 months',
      '6months': 'Last 6 months'
    };
    active.push(rangeNames[f.dateRange]);
  }
  if (f.location !== 'all') {
    const locationNames = {
      'factory': 'Factory Floor',
      'warehouse': 'Warehouse', 
      'office': 'Office',
      'loading': 'Loading Dock'
    };
    active.push(locationNames[f.location]);
  }
  return active;
};

const hasNoData = (d) => isNoData(d.reportTypes) || isNoData(d.statusDistribution);

/* ---------- data helpers ---------- */
function getBaseData() {
  return {
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
  };
}

function applyFilters(filters) {
  const base = getBaseData();
  
  // Apply report type filter
  if (filters.reportType === 'uc') {
    base.reportTypes = [{ name: 'Unsafe Condition', value: 23, color: '#dc2626' }];
    base.stats.totalUA = 0;
  } else if (filters.reportType === 'ua') {
    base.reportTypes = [{ name: 'Unsafe Action', value: 18, color: '#ea580c' }];
    base.stats.totalUC = 0;
  }

  // Apply location filter
  if (filters.location !== 'all') {
    const locationMap = {
      'factory': 'Factory Floor',
      'warehouse': 'Warehouse',
      'office': 'Office',
      'loading': 'Loading Dock'
    };
    const selectedLocation = locationMap[filters.location];
    base.locationData = base.locationData.filter(item => 
      item.name === selectedLocation
    );
    if (base.locationData.length === 0) {
      base.locationData = [{ name: 'No Data', value: 0 }];
    }
  }

  // Apply date range filter
  if (filters.dateRange === '7days') {
    base.trends = [
      { name: 'Day 1', UC: 2, UA: 1, total: 3, riskScore: 5.5 },
      { name: 'Day 2', UC: 3, UA: 2, total: 5, riskScore: 6.2 },
      { name: 'Day 3', UC: 1, UA: 3, total: 4, riskScore: 4.8 },
      { name: 'Day 4', UC: 4, UA: 2, total: 6, riskScore: 7.1 }
    ];
  } else if (filters.dateRange === '3months') {
    base.trends = [
      { name: 'Month 1', UC: 25, UA: 18, total: 43, riskScore: 6.8 },
      { name: 'Month 2', UC: 20, UA: 15, total: 35, riskScore: 6.2 },
      { name: 'Month 3', UC: 28, UA: 22, total: 50, riskScore: 7.5 }
    ];
  }

  return base;
}

export default PSSDOfficerDashboard;