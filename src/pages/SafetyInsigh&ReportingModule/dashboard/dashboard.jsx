import StaffDash from './staffdash';
import PssdAdminDash from './pssdadmindash';
import UcuaAdminDash from './ucuaadmindash';
import ItAdminDash from './itadmindash';

export default function Dashboard() {
  const role = localStorage.getItem('userRole');

  switch (role) {
    case 'staff':
      return <StaffDash />;
    case 'pssd':
      return <PssdAdminDash />;
    case 'ucuaadmin':
      return <UcuaAdminDash />;
    case 'itadmin':
      return <ItAdminDash />;
    default:
      return <div className="text-center text-red-500 mt-20">Invalid role or not logged in</div>;
  }
}
