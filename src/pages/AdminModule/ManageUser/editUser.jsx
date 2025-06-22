// src/pages/AdminModule/ManageUser/editUser.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const roles = ["Staff", "PSSD Officer", "UCUA Admin", "IT Admin"];
const statuses = ["Active", "Inactive"];

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);

  // Simulated user data store
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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    department: "",
    password: "",
    role: "",
    phone: "",
    staffId: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = mockUser[id];
    if (user) {
      setFormData(user);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const validate = () => {
    let temp = {};
    Object.entries(formData).forEach(([key, value]) => {
      temp[key] = value ? "" : "This field is required";
    });
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate update success
      console.log("Updated user:", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/user-management");
      }, 2000);
    }
  };

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
        Edit User Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                fullWidth
                error={!!errors.designation}
                helperText={errors.designation}
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
                name="department"
                value={formData.department}
                onChange={handleChange}
                fullWidth
                error={!!errors.department}
                helperText={errors.department}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Default Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Access Level / Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                error={!!errors.role}
                helperText={errors.role}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Staff ID"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                fullWidth
                error={!!errors.staffId}
                helperText={errors.staffId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Account Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                error={!!errors.status}
                helperText={errors.status}
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
                variant="outlined"
                onClick={() => setCancelDialog(true)}
                sx={{
                  mr: 2,
                  fontFamily: "Poppins",
                  borderColor: "#061978",
                  color: "#061978",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontFamily: "Poppins",
                  backgroundColor: "#061978",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={4000}>
        <Alert severity="success" sx={{ fontFamily: "Poppins" }}>
          User details updated successfully.
        </Alert>
      </Snackbar>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog} onClose={() => setCancelDialog(false)}>
        <DialogTitle sx={{ fontFamily: "Poppins" }}>
          Are you sure you want to cancel?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)} sx={{ fontFamily: "Poppins" }}>
            No
          </Button>
          <Button
            onClick={() => navigate("/user-management")}
            sx={{ fontFamily: "Poppins", color: "#061978" }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditUser;
