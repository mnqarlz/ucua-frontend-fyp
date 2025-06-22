// src/pages/AdminModule/ManageUser/addUser.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const roles = ["Staff", "PSSD Officer", "UCUA Admin", "IT Admin"];

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    designation: "",
    department: "",
    staffId: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);

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

    // Simulate email already registered
    if (formData.email === "already@registered.com") {
      setEmailExists(true);
      return;
    }

    if (validate()) {
      // Simulate success
      console.log("Created user:", formData);
      setSuccess(true);

      // Auto-navigate back after delay
      setTimeout(() => {
        navigate("/user-management");
      }, 2000);
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: "Poppins" }}>
      <Typography variant="h5" sx={{ color: "#061978", fontWeight: 600 }}>
        Add New User
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
                {roles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Access Level / Role"
                name="role"
                select
                value={formData.role}
                onChange={handleChange}
                fullWidth
                error={!!errors.role}
                helperText={errors.role}
              >
                {roles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button
                type="button"
                variant="outlined"
                sx={{ mr: 2, fontFamily: "Poppins", borderColor: "#061978", color: "#061978" }}
                onClick={() => setCancelDialog(true)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#061978", fontFamily: "Poppins" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={4000}>
        <Alert severity="success" sx={{ fontFamily: "Poppins" }}>
          User account successfully created, and email sent.
        </Alert>
      </Snackbar>

      {/* Email Exists Error */}
      <Snackbar open={emailExists} autoHideDuration={4000} onClose={() => setEmailExists(false)}>
        <Alert severity="error" sx={{ fontFamily: "Poppins" }}>
          Email is already registered.
        </Alert>
      </Snackbar>

      {/* Cancel Confirmation Dialog */}
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

export default AddUser;
