import { Routes, Route } from 'react-router-dom';

// Core pages
import Login from '../login';
import Dashboard from '../pages/SafetyInsigh&ReportingModule/dashboard/dashboard';

// Staff – UCUA Reporting Module
import SubmitUC from '../pages/UCUAReportingModule/submitUC';
import SubmitUA from '../pages/UCUAReportingModule/submitUA';
import UCList from '../pages/UCUAReportingModule/ucList';
import UAList from '../pages/UCUAReportingModule/uaList';
import UCUAAllList from '../pages/UCUAReportingModule/ucuaAllList';
import ViewUC from '../pages/UCUAReportingModule/viewUC';
import ViewUA from '../pages/UCUAReportingModule/viewUA';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Staff Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Staff – UCUA Reporting */}
      <Route path="/submit-uc" element={<SubmitUC />} />
      <Route path="/submit-ua" element={<SubmitUA />} />
      <Route path="/uc-reports" element={<UCList />} />
      <Route path="/ua-reports" element={<UAList />} />
      <Route path="/all-reports" element={<UCUAAllList />} />
      <Route path="/view-uc/:id" element={<ViewUC />} />
      <Route path="/view-ua/:id" element={<ViewUA />} />
    </Routes>
  );
}
