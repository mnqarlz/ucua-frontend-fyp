import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === '/';

  return (
    <div className="flex">
      {!isLogin && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!isLogin && <Navbar />}
        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
