import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Clock,
  RotateCcw,
  Filter,
  PieChart,
  BarChart3,
  CheckCircle,
  XCircle,
  Shield,
  Settings,
  Eye,
  Database,
  User,
  RefreshCw,
  UserCheck,
  UserCog,
  BarChart2
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
const UCUAAdminDashboard = () => {
  /* ---------------- state ---------------- */
  const [filters, setFilters] = useState({
    userRole: 'all',
    dateRange: '30days',
    reportType: 'all'
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
      setFilters({ userRole: 'all', dateRange: '30days', reportType: 'all' });
      setData(getBaseData());
      setError(null);
      setLoading(false);
    }, 300);
  };

  /* ---------------- derived helpers ---------------- */
  const systemMetrics = (() => {
    const totalUsers = data.userStats.totalUsers;
    const activeUsers = data.userActivity.find(a => a.name === 'Active Today')?.value || 0;
    const activeRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
    const totalReports = data.safetyTrends.reduce((sum, trend) => sum + trend.total, 0);
    const adminUsers = data.userStats.ucuaAdmins + data.userStats.itAdmins;
    
    return { totalUsers, activeRate, totalReports, adminUsers };
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

      {/* System Overview Section */}
      <SystemOverviewSection metrics={systemMetrics} stats={data.userStats} />

      {/* Admin Actions */}
      {/* <AdminActions /> */}

      {/* Stat cards */}
      <StatGrid stats={data.userStats} />

      {/* charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 32
        }}
      >
        <ChartCard title="Users by Role" icon={<Users size={20} color="#061978" />}>
          <UserRoleChart data={data.usersByRole} />
        </ChartCard>

        <ChartCard title="User Activity Overview" icon={<Activity size={20} color="#061978" />}>
          <UserActivityChart data={data.userActivity} />
        </ChartCard>

        <ChartCard title="UC/UA Reports by Module" icon={<BarChart3 size={20} color="#061978" />}>
          <ModuleReportsChart data={data.reportsByModule} />
        </ChartCard>

        <ChartCard title="System Performance" icon={<Database size={20} color="#061978" />}>
          <SystemPerformanceChart data={data.userActivity} />
        </ChartCard>
      </div>

      <ChartCard title="Safety Trends - Monthly/Weekly Analysis" icon={<TrendingUp size={20} color="#061978" />}>
        <SafetyTrendsChart data={data.safetyTrends} />
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
          Welcome UCUA Admin!
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', margin: '8px 0 0', fontWeight: 500 }}>
          Monitor system usage, user activity, and safety performance trends
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
        label="User Role"
        icon={<Users size={18} />}
        value={filters.userRole}
        onChange={(v) => onChange('userRole', v)}
        options={[
          ['all', 'All Users'],
          ['staff', 'Staff'],
          ['pssd', 'PSSD Officer'],
          ['ucua', 'UCUA Admin'],
          ['it', 'IT Admin']
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

/* ---------- System Overview Section ---------- */
const SystemOverviewSection = ({ metrics, stats }) => (
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
      <Database size={32} />
      <h3 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>System Management Overview</h3>
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
      <KPI icon={<Users size={24} />} label="Total Registered Users" value={metrics.totalUsers}>
        Across all user roles
      </KPI>
      <KPI icon={<UserCheck size={24} />} label="User Activity Rate" value={`${metrics.activeRate}%`}>
        Active users today
      </KPI>
      <KPI icon={<BarChart2 size={24} />} label="Total Safety Reports" value={metrics.totalReports}>
        UC & UA reports combined
      </KPI>
      <KPI icon={<UserCog size={24} />} label="Admin Users" value={metrics.adminUsers}>
        UCUA & IT administrators
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

/* ---------- Admin Actions ---------- */
// const AdminActions = () => (
//   <div
//     style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: 24,
//       marginBottom: 40
//     }}
//   >
//     <ActionButton
//       title="User Management"
//       subtitle="Manage user accounts & roles"
//       color="#3b82f6"
//       icon={<Users size={24} />}
//       onClick={() => console.log('Navigate to user management')}
//     />
//     <ActionButton
//       title="System Settings"
//       subtitle="Configure system parameters"
//       color="#8b5cf6"
//       icon={<Settings size={24} />}
//       onClick={() => console.log('Navigate to system settings')}
//     />
//     <ActionButton
//       title="View All Reports"
//       subtitle="Access comprehensive reports"
//       color="#059669"
//       icon={<Eye size={24} />}
//       onClick={() => console.log('Navigate to all reports')}
//     />
//     <ActionButton
//       title="System Analytics"
//       subtitle="Advanced system metrics"
//       color="#dc2626"
//       icon={<BarChart3 size={24} />}
//       onClick={() => console.log('Navigate to analytics')}
//     />
//   </div>
// );

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
      title="Total Users"
      value={stats.totalUsers}
      subtitle="Registered in system"
      color="#059669"
      icon={<Users size={28} />}
    />
    <StatCard
      title="Staff Users"
      value={stats.staffUsers}
      subtitle="Active staff members"
      color="#3b82f6"
      icon={<User size={28} />}
    />
    <StatCard
      title="PSSD Officers"
      value={stats.pssdUsers}
      subtitle="Safety officers"
      color="#8b5cf6"
      icon={<Shield size={28} />}
    />
    <StatCard
      title="Admin Users"
      value={stats.ucuaAdmins + stats.itAdmins}
      subtitle="UCUA + IT Admins"
      color="#f59e0b"
      icon={<Settings size={28} />}
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

const UserRoleChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No user role data available" icon={<Users size={48} />} />;

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

const UserActivityChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No activity data available" icon={<Activity size={48} />} />;

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Users',
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
        callbacks: { label: (ctx) => `${ctx.raw} users` },
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

const ModuleReportsChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No module report data available" icon={<BarChart3 size={48} />} />;

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

const SystemPerformanceChart = ({ data }) => {
  if (isNoData(data)) return <NoData msg="No system performance data available" icon={<Database size={48} />} />;

  // Transform activity data into performance metrics
  const performanceData = [
    { name: 'Active Users', value: data.find(d => d.name === 'Active Today')?.value || 0, color: '#16a34a' },
    { name: 'Weekly Active', value: data.find(d => d.name === 'Last 7 Days')?.value || 0, color: '#3b82f6' },
    { name: 'Monthly Active', value: data.find(d => d.name === 'Last 30 Days')?.value || 0, color: '#8b5cf6' },
    { name: 'Inactive Users', value: data.find(d => d.name === 'Inactive >30 Days')?.value || 0, color: '#dc2626' }
  ];

  const chartData = {
    labels: performanceData.map((d) => d.name),
    datasets: [
      {
        label: 'System Performance',
        data: performanceData.map((d) => d.value),
        backgroundColor: performanceData.map((d) => d.color),
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
        callbacks: { label: (ctx) => `${ctx.raw} users` },
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
        ticks: { color: '#6b7280', font: { family: 'Poppins', size: 11 } }
      }
    }
  };
  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={opts} />
    </div>
  );
};

const SafetyTrendsChart = ({ data }) => {
  if (!data || data.length === 0) return <NoData msg="No safety trend data available" icon={<TrendingUp size={48} />} />;

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
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <div style={{ height: '350px', width: '100%' }}>
        <Line data={chartData} options={opts} />
      </div>
      
      {/* Trends Summary - Properly Contained */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(6, 25, 120, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(6, 25, 120, 0.1)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{ 
          fontSize: '12px', 
          color: '#061978', 
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          width: '100%'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            flex: '1',
            minWidth: '100px',
            justifyContent: 'center'
          }}>
            <TrendingUp size={14} />
            <span style={{ fontSize: '11px' }}>Latest: {data[data.length - 1].total}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            flex: '1',
            minWidth: '100px',
            justifyContent: 'center'
          }}>
            <Activity size={14} />
            <span style={{ fontSize: '11px' }}>Peak: {data.reduce((max, item) => item.total > max.total ? item : max).name}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            flex: '1',
            minWidth: '100px',
            justifyContent: 'center'
          }}>
            <BarChart3 size={14} />
            <span style={{ fontSize: '11px' }}>Total: {data.reduce((sum, item) => sum + item.total, 0)}</span>
          </div>
        </div>
      </div>
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
  if (f.userRole !== 'all') {
    const roleNames = { 
      'staff': 'Staff', 
      'pssd': 'PSSD Officer',
      'ucua': 'UCUA Admin',
      'it': 'IT Admin'
    };
    active.push(roleNames[f.userRole]);
  }
  if (f.dateRange !== '30days') {
    const rangeNames = { 
      '7days': 'Last 7 days', 
      '3months': 'Last 3 months'
    };
    active.push(rangeNames[f.dateRange]);
  }
  if (f.reportType !== 'all') {
    active.push(f.reportType === 'uc' ? 'UC Reports' : 'UA Reports');
  }
  return active;
};

