import React, { useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  TextField, InputAdornment, Select, MenuItem, IconButton, Pagination, Tooltip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const uaReports = [
  {
    no: "UA001",
    date: "04-01-2024 15:20:00",
    name: "MOHD HAZIQ",
    location: "MAINTENANCE AREA",
    offense: "U-SEE",
    status: "PENDING"
  },
  {
    no: "UA002",
    date: "06-01-2024 09:00:00",
    name: "SITI NORAINI",
    location: "LOADING DOCK",
    offense: "U-WEAR",
    status: "APPROVED"
  },
  {
    no: "UA003",
    date: "07-01-2024 11:45:00",
    name: "NUR ALIA YUSOFF",
    location: "WAREHOUSE",
    offense: "U-DO",
    status: "REJECTED"
  },
  {
    no: "UA004",
    date: "08-01-2024 10:10:00",
    name: "MUHAMMAD AIMAN HAIQAL",
    location: "ICT DEPARTMENT",
    offense: "U-ACT",
    status: "PENDING"
  }
];

const PssdUAList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const rowsPerPage = 3;

  const filtered = uaReports.filter(
    (row) =>
      (filter === "ALL" || row.status === filter) &&
      (row.no.toLowerCase().includes(search.toLowerCase()) ||
        row.name.toLowerCase().includes(search.toLowerCase()))
  );

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 4, fontFamily: "Poppins, sans-serif" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#061978", mb: 2 }}>
        LIST OF UNSAFE ACTION REPORTS (UA)
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
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
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="APPROVED">Approved</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#061978" }}>
            <TableRow>
              {["NO", "REPORT DATE", "REPORTER NAME", "LOCATION", "OFFENSE CODE", "STATUS", "LOG", "ACTION"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: 600 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.offense}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      px: 1.5, py: 0.5,
                      bgcolor:
                        row.status === "PENDING"
                          ? "#fff59d"
                          : row.status === "APPROVED"
                          ? "#c8e6c9"
                          : "#ffcdd2",
                      borderRadius: 2,
                      display: "inline-block",
                      fontWeight: 600
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Log History">
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/pssd-log-ua/${row.no}`)}
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Report">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/pssd-view-ua/${row.no}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Report">
                    <IconButton
                      sx={{ color: "#f59e0b" }}
                      onClick={() => navigate(`/pssd-edit-ua/${row.no}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Report">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>No UA reports found.</TableCell>
              </TableRow>
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
    </Box>
  );
};

export default PssdUAList;
