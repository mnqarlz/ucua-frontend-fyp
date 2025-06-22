import React, { useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  TextField, InputAdornment, Select, MenuItem,
  IconButton, Pagination, Tooltip, Button,
  Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  { id: "USR001", name: "MOHD HAZIQ RAMADHAN", email: "haziq@mail.com", role: "Staff", state: "Johor", district: "Muar" },
  { id: "USR002", name: "SITI NORAINI", email: "noraini@mail.com", role: "PSSD Officer", state: "Johor", district: "Batu Pahat" },
  { id: "USR003", name: "NUR ALIA", email: "alia@mail.com", role: "IT Admin", state: "Johor", district: "Kulai" },
  { id: "USR004", name: "NUR ZULAIKHA", email: "eyka@mail.com", role: "UCUA Admin", state: "Johor", district: "Bandar Penawar" },
  { id: "USR005", name: "NUR IZZAH", email: "izzah@mail.com", role: "UCUA Admin", state: "Johor", district: "Kota Tinggi" },
  { id: "USR006", name: "NUR INSYIRAH", email: "syirah@mail.com", role: "Staff", state: "Johor", district: "Johor Bahru" },
];

const ListUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const handleDelete = (id) => {
    try {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSnackbar({ open: true, message: "User has been deleted.", severity: "success" });
      console.log(`[LOG] User ${id} deleted at ${new Date().toLocaleString()} by Admin`);
    } catch (err) {
      setSnackbar({ open: true, message: "Unable to delete user. Please try again.", severity: "error" });
    } finally {
      setDeleteUserId(null);
    }
  };

  const filtered = users.filter((user) =>
    (filter === "ALL" || user.role === filter) &&
    (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase()))
  );

  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ p: 4, fontFamily: "Poppins, sans-serif" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#061978", mb: 2 }}>
        LIST OF REGISTERED USERS
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            placeholder="Search by name, email or ID..."
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
              ),
            }}
          />
          <Select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="ALL">All Roles</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="PSSD Officer">PSSD Officer</MenuItem>
            <MenuItem value="IT Admin">IT Admin</MenuItem>
            <MenuItem value="UCUA Admin">UCUA Admin</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#061978", fontWeight: 600 }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/user/add")}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#061978" }}>
            <TableRow>
              {["USER ID", "NAME", "EMAIL", "ROLE", "STATE", "DISTRICT", "ACTION"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: 600 }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.district}</TableCell>
                <TableCell>
                  <Tooltip title="View User">
                    <IconButton color="primary" onClick={() => navigate(`/user/view/${user.id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit User">
                    <IconButton color="success" onClick={() => navigate(`/user/edit/${user.id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton color="error" onClick={() => setDeleteUserId(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow><TableCell colSpan={7}>No users found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={Math.ceil(filtered.length / rowsPerPage)}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Box>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!deleteUserId} onClose={() => setDeleteUserId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)} color="primary">Cancel</Button>
          <Button onClick={() => handleDelete(deleteUserId)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListUser;
