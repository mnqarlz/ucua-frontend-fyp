import { Routes, Route } from 'react-router-dom';
import Login from '../login';
import Dashboard from '../pages/SafetyInsigh&ReportingModule/dashboard/dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
