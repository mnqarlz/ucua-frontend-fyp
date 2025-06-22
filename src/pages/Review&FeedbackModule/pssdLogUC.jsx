import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const logData = [
  {
    id: 1,
    ucId: "UC0001",
    description: "Report submitted by staff on 2024-01-03 11:45 AM"
  },
  {
    id: 2,
    ucId: "UC0001",
    description: "PSSD Officer marked report as 'Pending Review'"
  },
  {
    id: 3,
    ucId: "UC0001",
    description: "PSSD Officer sent feedback request to staff"
  },
  {
    id: 4,
    ucId: "UC0001",
    description: "Staff provided updated evidence on 2024-01-05"
  },
  {
    id: 5,
    ucId: "UC0001",
    description: "Report approved by Safety Officer on 2024-01-06"
  }
];

const PSSDLogUC = () => {
  return (
    <Box sx={{ p: 4, fontFamily: "Poppins, sans-serif", color: "#061978" }}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#f1f5ff",
          p: 2,
          borderRadius: 2,
          fontWeight: "bold",
          textAlign: "center",
          color: "#061978"
        }}
      >
        LOG HISTORY FOR UNSAFE CONDITION REPORT [UC0001]
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e7ff" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#061978", fontFamily: "Poppins, sans-serif" }}>
                No.
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#061978", fontFamily: "Poppins, sans-serif" }}>
                UC ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#061978", fontFamily: "Poppins, sans-serif" }}>
                Log History Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.map((log, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", color: "#061978" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", color: "#061978" }}>
                  {log.ucId}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif", color: "#061978" }}>
                  {log.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PSSDLogUC;
