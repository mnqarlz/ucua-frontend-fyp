import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const role = localStorage.getItem('userRole');
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">UCUA</h2>
      <nav className="flex flex-col space-y-2">
        {role === 'staff' && (
          <>
            <SidebarLink to="/dashboard" label="Dashboard" isActive={isActive('/dashboard')} />
            <SidebarLink to="/submit-uc" label="Submit UC Report" isActive={isActive('/submit-uc')} />
            <SidebarLink to="/submit-ua" label="Submit UA Report" isActive={isActive('/submit-ua')} />
            <SidebarLink to="/reports" label="My Reports" isActive={isActive('/reports')} />
          </>
        )}

        {role === 'pssd' && (
          <>
            <SidebarLink to="/dashboard" label="Dashboard" isActive={isActive('/dashboard')} />
            <SidebarLink to="/review" label="Review Reports" isActive={isActive('/review')} />
            <SidebarLink to="/analytics" label="Risk Analytics" isActive={isActive('/analytics')} />
          </>
        )}

        {role === 'ucuaadmin' && (
          <>
            <SidebarLink to="/dashboard" label="Dashboard" isActive={isActive('/dashboard')} />
            <SidebarLink to="/all-reports" label="View All Reports" isActive={isActive('/all-reports')} />
            <SidebarLink to="/export" label="Export Reports" isActive={isActive('/export')} />
          </>
        )}

        {role === 'itadmin' && (
          <>
            <SidebarLink to="/dashboard" label="Dashboard" isActive={isActive('/dashboard')} />
            <SidebarLink to="/users" label="Manage Users" isActive={isActive('/users')} />
            <SidebarLink to="/training" label="Train AI Models" isActive={isActive('/training')} />
          </>
        )}
      </nav>
    </div>
  );
}

function SidebarLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded ${
        isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
      } transition`}
    >
      {label}
    </Link>
  );
}
