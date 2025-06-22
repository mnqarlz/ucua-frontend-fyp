// src/pages/Dashboard.jsx
import StaffDash from './staffdash';
import PSSDOfficerDashboard from './pssdadmindash';
import UcuaAdminDash from './ucuaadmindash';
import ItAdminDash from './itadmindash';

export default function Dashboard() {
  const role = localStorage.getItem('userRole');

  // Wrapper styling for all dashboard components
  const DashboardWrapper = ({ children }) => (
    <div style={{
      width: "100%",
      minHeight: "100%",
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      {children}
    </div>
  );

  switch (role) {
    case 'staff':
      return (
        <DashboardWrapper>
          <StaffDash />
        </DashboardWrapper>
      );
    case 'pssd':
      return (
        <DashboardWrapper>
          <PSSDOfficerDashboard />
        </DashboardWrapper>
      );
    case 'ucuaadmin':
      return (
        <DashboardWrapper>
          <UcuaAdminDash />
        </DashboardWrapper>
      );
    case 'itadmin':
      return (
        <DashboardWrapper>
          <ItAdminDash />
        </DashboardWrapper>
      );
    default:
      return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          backgroundColor: "white",
          borderRadius: "12px",
          color: "#ef4444",
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          fontWeight: 500,
        }}>
          Invalid role or not logged in
        </div>
      );
  }
}