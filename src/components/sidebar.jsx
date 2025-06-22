import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import InsightsIcon from "@mui/icons-material/Insights";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const role = localStorage.getItem("userRole");
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    ucuaForm: false,
    reportList: false,
    ucuaReport: false,
  });

  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const StyledLink = ({ to, label }) => {
    const active = isActive(to);

    return (
      <ListItemButton
        component={Link}
        to={to}
        sx={{
          pl: 4,
          py: 1.2,
          mx: 1,
          mb: 0.5,
          borderRadius: 1.5,
          transition: "all 0.2s ease",
          backgroundColor: active ? "#140F98" : "transparent",
          color: active ? "white" : "#475569",
          "&:hover": {
            backgroundColor: "#140F98",
            color: "white",
          },
        }}
      >
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: active ? "white" : "#64748b",
          }}
        />
      </ListItemButton>
    );
  };

  const SectionButton = ({ icon: Icon, title, isOpen, onClick }) => (
    <ListItemButton
      onClick={onClick}
      sx={{
        py: 1.5,
        px: 2,
        mx: 1,
        mb: 0.5,
        borderRadius: 2,
        bgcolor: "white",
        color: "#475569",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#140F98",
          color: "white",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(20, 15, 152, 0.3)",
          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 40,
          color: "#64748b",
          transition: "color 0.2s ease",
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </ListItemIcon>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
        }}
      />
      {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItemButton>
  );

  const NavButton = ({ to, icon: Icon, title }) => {
    const active = isActive(to);

    return (
      <ListItemButton
        component={Link}
        to={to}
        sx={{
          py: 1.5,
          px: 2,
          mx: 1,
          mb: 1,
          borderRadius: 2,
          backgroundColor: active ? "#140F98" : "white",
          color: active ? "white" : "#475569",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#140F98",
            color: "white",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(20, 15, 152, 0.2)",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: active ? "white" : "#64748b",
            transition: "color 0.2s ease",
          }}
        >
          <Icon sx={{ fontSize: 22 }} />
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
          }}
        />
      </ListItemButton>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          bgcolor: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1300, // Higher than navbar
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 3, bgcolor: "white", borderBottom: "1px solid #e2e8f0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              bgcolor: "#140F98",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(20, 15, 152, 0.3)",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              U
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#1e293b",
                lineHeight: 1.2,
              }}
            >
              UCUA Safety
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#1e293b",
                lineHeight: 1.2,
              }}
            >
              Reporting System
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List sx={{ p: 0 }}>
          <NavButton to="/dashboard" icon={DashboardIcon} title="Dashboard" />

          {role === "staff" && (
            <>
              <SectionButton
                icon={DescriptionIcon}
                title="UCUA Form"
                isOpen={openSections.ucuaForm}
                onClick={() => handleToggle("ucuaForm")}
              />
              <Collapse in={openSections.ucuaForm} timeout="auto" unmountOnExit>
                <Box sx={{ pb: 1 }}>
                  <StyledLink to="/submit-uc" label="Unsafe Condition Form" />
                  <StyledLink to="/submit-ua" label="Unsafe Action Form" />
                </Box>
              </Collapse>

              <SectionButton
                icon={FolderIcon}
                title="My Report List"
                isOpen={openSections.reportList}
                onClick={() => handleToggle("reportList")}
              />
              <Collapse
                in={openSections.reportList}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ pb: 1 }}>
                  <StyledLink to="/all-reports" label="All Report List" />
                  <StyledLink to="/uc-reports" label="UC Report List" />
                  <StyledLink to="/ua-reports" label="UA Report List" />
                </Box>
              </Collapse>
            </>
          )}

          {role === "pssd" && (
            <>
              <SectionButton
                icon={FolderIcon}
                title="UCUA Report"
                isOpen={openSections.ucuaReport}
                onClick={() => handleToggle("ucuaReport")}
              />
              <Collapse
                in={openSections.ucuaReport}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ pb: 1 }}>
                  {/* <StyledLink to="/review/all" label="All Report List" /> */}
                  <StyledLink to="/pssd-uc-list" label="UC Report List" />
                  <StyledLink to="/pssd-ua-list" label="UA Report List" />
                  {/* <StyledLink to="/pssd-view-uc/UA001" label="Sample View UC" />
                  <StyledLink to="/pssd-view-ua/UA001" label="Sample View UA" /> */}
                </Box>
              </Collapse>

              <NavButton
                to="/safety-pattern-analysis"
                icon={InsightsIcon}
                title="UCUA Analytics"
              />
            </>
          )}

          {role === "ucuaadmin" && (
            <>
              <SectionButton
                icon={FolderIcon}
                title="UCUA Report"
                isOpen={openSections.ucuaReport}
                onClick={() => handleToggle("ucuaReport")}
              />
              <Collapse
                in={openSections.ucuaReport}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ pb: 1 }}>
                  <StyledLink to="/ucua-admin-reports" label="All Report List" />
                </Box>
              </Collapse>

              <NavButton to="/users" icon={GroupIcon} title="Manage Users" />
            </>
          )}

          {role === "itadmin" && (
            <NavButton
              to="/training"
              icon={SchoolIcon}
              title="Train AI Models"
            />
          )}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2, borderTop: "1px solid #e2e8f0" }}>
        <ListItemButton
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: 2,
            bgcolor: "white",
            color: "#ef4444",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#fef2f2",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#ef4444", minWidth: 40 }}>
            <LogoutIcon sx={{ fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;