import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Alert
} from "@mui/material";

const availableRoles = ["staff", "pssd", "ucuaadmin", "itadmin"];

const AssignRoleModal = ({ open, onClose, onConfirm, featureName }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [error, setError] = useState("");

  const handleToggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleConfirm = () => {
    if (selectedRoles.length === 0) {
      setError("Please select at least one role.");
      return;
    }

    try {
      onConfirm(selectedRoles);
      setError("");
      setSelectedRoles([]);
    } catch (err) {
      setError("Assignment failed. Please try again later.");
    }
  };

  const handleClose = () => {
    setError("");
    setSelectedRoles([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
        Assign Role to Feature
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontFamily: "Poppins, sans-serif", mb: 1 }}>
          Feature: <strong>{featureName}</strong>
        </Typography>

        {availableRoles.map((role) => (
          <FormControlLabel
            key={role}
            control={
              <Checkbox
                checked={selectedRoles.includes(role)}
                onChange={() => handleToggleRole(role)}
              />
            }
            label={role.toUpperCase()}
            sx={{ fontFamily: "Poppins, sans-serif" }}
          />
        ))}

        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignRoleModal;