const hasNoData = (d) => isNoData(d.usersByRole) || isNoData(d.userActivity);

/* ---------- data helpers ---------- */
function getBaseData() {
  return {
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
  };
}

function applyFilters(filters) {
  const base = getBaseData();
  
  // Apply user role filter
  if (filters.userRole !== 'all') {
    const roleMap = {
      'staff': 'Staff',
      'pssd': 'PSSD Officer',
      'ucua': 'UCUA Admin',
      'it': 'IT Admin'
    };
    const selectedRole = roleMap[filters.userRole];
    base.usersByRole = base.usersByRole.filter(item => item.name === selectedRole);
    if (base.usersByRole.length === 0) {
      base.usersByRole = [{ name: 'No Data', value: 0, color: '#6b7280' }];
    }
  }

  // Apply report type filter
  if (filters.reportType === 'uc') {
    base.safetyTrends = base.safetyTrends.map(item => ({
      ...item,
      UA: 0,
      total: item.UC
    }));
  } else if (filters.reportType === 'ua') {
    base.safetyTrends = base.safetyTrends.map(item => ({
      ...item,
      UC: 0,
      total: item.UA
    }));
  }

  // Apply date range filter (modify data accordingly)
  if (filters.dateRange === '7days') {
    base.safetyTrends = [
      { name: 'Day 1', UC: 2, UA: 1, total: 3 },
      { name: 'Day 2', UC: 3, UA: 2, total: 5 },
      { name: 'Day 3', UC: 1, UA: 2, total: 3 },
      { name: 'Day 4', UC: 4, UA: 1, total: 5 }
    ];
  } else if (filters.dateRange === '3months') {
    base.safetyTrends = [
      { name: 'Month 1', UC: 45, UA: 28, total: 73 },
      { name: 'Month 2', UC: 38, UA: 32, total: 70 },
      { name: 'Month 3', UC: 52, UA: 35, total: 87 }
    ];
  }

  return base;
}

export default UCUAAdminDashboard;