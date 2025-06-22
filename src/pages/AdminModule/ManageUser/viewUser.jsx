// src/pages/AdminModule/ManageUser/viewUser.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const roles = ["Staff", "PSSD Officer", "UCUA Admin", "IT Admin"];
const statuses = ["Active", "Inactive"];

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [userData, setUserData] = useState(null);

  const mockUser = {
    U001: {
      fullName: "Ahmad Zain",
      email: "ahmadzain@example.com",
      designation: "Staff",
      department: "Safety",
      password: "abc123",
      role: "Staff",
      phone: "0123456789",
      staffId: "STF001",
      status: "Active",
    },
    U002: {
      fullName: "Fatimah Noor",
      email: "fatimah@example.com",
      designation: "PSSD Officer",
      department: "PSSD",
      password: "xyz456",
      role: "PSSD Officer",
      phone: "0198765432",
      staffId: "STF002",
      status: "Inactive",
    },
  };

  useEffect(() => {
    const user = mockUser[id];
    if (user) {
      setUserData(user);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <Box sx={{ p: 3, fontFamily: "Poppins", color: "#061978" }}>
        <Typography variant="h6">User record not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, fontFamily: "Poppins" }}>
      <Typography variant="h5" sx={{ color: "#061978", fontWeight: 600 }}>
        View User Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              value={userData?.fullName || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              value={userData?.email || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Designation"
              value={userData?.designation || ""}
              select
              fullWidth
              InputProps={{ readOnly: true }}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Department"
              value={userData?.department || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Default Password"
              value={userData?.password || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Access Level / Role"
              value={userData?.role || ""}
              select
              fullWidth
              InputProps={{ readOnly: true }}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              value={userData?.phone || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Staff ID"
              value={userData?.staffId || ""}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Account Status"
              value={userData?.status || ""}
              select
              fullWidth
              InputProps={{ readOnly: true }}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Button
              variant="contained"
              sx={{ fontFamily: "Poppins", backgroundColor: "#061978" }}
              onClick={() => navigate("/user-management")}
            >
              Back to User List
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewUser;
