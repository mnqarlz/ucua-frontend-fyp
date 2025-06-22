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
    uaId: "UA0001",
    description: "Report submitted by staff on 2024-01-02 09:12 AM"
  },
  {
    id: 2,
    uaId: "UA0001",
    description: "PSSD Officer updated report status to 'Pending Review'"
  },
  {
    id: 3,
    uaId: "UA0001",
    description: "PSSD Officer requested additional feedback from staff"
  },
  {
    id: 4,
    uaId: "UA0001",
    description: "Staff submitted follow-up action on 2024-01-05"
  },
  {
    id: 5,
    uaId: "UA0001",
    description: "Report approved by Safety Department on 2024-01-06"
  }
];

const PSSDLogUA = () => {
  return (
    <Box sx={{ p: 4, fontFamily: "Poppins, sans-serif", color: "#061978" }}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#f1f5ff",
          p: 2,
          borderRadius: 2,
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        LOG HISTORY FOR UNSAFE ACTION REPORT [UA0001]
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e7ff" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#061978" }}>No.</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#061978" }}>UA ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#061978" }}>Log History Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{log.uaId}</TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PSSDLogUA;
