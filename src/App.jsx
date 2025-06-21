import { useLocation } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/";

  if (isLogin) {
    return (
      <main style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden"
      }}>
        <AppRoutes />
      </main>
    );
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",             // ✅ BLOCK horizontal scroll
      boxSizing: "border-box"
    }}>
      {/* Sidebar */}
      <div style={{
        width: "260px",
        backgroundColor: "#fff",
        height: "100vh",
        flexShrink: 0
      }}>
        <Sidebar />
      </div>

      {/* Main Area */}
      <div style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",            // ✅ Prevent horizontal scroll in main area
        backgroundColor: "#f8fafc"
      }}>
        {/* Navbar */}
        <div style={{
          height: "70px",
          backgroundColor: "#fff",
          flexShrink: 0
        }}>
          <Navbar />
        </div>

        {/* Page Content */}
        <main style={{
          flexGrow: 1,
          padding: "32px",
          overflowY: "auto",
          overflowX: "hidden",         // ✅ 👈 KEY FIX to block right scroll
          boxSizing: "border-box",
          maxWidth: "100%",            // ✅ Prevent wider than screen
        }}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
