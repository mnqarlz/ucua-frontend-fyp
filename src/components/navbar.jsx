import { Box, IconButton, InputBase, Badge, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";

export default function Navbar() {
  const userRole = localStorage.getItem("userRole") || "staff";

  const roleMap = {
    staff: { name: "Staff", label: "Reporter" },
    pssd: { name: "PSSD Officer", label: "Reviewer" },
    ucuaadmin: { name: "UCUA Admin", label: "Administrator" },
    itadmin: { name: "IT Admin", label: "AI Manager" },
  };

  const currentUser = roleMap[userRole.toLowerCase()] || {
    name: "User",
    label: "Role",
  };

  return (
    <Box
      sx={{
        height: 64,
        width: "calc(100vw - 280px)",
        px: 3,
        py: 6,
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 280,
        zIndex: 1200,
        boxSizing: "border-box",
      }}
    >
      {/* Search Input */}
      <Box sx={{ position: "relative", display: "flex", alignItems: "center", width: 320 }}>
        <SearchIcon
          sx={{
            position: "absolute",
            left: 12,
            color: "#64748b",
            fontSize: 20,
            zIndex: 1,
          }}
        />
        <InputBase
          placeholder="Search here..."
          sx={{
            pl: 5,
            pr: 2,
            py: 1.5,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#f1f5f9",
              borderColor: "#cbd5e1",
            },
            "&.Mui-focused": {
              bgcolor: "#ffffff",
              borderColor: "#140F98",
              boxShadow: "0 0 0 3px rgba(20, 15, 152, 0.1)",
            },
          }}
        />
      </Box>

      {/* Right Side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          sx={{
            width: 44,
            height: 44,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#140F98",
              borderColor: "#140F98",
              "& .MuiSvgIcon-root": { color: "white" },
            },
          }}
        >
          <Badge variant="dot" color="error" sx={{ "& .MuiBadge-dot": { width: 8, height: 8 } }}>
            <NotificationsIcon sx={{ color: "#475569", fontSize: 20 }} />
          </Badge>
        </IconButton>

        <IconButton
          sx={{
            width: 44,
            height: 44,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#140F98",
              borderColor: "#140F98",
              "& .MuiSvgIcon-root": { color: "white" },
            },
          }}
        >
          <Badge variant="dot" color="error" sx={{ "& .MuiBadge-dot": { width: 8, height: 8 } }}>
            <MailIcon sx={{ color: "#475569", fontSize: 20 }} />
          </Badge>
        </IconButton>

        {/* Avatar & User Info */}
        <Box
          sx={{
            ml: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#f1f5f9",
              borderColor: "#cbd5e1",
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#140F98",
              width: 36,
              height: 36,
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: "white",
            }}
          >
            {currentUser.name.charAt(0)}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Box
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {currentUser.name}
            </Box>
            <Box
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                color: "#64748b",
                mt: 0.5,
              }}
            >
              {currentUser.label}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
