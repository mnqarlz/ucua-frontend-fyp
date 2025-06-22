import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const roleList = ["Staff", "PSSD Officer", "UCUA Admin", "IT Admin"];

const featureData = [
  {
    id: 1,
    name: "Submit UC Report",
    module: "Reporting",
    description: "Allows staff to submit unsafe condition reports.",
    roles: []
  },
  {
    id: 2,
    name: "Submit UA Report",
    module: "Reporting",
    description: "Allows staff to submit unsafe action reports.",
    roles: []
  },
  {
    id: 3,
    name: "View UC Reports",
    module: "Review & Feedback",
    description: "Allows officers to view UC reports.",
    roles: []
  },
  {
    id: 4,
    name: "Edit UC Reports",
    module: "Review & Feedback",
    description: "Allows officers to modify UC reports before validation.",
    roles: []
  },
  {
    id: 5,
    name: "Generate Report",
    module: "Analytics",
    description: "Generate PDF/Excel reports from report trends.",
    roles: []
  },
  {
    id: 6,
    name: "Manage Users",
    module: "Admin",
    description: "Create, update, and delete user accounts.",
    roles: []
  },
  {
    id: 7,
    name: "Manage Permissions",
    module: "Admin",
    description: "Assign permissions to roles.",
    roles: []
  },
  {
    id: 8,
    name: "Train AI Model",
    module: "AI Module",
    description: "Train AI using historical UC/UA data.",
    roles: []
  },
  {
    id: 9,
    name: "Access Dashboard",
    module: "Dashboard",
    description: "Access safety insight dashboard.",
    roles: []
  }
];

const FeatureList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [assignError, setAssignError] = useState("");

  const filteredFeatures = featureData.filter(
    (item) =>
      (filter === "ALL" || item.module === filter) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredFeatures.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEditClick = (feature) => {
    setSelectedFeature({ ...feature });
    setEditModalOpen(true);
  };

  const handleAssignClick = (feature) => {
    setSelectedFeature({ ...feature });
    setSelectedRoles(feature.roles || []);
    setAssignModalOpen(true);
    setAssignError("");
  };

  const handleEditSave = () => {
    setEditModalOpen(false);
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleAssignSave = () => {
    if (selectedRoles.length === 0) {
      setAssignError("Please select at least one role.");
      return;
    }
    // Simulate assignment
    selectedFeature.roles = selectedRoles;
    setAssignModalOpen(false);
  };

  return (
    <Box sx={{ p: 4, fontFamily: "Poppins, sans-serif" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#061978", mb: 2 }}>
        SYSTEM FEATURE LIST
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          placeholder="Search by feature name..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="ALL">All Modules</MenuItem>
          <MenuItem value="Reporting">Reporting</MenuItem>
          <MenuItem value="Review & Feedback">Review & Feedback</MenuItem>
          <MenuItem value="Analytics">Analytics</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="AI Module">AI Module</MenuItem>
          <MenuItem value="Dashboard">Dashboard</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#061978" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Feature Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Module</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>{feature.name}</TableCell>
                <TableCell>{feature.module}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Feature">
                    <IconButton color="primary" onClick={() => handleEditClick(feature)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Assign Role">
                    <IconButton color="success" onClick={() => handleAssignClick(feature)}>
                      <AssignmentIndIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No matching features found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={Math.ceil(filteredFeatures.length / rowsPerPage)}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Box>

      {/* Edit Feature Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Feature</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            label="Feature Name"
            fullWidth
            value={selectedFeature?.name || ""}
            onChange={(e) =>
              setSelectedFeature({ ...selectedFeature, name: e.target.value })
            }
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            label="Feature Description"
            fullWidth
            multiline
            minRows={3}
            value={selectedFeature?.description || ""}
            onChange={(e) =>
              setSelectedFeature({
                ...selectedFeature,
                description: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#061978" }}
            onClick={handleEditSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Role Modal */}
      <Dialog open={assignModalOpen} onClose={() => setAssignModalOpen(false)}>
        <DialogTitle>Assign Role to Feature</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          {assignError && <Alert severity="warning">{assignError}</Alert>}
          <FormGroup sx={{ mt: 2 }}>
            {roleList.map((role) => (
              <FormControlLabel
                key={role}
                control={
                  <Checkbox
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                }
                label={role}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#061978" }}
            onClick={handleAssignSave}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeatureList;
