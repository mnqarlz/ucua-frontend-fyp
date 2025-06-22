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

// PSSD Officer – Review & Feedback Module
import PssdUCList from '../pages/Review&FeedbackModule/pssdUCList';
import PssdUAList from '../pages/Review&FeedbackModule/pssdUAList';
import PssdViewUC from '../pages/Review&FeedbackModule/pssdViewUC';
import PssdViewUA from '../pages/Review&FeedbackModule/pssdViewUA';
import PssdEditUC from '../pages/Review&FeedbackModule/pssdEditUC';
import PssdEditUA from '../pages/Review&FeedbackModule/pssdEditUA';
import PssdLogUC from '../pages/Review&FeedbackModule/pssdLogUC';
import PssdLogUA from '../pages/Review&FeedbackModule/pssdLogUA';

// PSSD Officer – Safety Pattern Analysis
import UCUATrends from '../pages/SafetyInsigh&ReportingModule/analyzetrends/ucuaTrends';

// UCUA Admin – View-Only Report List
import UCUAAdminReportList from '../pages/UCUAReportingModule/adminViewAll';

// UCUA Admin – Manage Users
import ListUser from '../pages/AdminModule/ManageUser/listUser';
import AddUser from '../pages/AdminModule/ManageUser/addUser';
import EditUser from '../pages/AdminModule/ManageUser/editUser';
import ViewUser from '../pages/AdminModule/ManageUser/viewUser';

// UCUA Admin – Report Generation
import ReportGen from '../pages/SafetyInsigh&ReportingModule/ReportGeneration/reportGen';
// import ReportExp from '../pages/SafetyInsigh&ReportingModule/ReportGeneration/reportExp';

// UCUA Admin – Manage User Permissions
import UserPermission from '../pages/AdminModule/ManageRolePermission/featureList';


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

      {/* PSSD Officer – Review & Feedback */}
      <Route path="/pssd-uc-list" element={<PssdUCList />} />
      <Route path="/pssd-ua-list" element={<PssdUAList />} />
      <Route path="/pssd-view-uc/:id" element={<PssdViewUC />} />
      <Route path="/pssd-view-ua/:id" element={<PssdViewUA />} />
      <Route path="/pssd-edit-uc/:id" element={<PssdEditUC />} />
      <Route path="/pssd-edit-ua/:id" element={<PssdEditUA />} />
      <Route path="/pssd-log-uc/:id" element={<PssdLogUC />} />
      <Route path="/pssd-log-ua/:id" element={<PssdLogUA />} />

      {/* PSSD Officer – Safety Pattern Analysis */}
      <Route path="/safety-pattern-analysis" element={<UCUATrends />} />

      {/* UCUA Admin – View-Only */}
      <Route path="/ucua-admin-reports" element={<UCUAAdminReportList />} />

      {/* UCUA Admin – User Management */}
      <Route path="/user-management" element={<ListUser />} />
      <Route path="/user/add" element={<AddUser />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      <Route path="/user/view/:id" element={<ViewUser />} />

      {/* UCUA Admin – Manage User Permissions */}
      <Route path="/user-permission" element={<UserPermission />} />

      {/* UCUA Admin – Report Generation */}
      <Route path="/report-generation" element={<ReportGen />} />
      {/* <Route path="/report-export" element={<ReportExp />} /> */}

    </Routes>
  );
}
