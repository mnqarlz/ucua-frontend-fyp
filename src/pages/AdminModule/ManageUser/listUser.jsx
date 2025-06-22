// src/pages/AdminModule/ManageUser/listUser.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  {
    id: "U001",
    name: "Ahmad Zain",
    email: "ahmadzain@example.com",
    designation: "Engineer",
    department: "Safety",
    role: "PSSD Officer",
    status: "Active",
  },
  {
    id: "U002",
    name: "Fatimah Noor",
    email: "fatimah.noor@example.com",
    designation: "Admin Assistant",
    department: "ICT",
    role: "Staff",
    status: "Inactive",
  },
];

const ListUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Simulate fetching data
    setUsers(mockUsers);
  }, []);

  const handleView = (id) => navigate(`/user/view/${id}`);
  const handleEdit = (id) => navigate(`/user/edit/${id}`);
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (confirm) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase()) ||
      user.department.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, fontFamily: "Poppins" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          sx={{ color: "#061978", fontWeight: 600, fontFamily: "Poppins" }}
        >
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/user/add")}
          sx={{
            backgroundColor: "#061978",
            fontFamily: "Poppins",
            "&:hover": { backgroundColor: "#3a4bb3" },
          }}
        >
          Add User
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search by name, department, or role"
        variant="outlined"
        size="small"
        sx={{ my: 2, fontFamily: "Poppins" }}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#061978" }}>
              {["User ID", "Name", "Email", "Designation", "Department", "Role", "Status", "Action"].map(
                (header) => (
                  <TableCell key={header} sx={{ color: "white", fontWeight: "bold", fontFamily: "Poppins" }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ fontFamily: "Poppins" }}>
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(user.id)} title="View">
                      <Visibility sx={{ color: "#061978" }} />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(user.id)} title="Edit">
                      <Edit sx={{ color: "#061978" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)} title="Delete">
                      <Delete sx={{ color: "#061978" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ListUser;
